'use client'

import { useEffect, useRef, useState } from 'react';
import type { CSSProperties } from 'react';
import { useToast } from '@/components/ui/use-toast';

type GeoJsonFeatureCollection = {
  type: 'FeatureCollection';
  features: Array<{
    type: 'Feature';
    geometry: {
      type: 'LineString';
      coordinates: [number, number][];
    };
    properties: Record<string, unknown>;
  }>;
};

type MapboxSource = {
  setData: (data: GeoJsonFeatureCollection) => void;
};

type PaintProps = Record<string, string | number>;

type MapboxMap = {
  addSource: (id: string, source: { type: 'geojson'; data: GeoJsonFeatureCollection }) => void;
  addLayer: (layer: { id: string; type: 'line'; source: string; paint: PaintProps }) => void;
  getSource: (id: string) => MapboxSource | undefined;
  flyTo: (options: { center: [number, number]; zoom: number; essential: boolean }) => void;
  remove: () => void;
  on: (event: 'load', handler: () => void) => void;
};

type MapboxMarker = {
  setLngLat: (coords: [number, number]) => MapboxMarker;
  addTo: (map: MapboxMap) => MapboxMarker;
  remove: () => void;
};

type MapboxGL = {
  Map: new (options: {
    container: HTMLDivElement;
    style: string;
    center: [number, number];
    zoom: number;
  }) => MapboxMap;
  Marker: new (options: { color: string }) => MapboxMarker;
  accessToken: string;
};

declare global {
  interface Window {
    mapboxgl?: MapboxGL;
  }
}

const MAPBOX_JS = 'https://api.mapbox.com/mapbox-gl-js/v2.15.0/mapbox-gl.js';
const MAPBOX_CSS = 'https://api.mapbox.com/mapbox-gl-js/v2.15.0/mapbox-gl.css';
const ROUTE_SOURCE_ID = 'drive-route';

const containerStyle: CSSProperties = {
  width: '81vw',
  height: '70vh',
  marginTop: '-10px',
};

const startingPoint = { lat: 30.780200427489497, lng: 76.48555933297311 };

const calculateDistance = (lat1: number, lng1: number, lat2: number, lng2: number) => {
  const toRad = (value: number) => (value * Math.PI) / 180;
  const R = 6371;
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lng2 - lng1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
};

type Coordinate = { lat: number; lng: number };

export default function MapView() {
  const { toast } = useToast();
  const mapboxToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN ?? '';

  const [scriptReady, setScriptReady] = useState(false);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [currentLocation, setCurrentLocation] = useState<Coordinate | null>(null);
  const [distanceTraveled, setDistanceTraveled] = useState<number | null>(null);

  const containerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<MapboxMap | null>(null);
  const currentMarkerRef = useRef<MapboxMarker | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    if (!document.getElementById('mapbox-gl-css')) {
      const link = document.createElement('link');
      link.id = 'mapbox-gl-css';
      link.rel = 'stylesheet';
      link.href = MAPBOX_CSS;
      document.head.appendChild(link);
    }

    if (window.mapboxgl) {
      setScriptReady(true);
      return;
    }

    const script = document.createElement('script');
    script.id = 'mapbox-gl-js';
    script.src = MAPBOX_JS;
    script.async = true;
    script.onload = () => setScriptReady(true);
    script.onerror = () => {
      toast({
        title: 'Mapbox failed to load',
        description: 'Check your network connection and token.',
        variant: 'destructive',
      });
    };

    document.head.appendChild(script);

    return () => {
      script.onload = null;
      script.onerror = null;
    };
  }, [toast]);

  useEffect(() => {
    if (!scriptReady || !mapboxToken || mapRef.current || !containerRef.current) {
      return;
    }

    const mapboxgl = window.mapboxgl;
    if (!mapboxgl) {
      return;
    }

    mapboxgl.accessToken = mapboxToken;

    const map = new mapboxgl.Map({
      container: containerRef.current,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [startingPoint.lng, startingPoint.lat],
      zoom: 13,
    });

    mapRef.current = map;

    new mapboxgl.Marker({ color: '#059669' })
      .setLngLat([startingPoint.lng, startingPoint.lat])
      .addTo(map);

    currentMarkerRef.current = new mapboxgl.Marker({ color: '#2563eb' })
      .setLngLat([startingPoint.lng, startingPoint.lat])
      .addTo(map);

    map.on('load', () => {
      map.addSource(ROUTE_SOURCE_ID, {
        type: 'geojson',
        data: {
          type: 'FeatureCollection',
          features: [],
        },
      });

      map.addLayer({
        id: ROUTE_SOURCE_ID,
        type: 'line',
        source: ROUTE_SOURCE_ID,
        paint: {
          'line-color': '#1d4ed8',
          'line-width': 4,
          'line-opacity': 0.8,
        },
      });

      setMapLoaded(true);
    });

    return () => {
      currentMarkerRef.current?.remove();
      currentMarkerRef.current = null;

      map.remove();
      mapRef.current = null;
      setMapLoaded(false);
    };
  }, [scriptReady, mapboxToken]);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        const nextLocation: Coordinate = { lat: latitude, lng: longitude };
        setCurrentLocation(nextLocation);

        const distance = calculateDistance(
          startingPoint.lat,
          startingPoint.lng,
          latitude,
          longitude
        );
        setDistanceTraveled(distance);
      },
      (error) => {
        toast({
          title: 'Error',
          description: 'Unable to fetch current location.',
          variant: 'destructive',
        });
        console.error(error);
      }
    );
  }, [toast]);

  useEffect(() => {
    if (!mapLoaded || !mapRef.current || !currentLocation) {
      return;
    }

    const map = mapRef.current;
    
    // Fetch route using Mapbox Directions API
    const getRoute = async () => {
      const start = `${startingPoint.lng},${startingPoint.lat}`;
      const end = `${currentLocation.lng},${currentLocation.lat}`;
      
      try {
        const response = await fetch(
          `https://api.mapbox.com/directions/v5/mapbox/driving/${start};${end}?geometries=geojson&access_token=${mapboxToken}`
        );
        
        if (!response.ok) {
          throw new Error('Failed to fetch route');
        }
        
        const data = await response.json();
        
        if (data.routes && data.routes.length > 0) {
          const route = data.routes[0];
          const routeCoordinates = route.geometry.coordinates;
          
          // Update distance with actual route distance
          const routeDistanceKm = route.distance / 1000;
          setDistanceTraveled(routeDistanceKm);
          
          const source = map.getSource(ROUTE_SOURCE_ID);
          if (source) {
            source.setData({
              type: 'FeatureCollection',
              features: [
                {
                  type: 'Feature',
                  geometry: {
                    type: 'LineString',
                    coordinates: routeCoordinates,
                  },
                  properties: {},
                },
              ],
            });
          }
        }
      } catch (error) {
        console.error('Error fetching route:', error);
        // Fallback to straight line if API fails
        const coordinates: [number, number][] = [
          [startingPoint.lng, startingPoint.lat],
          [currentLocation.lng, currentLocation.lat],
        ];

        const source = map.getSource(ROUTE_SOURCE_ID);
        if (source) {
          source.setData({
            type: 'FeatureCollection',
            features: [
              {
                type: 'Feature',
                geometry: {
                  type: 'LineString',
                  coordinates,
                },
                properties: {},
              },
            ],
          });
        }
        
        // Keep manual distance calculation as fallback
        const distance = calculateDistance(
          startingPoint.lat,
          startingPoint.lng,
          currentLocation.lat,
          currentLocation.lng
        );
        setDistanceTraveled(distance);
      }
    };

    getRoute();

    if (currentMarkerRef.current) {
      currentMarkerRef.current.setLngLat([currentLocation.lng, currentLocation.lat]);
    }

    map.flyTo({
      center: [currentLocation.lng, currentLocation.lat],
      zoom: 13,
      essential: true,
    });
  }, [currentLocation, mapLoaded, mapboxToken]);

  return (
    <div className="-z-10 border-none outline-none">
      {mapboxToken ? (
        <div ref={containerRef} style={containerStyle} className="rounded-lg shadow" />
      ) : (
        <div className="flex h-[70vh] w-[81vw] items-center justify-center rounded-lg border border-dashed border-slate-200 bg-white text-center text-sm text-slate-500">
          Mapbox token missing. Add NEXT_PUBLIC_MAPBOX_TOKEN to display the map.
        </div>
      )}

      {distanceTraveled !== null && (
        <div className="mt-4 rounded-lg bg-white p-4 shadow-lg">
          <h2 className="text-lg font-bold">Distance Traveled:</h2>
          <p>{distanceTraveled.toFixed(2)} km</p>
        </div>
      )}
    </div>
  );
}
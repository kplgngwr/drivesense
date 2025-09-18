'use client'

import React, { useCallback, useEffect, useRef, useState } from 'react';
import { GoogleMap, Marker, DirectionsRenderer } from '@react-google-maps/api';
import { useToast } from '@/components/ui/use-toast';

const containerStyle = {
  width: '81vw',
  height: '70vh',
  marginTop: '-10px'
};

const startingPoint = { lat: 30.780200427489497, lng: 76.48555933297311 }; // Starting Point A

export default function MapView() {
  const { toast } = useToast();
  const [mapLoaded, setMapLoaded] = useState(false);
  const [directions, setDirections] = useState<google.maps.DirectionsResult | null>(null);
  const [currentLocation, setCurrentLocation] = useState<google.maps.LatLngLiteral | null>(null);
  const [distanceTraveled, setDistanceTraveled] = useState<number | null>(null);

  const mapRef = useRef<GoogleMap | null>(null);

  const calculateDistance = (lat1: number, lng1: number, lat2: number, lng2: number) => {
    const toRad = (value: number) => (value * Math.PI) / 180;
    const R = 6371; // Radius of the Earth in km
    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lng2 - lng1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; // Distance in km
  };

  const fetchCurrentLocation = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        const newLocation = { lat: latitude, lng: longitude };
        setCurrentLocation(newLocation);

        // Calculate distance from starting point
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
  };

  const handleMapLoad = useCallback(() => {
    setMapLoaded(true);
  }, []);

  useEffect(() => {
    fetchCurrentLocation();
  }, []);

  useEffect(() => {
    if (mapLoaded && currentLocation) {
      const directionsService = new window.google.maps.DirectionsService();

      // Request route from starting point to current location
      directionsService.route(
        {
          origin: startingPoint,
          destination: currentLocation,
          travelMode: window.google.maps.TravelMode.DRIVING,
        },
        (result: google.maps.DirectionsResult | null, status: google.maps.DirectionsStatus) => {
          if (status === window.google.maps.DirectionsStatus.OK) {
            setDirections(result);
          } else {
            toast({
              title: 'Error',
              description: 'Unable to fetch directions.',
              variant: 'destructive',
            });
          }
        }
      );
    }
  }, [mapLoaded, currentLocation, toast]);

  return (
    <div className="-z-10 border-none outline-none">
        <GoogleMap
          ref={mapRef}
          mapContainerStyle={containerStyle}
          center={startingPoint}
          zoom={15}
          onLoad={handleMapLoad}
        >
          {/* Directions Renderer */}
          {directions && <DirectionsRenderer directions={directions} options={{ suppressMarkers: true }} />}

          {/* Starting Point Marker */}
          <Marker position={startingPoint} label=" " />

          {/* Current Location Marker with Custom Icon */}
          {mapLoaded && currentLocation && (
            <Marker
              position={currentLocation}
              icon={{
                url: 'https://cdn-icons-png.flaticon.com/512/1048/1048329.png',
                scaledSize: new window.google.maps.Size(50, 50),
              }}
            />
          )}


        </GoogleMap>

      {/* Display Distance Traveled */}
      {distanceTraveled !== null && (
        <div className="p-4 bg-white shadow-lg rounded-lg mt-4">
          <h2 className="text-lg font-bold">Distance Traveled:</h2>
          <p>{distanceTraveled.toFixed(2)} km</p>
        </div>
      )}
    </div>
  );
}

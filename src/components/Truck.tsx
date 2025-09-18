'use client';

import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

type SensorData = {
  x: number;
  y: number;
  z: number;
};

const Truck: React.FC = () => {
  const [gyro, setGyro] = useState<SensorData>({ x: 0, y: 0, z: 0 });
  const [accel, setAccel] = useState<SensorData>({ x: 0, y: 0, z: 0 });

  const gyroRef = useRef(gyro);
  const accelRef = useRef(accel);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const sceneRef = useRef<THREE.Scene>();
  const cameraRef = useRef<THREE.PerspectiveCamera>();
  const rendererRef = useRef<THREE.WebGLRenderer>();
  const modelRef = useRef<THREE.Object3D | null>(null);

  useEffect(() => {
    gyroRef.current = gyro;
  }, [gyro]);

  useEffect(() => {
    accelRef.current = accel;
  }, [accel]);

  // Polling the data.json file
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/data.json'); // Ensure this path is correct and accessible
        if (!response.ok) throw new Error('Failed to fetch data.json');
        const data = await response.json();

        setGyro({
          x: data.gx || 0,
          y: data.gy || 0,
          z: data.gz || 0,
        });

        setAccel({
          x: data.ax || 0,
          y: data.ay || 0,
          z: data.az || 0,
        });
      } catch (error) {
        console.error('Error fetching data.json:', error);
        // Set to 0 if there's an error
        setGyro({ x: 0, y: 0, z: 0 });
        setAccel({ x: 0, y: 0, z: 0 });
      }
    };

    const intervalId = setInterval(fetchData, 100); // Poll every 1 second
    return () => clearInterval(intervalId); // Cleanup on unmount
  }, []);

  useEffect(() => {
    const container = containerRef.current!;
    const width = container.clientWidth;
    const height = 600;

    // Initialize the scene
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x87cefa); // Light blue color
    sceneRef.current = scene;

    // Initialize the camera
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    camera.position.z = 30;
    camera.position.y = 1;
    cameraRef.current = camera;

    // Initialize the renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(width, height);
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Add lights
    const ambientLight = new THREE.AmbientLight(0x404040, 1);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(5, 5, 5).normalize();
    scene.add(directionalLight);

    // Load the 3D model
    const loader = new GLTFLoader();
    loader.load(
      '/truck.glb',
      (gltf) => {
        if (!modelRef.current) {
          const model = gltf.scene;
          model.scale.set(0.04, 0.04, 0.04);
          scene.add(model);
          modelRef.current = model;
        }
      },
      undefined,
      (error) => {
        console.error('Error loading model:', error);
      }
    );

    const animate = () => {
      requestAnimationFrame(animate);

      if (modelRef.current) {
        modelRef.current.rotation.x = THREE.MathUtils.lerp(
          modelRef.current.rotation.x,
          gyroRef.current.y / 4,
          0.1
        );
        modelRef.current.rotation.y = THREE.MathUtils.lerp(
          modelRef.current.rotation.y,
          gyroRef.current.z / 4,
          0.1
        );
        modelRef.current.rotation.z = THREE.MathUtils.lerp(
          modelRef.current.rotation.z,
          gyroRef.current.x / 4,
          0.1
        );

        modelRef.current.position.x = THREE.MathUtils.lerp(
          modelRef.current.position.x,
          accelRef.current.x / 20,
          0.1
        );
        modelRef.current.position.y = THREE.MathUtils.lerp(
          modelRef.current.position.y,
          accelRef.current.y / 20,
          0.1
        );
        modelRef.current.position.z = THREE.MathUtils.lerp(
          modelRef.current.position.z,
          accelRef.current.z / 20,
          0.1
        );
      }

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      const newWidth = container.clientWidth;
      const newHeight = container.clientHeight;
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
      scene.clear();
    };
  }, []);

  return (
    <div>
      <main className="p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white shadow-lg p-4 rounded">
            <h2 className="font-bold text-blue-900 mb-2">GYROSCOPE</h2>
            <p>X: {gyro.x.toFixed(2)} rad</p>
            <p>Y: {gyro.y.toFixed(2)} rad</p>
            <p>Z: {gyro.z.toFixed(2)} rad</p>
          </div>
          <div className="bg-white shadow-lg p-4 rounded">
            <h2 className="font-bold text-blue-900 mb-2">ACCELEROMETER</h2>
            <p>X: {accel.x} m/s²</p>
            <p>Y: {accel.y} m/s²</p>
            <p>Z: {accel.z} m/s²</p>
          </div>
        </div>
        <div className="mt-8 bg-[#87cefa] p-4 rounded shadow-lg overflow-hidden">
          <div ref={containerRef} className="w-full h-[600px]"></div>
        </div>
      </main>
    </div>
  );
};

export default Truck;

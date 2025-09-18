'use client'

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";

// This would typically come from an API or database based on the driver ID
const getDriverDetails = (id: string) => ({
  id: parseInt(id),
  name: "Rajesh Kumar",
  email: "rajesh.kumar@example.com",
  phoneNumber: "+91 98765 43210",
  age: 38,
  drivingLicense: "DL1234567890",
  trucksAllocated: [
    {
      truckName: "Tata 407",
      deviceId: "ABC123XYZ",
      vehicleNumber: "UP32AB1234",
      weight: 3500,  // Weight in KG
      registrationDate: "15-Jan-2018",
      ownerName: "Rajesh Kumar",
      insuranceStatus: "Active",
      rtoLocation: "Lucknow",
      lastServiceDate: "20-Oct-2023",
      mileage: 80000, // Mileage in KM
    },
    {
      truckName: "Mahindra Bolero Pik-Up",
      deviceId: "DEF456UVW",
      vehicleNumber: "MH12CD5678",
      weight: 2800,  // Weight in KG
      registrationDate: "10-Mar-2019",
      ownerName: "Rajesh Kumar",
      insuranceStatus: "Expired",
      rtoLocation: "Mumbai",
      lastServiceDate: "15-Nov-2023",
      mileage: 60000, // Mileage in KM
    }
  ],
  rashDriving: 0,
  rapidAcceleration: 0,
  hardBrake: 0,
  maxTurnableSpeed: 8.5
});

export default function DriverDetailsPage({ params }: { params: { id: string } }) {
  const driver = getDriverDetails(params.id);

  const [hardBrake, setHardBrake] = useState<number | null>(null); // Hard brake state
  const [rapidAcceleration, setRapidAcceleration] = useState<number | null>(null); // Rapid acceleration state
  const [maxTurnableSpeed, setMaxTurnableSpeed] = useState<number | null>(null); // Current MTS
  const [drivingScore, setDrivingScore] = useState<number>(100); // Default driving score

  useEffect(() => {
    console.log(drivingScore);
    // Function to fetch the values from data.json and update states
    const fetchDriverMetrics = async () => {
      try {
        const response = await fetch('/data.json');
        const data = await response.json();

        // Update the values for hb, ra, and mts
        if (data.hb !== undefined) {
          setHardBrake(data.hb);  // Update hard brake state
        }

        if (data.ra !== undefined) {
          setRapidAcceleration(data.ra);  // Update rapid acceleration state
        }

        if (data.mts !== undefined) {
          setMaxTurnableSpeed(data.mts); // Update max turnable speed state
        }

      } catch (error) {
        console.error("Error fetching metrics from data.json:", error);
      }
    };

    // Initial fetch and start polling every second
    fetchDriverMetrics(); // Fetch data immediately on mount

    const intervalId = setInterval(fetchDriverMetrics, 100); // Poll every 1 second

    // Cleanup the interval on component unmount
    return () => {
      clearInterval(intervalId);
    };
  }, []); // This effect runs only once on mount

  // Function to calculate the driving score
  const calculateDrivingScore = () => {
    let score = 100;  // Start with a base score

    // Decrease score based on hard brake occurrences
    if (hardBrake === 1) {
      score -= 10; // Deduct 10 points for a hard brake
    }

    // Decrease score based on rapid acceleration occurrences
    if (rapidAcceleration === 1) {
      score -= 5; // Deduct 5 points for rapid acceleration
    }

    // Increase score based on max turnable speed (MTS)
    if (maxTurnableSpeed !== null) {
      score += maxTurnableSpeed * 2;  // Increase score by 2 points for every 1 m/s of MTS
    }

    // Ensure the score is between 0 and 100
    score = Math.max(0, Math.min(100, score));

    setDrivingScore(score);
  };

  // Recalculate the driving score only when any of the metric values change
  useEffect(() => {
    if (hardBrake !== null || rapidAcceleration !== null || maxTurnableSpeed !== null) {
      calculateDrivingScore();
    }
  }, [hardBrake, rapidAcceleration, maxTurnableSpeed]);  // Recalculate when any of these values change

  return (
    <ScrollArea className="h-full">
      <div className="container mx-auto py-10 px-4">
        <h1 className="text-3xl font-extrabold text-gray-800 mb-10 text-center">Driver Details</h1>

        {/* Cards with Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <Card className="transition-all transform rounded-xl bg-red-100">
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-gray-700">Rash Driving</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-5xl font-bold text-red-600">{driver.rashDriving}</p>
            </CardContent>
          </Card>

          <Card className="transition-all transform rounded-xl bg-yellow-100">
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-gray-700">Rapid Acceleration</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-5xl font-bold text-yellow-600">
                {rapidAcceleration !== null ? rapidAcceleration : driver.rapidAcceleration}
              </p>
            </CardContent>
          </Card>

          <Card className="transition-all transform rounded-xl bg-orange-100">
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-gray-700">Hard Brake</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-5xl font-bold text-orange-600">
                {hardBrake !== null ? hardBrake : driver.hardBrake}
              </p>
            </CardContent>
          </Card>

          <Card className="transition-all transform rounded-xl bg-blue-100">
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-gray-700">Max Turnable Speed</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-5xl font-bold text-blue-600">
                {maxTurnableSpeed !== null ? `${maxTurnableSpeed.toFixed(2)} m/s` : "0 m/s"}
              </p>
            </CardContent>
          </Card>

          {/* Driving Score Card */}
          {/* <Card className="transition-all transform rounded-xl bg-green-100">
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-gray-700">Driving Score</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-5xl font-bold text-green-600">{drivingScore}</p>
            </CardContent>
          </Card> */}
        </div>

        {/* Personal Information and Allocated Trucks */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-10">
          <Card className="transition-all transform bg-gray-50">
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-gray-700">Personal Information</CardTitle>
            </CardHeader>
            <CardContent>
              <dl className="space-y-4 text-gray-600">
                <div>
                  <dt className="font-semibold">Name:</dt>
                  <dd>{driver.name}</dd>
                </div>
                <div>
                  <dt className="font-semibold">Email:</dt>
                  <dd>{driver.email}</dd>
                </div>
                <div>
                  <dt className="font-semibold">Phone Number:</dt>
                  <dd>{driver.phoneNumber}</dd>
                </div>
                <div>
                  <dt className="font-semibold">Age:</dt>
                  <dd>{driver.age}</dd>
                </div>
                <div>
                  <dt className="font-semibold">Driving License:</dt>
                  <dd>{driver.drivingLicense}</dd>
                </div>
              </dl>
            </CardContent>
          </Card>

          <Card className="transition-all transform bg-gray-50">
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-gray-700">Allocated Trucks</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {driver.trucksAllocated.map((truck, index) => (
                  <div key={index} className="bg-white p-4 rounded-xl shadow-md transition-all">
                    <h3 className="text-lg font-semibold text-gray-800">{truck.truckName}</h3>
                    <p className="text-gray-600"><strong>Device ID:</strong> {truck.deviceId}</p>
                    <p className="text-gray-600"><strong>Vehicle Number:</strong> {truck.vehicleNumber}</p>
                    <p className="text-gray-600"><strong>Weight:</strong> {truck.weight} KG</p>
                    <p className="text-gray-600"><strong>Registration Date:</strong> {truck.registrationDate}</p>
                    <p className="text-gray-600"><strong>Insurance Status:</strong> {truck.insuranceStatus}</p>
                    <p className="text-gray-600"><strong>RTO Location:</strong> {truck.rtoLocation}</p>
                    <p className="text-gray-600"><strong>Last Service Date:</strong> {truck.lastServiceDate}</p>
                    <p className="text-gray-600"><strong>Mileage:</strong> {truck.mileage.toLocaleString()} KM</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </ScrollArea>
  );
}

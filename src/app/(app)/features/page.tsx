'use client';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Cpu, Shield, Wifi, Brain, TrendingUp, Zap, Compass, Gauge, RouteIcon as Road, Calendar, PenToolIcon as Tool, TrendingDown } from 'lucide-react'
import { Bell, FileText } from 'lucide-react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"


export default function ImpactPage() {
    return (
        <>
            <Header />
            <section className="relative py-20 overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <img
                        src="https://images.pexels.com/photos/414860/pexels-photo-414860.jpeg"
                        alt="Abstract technology background"
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-blue-900 opacity-75"></div>
                </div>
                <div className="container mx-auto px-4 relative z-10">
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white text-center mb-6">
                        DriveSense Features
                    </h1>
                    <p className="text-xl text-gray-200 text-center max-w-3xl mx-auto">
                        Discover how our cutting-edge technology revolutionizes fleet management and enhances road safety
                    </p>
                </div>
            </section>
            <section className="p-20 bg-white dark:bg-gray-800">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold text-center mb-12">DriveSense Device</h2>
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <div>
                            <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                                Our tamper-proof device is the heart of the DriveSense system, equipped with state-of-the-art components to ensure accurate and reliable data collection.
                            </p>
                            <ul className="space-y-4">
                                <li className="flex items-center">
                                    <Cpu className="w-6 h-6 text-blue-500 mr-4" />
                                    <span className="text-gray-700 dark:text-gray-200">MPU sensors for precise motion detection</span>
                                </li>
                                <li className="flex items-center">
                                    <Wifi className="w-6 h-6 text-blue-500 mr-4" />
                                    <span className="text-gray-700 dark:text-gray-200">Integrated GPS and GSM modules for real-time tracking</span>
                                </li>
                                <li className="flex items-center">
                                    <Shield className="w-6 h-6 text-blue-500 mr-4" />
                                    <span className="text-gray-700 dark:text-gray-200">Tamper-proof design for data integrity</span>
                                </li>
                            </ul>
                        </div>
                        <div className="relative">
                            <img
                                src="https://images.pexels.com/photos/172074/pexels-photo-172074.jpeg"
                                alt="DriveSense Device Diagram"
                                className="rounded-lg shadow-lg"
                            />
                            <div className="absolute inset-0 bg-blue-500 opacity-10 rounded-lg"></div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="p-20 bg-gray-50 dark:bg-gray-900">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold text-center mb-12">AI & IoT-Driven Insights</h2>
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <div className="order-2 md:order-1">
                            <img
                                src="https://images.pexels.com/photos/57007/pexels-photo-57007.jpeg"
                                alt="AI Analysis Visualization"
                                className="rounded-lg shadow-lg"
                            />
                        </div>
                        <div className="order-1 md:order-2">
                            <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                                Our advanced AI algorithms analyze driver behavior and provide actionable insights to improve safety and efficiency.
                            </p>
                            <ul className="space-y-4">
                                <li className="flex items-center">
                                    <Brain className="w-6 h-6 text-green-500 mr-4" />
                                    <span className="text-gray-700 dark:text-gray-200">Analyze acceleration, braking, and maneuvering patterns</span>
                                </li>
                                <li className="flex items-center">
                                    <TrendingUp className="w-6 h-6 text-green-500 mr-4" />
                                    <span className="text-gray-700 dark:text-gray-200">Provide personalized recommendations for drivers</span>
                                </li>
                                <li className="flex items-center">
                                    <Zap className="w-6 h-6 text-green-500 mr-4" />
                                    <span className="text-gray-700 dark:text-gray-200">Seamless integration with ULIP APIs (VAHAN, SARATHI, FASTag)</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>
            <section className="p-20 bg-white dark:bg-gray-800">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold text-center mb-12">Real-Time Monitoring</h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="bg-blue-50 dark:bg-blue-900 p-6 rounded-lg shadow-md">
                            <Compass className="w-12 h-12 text-blue-500 mb-4 mx-auto" />
                            <h3 className="text-xl font-semibold text-center mb-2">Vehicle Orientation</h3>
                            <p className="text-gray-600 dark:text-gray-300 text-center">
                                Track the precise orientation and movement of your vehicles in real-time.
                            </p>
                        </div>
                        <div className="bg-green-50 dark:bg-green-900 p-6 rounded-lg shadow-md">
                            <Gauge className="w-12 h-12 text-green-500 mb-4 mx-auto" />
                            <h3 className="text-xl font-semibold text-center mb-2">Speed Monitoring</h3>
                            <p className="text-gray-600 dark:text-gray-300 text-center">
                                Keep track of vehicle speeds and receive alerts for speeding incidents.
                            </p>
                        </div>
                        <div className="bg-purple-50 dark:bg-purple-900 p-6 rounded-lg shadow-md">
                            <Road className="w-12 h-12 text-purple-500 mb-4 mx-auto" />
                            <h3 className="text-xl font-semibold text-center mb-2">Road Condition Analysis</h3>
                            <p className="text-gray-600 dark:text-gray-300 text-center">
                                Analyze road conditions to optimize routes and improve vehicle longevity.
                            </p>
                        </div>
                    </div>
                </div>
            </section>
            <section className="p-20 bg-gray-50 dark:bg-gray-900">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold text-center mb-12">Dashboard & Reporting</h2>
                    <Tabs defaultValue="dashboard" className="w-full max-w-4xl mx-auto">
                        <TabsList className="grid w-full grid-cols-3">
                            <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
                            <TabsTrigger value="reports">Reports</TabsTrigger>
                            <TabsTrigger value="alerts">Alerts</TabsTrigger>
                        </TabsList>
                        <TabsContent value="dashboard" className="mt-6">
                            <img
                                src="/dashboard.png"
                                alt="DriveSense Dashboard"
                                className="rounded-lg shadow-lg w-full"
                            />
                            <p className="mt-4 text-gray-600 dark:text-gray-300">
                                Our intuitive dashboard provides a comprehensive overview of your fleet&lsquo;s performance and key metrics at a glance.
                            </p>
                        </TabsContent>
                        <TabsContent value="reports" className="mt-6">
                            <div className="flex items-center mb-4">
                                <FileText className="w-8 h-8 text-blue-500 mr-4" />
                                <h3 className="text-xl font-semibold">Customizable Reports</h3>
                            </div>
                            <p className="text-gray-600 dark:text-gray-300">
                                Generate detailed, customizable reports on various aspects of your fleet&lsquo;s performance, including fuel efficiency, driver behavior, and maintenance schedules.
                            </p>
                        </TabsContent>
                        <TabsContent value="alerts" className="mt-6">
                            <div className="flex items-center mb-4">
                                <Bell className="w-8 h-8 text-red-500 mr-4" />
                                <h3 className="text-xl font-semibold">Real-Time Alerts</h3>
                            </div>
                            <p className="text-gray-600 dark:text-gray-300">
                                Set up custom alerts for critical events such as speeding, harsh braking, or unauthorized vehicle use. Receive notifications in real-time via email, SMS, or push notifications.
                            </p>
                        </TabsContent>
                    </Tabs>
                </div>
            </section>
            <section className="p-20 bg-white dark:bg-gray-800">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold text-center mb-12">Predictive Maintenance</h2>
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <div>
                            <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                                Leverage the power of data to predict and prevent vehicle breakdowns, optimizing your fleet&lsquo;s performance and reducing downtime.
                            </p>
                            <ul className="space-y-4">
                                <li className="flex items-center">
                                    <Tool className="w-6 h-6 text-orange-500 mr-4" />
                                    <span className="text-gray-700 dark:text-gray-200">Analyze driving patterns and vehicle performance data</span>
                                </li>
                                <li className="flex items-center">
                                    <Calendar className="w-6 h-6 text-orange-500 mr-4" />
                                    <span className="text-gray-700 dark:text-gray-200">Schedule maintenance based on actual vehicle usage</span>
                                </li>
                                <li className="flex items-center">
                                    <TrendingDown className="w-6 h-6 text-orange-500 mr-4" />
                                    <span className="text-gray-700 dark:text-gray-200">Reduce unexpected breakdowns and repair costs</span>
                                </li>
                            </ul>
                        </div>
                        <div className="relative">
                            <img
                                src="https://images.pexels.com/photos/373543/pexels-photo-373543.jpeg"
                                alt="Predictive Maintenance Visualization"
                                className="rounded-lg shadow-lg"
                            />
                            <div className="absolute inset-0 bg-orange-500 opacity-10 rounded-lg"></div>
                        </div>
                    </div>
                </div>
            </section>
            <Footer />
        </>
    );
}

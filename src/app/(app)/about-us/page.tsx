'use client';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Lightbulb, Target } from 'lucide-react';

export default function AboutUsPage() {
    return (
        <>
            <Header />
            <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
                <section className="relative py-20 overflow-hidden">
                    <div className="absolute inset-0 z-0">
                        <img
                            src="https://images.pexels.com/photos/1123972/pexels-photo-1123972.jpeg"
                            alt="Abstract background"
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-black opacity-50"></div>
                    </div>
                    <div className="container mx-auto px-4 relative z-10">
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white text-center mb-6">
                            About DriveSense
                        </h1>
                        <p className="text-xl text-gray-200 text-center max-w-3xl mx-auto">
                            Revolutionizing fleet management with cutting-edge technology and actionable insights
                        </p>
                    </div>
                </section>

                <section className="py-20 bg-white dark:bg-gray-800">
                    <div className="container mx-auto px-4">
                        <h2 className="text-3xl font-bold text-center mb-12">Our Vision and Mission</h2>
                        <div className="grid md:grid-cols-2 gap-12">
                            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-8 shadow-lg">
                                <div className="flex items-center mb-4">
                                    <Lightbulb className="w-8 h-8 text-blue-500 mr-4" />
                                    <h3 className="text-2xl font-semibold">Vision</h3>
                                </div>
                                <p className="text-gray-600 dark:text-gray-300">
                                    To create a safer, more efficient transport ecosystem through cutting-edge technology.
                                </p>
                            </div>
                            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-8 shadow-lg">
                                <div className="flex items-center mb-4">
                                    <Target className="w-8 h-8 text-green-500 mr-4" />
                                    <h3 className="text-2xl font-semibold">Mission</h3>
                                </div>
                                <p className="text-gray-600 dark:text-gray-300">
                                    To empower transport owners with actionable insights and build trust in fleet operations.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="py-20 bg-gray-50 dark:bg-gray-900">
                    <div className="container mx-auto px-4">
                        <h2 className="text-3xl font-bold text-center mb-12">Our Story</h2>
                        <div className="max-w-3xl mx-auto">
                            <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                                DriveSense was born out of a pressing need in the transport industry. Our founders, having worked extensively in fleet management, witnessed firsthand the challenges faced by transport owners and operators.
                            </p>
                            <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                                They saw how lack of real-time data, inefficient route planning, and poor vehicle maintenance led to increased costs, reduced safety, and lower customer satisfaction. This realization sparked the idea for DriveSense.
                            </p>
                            <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                                Our team of experienced engineers and industry experts came together with a shared vision: to revolutionize fleet management using cutting-edge technology. We developed advanced algorithms that could process vast amounts of data in real-time, providing fleet owners with actionable insights.
                            </p>
                            <p className="text-lg text-gray-600 dark:text-gray-300">
                                Today, DriveSense is at the forefront of the transport technology revolution. We&lsquo;re not just a software provider; we&lsquo;re a partner in our clients&lsquo; success. Our platform continues to evolve, incorporating the latest advancements in AI and machine learning to stay ahead of the curve and address the ever-changing needs of the transport industry.
                            </p>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
}

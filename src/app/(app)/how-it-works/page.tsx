'use client';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { PenToolIcon as Tool, Cpu, BarChart2, Smartphone} from 'lucide-react';

const steps = [
  {
    title: "Installation",
    description: "The DriveSense device is installed in your vehicles, connecting to the vehicle's systems.",
    icon: Tool,
  },
  {
    title: "Data Collection",
    description: "Sensors, GPS, and GSM modules collect real-time data on vehicle performance and driver behavior.",
    icon: Cpu,
  },
  {
    title: "AI Analysis",
    description: "Our advanced AI and IoT algorithms analyze the collected data in real-time.",
    icon: BarChart2,
  },
  {
    title: "Insights Delivery",
    description: "Actionable insights are delivered via our intuitive dashboard or mobile app.",
    icon: Smartphone,
  },
];

export default function CaseStudiesPage() {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <>
      <Header />
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 opacity-75"></div>
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white text-center mb-6">
            How DriveSense Works
          </h1>
          <p className="text-xl text-gray-200 text-center max-w-3xl mx-auto">
            Discover the innovative technology behind our fleet management solution and how it transforms your operations.
          </p>
        </div>
      </section>

      <section className="p-20 bg-white dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center text-gray-800 dark:text-white mb-12">The DriveSense Process</h2>
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="space-y-12">
              {steps.map((step, index) => (
                <div
                  key={index}
                  className={`flex items-start space-x-6 cursor-pointer transition-all duration-300 p-6 rounded-lg shadow-lg ${activeStep === index ? 'bg-blue-100 dark:bg-blue-600 transform scale-105' : 'bg-gray-100 dark:bg-gray-700'}`}
                  onClick={() => setActiveStep(index)}
                >
                  <div className={`p-4 rounded-full ${activeStep === index ? 'bg-blue-500 text-white' : 'bg-gray-300 dark:bg-gray-600'}`}>
                    <step.icon className="w-8 h-8" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-2xl font-semibold text-gray-800 dark:text-white">{step.title}</h3>
                    <p className="text-lg text-gray-600 dark:text-gray-300">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="relative h-full">
              <motion.div
                className="absolute inset-0 flex items-center justify-center p-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                key={activeStep}
              >
                <div className="text-center bg-blue-500 text-white p-8 rounded-lg shadow-lg">
                  <h3 className="text-3xl font-semibold mb-4">{steps[activeStep].title}</h3>
                  <p className="text-lg">{steps[activeStep].description}</p>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Data Flow Diagram</h2>
          <div className="relative max-w-4xl mx-auto">
            <img src="/flow.jpeg" alt="Flow" />
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}

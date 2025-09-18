'use client'

import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import ProblemVisionSection from '@/components/ProblemVisionSection';
import SolutionsSection from '@/components/SolutionsSection';
import { TestimonialSlider } from '@/components/ImpactSection';
import Footer from '@/components/Footer';
import { useState, useEffect } from 'react';

const Popup = () => {
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    // Show the popup after the component mounts
    setShowPopup(true);
  }, []);

  const handleClose = () => {
    setShowPopup(false);
  };

  return (
    showPopup && (
      <div className="fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
        <div className="bg-white p-6 rounded-lg shadow-lg text-center">
          <h2 className="text-xl font-semibold mb-4">Welcome!</h2>
          <p className="mb-4">Click the &quot;Get Started&quot; button to view the dashboard.</p>
          <button
            onClick={handleClose}
            className="bg-blue-500 text-white py-2 px-4 rounded-md"
          >
            Cancel
          </button>
        </div>
      </div>
    )
  );
};


export default function Home() {
  return (
    <>
      <Popup />
      <Header />
      <HeroSection />
      <ProblemVisionSection />
      <SolutionsSection />
      <TestimonialSlider />
      <Footer />
    </>
  );
}

import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import HeroSection from './components/HeroSection';
import TrustStrip from './components/TrustStrip';
import CareerJourneySection from './components/CareerJourneySection';
import FeaturedJobsSection from './components/FeaturedJobsSection';
import DarkResultsSection from './components/DarkResultsSection';
import SuccessStorySection from './components/SuccessStorySection';
import HowItWorksSection from './components/HowItWorksSection';
// import AIInterviewSection from './components/AIInterviewSection';
import CareerResourcesSection from './components/CareerResourcesSection';
import FinalCTASection from './components/FinalCTASection';

export default function Page() {
  return (
    <>
      <Header />
      <main id="main-content">
        {/* 01 Premium Hero */}
        <HeroSection />

        {/* 02 Trust Metrics + Employer Logos */}
        <TrustStrip />

        {/* 03 Interactive Career Journey */}
        <CareerJourneySection />

        {/* 04 Featured Matched Jobs */}
        <FeaturedJobsSection />

        {/* 05 Dark Proven Results */}
        <DarkResultsSection />

        {/* 06 Candidate Success Story */}
        <SuccessStorySection />

        {/* 07 How It Works */}
        <HowItWorksSection />

        {/* 08 AI Interview Preparation */}
        {/* <AIInterviewSection /> */}

        {/* 09 Career Resources */}
        <CareerResourcesSection />

        {/* 10 Final Cinematic CTA */}
        <FinalCTASection />
      </main>
      <Footer />
    </>
  );
}
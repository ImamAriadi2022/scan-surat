import React from 'react';
import LandingNavbar from '../components/Navbar';
import Hero from '../components/Hero';
import Tutor from '../components/Tutor';
import Tentang from '../components/Tentang';
import Kontak from '../components/Kontak';
import Fitur from '../components/Fitur';
import Footer from '../components/Footer';

function LandingPage() {
  return (
    <>
      {/* Navbar */}
      <LandingNavbar />

      {/* Hero Section */}
      <Hero />

      {/* Tutor Section */}
      <Tutor />

      {/* Fitur Section */}
      <Fitur /> 

      {/* Tentang Kami Section */}
      <Tentang />

      {/* Kontak Section */}
      <Kontak />

      {/* Footer */}
      <Footer />
    </>
  );
}

export default LandingPage;
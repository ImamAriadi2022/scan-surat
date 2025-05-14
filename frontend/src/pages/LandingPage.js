import React from 'react';
import LandingNavbar from '../components/Navbar';
import Hero from '../components/Hero';
import Tutor from '../components/Tutor';
import Tentang from '../components/Tentang';
import Kontak from '../components/Kontak';
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
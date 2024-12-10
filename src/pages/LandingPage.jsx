import React from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";

function LandingPage() {
  return (
    <>
      <Helmet>
        <title>Cool Tools - Your PWA Toolkit</title>
        <meta name="description" content="Access powerful Progressive Web Applications like QR code creator and unit converter with Cool Tools." />
      </Helmet>
      <div className="flex flex-col items-center">
        <section className="text-center py-20 bg-gray-100 w-full">
          <h1 className="text-4xl font-bold mb-4">Welcome to Cool Tools</h1>
          <p className="text-xl mb-8">Your one-stop platform for powerful Progressive Web Applications</p>
          <Link to="/signup" className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors">
            Get Started
          </Link>
        </section>
        <section className="py-16 w-full max-w-4xl">
          <h2 className="text-3xl font-bold mb-8 text-center">Our Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-2">QR Code Creator</h3>
              <p>Generate custom QR codes for your business or personal use.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-2">Unit Converter</h3>
              <p>Convert between various units of measurement with ease.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-2">Prompts Generator</h3>
              <p>Generate effective prompts for AI interactions.</p>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

export default LandingPage;

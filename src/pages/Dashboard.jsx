import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

function Dashboard() {
  const { currentUser } = useAuth();

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Welcome, {currentUser.email}</h1>
      <p className="mb-4">Access your Cool Tools apps below:</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Link
          to="/qr-code-creator"
          className="flex flex-col items-center p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
        >
          <h3 className="text-xl font-semibold mb-2">QR Code Creator</h3>
          <p className="text-gray-600">Generate custom QR codes</p>
        </Link>
        <Link
          to="/unit-converter"
          className="flex flex-col items-center p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
        >
          <h3 className="text-xl font-semibold mb-2">Unit Converter</h3>
          <p className="text-gray-600">Convert between various units</p>
        </Link>
        <Link
          to="/prompts-generator"
          className="flex flex-col items-center p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
        >
          <h3 className="text-xl font-semibold mb-2">Prompts Generator</h3>
          <p className="text-gray-600">Generate AI prompts</p>
        </Link>
      </div>
    </div>
  );
}

export default Dashboard;

"use client";

import { useState } from "react";
import TrackingSearch from "@/components/TrackingSearch";
import TrackingResults from "@/components/TrackingResults";

export default function Home() {
  const [trackingNumber, setTrackingNumber] = useState<string>("");
  const [searchedNumber, setSearchedNumber] = useState<string>("");

  const handleSearch = (number: string) => {
    setSearchedNumber(number);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Package Tracking
              </h1>
              <p className="mt-1 text-sm text-gray-600">
                Track your shipments in real-time
              </p>
            </div>
            <div className="hidden sm:block">
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-500">
                  Tracking made simple
                </span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Where is your package?
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Enter your tracking number below to get real-time updates on your shipment
          </p>
        </div>

        {/* Search Component */}
        <TrackingSearch
          trackingNumber={trackingNumber}
          setTrackingNumber={setTrackingNumber}
          onSearch={handleSearch}
        />

        {/* Results Component */}
        {searchedNumber && (
          <TrackingResults trackingNumber={searchedNumber} />
        )}

        {/* Features Section */}
        {!searchedNumber && (
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl">📦</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Real-Time Tracking
              </h3>
              <p className="text-gray-600">
                Get instant updates on your package location and delivery status
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl">🚚</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Multiple Carriers
              </h3>
              <p className="text-gray-600">
                Track packages from various shipping carriers in one place
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl">🔔</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Delivery Alerts
              </h3>
              <p className="text-gray-600">
                Receive notifications about important delivery milestones
              </p>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-gray-600">
            <p className="text-sm">
              © 2025 Package Tracking System. All rights reserved.
            </p>
            <p className="text-xs mt-2">
              Track your packages with confidence
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

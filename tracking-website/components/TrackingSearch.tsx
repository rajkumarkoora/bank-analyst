"use client";

import { useState } from "react";

interface TrackingSearchProps {
  trackingNumber: string;
  setTrackingNumber: (value: string) => void;
  onSearch: (number: string) => void;
}

export default function TrackingSearch({
  trackingNumber,
  setTrackingNumber,
  onSearch,
}: TrackingSearchProps) {
  const [error, setError] = useState<string>("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!trackingNumber.trim()) {
      setError("Please enter a tracking number");
      return;
    }

    if (trackingNumber.trim().length < 5) {
      setError("Tracking number must be at least 5 characters");
      return;
    }

    setError("");
    onSearch(trackingNumber.trim());
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTrackingNumber(e.target.value);
    if (error) setError("");
  };

  return (
    <div className="max-w-3xl mx-auto">
      <form onSubmit={handleSubmit} className="relative">
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-200">
          <label
            htmlFor="tracking-input"
            className="block text-sm font-medium text-gray-700 mb-3"
          >
            Tracking Number
          </label>
          <div className="flex flex-col sm:flex-row gap-3">
            <input
              id="tracking-input"
              type="text"
              value={trackingNumber}
              onChange={handleInputChange}
              placeholder="Enter tracking number (e.g., TRK123456789)"
              className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-gray-900 placeholder-gray-400"
            />
            <button
              type="submit"
              className="px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 transition-all shadow-md hover:shadow-lg"
            >
              Track Package
            </button>
          </div>
          {error && (
            <p className="mt-3 text-sm text-red-600 flex items-center gap-2">
              <span className="text-lg">⚠️</span>
              {error}
            </p>
          )}
          <div className="mt-4 flex flex-wrap gap-2">
            <span className="text-xs text-gray-500">Try sample:</span>
            {["TRK123456789", "PKG987654321", "SHP555666777"].map((sample) => (
              <button
                key={sample}
                type="button"
                onClick={() => {
                  setTrackingNumber(sample);
                  setError("");
                }}
                className="text-xs px-3 py-1 bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200 transition-colors"
              >
                {sample}
              </button>
            ))}
          </div>
        </div>
      </form>
    </div>
  );
}

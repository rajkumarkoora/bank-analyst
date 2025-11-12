"use client";

import { useEffect, useState } from "react";

interface TrackingEvent {
  date: string;
  time: string;
  location: string;
  status: string;
  description: string;
}

interface TrackingData {
  trackingNumber: string;
  carrier: string;
  status: string;
  estimatedDelivery: string;
  currentLocation: string;
  deliveredDate?: string;
  deliveredTime?: string;
  events: TrackingEvent[];
}

interface TrackingResultsProps {
  trackingNumber: string;
}

export default function TrackingResults({ trackingNumber }: TrackingResultsProps) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>("");
  const [data, setData] = useState<TrackingData | null>(null);

  useEffect(() => {
    const fetchTrackingData = async () => {
      setLoading(true);
      setError("");
      
      try {
        const response = await fetch(`/api/track?number=${encodeURIComponent(trackingNumber)}`);
        
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || "Failed to fetch tracking data");
        }
        
        const trackingData = await response.json();
        setData(trackingData);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchTrackingData();
  }, [trackingNumber]);

  if (loading) {
    return (
      <div className="mt-8 max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-200">
          <div className="flex items-center justify-center space-x-3">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            <span className="text-gray-600">Loading tracking information...</span>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mt-8 max-w-4xl mx-auto">
        <div className="bg-red-50 rounded-2xl shadow-xl p-8 border border-red-200">
          <div className="flex items-start space-x-3">
            <span className="text-3xl">❌</span>
            <div>
              <h3 className="text-lg font-semibold text-red-900 mb-1">
                Tracking Not Found
              </h3>
              <p className="text-red-700">{error}</p>
              <p className="text-sm text-red-600 mt-2">
                Please verify your tracking number and try again.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!data) return null;

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "delivered":
        return "bg-green-100 text-green-800 border-green-300";
      case "out for delivery":
        return "bg-blue-100 text-blue-800 border-blue-300";
      case "in transit":
        return "bg-yellow-100 text-yellow-800 border-yellow-300";
      case "picked up":
        return "bg-purple-100 text-purple-800 border-purple-300";
      default:
        return "bg-gray-100 text-gray-800 border-gray-300";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case "delivered":
        return "✅";
      case "out for delivery":
        return "🚚";
      case "in transit":
        return "📦";
      case "picked up":
        return "📤";
      case "processed":
        return "⚙️";
      case "order created":
        return "📝";
      default:
        return "📍";
    }
  };

  return (
    <div className="mt-8 max-w-4xl mx-auto space-y-6">
      {/* Status Card */}
      <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-200">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Tracking Details
            </h2>
            <p className="text-sm text-gray-600">
              Tracking Number: <span className="font-mono font-semibold text-gray-900">{data.trackingNumber}</span>
            </p>
          </div>
          <div className={`inline-flex items-center px-4 py-2 rounded-full border-2 font-semibold ${getStatusColor(data.status)}`}>
            <span className="mr-2 text-xl">{getStatusIcon(data.status)}</span>
            {data.status}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gray-50 rounded-lg p-4">
            <p className="text-sm text-gray-600 mb-1">Carrier</p>
            <p className="font-semibold text-gray-900">{data.carrier}</p>
          </div>
          <div className="bg-gray-50 rounded-lg p-4">
            <p className="text-sm text-gray-600 mb-1">Current Location</p>
            <p className="font-semibold text-gray-900">{data.currentLocation}</p>
          </div>
          <div className="bg-gray-50 rounded-lg p-4">
            <p className="text-sm text-gray-600 mb-1">
              {data.status.toLowerCase() === "delivered" ? "Delivered On" : "Estimated Delivery"}
            </p>
            <p className="font-semibold text-gray-900">
              {data.status.toLowerCase() === "delivered" && data.deliveredDate
                ? `${data.deliveredDate} at ${data.deliveredTime}`
                : data.estimatedDelivery}
            </p>
          </div>
        </div>
      </div>

      {/* Timeline Card */}
      <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-200">
        <h3 className="text-xl font-bold text-gray-900 mb-6">Tracking History</h3>
        
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gray-200"></div>
          
          {/* Events */}
          <div className="space-y-6">
            {data.events.map((event, index) => (
              <div key={index} className="relative flex gap-4">
                {/* Timeline dot */}
                <div className="relative z-10 flex-shrink-0">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center text-xl ${
                    index === 0 
                      ? "bg-blue-600 ring-4 ring-blue-100" 
                      : "bg-gray-200"
                  }`}>
                    {getStatusIcon(event.status)}
                  </div>
                </div>
                
                {/* Event content */}
                <div className="flex-1 bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition-colors">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-2">
                    <h4 className="font-semibold text-gray-900">{event.status}</h4>
                    <span className="text-sm text-gray-600">
                      {event.date} at {event.time}
                    </span>
                  </div>
                  <p className="text-sm text-gray-700 mb-1">{event.description}</p>
                  <p className="text-xs text-gray-500 flex items-center gap-1">
                    <span>📍</span>
                    {event.location}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Additional Info */}
      {data.status.toLowerCase() === "delivered" && (
        <div className="bg-green-50 rounded-2xl shadow-xl p-6 border border-green-200">
          <div className="flex items-start gap-3">
            <span className="text-3xl">🎉</span>
            <div>
              <h4 className="font-semibold text-green-900 mb-1">
                Package Delivered Successfully!
              </h4>
              <p className="text-sm text-green-700">
                Your package was delivered on {data.deliveredDate} at {data.deliveredTime}.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

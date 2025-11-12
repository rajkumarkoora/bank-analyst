import { NextRequest, NextResponse } from "next/server";

// Mock tracking data
const trackingDatabase: Record<string, any> = {
  TRK123456789: {
    trackingNumber: "TRK123456789",
    carrier: "Express Shipping",
    status: "In Transit",
    estimatedDelivery: "2025-11-15",
    currentLocation: "Distribution Center - New York, NY",
    events: [
      {
        date: "2025-11-12",
        time: "14:30",
        location: "Distribution Center - New York, NY",
        status: "In Transit",
        description: "Package is on the way to the next facility",
      },
      {
        date: "2025-11-11",
        time: "09:15",
        location: "Sorting Facility - Philadelphia, PA",
        status: "Processed",
        description: "Package processed at sorting facility",
      },
      {
        date: "2025-11-10",
        time: "16:45",
        location: "Origin Facility - Boston, MA",
        status: "Picked Up",
        description: "Package picked up by carrier",
      },
      {
        date: "2025-11-10",
        time: "08:00",
        location: "Sender Location - Boston, MA",
        status: "Order Created",
        description: "Shipping label created",
      },
    ],
  },
  PKG987654321: {
    trackingNumber: "PKG987654321",
    carrier: "Global Logistics",
    status: "Out for Delivery",
    estimatedDelivery: "2025-11-12",
    currentLocation: "Local Delivery Hub - Los Angeles, CA",
    events: [
      {
        date: "2025-11-12",
        time: "08:00",
        location: "Local Delivery Hub - Los Angeles, CA",
        status: "Out for Delivery",
        description: "Package is out for delivery",
      },
      {
        date: "2025-11-11",
        time: "22:30",
        location: "Distribution Center - Los Angeles, CA",
        status: "Arrived at Facility",
        description: "Package arrived at local facility",
      },
      {
        date: "2025-11-11",
        time: "05:20",
        location: "Sorting Hub - Phoenix, AZ",
        status: "In Transit",
        description: "Package in transit to destination",
      },
      {
        date: "2025-11-09",
        time: "14:00",
        location: "Origin - San Francisco, CA",
        status: "Picked Up",
        description: "Package picked up from sender",
      },
    ],
  },
  SHP555666777: {
    trackingNumber: "SHP555666777",
    carrier: "Fast Track Delivery",
    status: "Delivered",
    estimatedDelivery: "2025-11-10",
    currentLocation: "Delivered - Chicago, IL",
    deliveredDate: "2025-11-10",
    deliveredTime: "15:30",
    events: [
      {
        date: "2025-11-10",
        time: "15:30",
        location: "Recipient Address - Chicago, IL",
        status: "Delivered",
        description: "Package delivered successfully. Signed by: John Doe",
      },
      {
        date: "2025-11-10",
        time: "09:00",
        location: "Local Hub - Chicago, IL",
        status: "Out for Delivery",
        description: "Package out for delivery",
      },
      {
        date: "2025-11-09",
        time: "18:45",
        location: "Distribution Center - Chicago, IL",
        status: "Arrived",
        description: "Package arrived at destination facility",
      },
      {
        date: "2025-11-08",
        time: "12:00",
        location: "Origin - Detroit, MI",
        status: "Shipped",
        description: "Package shipped from origin",
      },
    ],
  },
};

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const trackingNumber = searchParams.get("number");

  if (!trackingNumber) {
    return NextResponse.json(
      { error: "Tracking number is required" },
      { status: 400 }
    );
  }

  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500));

  const trackingInfo = trackingDatabase[trackingNumber];

  if (!trackingInfo) {
    return NextResponse.json(
      {
        error: "Tracking number not found",
        message: "Please check your tracking number and try again",
      },
      { status: 404 }
    );
  }

  return NextResponse.json(trackingInfo);
}

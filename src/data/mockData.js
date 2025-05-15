// Available car types
export const carTypes = [
  { id: 1, name: "Sedan", image: "🚗" },
  { id: 2, name: "SUV", image: "🚙" },
  { id: 3, name: "Truck", image: "🚚" },
  { id: 4, name: "Convertible", image: "🏎️" },
  { id: 5, name: "Van", image: "🚐" },
];

// Repair services offered at the stations
export const repairServices = [
  { id: 1, name: "Oil Change", duration: 30, price: 50 },
  { id: 2, name: "Tire Rotation", duration: 45, price: 40 },
  { id: 3, name: "Brake Service", duration: 90, price: 120 },
  { id: 4, name: "Engine Tune-up", duration: 120, price: 180 },
  { id: 5, name: "Air Conditioning", duration: 60, price: 100 },
  { id: 6, name: "Electrical System", duration: 75, price: 150 },
  { id: 7, name: "Transmission Service", duration: 120, price: 200 },
];

// Repair stations, each offering various services and types of cars
export const repairStations = [
  {
    id: 1,
    name: "Downtown Auto Care",
    address: "123 Main St, City Center",
    distance: 1.2,
    rating: 4.7,
    services: [1, 2, 3, 5],
    carTypes: [1, 2, 4, 5],
  },
  {
    id: 2,
    name: "Highway Mechanics",
    address: "456 Broadway Ave, West End",
    distance: 2.5,
    rating: 4.9,
    services: [1, 2, 3, 4, 6, 7],
    carTypes: [1, 2, 3, 4, 5],
  },
  {
    id: 3,
    name: "Premium Car Repair",
    address: "789 Elite Blvd, Uptown",
    distance: 3.1,
    rating: 4.8,
    services: [1, 2, 3, 4, 5, 6, 7],
    carTypes: [1, 2, 4],
  },
  {
    id: 4,
    name: "Budget Fixes",
    address: "101 Economy Rd, Southside",
    distance: 4.0,
    rating: 4.2,
    services: [1, 2, 5],
    carTypes: [1, 2, 3, 5],
  },
  {
    id: 5,
    name: "Truck & SUV Specialists",
    address: "202 Heavy Duty Lane, Industrial District",
    distance: 5.3,
    rating: 4.6,
    services: [1, 2, 3, 4, 7],
    carTypes: [2, 3, 5],
  },
];

// Function to generate time slots based on the station ID
export const generateTimeSlots = (stationId) => {
  const slots = [];

  // Create time slots from 8 AM to 5 PM
  const startHour = 8;
  const endHour = 17;

  // Use the stationId as a "seed" for slot availability randomness
  for (let hour = startHour; hour < endHour; hour++) {
    // Add full hour slots (avoiding certain slots for randomness)
    if ((stationId + hour) % 3 !== 0) {
      slots.push({
        id: `${stationId}-${hour}-00`,
        time: `${hour}:00`,
        available: true,
      });
    }

    // Add half-hour slots (with more randomness)
    if ((stationId + hour) % 2 === 0) {
      slots.push({
        id: `${stationId}-${hour}-30`,
        time: `${hour}:30`,
        available: true,
      });
    }
  }

  return slots;
};

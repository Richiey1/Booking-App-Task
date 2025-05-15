import { carTypes, repairServices, repairStations, generateTimeSlots } from '../data/mockData';  // Replace with actual data sources

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const fetchCarTypes = async () => {
  await delay(500);
  return carTypes;
};

export const fetchRepairServices = async () => {
  await delay(700);
  return repairServices;
};

export const fetchEligibleStations = async (carTypeId, serviceId) => {
  await delay(1000);
  if (!carTypeId || !serviceId) {
    return [];
  }
  
  return repairStations.filter(station => {
    return station.carTypes.includes(carTypeId) && station.services.includes(serviceId);
  });
};

export const fetchTimeSlots = async (stationId, serviceId, date) => {
  await delay(800);
  if (!stationId || !serviceId) {
    return [];
  }
  
  return generateTimeSlots(stationId, serviceId, date);
};

export const bookAppointment = async (bookingDetails) => {
  await delay(1200);
  return {
    success: true,
    bookingId: `BKG-${Math.floor(Math.random() * 10000)}`,
    ...bookingDetails
  };
};

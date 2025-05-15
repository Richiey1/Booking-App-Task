import React, { useState } from "react";
import { useBookingState } from "../src/hooks/useBookingState";
import { bookAppointment } from "../src/api/bookingService";
import CarTypeSelector from "./components/carTypeSelector";
import ServiceSelector from "../src/components/ServiceSelector";
import StationList from "../src/components/StationList";
import TimeSlotPicker from "../src/components/TimeSlotPicker";
import BookingSuccess from "../src/components/BookingSuccess";
import ThemeToggle from "../src/components/ThemeToggle";
import { fetchCarTypes, fetchRepairServices } from "../src/api/bookingService";



function App() {
  const {
    state,
    setCarType,
    setService,
    setStation,
    setDate,
    setTimeSlot,
    setLoading,
    setData,
    setBookingSuccess,
    reset,
  } = useBookingState();

  const [bookingError, setBookingError] = useState(null);

  const handleBookNow = async () => {
    if (!state.carType || !state.service || !state.station || !state.timeSlot) {
      setBookingError("Please complete all selections before booking");
      return;
    }

    setBookingError(null);
    setLoading("booking", true);

    try {
      const selectedCar = state.data.carTypes.find((car) => car.id === state.carType);
      const selectedService = state.data.services.find((service) => service.id === state.service);
      const selectedStation = state.data.stations.find((station) => station.id === state.station);
      const selectedTimeSlot = state.data.timeSlots.find((slot) => slot.id === state.timeSlot);

      const bookingDetails = {
        carType: selectedCar?.name,
        carTypeId: state.carType,
        serviceId: state.service,
        serviceName: selectedService?.name,
        stationId: state.station,
        stationName: selectedStation?.name,
        date: state.date,
        timeSlotId: state.timeSlot,
        time: selectedTimeSlot?.time,
      };

      const result = await bookAppointment(bookingDetails);
      setBookingSuccess(result);
    } catch (error) {
      console.error("Booking failed:", error);
      setBookingError("Failed to book appointment. Please try again.");
    } finally {
      setLoading("booking", false);
    }
  };

  const handleCloseBookingSuccess = async () => {
  setBookingSuccess(null);
  reset();

  // Reload car types and services (optional but recommended)
  try {
    setLoading("carTypes", true);
    setLoading("services", true);

    const [carTypeData, serviceData] = await Promise.all([
      fetchCarTypes(),
      fetchRepairServices()
    ]);

    setData("carTypes", carTypeData);
    setData("services", serviceData);
  } catch (error) {
    console.error("Error reloading initial data:", error);
  } finally {
    setLoading("carTypes", false);
    setLoading("services", false);
  }
};

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-12 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
      <ThemeToggle />
      <div className="max-w-5xl mx-auto">
        <header className="mb-10 text-center">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 dark:text-white tracking-tight">
            Balanceè Repair Booking
          </h1>
          <p className="mt-3 text-base sm:text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Find and book the perfect repair service for your vehicle
          </p>
        </header>

        <div className="bg-white/80 dark:bg-gray-800/70 backdrop-blur-md shadow-xl rounded-2xl p-8 ring-1 ring-gray-200 dark:ring-gray-700 transition-all duration-300">
          <CarTypeSelector
            state={state}
            setCarType={setCarType}
            setLoading={setLoading}
            setData={setData}
          />

          <ServiceSelector
            state={state}
            setService={setService}
            setLoading={setLoading}
            setData={setData}
          />

          <StationList
            state={state}
            setStation={setStation}
            setLoading={setLoading}
            setData={setData}
          />

          <TimeSlotPicker
            state={state}
            setTimeSlot={setTimeSlot}
            setDate={setDate}
            setLoading={setLoading}
            setData={setData}
          />

          {bookingError && (
            <div className="bg-red-100 dark:bg-red-400/20 border border-red-300 dark:border-red-500 text-red-800 dark:text-red-300 px-4 py-3 rounded-lg shadow-sm mb-4 text-sm font-medium">
              {bookingError}
            </div>
          )}

          <div className="mt-6">
            <button
              onClick={handleBookNow}
              disabled={
                !state.carType || !state.service || !state.station || !state.timeSlot || state.loading.booking
              }
              className={`w-full py-3 rounded-xl font-semibold shadow-lg transition-all duration-200 transform ${
                !state.carType ||
                !state.service ||
                !state.station ||
                !state.timeSlot
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed dark:bg-gray-600 dark:text-gray-400"
                  : "bg-gradient-to-r from-blue-600 to-indigo-600 hover:scale-105 hover:shadow-2xl text-white"
              } flex items-center justify-center`}
            >
              {state.loading.booking ? (
                <>
                  <svg
                    className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Processing...
                </>
              ) : (
                "Book Now"
              )}
            </button>
          </div>
        </div>

        <BookingSuccess
          booking={state.bookingSuccess}
          onClose={handleCloseBookingSuccess}
        />

        <footer className="mt-10 text-center text-sm text-gray-500 dark:text-gray-400">
          © {new Date().getFullYear()} Balanceè Technologies. All rights reserved.
        </footer>
      </div>
    </div>
  );
}

export default App;

import React, { useEffect } from "react";
import { fetchTimeSlots } from "../api/bookingService";

const TimeSlotPicker = ({
  state,
  setTimeSlot,
  setDate,
  setLoading,
  setData,
}) => {
  useEffect(() => {
    const loadTimeSlots = async () => {
      if (state.station && state.service && state.date) {
        setLoading("timeSlots", true);
        try {
          const data = await fetchTimeSlots(
            state.station,
            state.service,
            state.date
          );
          setData("timeSlots", data);
        } catch (error) {
          console.error("Failed to load time slots:", error);
        } finally {
          setLoading("timeSlots", false);
        }
      }
    };

    loadTimeSlots();
  }, [state.station, state.service, state.date, setLoading, setData]);

  const timeSlots = state?.data?.timeSlots || [];
  const isLoading = state.loading.timeSlots;

  if (!state.station) return null;

  return (
    <div className="mb-6">
      <h2 className="text-lg font-semibold mb-2 text-gray-800 dark:text-gray-100">
        Select Date & Time
      </h2>

      {/* Date Picker */}
      <div className="mb-4">
        <label
          htmlFor="date"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
        >
          Date
        </label>
        <input
          type="date"
          id="date"
          className="w-full p-2 border rounded-md bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100"
          value={state.date}
          min={new Date().toISOString().split("T")[0]}
          onChange={(e) => setDate(e.target.value)}
        />
      </div>

      {/* Loading state */}
      {isLoading ? (
        <div className="animate-pulse space-y-2">
          <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded"></div>
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2">
            {[...Array(6)].map((_, index) => (
              <div
                key={index}
                className="h-10 bg-gray-200 dark:bg-gray-700 rounded"
              />
            ))}
          </div>
        </div>
      ) : timeSlots.length === 0 ? (
        <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-6 text-center">
          <p className="text-gray-600 dark:text-gray-300">
            No time slots available for the selected date.
          </p>
        </div>
      ) : (
        <>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Available Time Slots
          </label>
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2">
            {timeSlots.map((slot) => (
              <button
                key={slot.id}
                onClick={() => setTimeSlot(slot.id)}
                className={`py-2 px-3 text-sm font-medium rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-offset-1 ${
                  state.timeSlot === slot.id
                    ? "bg-blue-600 text-white shadow"
                    : "bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600"
                }`}
              >
                {slot.time}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default TimeSlotPicker;

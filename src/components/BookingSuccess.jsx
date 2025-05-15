import React from "react";

const BookingSuccess = ({ booking, onClose }) => {
  if (!booking) return null;

  const station = booking.stationName;
  const service = booking.serviceName;
  const date = new Date(booking.date).toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const time = booking.time;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4"
      role="dialog"
      aria-labelledby="booking-success-title"
      aria-describedby="booking-success-description"
    >
      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl p-6 w-full max-w-md animate-fade-in-up transition-all">
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full mb-4 shadow-inner">
            <svg
              className="w-8 h-8 text-green-600 dark:text-green-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 13l4 4L19 7"
              ></path>
            </svg>
          </div>
          <h2
            id="booking-success-title"
            className="text-2xl font-bold text-gray-800 dark:text-white mb-1"
          >
            Booking Confirmed!
          </h2>
          <p
            id="booking-success-description"
            className="text-sm text-gray-500 dark:text-gray-400"
          >
            Booking ID: {booking.bookingId}
          </p>
        </div>

        <div className="mb-6 bg-gray-50 dark:bg-gray-800 p-4 rounded-xl border border-gray-200 dark:border-gray-700">
          <div className="grid grid-cols-2 gap-y-3 text-sm">
            <div className="text-gray-500 dark:text-gray-400">Service:</div>
            <div className="font-medium text-gray-900 dark:text-white">{service}</div>

            <div className="text-gray-500 dark:text-gray-400">Location:</div>
            <div className="font-medium text-gray-900 dark:text-white">{station}</div>

            <div className="text-gray-500 dark:text-gray-400">Date:</div>
            <div className="font-medium text-gray-900 dark:text-white">{date}</div>

            <div className="text-gray-500 dark:text-gray-400">Time:</div>
            <div className="font-medium text-gray-900 dark:text-white">{time}</div>
          </div>
        </div>

        <div className="text-center">
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold transition-colors shadow-lg hover:shadow-xl"
            aria-label="Close booking confirmation"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookingSuccess;

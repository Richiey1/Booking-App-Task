import React, { useEffect } from "react";
import { fetchRepairServices } from "../api/bookingService";

const ServiceSelector = ({ state, setService, setLoading, setData }) => {
  useEffect(() => {
    const loadServices = async () => {
      setLoading("services", true);
      try {
        const data = await fetchRepairServices();
        setData("services", data);
      } catch (error) {
        console.error("Failed to load services:", error);
      } finally {
        setLoading("services", false);
      }
    };

    loadServices();
  }, [setLoading, setData]);

  const { services } = state.data;
  const selectedService = state.service;
  const isLoading = state.loading.services;

  const isCarTypeSelected = !!state.carType;

  return (
    <div className="mb-8">
      <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
        Select Repair Service
      </h2>

      {/* Car type not selected yet */}
      {!isCarTypeSelected && !isLoading && (
        <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-6 text-center text-gray-600 dark:text-gray-300 shadow-sm">
          Please select a car type to view available services.
        </div>
      )}

      {/* Loading state */}
      {isLoading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {[...Array(6)].map((_, index) => (
            <div
              key={index}
              className="animate-pulse bg-gray-200 dark:bg-gray-700 rounded-xl p-4 h-24"
            ></div>
          ))}
        </div>
      )}

      {/* Services List */}
      {!isLoading && isCarTypeSelected && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {services.map((service) => (
            <div
              key={service.id}
              onClick={() => setService(service.id)}
              className={`cursor-pointer rounded-2xl border shadow-sm transition-all duration-200 p-4 ${
                selectedService === service.id
                  ? "border-blue-600 bg-blue-50 dark:bg-blue-950 dark:border-blue-400"
                  : "border-gray-200 dark:border-gray-700 hover:border-blue-400 dark:hover:border-blue-500"
              }`}
            >
              <div className="text-lg font-semibold text-gray-800 dark:text-white mb-1">
                {service.name}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Duration: {service.duration} min
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Price: ${service.price}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Reminder to select a service */}
      {!selectedService && isCarTypeSelected && !isLoading && services.length > 0 && (
        <p className="text-sm text-orange-600 dark:text-orange-400 mt-3">
          Please select a service to continue.
        </p>
      )}
    </div>
  );
};

export default ServiceSelector;

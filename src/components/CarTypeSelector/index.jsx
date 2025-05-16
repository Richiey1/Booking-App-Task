import React, { useEffect } from "react";
import { fetchCarTypes } from "../../api/bookingService";

const CarTypeSelector = ({ state, setCarType, setLoading, setData }) => {
  useEffect(() => {
    const loadCarTypes = async () => {
      setLoading("carTypes", true);
      try {
        const data = await fetchCarTypes();
        setData("carTypes", data);
      } catch (error) {
        console.error("Failed to load car types:", error);
      } finally {
        setLoading("carTypes", false);
      }
    };

    loadCarTypes();
  }, [setLoading, setData]);

  const { carTypes } = state.data;
  const selectedCarType = state.carType;

  return (
    <div className="mb-8">
      <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
        Select Your Car Type
      </h2>

      {state.loading.carTypes ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
          {[...Array(5)].map((_, index) => (
            <div
              key={index}
              className="animate-pulse bg-gray-200 dark:bg-gray-700 rounded-xl h-28 flex items-center justify-center"
            >
              <div className="w-16 h-6 bg-gray-300 dark:bg-gray-600 rounded" />
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
          {carTypes.map((car) => (
            <div
              key={car.id}
              onClick={() => setCarType(car.id)}
              className={`cursor-pointer rounded-2xl p-4 border shadow-sm transition-all duration-200 flex flex-col items-center justify-center text-center ${
                selectedCarType === car.id
                  ? "border-blue-600 bg-blue-50 dark:bg-blue-950 dark:border-blue-400"
                  : "border-gray-200 dark:border-gray-700 hover:border-blue-400 dark:hover:border-blue-500"
              }`}
            >
              <div className="text-4xl mb-2">{car.image}</div>
              <div className="font-medium text-gray-800 dark:text-white">{car.name}</div>
            </div>
          ))}
        </div>
      )}

      {!selectedCarType && carTypes.length > 0 && !state.loading.carTypes && (
        <p className="text-sm text-orange-600 dark:text-orange-400 mt-3">
          Please select a car type to continue.
        </p>
      )}
    </div>
  );
};

export default CarTypeSelector;

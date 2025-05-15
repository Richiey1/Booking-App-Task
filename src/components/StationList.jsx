import React, { useEffect } from "react";
import { fetchEligibleStations } from "../api/bookingService";

const StationList = ({ state, setStation, setLoading, setData }) => {
  useEffect(() => {
    const loadStations = async () => {
      if (state.carType && state.service) {
        setLoading("stations", true);
        try {
          const data = await fetchEligibleStations(state.carType, state.service);
          setData("stations", data);
        } catch (error) {
          console.error("Failed to load stations:", error);
        } finally {
          setLoading("stations", false);
        }
      }
    };

    loadStations();
  }, [state.carType, state.service, setLoading, setData]);

  const { stations } = state.data;
  const isLoading = state.loading.stations;
  const selectedStation = state.station;

  if (!state.carType || !state.service) return null;

  return (
    <div className="mb-10">
      <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
        Available Repair Stations
      </h2>

      {/* Loading Skeleton */}
      {isLoading && (
        <div className="space-y-4">
          {[...Array(3)].map((_, index) => (
            <div
              key={index}
              className="animate-pulse bg-gray-200 dark:bg-gray-700 rounded-xl h-28 w-full"
            />
          ))}
        </div>
      )}

      {/* No stations */}
      {!isLoading && stations.length === 0 && (
        <div className="bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 p-6 rounded-xl text-center shadow">
          No stations available for the selected car type and service.
        </div>
      )}

      {/* Station cards */}
      {!isLoading && stations.length > 0 && (
        <div className="space-y-4">
          {stations.map((station) => (
            <div
              key={station.id}
              onClick={() => setStation(station.id)}
              className={`cursor-pointer rounded-2xl border p-4 transition-all shadow-sm duration-200 ${
                selectedStation === station.id
                  ? "border-blue-600 bg-blue-50 dark:bg-blue-950 dark:border-blue-400"
                  : "border-gray-200 dark:border-gray-700 hover:border-blue-400 dark:hover:border-blue-500"
              }`}
            >
              <div className="flex justify-between items-start gap-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                    {station.name}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    {station.address}
                  </p>
                </div>
                <div className="text-right">
                  <div className="bg-blue-100 dark:bg-blue-800 text-blue-800 dark:text-blue-200 px-2 py-1 rounded text-sm font-medium mb-1">
                    {station.distance.toFixed(1)} miles
                  </div>
                  <div className="text-yellow-500 text-sm">
                    {"★".repeat(Math.round(station.rating))}
                    <span className="ml-1 text-gray-600 dark:text-gray-400">
                      ({station.rating})
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default StationList;

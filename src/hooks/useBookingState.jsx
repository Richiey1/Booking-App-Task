import { useReducer, useEffect, useRef, useCallback } from "react";
import { fetchEligibleStations } from "../api/bookingService";

const initialState = {
  carType: null,
  service: null,
  station: null,
  timeSlot: null,
  date: new Date().toISOString().split("T")[0],
  bookingSuccess: null,
  loading: {
    carTypes: false,
    services: false,
    stations: false,
    timeSlots: false,
    booking: false,
  },
  data: {
    carTypes: [],
    services: [],
    stations: [],
    timeSlots: [],
  },
};

function bookingReducer(state, action) {
  switch (action.type) {
    case "SET_CAR_TYPE":
      return {
        ...state,
        carType: action.payload,
        station: null,
        timeSlot: null,
        data: { ...state.data, stations: [], timeSlots: [] },
      };
    case "SET_SERVICE":
      return {
        ...state,
        service: action.payload,
        station: null,
        timeSlot: null,
        data: { ...state.data, stations: [], timeSlots: [] },
      };
    case "SET_STATION":
      return {
        ...state,
        station: action.payload,
        timeSlot: null,
        data: { ...state.data, timeSlots: [] },
      };
    case "SET_DATE":
      return {
        ...state,
        date: action.payload,
        timeSlot: null,
        data: { ...state.data, timeSlots: [] },
      };
    case "SET_TIME_SLOT":
      return { ...state, timeSlot: action.payload };
    case "SET_LOADING":
      return {
        ...state,
        loading: {
          ...state.loading,
          [action.payload.key]: action.payload.value,
        },
      };
    case "SET_DATA":
      return {
        ...state,
        data: {
          ...state.data,
          [action.payload.key]: action.payload.value,
        },
      };
    case "BOOKING_SUCCESS":
      return { ...state, bookingSuccess: action.payload };
    case "RESET":
      return initialState;
    default:
      return state;
  }
}

export function useBookingState() {
  const [state, dispatch] = useReducer(bookingReducer, initialState);

  // Track the state changes using useRef to prevent re-renders
  const prevCarType = useRef(state.carType);
  const prevService = useRef(state.service);
  const prevStation = useRef(state.station);
  const prevDate = useRef(state.date);

  // Use useCallback to memoize functions
  const setCarType = useCallback(
    (carType) => dispatch({ type: "SET_CAR_TYPE", payload: carType }),
    []
  );
  const setService = useCallback(
    (service) => dispatch({ type: "SET_SERVICE", payload: service }),
    []
  );
  const setStation = useCallback(
    (station) => dispatch({ type: "SET_STATION", payload: station }),
    []
  );
  const setDate = useCallback(
    (date) => dispatch({ type: "SET_DATE", payload: date }),
    []
  );
  const setTimeSlot = useCallback(
    (timeSlot) => dispatch({ type: "SET_TIME_SLOT", payload: timeSlot }),
    []
  );
  const setLoading = useCallback(
    (key, value) => dispatch({ type: "SET_LOADING", payload: { key, value } }),
    []
  );
  const setData = useCallback(
    (key, value) => dispatch({ type: "SET_DATA", payload: { key, value } }),
    []
  );
  const setBookingSuccess = useCallback(
    (data) => dispatch({ type: "BOOKING_SUCCESS", payload: data }),
    []
  );
  const reset = useCallback(() => dispatch({ type: "RESET" }), []);

  // Fetch stations when carType or service changes, but only if they are different from previous values
  useEffect(() => {
    const fetchStations = async () => {
      if (
        state.carType &&
        state.service &&
        (prevCarType.current !== state.carType ||
          prevService.current !== state.service)
      ) {
        prevCarType.current = state.carType;
        prevService.current = state.service;

        setLoading("stations", true);
        const stations = await fetchEligibleStations(
          state.carType,
          state.service
        );
        setData("stations", stations);
        setLoading("stations", false);
      }
    };

    fetchStations();
  }, [state.carType, state.service]); // Dependencies: carType, service

  // Fetch timeSlots when station or date changes, but only if they are different from previous values
  useEffect(() => {
    const fetchTimeSlots = async () => {
      if (
        state.station &&
        state.date &&
        (prevStation.current !== state.station ||
          prevDate.current !== state.date)
      ) {
        prevStation.current = state.station;
        prevDate.current = state.date;

        setLoading("timeSlots", true);
        const timeSlots = await fetchTimeSlots(
          state.station,
          state.service,
          state.date
        );
        setData("timeSlots", timeSlots);
        setLoading("timeSlots", false);
      }
    };

    fetchTimeSlots();
  }, [state.station, state.date, state.service]); // Dependencies: station, date, service

  return {
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
  };
}

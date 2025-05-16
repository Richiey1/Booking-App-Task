# Balanceè Car Repair Booking Interface

This project is a React.js application that provides a user-friendly interface for booking car repair services. The application allows users to select their car type, repair service, and view available stations and time slots for booking.

## Live Demo

[Live Demo Link](https://booking-app-task.vercel.app/)

## GitHub Repository

[GitHub Repository Link](https://github.com/Richiey1/booking-app)

## Features

- Selection of car type and repair service
- Display of nearby stations that offer the selected service for the chosen car type
- Available time slots visualization per station
- Booking confirmation with success message
- Responsive design for both mobile and desktop
- Loading states for all API calls
- Empty states for when no data is available
- Form validation

## Tech Stack

- **React.js** - For building the UI components
- **Tailwind CSS** - For styling
- **React Hooks** - For state management (useState, useEffect, useReducer)
- **Context API** - For global state management
- **Mock API** - Simulated API calls with delays to mimic real-world scenarios

## Project Structure

```
src/
├── App.jsx                  
├── index.jsx                
├── index.css                
├── components/              
│   ├── CarTypeSelector.jsx  
│   ├── ServiceSelector.jsx  
│   ├── StationList.jsx      
│   ├── TimeSlotPicker.jsx   
│   └── BookingSuccess.jsx   
├── hooks/                   
│   └── useBookingState.jsx  
├── data/                    
│   └── mockData.js          
└── api/                     
    └── bookingService.js    
```

## Design Decisions

### State Management

I used React's `useReducer` hook combined with a custom hook pattern (`useBookingState`) to manage the global state of the application. This approach offers several benefits:

1. **Centralized State Logic**: All state updates are managed through a single reducer function, making it easier to track changes.
2. **Predictable State Updates**: Actions dispatched to the reducer ensure that state updates are consistent and predictable.
3. **Easier Debugging**: The action type clearly indicates what kind of update is being made to the state.

### UI/UX Considerations

1. **Progressive Disclosure**: The UI reveals options gradually as the user makes selections, reducing cognitive load.
2. **Loading States**: Skeleton loaders are displayed during API calls to indicate that data is being fetched.
3. **Empty States**: Clear messages are shown when no data is available for the current selection.
4. **Responsive Design**: The interface adapts seamlessly between mobile and desktop viewports.
5. **Visual Feedback**: Selected items are highlighted with a blue border and background for clear visual feedback.
6. **Validation**: Error messages are displayed when required fields are missing.

### Mock API Implementation

To simulate real-world API behavior, I implemented a mock API service that:

1. Uses promises with setTimeout to simulate network delays
2. Has separate endpoints for each data type (car types, services, stations, time slots)
3. Implements filtering logic (e.g., showing only stations that support the selected car type and service)

## How to Run Locally

1. Clone the repository
   ```
   git clone https://github.com/yourusername/balancee-booking.git
   cd balancee-booking
   ```

2. Install dependencies
   ```
   npm install
   ```

3. Start the development server
   ```
   npm start
   ```

4. Open your browser and navigate to `http://localhost:3000`

## Future Improvements

Given more time, I would:

1. Add unit and integration tests
2. Implement user authentication
3. Add form validation using a library like Formik or React Hook Form
4. Add a map view to show station locations
5. Implement real-time availability updates
6. Add a feature to save favorite stations
7. Allow users to view and manage their booking history
8. Implement a true dark mode toggle

## About Me

I'm a frontend developer with experience in building responsive and user-friendly web applications. I'm passionate about creating seamless user experiences and writing clean, maintainable code.

- [LinkedIn](https://www.linkedin.com/in/ojo-damilare-2b34ba109/)
- [GitHub](https://github.com/Richiey1)
- [Portfolio](https://web-2-portfolio-website-euge.vercel.app/)

- # Balanceè Smart Booking Interface

## Overview

A smart booking interface for Balanceè car repair services built with React.js and Tailwind CSS. This application allows users to select their car type and repair service, view nearby stations offering those services, choose available time slots, and book appointments.

![Balanceè Booking Interface Screenshot](![image](https://github.com/user-attachments/assets/ba6bfcaa-787a-4c22-b900-979e1f657fb3)
![image](https://github.com/user-attachments/assets/ce6d8e90-9565-44df-bcbe-0ed258e616c4)
)

## Features

- **Car Type Selection**: Choose from various car types (Sedan, SUV, Truck, etc.)
- **Service Selection**: Select from different repair services with pricing and duration information
- **Station Finder**: View nearby stations that support the selected car type and service
- **Time Slot Booking**: See available time slots and book appointments
- **Responsive Design**: Works seamlessly on both mobile and desktop
- **Loading States**: Visual feedback while fetching data
- **Empty States**: Clear messaging when no matching stations or time slots are available
- **Success Confirmation**: Confirmation message with booking details

## Tech Stack

- React.js with Hooks
- Tailwind CSS for styling
- Context API & useReducer for state management
- Mock API for simulating backend services

## Demo 

[View Live Demo](https://booking-app-task.vercel.app/)

## User Flow

1. **Select Car Type**: Choose your vehicle type
2. **Select Service**: Browse available repair services 
3. **Choose Station**: View and select from eligible repair stations
4. **Pick Time Slot**: Select from available appointment times
5. **Book**: Confirm your appointment

## Screenshots

### Mobile View
![Mobile View](![photo_2025-05-16_11-34-40](https://github.com/user-attachments/assets/5cfb04c3-aa1a-4e13-8544-059b0dfe2b75)
![photo_2025-05-16_11-35-12](https://github.com/user-attachments/assets/d93e0526-c4d7-4fec-8b08-12e253caf8b7)
)

### Desktop View
![Desktop View](![image](https://github.com/user-attachments/assets/cf743ed0-8ccc-499c-b8a7-05e8cc217e8a)
![image](https://github.com/user-attachments/assets/853290f2-563b-4f03-beaa-9db948dd5e83)
)

Thank you for reviewing my submission!

# E-Commerce Mobile App

This is the mobile app for a full-featured e-commerce platform, built using **React Native** and **TypeScript**. The app allows users to browse products, manage their shopping cart, place orders, and view their profile, with features for both iOS and Android platforms.

## Purpose

The primary purpose of this mobile app is to provide a smooth shopping experience for users on their mobile devices. The app interacts with a backend API to handle user authentication, product browsing, and order management. The app also features a responsive and performant design to ensure a seamless user experience.

### Key Features

- **Product browsing:** Users can browse and search for products using categories and filters.
- **Product details page:** Displays detailed information about each product, including images, price, and description.
- **Shopping cart management:** Users can add/remove products from their shopping cart and adjust quantities.
- **User authentication:** Users can register, log in, and manage their profiles.
- **Order management:** Users can view order history and track their current orders.
- **Checkout process:** Handles the entire checkout process, including shipping details and payment methods.
- **Offline caching with React Query:** Ensures data is cached locally and fetched efficiently.
- **Support for iOS and Android:** Built with cross-platform support in mind using **Expo**.
- **Optimized for performance:** Leverages best practices for mobile performance, such as lazy loading and caching.

---

## Setup Instructions

Follow these steps to get the mobile app running on your local machine:

### Prerequisites

- **Node.js**, **npm** installed on your machine.
- **Expo CLI** installed globally for running the app on a simulator or physical device.
- **Backend API** running to serve the mobile app.

### Installation

1. **Clone the repository**:

   ```bash
   git clone https://github.com/JosueG15/eshop_app
   cd eshop_app
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

3. **Set up environment variables**:

   - Create a `.env` file in the root directory based on the `.env.example` file.

     ```bash
     cp .env.example .env
     ```

   - Update the values in the `.env` file according to your backend configuration.

4. **Run the application**:

   - **Start the Expo development server**:

     ```bash
     npm start
     ```

   - **Run on iOS or Android**:
     - For iOS: Press `i` to open the app in an iOS simulator.
     - For Android: Press `a` to open the app in an Android emulator.

---

## Project Structure

The app follows a modular and scalable folder structure:

- **src/components**: Reusable UI components like buttons, cards, inputs, etc.
- **src/screens**: Screens for different parts of the app, like `ProductListScreen`, `CartScreen`, `ProfileScreen`.
- **src/navigation**: App navigation setup using React Navigation.
- **src/hooks**: Custom React hooks, including data-fetching hooks using React Query.
- **src/services**: API calls and backend service integrations using Axios.
- **src/utils**: Utility functions and constants used across the app.
- **src/context**: Context API for global state management (e.g., authentication, cart state).

---

## How to Contribute

1. **Fork the repository**.
2. **Create a branch** for your feature or bug fix.
3. **Commit your changes** and create a pull request for review.
4. We'll review your code and merge it into the main project if everything looks good.

---

## Technologies Used

- **React Native**: For building cross-platform mobile applications.
- **TypeScript**: To ensure type safety and scalability.
- **Expo**: For developing and testing the app on both iOS and Android.
- **Axios**: For making API requests to the backend.
- **React Query**: For data fetching and caching.
- **React Navigation**: For managing navigation between screens.
- **AsyncStorage**: For local data persistence on the device.

---

## License

This project is licensed under the **MIT License**. Feel free to use and modify it as needed.

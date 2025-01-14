// Import necessary modules from React, React Router, Redux, and the app's components
import { StrictMode } from "react"; // Enforces best practices in React during development
import { createRoot } from "react-dom/client"; // Used to render the React application into the DOM
import App from "./App.jsx"; // The main application component
import { BrowserRouter } from "react-router-dom"; // Provides routing functionality (handles URL changes)
import { Provider } from "react-redux"; // Makes the Redux store available to the app
import { store } from "./redux/store"; // The Redux store where global state is managed

// Render the React application to the DOM
createRoot(document.getElementById("root")).render(
  <StrictMode>
    {/* The StrictMode wrapper helps identify potential problems in the application */}
    <BrowserRouter>
      {/* BrowserRouter is responsible for handling URL routing and navigation */}
      <Provider store={store}>
        {/* Provider makes the Redux store accessible to all components in the app */}
        <App />
        {/* The main app component is rendered inside the Provider and BrowserRouter */}
      </Provider>
    </BrowserRouter>
  </StrictMode>
);

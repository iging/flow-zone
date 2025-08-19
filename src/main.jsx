import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createGlobalStyle, ThemeProvider } from "styled-components";
import App from "./App.jsx";
import StateProvider from "./context/StateProvider.jsx";

const GlobalStyle = createGlobalStyle`
* {
  margin: 0;
  padding: 0; 
  box-sizing: border-box;
  scroll-behavior: smooth;
  scrollbar-width: none;
}

::-webkit-scrollbar {
  display: none;
}

html, body {
  background-color: ${(props) => props.theme.colors.background};
  font-size: 62.5%;
  font-family: 'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
}

body {
  font-size: 1.5rem;
  color: #FFFFFF;
  overflow-y: scroll;
  font-weight: 400;
}

h1, h2, h3, h4, h5, h6, button {
  font-family: 'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
  font-weight: 600;
}

input, textarea, select {
  font-family: 'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
}
`;

const theme = {
  colors: {
    primary: "#333333", // Dark Gray
    secondary: "#0F172A", // Slate 900
    background: "#111827", // Gray 900
  },
};

// Create the root before rendering to prevent layout shifts
const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

// Render the app
root.render(
  <StrictMode>
    <StateProvider>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <App />
      </ThemeProvider>
    </StateProvider>
  </StrictMode>
);

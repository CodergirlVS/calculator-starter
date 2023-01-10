import "../styles/globals.css";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { RouterContext } from "next/dist/shared/lib/router-context";
// import { setupWorker, rest } from 'msw';

// //  Storybook executes this module in both bootstrap phase (Node)
// // and a story's runtime (browser). However, we cannot call `setupWorker`
// // in Node environment, so we need to check if we're in a browser.
// if (typeof global.process === 'undefined') {
//   // Create the mockServiceWorker (msw).
//   const worker = setupWorker(...handlers)
//   // Start the service worker.
//   worker.start();
//   // Make the `worker` and `rest` references available globally,
//   // so they can be accessed in stories.
//   //window.msw = { worker, rest };
// }

if (typeof global.process === 'undefined') {
  const { worker } = require('../mocks/browser')
  worker.start()
}

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

const withThemeProvider = (Story, context) => {
  return (
    <ThemeProvider theme={darkTheme}>
        <CssBaseline />
      <Story {...context} />
    </ThemeProvider>
  );
};

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  nextRouter: {
    Provider: RouterContext.Provider,
  },
};

export const decorators = [withThemeProvider];


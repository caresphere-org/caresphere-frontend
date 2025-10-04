import './App.css';
import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';
import '@mantine/dates/styles.css';
import { createTheme, MantineProvider } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import { Provider } from 'react-redux';
import AppRoutes from './Routes/AppRoutes';
import Store from './Store';

/**
 * Mantine Theme Configuration for CareSphere Hospital Management System
 * Custom theme tailored for healthcare application with accessibility in mind
 */
const theme = createTheme({
  /** Disable focus ring for cleaner UI while maintaining accessibility via other means */
  focusRing: "never",
  
  /** 
   * Custom Color Palette
   * Primary: Healthcare teal/green colors for trust and professionalism
   * Neutral: Grayscale for text and backgrounds
   */
  colors: {
    primary: [
      '#f1fcfa', // 0: Light background
      '#cff8ef', // 1: Light accent
      '#9ff0e1', // 2: Light interactive
      '#67e1cf', // 3: Medium light
      '#32b9a9', // 4: PRIMARY - Main brand color
      '#1fad9f', // 5: Darker shade
      '#168b82', // 6: Hover state
      '#166f69', // 7: Active state
      '#165955', // 8: Dark background
      '#174a47', // 9: Darker elements
      '#072c2b'  // 10: Darkest - text on light
    ],     
    neutral: [
      '#f6f6f6', // 0: Light background
      '#e7e7e7', // 1: Borders
      '#d1d1d1', // 2: Disabled states
      '#b0b0b0', // 3: Placeholder text
      '#888888', // 4: Secondary text
      '#6d6d6d', // 5: Body text
      '#5d5d5d', // 6: Heading text
      '#4f4f4f', // 7: Dark text
      '#454545', // 8: Darker elements
      '#3d3d3d', // 9: Almost black
      '#000000'  // 10: Pure black
    ],
//     // Consider adding these to your theme for better healthcare UX:

// // Add to theme object:
// autoContrast: true,        // Better accessibility
// luminanceThreshold: 0.3,   // Better color contrast
// fontSizes: {
//   xs: '0.75rem',    // 12px - captions
//   sm: '0.875rem',   // 14px - body small
//   md: '1rem',       // 16px - body
//   lg: '1.125rem',   // 18px - subheading
//   xl: '1.25rem',    // 20px - heading
// },

// // Consider adding breakpoints for responsive design
// breakpoints: {
//   xs: '36em',   // 576px
//   sm: '48em',   // 768px
//   md: '62em',   // 992px
//   lg: '75em',   // 1200px
//   xl: '88em',   // 1408px
// },
  },

  /** 
   * Typography System
   * Poppins: Clean, modern sans-serif for body text (excellent readability)
   * Merriweather: Professional serif for headings (authority and trust)
   */
  fontFamily: "Poppins, sans-serif",
  headings: {
    fontFamily: "Merriweather, serif"
  },

  /** Primary color configuration */
  primaryColor: "primary",
  primaryShade: 4, // Uses #32b9a9 as primary
  
  /** Default gradient for buttons and interactive elements */
  defaultGradient: {
    from: "primary.4", // #32b9a9
    to: "primary.8",   // #165955
    deg: 132           // Diagonal gradient angle
  }
});

/**
 * Root Application Component
 * Sets up global providers and configuration for CareSphere HMS
 * Wraps the entire application with necessary context providers
 */
function App() {
  return (
    // Redux Store Provider for state management
    <Provider store={Store}>
      {/* Mantine UI Framework Provider with custom theme */}
      <MantineProvider theme={theme}>
        {/* Notification system for user feedback */}
        <Notifications position='top-center' />
        
        {/* Main application routing */}
        <AppRoutes/>
      </MantineProvider>
    </Provider>
  );
}

export default App;
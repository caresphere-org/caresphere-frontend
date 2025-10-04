import { Avatar, Text } from "@mantine/core";
import {
  IconCalendarCheck,
  IconClockHeart,
  IconLayoutGrid,
  IconUser,
} from "@tabler/icons-react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

/**
 * Navigation links configuration for Patient Sidebar
 * Defines the main navigation structure for patient portal
 * Each link includes:
 * - name: Display text for navigation item
 * - url: Route path for React Router
 * - icon: Tabler icon component for visual representation
 */
const links = [
  {
    name: "Dashboard",
    url: "/patient/dashboard",
    icon: <IconLayoutGrid stroke={1.5} />,
  },
  {
    name: "Profile",
    url: "/patient/profile",
    icon: <IconUser stroke={1.5} />,
  },
  {
    name: "Appointments",
    url: "/patient/appointments",
    icon: <IconCalendarCheck stroke={1.5} />,
  },
];

/**
 * Patient Sidebar Component
 * Provides navigation for patient portal in hospital management system
 * Features:
 * - Hospital branding with logo
 * - Patient profile summary
 * - Navigation menu with active state highlighting
 * - Fixed positioning for consistent access
 */
const Sidebar = () => {
  // =========================================================================
  // STATE MANAGEMENT & HOOKS
  // =========================================================================

  /**
   * Current authenticated user data from Redux store
   * Used for displaying patient name, role, and profile picture
   */
  const user = useSelector((state: any) => state.user);

  // =========================================================================
  // COMPONENT RENDER
  // =========================================================================

  return (
    <div className="flex">
      {/* Spacer div to maintain layout consistency */}
      <div className="w-64"></div>
      
      {/* =====================================================================
          SIDEBAR CONTAINER
          Fixed positioned sidebar with hospital branding and navigation
        ====================================================================== */}
      <div className="w-64 fixed h-screen overflow-y-auto bg-dark flex flex-col gap-7 items-center">

        {/* ===================================================================
            HOSPITAL BRANDING SECTION
            Fixed header with hospital logo and name
          ==================================================================== */}
        <div className="fixed z-[500] bg-dark py-3 text-primary-400 flex gap-1 items-center">
          <IconClockHeart size={40} stroke={2.5} />
          <span className="font-heading font-semibold text-3xl">CareSphere</span>
        </div>

        {/* ===================================================================
            PATIENT PROFILE & NAVIGATION SECTION
            Contains patient avatar, details, and navigation menu
          ==================================================================== */}
        <div className="flex flex-col mt-20 gap-5">
          
          {/* Patient Profile Summary */}
          <div className="flex flex-col gap-1 items-center">
            {/* Profile Picture with White Border */}
            <div className="p-1 bg-white rounded-full shadow-lg">
              <Avatar 
                variant="filled" 
                src="/avatar.png" 
                size={"xl"} 
                alt="Patient profile picture" 
              />
            </div>
            
            {/* Patient Name and Role */}
            <span className="font-medium text-light">{user.name}</span>
            <Text c="dimmed" className="text-light" size="xs">
              {user.role}
            </Text>
          </div>

          {/* =================================================================
              NAVIGATION MENU
              Dynamic navigation links with active state styling
            ================================================================== */}
          <div className="flex flex-col gap-1">
            {links.map((link) => {
              return (
                <NavLink 
                  to={link.url} 
                  key={link.url} 
                  className={({ isActive }) =>
                    `flex items-center gap-3 w-full font-medium text-light px-4 py-5 rounded-lg ${
                      isActive 
                        ? "bg-primary-400 text-dark"  // Active state styling
                        : "hover:bg-gray-100 hover:text-dark"  // Hover state styling
                    }`
                  }
                >
                  {/* Navigation Icon */}
                  {link.icon}
                  
                  {/* Navigation Label */}
                  <span>{link.name}</span>
                </NavLink>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
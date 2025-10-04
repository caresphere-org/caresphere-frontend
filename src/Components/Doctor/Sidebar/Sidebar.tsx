import { Avatar, Text } from "@mantine/core";
import {
  IconCalendarCheck,
  IconClockHeart,
  IconLayoutGrid,
  IconMoodHeart,
  IconVaccine,
} from "@tabler/icons-react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

/**
 * Navigation links configuration for Doctor Sidebar
 * Defines the main navigation structure for doctor portal in hospital management system
 * Each link includes:
 * - name: Display text for navigation item
 * - url: Route path for React Router
 * - icon: Tabler icon component for visual representation
 * Note: Contains doctor-specific routes for patient management and medical tasks
 */
const links = [
  {
    name: "Dashboard",
    url: "/doctor/dashboard",
    icon: <IconLayoutGrid stroke={1.5} />,
  },
  {
    name: "Profile",
    url: "/doctor/profile",
    icon: <IconLayoutGrid stroke={1.5} />,
  },
  {
    name: "Patients",
    url: "/doctor/patients", // Fixed duplicate slash
    icon: <IconMoodHeart stroke={1.5} />, // Heart icon for patient care
  },
  {
    name: "Appointments",
    url: "/doctor/appointments", // Fixed duplicate slash
    icon: <IconCalendarCheck stroke={1.5} />, // Calendar icon for scheduling
  },
  {
    name: "Pharmacy",
    url: "/doctor/pharmacy", // Fixed duplicate slash
    icon: <IconVaccine stroke={1.5} />, // Medical icon for prescriptions
  },
];

/**
 * Doctor Sidebar Component
 * Provides navigation for doctor portal in hospital management system
 * Features:
 * - Hospital branding with logo
 * - Doctor profile summary with role
 * - Doctor-specific navigation menu (Patients, Appointments, Pharmacy)
 * - Fixed positioning for consistent access during medical workflows
 */
const Sidebar = () => {
  // =========================================================================
  // STATE MANAGEMENT & HOOKS
  // =========================================================================

  /**
   * Current authenticated doctor data from Redux store
   * Used for displaying doctor name, specialization/role, and profile picture
   */
  const user = useSelector((state: any) => state.user);

  // =========================================================================
  // COMPONENT RENDER
  // =========================================================================

  return (
    <div className="flex">
      {/* Spacer div to maintain layout consistency and prevent content overlap */}
      <div className="w-64"></div>
      
      {/* =====================================================================
          SIDEBAR CONTAINER
          Fixed positioned sidebar with hospital branding and doctor navigation
        ====================================================================== */}
      <div className="w-64 fixed h-screen overflow-y-auto bg-dark flex flex-col gap-7 items-center">

        {/* ===================================================================
            HOSPITAL BRANDING SECTION
            Fixed header with hospital logo and name - consistent across portals
          ==================================================================== */}
        <div className="fixed z-[500] bg-dark py-3 text-primary-400 flex gap-1 items-center">
          <IconClockHeart size={40} stroke={2.5} />
          <span className="font-heading font-semibold text-3xl">CareSphere</span>
        </div>

        {/* ===================================================================
            DOCTOR PROFILE & NAVIGATION SECTION
            Contains doctor avatar, professional details, and medical navigation
          ==================================================================== */}
        <div className="flex flex-col mt-20 gap-5">
          
          {/* Doctor Profile Summary */}
          <div className="flex flex-col gap-1 items-center">
            {/* Professional Profile Picture with White Border */}
            <div className="p-1 bg-white rounded-full shadow-lg">
              <Avatar 
                variant="filled" 
                src="/avatar.png" 
                size={"xl"} 
                alt="Doctor profile picture" 
              />
            </div>
            
            {/* Doctor Name and Professional Role/Specialization */}
            <span className="font-medium text-light">{user.name}</span>
            <Text c="dimmed" className="text-light" size="xs">
              {user.role || "Doctor"} {/* Fallback to "Doctor" if role not specified */}
            </Text>
          </div>

          {/* =================================================================
              DOCTOR NAVIGATION MENU
              Medical workflow-specific navigation with active state highlighting
              Includes patient management, appointments, and prescription tools
            ================================================================== */}
          <div className="flex flex-col gap-1">
            {links.map((link) => {
              return (
                <NavLink 
                  to={link.url} 
                  key={link.url} 
                  className={({ isActive }) =>
                    `flex items-center gap-3 w-full font-medium text-light px-4 py-5 rounded-lg transition-colors duration-200 ${
                      isActive 
                        ? "bg-primary-400 text-dark"  // Active state - high contrast for current section
                        : "hover:bg-gray-100 hover:text-dark"  // Hover state - subtle indication
                    }`
                  }
                >
                  {/* Medical Navigation Icon */}
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
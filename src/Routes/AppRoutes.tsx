import { BrowserRouter, Route, Routes } from "react-router-dom";
import Random from '../Components/Random';
import AdminDashboard from '../Layout/AdminDashboard';
import LoginPage from '../Pages/LoginPage';
import RegisterPage from '../Pages/RegisterPage';
import PublicRoute from './PublicRoute';
import ProtectedRoute from './ProtectedRoute';
import PatientDashboard from '../Layout/PatientDashboard';
import PatientProfilePage from '../Pages/Patient/PatientProfilePage';
import DoctorDashboard from '../Layout/DoctorDashboard';
import DoctorProfilePage from '../Pages/Doctor/DoctorProfilePage';

/**
 * Main Application Routing Configuration
 * Defines all routes for CareSphere Hospital Management System
 * Organized by user roles: Public, Admin, Doctor, Patient
 * Implements route protection and role-based access control
 */
const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        
        {/* =====================================================================
            PUBLIC ROUTES
            Accessible without authentication (Login, Register)
          ====================================================================== */}
        <Route 
          path='/login' 
          element={
            <PublicRoute>
              <LoginPage />
            </PublicRoute>
          } 
        />
        <Route 
          path='/register' 
          element={
            <PublicRoute>
              <RegisterPage />
            </PublicRoute>
          } 
        />

        {/* =====================================================================
            ADMIN ROUTES
            Protected routes for hospital administrators
            Base path: '/' (root)
          ====================================================================== */}
        <Route 
          path='/' 
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          }
        >
          {/* Nested admin routes */}
          <Route path='/dashboard' element={<Random />} />
          <Route path='/doctors' element={<Random />} />
          <Route path='/patients' element={<Random />} />
          <Route path='/pharmacy' element={<Random />} />
        </Route>

        {/* =====================================================================
            DOCTOR ROUTES
            Protected routes for medical professionals
            Base path: '/doctor'
            TODO: Consider pluralizing to '/doctors' for consistency
          ====================================================================== */}
        <Route 
          path='/doctor' 
          element={
            <ProtectedRoute>
              <DoctorDashboard />
            </ProtectedRoute>
          }
        >
          {/* Nested doctor routes */}
          <Route path='dashboard' element={<Random />} />
          <Route path='profile' element={<DoctorProfilePage />} />
          <Route path='patients' element={<Random />} />
          <Route path='pharmacy' element={<Random />} />
          <Route path='appointments' element={<Random />} />
        </Route>

        {/* =====================================================================
            PATIENT ROUTES
            Protected routes for patients
            Base path: '/patient'
            TODO: Consider pluralizing to '/patients' for consistency
          ====================================================================== */}
        <Route 
          path='/patient' 
          element={
            <ProtectedRoute>
              <PatientDashboard />
            </ProtectedRoute>
          }
        >
          {/* Nested patient routes */}
          <Route path='dashboard' element={<Random />} />
          <Route path='profile' element={<PatientProfilePage />} />
          <Route path='appointments' element={<Random />} />
        </Route>

      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;

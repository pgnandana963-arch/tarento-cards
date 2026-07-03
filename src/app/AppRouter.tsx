import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ROUTES } from '../config/routes';
import { ROLES } from '../config/auth';
import { ProtectedRoute } from './ProtectedRoute';
import { PublicLayout } from './layouts/PublicLayout';
import { AdminLayout } from './layouts/AdminLayout';
import { EmployeeLayout } from './layouts/EmployeeLayout';

// Temporary placeholders for Phase 7 page components
const Placeholder = ({ title }: { title: string }) => <div className="p-8 text-almost-black">{title} Page Stub</div>;

export function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public / Unauthenticated Routes */}
        <Route element={<PublicLayout />}>
          {/* We pass ':slug' to your function to generate the React Router template string */}
          <Route path={ROUTES.PUBLIC_CARD(':slug')} element={<Placeholder title="Public Card" />} />
          <Route path={ROUTES.ADMIN_LOGIN} element={<Placeholder title="Admin Login" />} />
          <Route path={ROUTES.EMPLOYEE_ACCESS_REQUEST} element={<Placeholder title="Employee Request Access" />} />
        </Route>

        {/* Admin Routes */}
        <Route element={
          <ProtectedRoute allowedRole={ROLES.ADMIN}>
            <AdminLayout />
          </ProtectedRoute>
        }>
          <Route path={ROUTES.ADMIN_DASHBOARD} element={<Placeholder title="Admin Dashboard" />} />
          <Route path={ROUTES.ADMIN_APPROVALS} element={<Placeholder title="Approval Requests" />} />
          <Route path={ROUTES.ADMIN_EMPLOYEES} element={<Placeholder title="Employee Directory" />} />
          <Route path={ROUTES.ADMIN_COMPANY_PROFILE} element={<Placeholder title="Company Profile" />} />
        </Route>

        {/* Employee Routes */}
        <Route element={
          <ProtectedRoute allowedRole={ROLES.EMPLOYEE}>
            <EmployeeLayout />
          </ProtectedRoute>
        }>
          <Route path={ROUTES.EMPLOYEE_DASHBOARD} element={<Placeholder title="Employee Dashboard" />} />
          <Route path={ROUTES.EMPLOYEE_EDIT_PROFILE} element={<Placeholder title="Edit Profile" />} />
          <Route path={ROUTES.EMPLOYEE_SHARE} element={<Placeholder title="Share QR Card" />} />
        </Route>

        {/* Fallback */}
        <Route path="*" element={<Navigate to={ROUTES.ADMIN_LOGIN} replace />} />
      </Routes>
    </BrowserRouter>
  );
}
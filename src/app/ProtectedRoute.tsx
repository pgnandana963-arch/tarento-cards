import { Navigate } from 'react-router-dom';
import { ROUTES } from '../config/routes';
import { ROLES } from '../config/auth';
import type { Role } from '../types/common.types';
import type { ReactNode } from 'react';

export interface ProtectedRouteProps {
  allowedRole: Role;
  children: ReactNode;
}

export function ProtectedRoute({ allowedRole, children }: ProtectedRouteProps) {
  // TODO: Phase 7 - Replace with destructuring from useAuth()
  const isAuthenticated = false; // Stubbed 
  const role: Role | null = null; // Stubbed

  if (!isAuthenticated) {
    return <Navigate to={allowedRole === ROLES.ADMIN ? ROUTES.ADMIN_LOGIN : ROUTES.EMPLOYEE_ACCESS_REQUEST} replace />;
  }

  if (role !== allowedRole) {
    return <Navigate to={role === ROLES.ADMIN ? ROUTES.ADMIN_DASHBOARD : ROUTES.EMPLOYEE_DASHBOARD} replace />;
  }

  return <>{children}</>;
}
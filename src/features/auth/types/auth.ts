export type Role = 'admin' | 'employee';

export interface User {
  id: string;
  name: string;
  email: string;
}

export interface AuthResponse {
  user: User;
  role: Role;
  token: string;
}

export interface AccessRequestResponse {
  requestId: string;
  status: 'pending';
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface AccessRequestPayload {
  fullName: string;
  workEmail: string;
  employeeId: string;
  department: string;
}
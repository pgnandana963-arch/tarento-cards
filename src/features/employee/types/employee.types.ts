// Employee profile shown in Edit Profile and Card Preview
export interface EmployeeProfile {
  id: string;

  avatar?: string;

  name: string;

  jobTitle: string;

  department: string;

  description: string;

  phone: string;

  email: string;

  linkedin: string;

  curatedFields: CuratedField[];
}

// Used in the Visits Chart
export interface VisitDataPoint {
  date: string;
  visits: number;
}

// Optional fields chosen by the employee
export interface CuratedField {
  id: string;

  label: string;

  value: string;
}
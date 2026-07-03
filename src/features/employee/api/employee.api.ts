import type {
  EmployeeProfile,
  VisitDataPoint,
} from "../types/employee.types";

// Simulate network delay
const delay = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

// ------------------------
// Mock Employee Profile
// ------------------------

let mockProfile: EmployeeProfile = {
  id: "emp-001",

  avatar: "",

  name: "Employee Name",

  jobTitle: "Software Engineer",

  department: "Engineering",

  description:
    "Building scalable web applications.",

  phone: "+91 XXXXX XXXXX",

  email: "employee@tarento.com",

  linkedin: "https://linkedin.com/in/employee",

  curatedFields: [
    {
      id: "portfolio",
      label: "Portfolio",
      value: "https://portfolio.example.com",
    },
    {
      id: "languages",
      label: "Languages",
      value: "English, Malayalam",
    },
  ],
};

// ------------------------
// Mock Visit Statistics
// ------------------------

const visitStats = {
  "7d": [
    { date: "Mon", visits: 12 },
    { date: "Tue", visits: 18 },
    { date: "Wed", visits: 22 },
    { date: "Thu", visits: 15 },
    { date: "Fri", visits: 30 },
    { date: "Sat", visits: 20 },
    { date: "Sun", visits: 16 },
  ],

  "30d": [
    { date: "Week 1", visits: 120 },
    { date: "Week 2", visits: 148 },
    { date: "Week 3", visits: 170 },
    { date: "Week 4", visits: 200 },
  ],

  "90d": [
    { date: "Jan", visits: 520 },
    { date: "Feb", visits: 610 },
    { date: "Mar", visits: 760 },
  ],
};

// ------------------------
// API Functions
// ------------------------

export async function getMyProfile(): Promise<EmployeeProfile> {
  await delay(600);

  return mockProfile;
}

export async function updateMyProfile(
  data: EmployeeProfile
): Promise<EmployeeProfile> {
  await delay(800);

  mockProfile = data;

  return mockProfile;
}

export async function getMyVisitStats(
  range: "7d" | "30d" | "90d"
): Promise<VisitDataPoint[]> {
  await delay(500);

  return visitStats[range];
}
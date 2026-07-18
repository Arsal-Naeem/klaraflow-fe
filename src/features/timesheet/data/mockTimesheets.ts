import { Timesheet } from "../types";

/** Projects available in the "Add Entry" form (offline / mock only). */
export const PROJECTS = [
  "Innotech HRMS Portal",
  "Mobile Banking App",
  "E-Commerce Redesign",
  "Data Analytics Dashboard",
  "Cloud Migration",
];

/** Maps a timesheet status to a Badge variant (same pattern as EmployeesList). */
export const getStatusVariant = (status: Timesheet["status"]): string => {
  switch (status) {
    case "approved":
      return "default";
    case "pending":
      return "secondary";
    case "rejected":
      return "destructive";
    default:
      return "outline";
  }
};

export const mockTimesheets: Timesheet[] = [
  {
    id: "TS-1001",
    employeeName: "Ayesha Siddiqui",
    date: "2026-07-13",
    project: "Innotech HRMS Portal",
    hoursWorked: 8,
    status: "approved",
  },
  {
    id: "TS-1002",
    employeeName: "Bilal Ahmed",
    date: "2026-07-13",
    project: "Mobile Banking App",
    hoursWorked: 7.5,
    status: "pending",
  },
  {
    id: "TS-1003",
    employeeName: "Fatima Noor",
    date: "2026-07-12",
    project: "E-Commerce Redesign",
    hoursWorked: 6,
    status: "rejected",
  },
  {
    id: "TS-1004",
    employeeName: "Hamza Tariq",
    date: "2026-07-12",
    project: "Innotech HRMS Portal",
    hoursWorked: 9,
    status: "approved",
  },
  {
    id: "TS-1005",
    employeeName: "Sana Malik",
    date: "2026-07-11",
    project: "Data Analytics Dashboard",
    hoursWorked: 8,
    status: "pending",
  },
  {
    id: "TS-1006",
    employeeName: "Usman Raza",
    date: "2026-07-11",
    project: "Mobile Banking App",
    hoursWorked: 5.5,
    status: "approved",
  },
  {
    id: "TS-1007",
    employeeName: "Zainab Iqbal",
    date: "2026-07-10",
    project: "Cloud Migration",
    hoursWorked: 8,
    status: "rejected",
  },
  {
    id: "TS-1008",
    employeeName: "Omar Farooq",
    date: "2026-07-10",
    project: "E-Commerce Redesign",
    hoursWorked: 7,
    status: "approved",
  },
  {
    id: "TS-1009",
    employeeName: "Hira Sheikh",
    date: "2026-07-09",
    project: "Data Analytics Dashboard",
    hoursWorked: 8.5,
    status: "pending",
  },
  {
    id: "TS-1010",
    employeeName: "Kamran Ali",
    date: "2026-07-09",
    project: "Cloud Migration",
    hoursWorked: 4,
    status: "approved",
  },
];

// Mock data for development and testing
import { Employee, EmployeesResponse } from '../types';

export const mockEmployees: Employee[] = [
  {
    id: '1',
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@company.com',
    phone: '+1-555-0123',
    department: 'Engineering',
    position: 'Senior Software Engineer',
    hireDate: '2023-01-15',
    salary: 95000,
    status: 'active',
    avatar: undefined,
    address: {
      street: '123 Main St',
      city: 'San Francisco',
      state: 'CA',
      zipCode: '94105',
      country: 'USA',
    },
    emergencyContact: {
      name: 'Jane Doe',
      relationship: 'Spouse',
      phone: '+1-555-0124',
      email: 'jane.doe@email.com',
    },
    createdAt: '2023-01-15T09:00:00Z',
    updatedAt: '2023-01-15T09:00:00Z',
  },
  {
    id: '2',
    firstName: 'Sarah',
    lastName: 'Wilson',
    email: 'sarah.wilson@company.com',
    phone: '+1-555-0125',
    department: 'Marketing',
    position: 'Marketing Manager',
    hireDate: '2023-02-20',
    salary: 75000,
    status: 'active',
    createdAt: '2023-02-20T09:00:00Z',
    updatedAt: '2023-02-20T09:00:00Z',
  },
  {
    id: '3',
    firstName: 'Michael',
    lastName: 'Johnson',
    email: 'michael.johnson@company.com',
    phone: '+1-555-0126',
    department: 'Sales',
    position: 'Sales Representative',
    hireDate: '2023-03-10',
    salary: 60000,
    status: 'inactive',
    createdAt: '2023-03-10T09:00:00Z',
    updatedAt: '2023-03-10T09:00:00Z',
  },
];

export const mockEmployeesResponse: EmployeesResponse = {
  employees: mockEmployees,
  total: mockEmployees.length,
  page: 1,
  limit: 10,
  totalPages: 1,
};

// Helper function to simulate API delay
export const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Helper to generate new employee ID
export const generateId = () => Math.random().toString(36).substr(2, 9);

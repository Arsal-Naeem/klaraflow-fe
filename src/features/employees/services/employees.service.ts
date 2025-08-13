import api from '@/lib/api';
import {
  Employee,
  CreateEmployeeRequest,
  UpdateEmployeeRequest,
  EmployeesResponse,
  EmployeeFilters,
  ApiResponse,
} from '../types';
import { mockEmployeesResponse, mockEmployees, delay, generateId } from './mock-data';

// Employee API endpoints
const EMPLOYEES_BASE_URL = '/employees';

// Environment flag to use mock data
const USE_MOCK_DATA = process.env.NODE_ENV === 'development' || !process.env.NEXT_PUBLIC_API_URL;

export const employeesService = {
  // GET - Fetch all employees with optional filters
  async getEmployees(filters?: EmployeeFilters): Promise<EmployeesResponse> {
    if (USE_MOCK_DATA) {
      // Simulate API delay
      await delay(800);
      
      let filteredEmployees = [...mockEmployees];
      
      // Apply search filter
      if (filters?.search) {
        const searchLower = filters.search.toLowerCase();
        filteredEmployees = filteredEmployees.filter(emp => 
          emp.firstName.toLowerCase().includes(searchLower) ||
          emp.lastName.toLowerCase().includes(searchLower) ||
          emp.email.toLowerCase().includes(searchLower) ||
          emp.department.toLowerCase().includes(searchLower) ||
          emp.position.toLowerCase().includes(searchLower)
        );
      }
      
      // Apply department filter
      if (filters?.department) {
        filteredEmployees = filteredEmployees.filter(emp => 
          emp.department === filters.department
        );
      }
      
      // Apply status filter
      if (filters?.status) {
        filteredEmployees = filteredEmployees.filter(emp => 
          emp.status === filters.status
        );
      }
      
      // Apply pagination
      const page = filters?.page || 1;
      const limit = filters?.limit || 10;
      const startIndex = (page - 1) * limit;
      const endIndex = startIndex + limit;
      const paginatedEmployees = filteredEmployees.slice(startIndex, endIndex);
      
      return {
        employees: paginatedEmployees,
        total: filteredEmployees.length,
        page,
        limit,
        totalPages: Math.ceil(filteredEmployees.length / limit),
      };
    }

    const params = new URLSearchParams();
    
    if (filters?.search) params.append('search', filters.search);
    if (filters?.department) params.append('department', filters.department);
    if (filters?.status) params.append('status', filters.status);
    if (filters?.page) params.append('page', filters.page.toString());
    if (filters?.limit) params.append('limit', filters.limit.toString());

    const response = await api.get<ApiResponse<EmployeesResponse>>(
      `${EMPLOYEES_BASE_URL}?${params.toString()}`
    );
    
    return response.data.data;
  },

  // GET - Fetch single employee by ID
  async getEmployeeById(id: string): Promise<Employee> {
    if (USE_MOCK_DATA) {
      await delay(500);
      const employee = mockEmployees.find(emp => emp.id === id);
      if (!employee) {
        throw new Error('Employee not found');
      }
      return employee;
    }

    const response = await api.get<ApiResponse<Employee>>(`${EMPLOYEES_BASE_URL}/${id}`);
    return response.data.data;
  },

  // POST - Create new employee
  async createEmployee(employeeData: CreateEmployeeRequest): Promise<Employee> {
    if (USE_MOCK_DATA) {
      await delay(1000);
      
      const newEmployee: Employee = {
        id: generateId(),
        ...employeeData,
        status: 'active',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      
      // Add to mock data (in real app, this would be persisted)
      mockEmployees.push(newEmployee);
      mockEmployeesResponse.employees = mockEmployees;
      mockEmployeesResponse.total = mockEmployees.length;
      
      return newEmployee;
    }

    const response = await api.post<ApiResponse<Employee>>(
      EMPLOYEES_BASE_URL,
      employeeData
    );
    return response.data.data;
  },

  // PUT - Update existing employee
  async updateEmployee(id: string, employeeData: UpdateEmployeeRequest): Promise<Employee> {
    if (USE_MOCK_DATA) {
      await delay(800);
      
      const employeeIndex = mockEmployees.findIndex(emp => emp.id === id);
      if (employeeIndex === -1) {
        throw new Error('Employee not found');
      }
      
      const updatedEmployee = {
        ...mockEmployees[employeeIndex],
        ...employeeData,
        updatedAt: new Date().toISOString(),
      };
      
      mockEmployees[employeeIndex] = updatedEmployee;
      mockEmployeesResponse.employees = mockEmployees;
      
      return updatedEmployee;
    }

    const response = await api.put<ApiResponse<Employee>>(
      `${EMPLOYEES_BASE_URL}/${id}`,
      employeeData
    );
    return response.data.data;
  },

  // DELETE - Delete employee
  async deleteEmployee(id: string): Promise<void> {
    if (USE_MOCK_DATA) {
      await delay(600);
      
      const employeeIndex = mockEmployees.findIndex(emp => emp.id === id);
      if (employeeIndex === -1) {
        throw new Error('Employee not found');
      }
      
      mockEmployees.splice(employeeIndex, 1);
      mockEmployeesResponse.employees = mockEmployees;
      mockEmployeesResponse.total = mockEmployees.length;
      
      return;
    }

    await api.delete(`${EMPLOYEES_BASE_URL}/${id}`);
  },

  // POST - Upload employee document
  async uploadDocument(id: string, file: File, documentType: string): Promise<Employee> {
    if (USE_MOCK_DATA) {
      await delay(1500);
      
      const employeeIndex = mockEmployees.findIndex(emp => emp.id === id);
      if (employeeIndex === -1) {
        throw new Error('Employee not found');
      }
      
      const mockDocument = {
        type: documentType,
        url: `mock://documents/${file.name}`,
        uploadedAt: new Date().toISOString(),
      };
      
      const updatedEmployee = {
        ...mockEmployees[employeeIndex],
        documents: [...(mockEmployees[employeeIndex].documents || []), mockDocument],
        updatedAt: new Date().toISOString(),
      };
      
      mockEmployees[employeeIndex] = updatedEmployee;
      
      return updatedEmployee;
    }

    const formData = new FormData();
    formData.append('file', file);
    formData.append('documentType', documentType);

    const response = await api.post<ApiResponse<Employee>>(
      `${EMPLOYEES_BASE_URL}/${id}/documents`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );
    return response.data.data;
  },

  // PUT - Update employee status
  async updateEmployeeStatus(id: string, status: 'active' | 'inactive' | 'terminated'): Promise<Employee> {
    if (USE_MOCK_DATA) {
      await delay(700);
      
      const employeeIndex = mockEmployees.findIndex(emp => emp.id === id);
      if (employeeIndex === -1) {
        throw new Error('Employee not found');
      }
      
      const updatedEmployee = {
        ...mockEmployees[employeeIndex],
        status,
        updatedAt: new Date().toISOString(),
      };
      
      mockEmployees[employeeIndex] = updatedEmployee;
      
      return updatedEmployee;
    }

    const response = await api.put<ApiResponse<Employee>>(
      `${EMPLOYEES_BASE_URL}/${id}/status`,
      { status }
    );
    return response.data.data;
  },
};

export default employeesService;

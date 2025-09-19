import api from "@/lib/api";
import {
  Employee,
  CreateEmployeeRequest,
  UpdateEmployeeRequest,
  EmployeesResponse,
  EmployeeFilters,
} from "../types";
import { ApiResponse } from "@/types/api.types";

// Employee API endpoints
const EMPLOYEES_BASE_URL = "/employees";

export const employeesService = {
  // GET - Fetch all employees with optional filters
  async getEmployees(filters?: EmployeeFilters): Promise<EmployeesResponse> {
    const params = new URLSearchParams();

    if (filters?.search) params.append("search", filters.search);
    if (filters?.department) params.append("department", filters.department);
    if (filters?.status) params.append("status", filters.status);
    if (filters?.page) params.append("page", filters.page.toString());
    if (filters?.limit) params.append("limit", filters.limit.toString());

    const response = await api.get<ApiResponse<EmployeesResponse>>(
      `${EMPLOYEES_BASE_URL}?${params.toString()}`
    );

    return response.data.data;
  },

  // GET - Fetch single employee by ID
  async getEmployeeById(id: string): Promise<Employee> {
    const response = await api.get<ApiResponse<Employee>>(
      `${EMPLOYEES_BASE_URL}/${id}`
    );
    return response.data.data;
  },

  // PUT - Update existing employee
  async updateEmployee(
    id: string,
    employeeData: UpdateEmployeeRequest
  ): Promise<Employee> {
    const response = await api.put<ApiResponse<Employee>>(
      `${EMPLOYEES_BASE_URL}/${id}`,
      employeeData
    );
    return response.data.data;
  },

  // DELETE - Delete employee
  async deleteEmployee(id: string): Promise<void> {
    await api.delete(`${EMPLOYEES_BASE_URL}/${id}`);
  },

  // POST - Upload employee document
  async uploadDocument(
    id: string,
    file: File,
    documentType: string
  ): Promise<Employee> {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("documentType", documentType);

    const response = await api.post<ApiResponse<Employee>>(
      `${EMPLOYEES_BASE_URL}/${id}/documents`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data.data;
  },

  // PUT - Update employee status
  async updateEmployeeStatus(
    id: string,
    status: "active" | "inactive" | "terminated"
  ): Promise<Employee> {
    const response = await api.put<ApiResponse<Employee>>(
      `${EMPLOYEES_BASE_URL}/${id}/status`,
      { status }
    );
    return response.data.data;
  },

  // GET - Fetch all departments
  async getDepartments(): Promise<{ id: string; name: string }[]> {
    const response = await api.get<ApiResponse<{ id: string; name: string }[]>>(
      "/settings/departments"
    );
    return response.data.data;
  },

  // POST - Create new department
  async createDepartment(name: string): Promise<{ id: string; name: string }> {
    const response = await api.post<ApiResponse<{ id: string; name: string }>>(
      "/settings/departments",
      { name }
    );
    return response.data.data;
  },

  // PUT - Update existing department
  async updateDepartment(
    id: string,
    name: string
  ): Promise<{ id: string; name: string }> {
    const response = await api.put<ApiResponse<{ id: string; name: string }>>(
      `/settings/departments/${id}`,
      { name }
    );
    return response.data.data;
  },

  // DELETE - Delete department
  async deleteDepartment(id: string): Promise<void> {
    await api.delete(`/settings/departments/${id}`);
  },

  // GET - Fetch all designations
  async getDesignations(): Promise<
    { id: string; code?: string; name: string }[]
  > {
    const response = await api.get<
      ApiResponse<{ id: string; code?: string; name: string }[]>
    >("/settings/designations");
    return response.data.data;
  },

  // POST - Create new designation
  async createDesignation(
    name: string,
    code?: string
  ): Promise<{ id: string; code?: string; name: string }> {
    const response = await api.post<
      ApiResponse<{ id: string; code?: string; name: string }>
    >("/settings/designations", { name, code });
    return response.data.data;
  },

  // PUT - Update existing designation
  async updateDesignation(
    id: string,
    name: string,
    code?: string
  ): Promise<{ id: string; code?: string; name: string }> {
    const response = await api.put<
      ApiResponse<{ id: string; code?: string; name: string }>
    >(`/settings/designations/${id}`, { name, code });
    return response.data.data;
  },

  // DELETE - Delete designation
  async deleteDesignation(id: string): Promise<void> {
    await api.delete(`/settings/designations/${id}`);
  },
};

export default employeesService;

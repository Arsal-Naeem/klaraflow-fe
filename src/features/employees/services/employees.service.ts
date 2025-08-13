import api from "@/lib/api";
import {
  Employee,
  CreateEmployeeRequest,
  UpdateEmployeeRequest,
  EmployeesResponse,
  EmployeeFilters,
  ApiResponse,
} from "../types";

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

  // POST - Create new employee
  async createEmployee(employeeData: CreateEmployeeRequest): Promise<Employee> {
    const response = await api.post<ApiResponse<Employee>>(
      EMPLOYEES_BASE_URL,
      employeeData
    );
    return response.data.data;
  },

  // POST - Create new employee with FormData (for file uploads)
  async createEmployeeWithFiles(formData: FormData): Promise<Employee> {
    const response = await api.post<ApiResponse<Employee>>(
      EMPLOYEES_BASE_URL,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
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
};

export default employeesService;

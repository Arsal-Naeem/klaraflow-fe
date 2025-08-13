// Employee related types and interfaces

export interface Employee {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  department: string;
  position: string;
  hireDate: string;
  salary?: number;
  status: 'active' | 'inactive' | 'terminated';
  avatar?: string;
  address?: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  emergencyContact?: {
    name: string;
    relationship: string;
    phone: string;
    email?: string;
  };
  bankDetails?: {
    accountNumber: string;
    routingNumber: string;
    bankName: string;
  };
  documents?: {
    type: string;
    url: string;
    uploadedAt: string;
  }[];
  createdAt: string;
  updatedAt: string;
}

export interface CreateEmployeeRequest {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  department: string;
  position: string;
  hireDate: string;
  salary?: number;
  address?: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  emergencyContact?: {
    name: string;
    relationship: string;
    phone: string;
    email?: string;
  };
  bankDetails?: {
    accountNumber: string;
    routingNumber: string;
    bankName: string;
  };
}

export interface UpdateEmployeeRequest extends Partial<CreateEmployeeRequest> {
  id: string;
  status?: 'active' | 'inactive' | 'terminated';
}

export interface EmployeesResponse {
  employees: Employee[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface EmployeeFilters {
  search?: string;
  department?: string;
  status?: 'active' | 'inactive' | 'terminated';
  page?: number;
  limit?: number;
}

// API Response types
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  errors?: string[];
}

export interface ApiError {
  message: string;
  errors?: string[];
  status?: number;
}
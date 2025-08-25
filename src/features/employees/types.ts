// Employee related types and interfaces

export interface Employee {
  id: string;
  empId: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  gender: string;
  userRole: string;
  designation?: string;
  department?: string;
  jobType?: string;
  hiringDate?: string;
  onboardingTemplate?: string;
  reportTo?: string;
  grade?: string;
  probationPeriod?: string;
  dateOfBirth?: string;
  maritalStatus?: string;
  nationality?: string;
  profilePic?: string;
  status: string;
  // salary?: number;
  // status: "active" | "inactive" | "terminated";
  // avatar?: string;
  // address?: {
  //   street: string;
  //   city: string;
  //   state: string;
  //   zipCode: string;
  //   country: string;
  // };
  // emergencyContact?: {
  //   name: string;
  //   relationship: string;
  //   phone: string;
  //   email?: string;
  // };
  // bankDetails?: {
  //   accountNumber: string;
  //   routingNumber: string;
  //   bankName: string;
  // };
  // documents?: {
  //   type: string;
  //   url: string;
  //   uploadedAt: string;
  // }[];
  // createdAt: string;
  // updatedAt: string;
}

export interface CreateEmployeeRequest {
  empId: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  gender: string;
  userRole: string;
  designation?: string;
  department?: string;
  jobType?: string;
  hiringDate?: string;
  onboardingTemplate?: string;
  reportTo?: string;
  grade?: string;
  probationPeriod?: string;
  dateOfBirth?: string;
  maritalStatus?: string;
  nationality?: string;
  profilePic?: File;
}

export interface UpdateEmployeeRequest extends Partial<CreateEmployeeRequest> {
  id: string;
  status?: "active" | "inactive" | "terminated";
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
  status?: "active" | "inactive" | "terminated";
  page?: number;
  limit?: number;
}

// Mock API layer for prototype mode
// This file intercepts API calls and returns mock data instead

import { MOCK_ADMIN_USER, MOCK_LOGIN_CREDENTIALS } from './mock-users';
import { MOCK_EMPLOYEES, MOCK_DEPARTMENTS, MOCK_DESIGNATIONS } from './mock-employees';
import { MOCK_DOCUMENT_TEMPLATES } from './mock-documents';

// Flag to enable/disable mock mode
export const ENABLE_MOCK_MODE = true;

// Mock API response wrapper
export const mockApiResponse = <T>(data: T) => ({
  data: {
    data,
    success: true,
    message: 'Mock response',
  },
});

// Mock authentication endpoints
export const mockAuthService = {
  loginWithPassword: async (credentials: { email: string; password: string }) => {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 500));

    if (
      credentials.email === MOCK_LOGIN_CREDENTIALS.email &&
      credentials.password === MOCK_LOGIN_CREDENTIALS.password
    ) {
      return {
        user: MOCK_ADMIN_USER,
        token: 'mock_jwt_token_' + Date.now(),
        refreshToken: 'mock_refresh_token_' + Date.now(),
        expiresIn: 86400,
      };
    }

    throw {
      response: {
        status: 401,
        data: {
          message: 'Invalid email or password',
        },
      },
    };
  },

  sendOtp: async (data: { email: string }) => {
    await new Promise(resolve => setTimeout(resolve, 300));
    return {
      message: 'OTP sent to ' + data.email,
      success: true,
    };
  },

  verifyOtp: async (data: { email: string; otp: string }) => {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Mock: any OTP works in prototype mode
    if (data.otp && data.otp.length >= 4) {
      return {
        user: MOCK_ADMIN_USER,
        token: 'mock_jwt_token_' + Date.now(),
        refreshToken: 'mock_refresh_token_' + Date.now(),
        expiresIn: 86400,
      };
    }

    throw {
      response: {
        status: 400,
        data: {
          message: 'Invalid OTP',
        },
      },
    };
  },

  getProfile: async () => {
    await new Promise(resolve => setTimeout(resolve, 300));
    return MOCK_ADMIN_USER;
  },

  forgotPassword: async (data: { email: string }) => {
    await new Promise(resolve => setTimeout(resolve, 300));
    return {
      message: 'Password reset link sent to ' + data.email,
    };
  },

  verifyResetPin: async (data: { email: string; pin: string }) => {
    await new Promise(resolve => setTimeout(resolve, 300));
    return {
      token: 'mock_reset_token_' + Date.now(),
      message: 'PIN verified',
    };
  },

  resetPassword: async (data: { email: string; password: string; token: string }) => {
    await new Promise(resolve => setTimeout(resolve, 300));
    return {
      message: 'Password reset successfully',
    };
  },

  activateAccount: async (data: { token: string; password: string }) => {
    await new Promise(resolve => setTimeout(resolve, 300));
    return {
      user: MOCK_ADMIN_USER,
      token: 'mock_jwt_token_' + Date.now(),
      refreshToken: 'mock_refresh_token_' + Date.now(),
      expiresIn: 86400,
    };
  },
};

// Mock employees endpoints
export const mockEmployeesService = {
  getEmployees: async (filters?: any) => {
    await new Promise(resolve => setTimeout(resolve, 400));
    return {
      employees: MOCK_EMPLOYEES,
      total: MOCK_EMPLOYEES.length,
      page: filters?.page || 1,
      limit: filters?.limit || 10,
      totalPages: 1,
    };
  },

  getEmployeeById: async (id: string) => {
    await new Promise(resolve => setTimeout(resolve, 300));
    const employee = MOCK_EMPLOYEES.find(e => e.id === id);
    if (!employee) {
      throw {
        response: {
          status: 404,
          data: { message: 'Employee not found' },
        },
      };
    }
    return employee;
  },

  updateEmployee: async (id: string, data: any) => {
    await new Promise(resolve => setTimeout(resolve, 400));
    const employee = MOCK_EMPLOYEES.find(e => e.id === id);
    if (!employee) {
      throw {
        response: {
          status: 404,
          data: { message: 'Employee not found' },
        },
      };
    }
    return { ...employee, ...data };
  },

  deleteEmployee: async (id: string) => {
    await new Promise(resolve => setTimeout(resolve, 300));
    // Just return success
    return null;
  },

  getDepartments: async () => {
    await new Promise(resolve => setTimeout(resolve, 200));
    return MOCK_DEPARTMENTS;
  },

  createDepartment: async (name: string) => {
    await new Promise(resolve => setTimeout(resolve, 300));
    return {
      id: 'dept_' + Date.now(),
      name,
    };
  },

  updateDepartment: async (id: string, name: string) => {
    await new Promise(resolve => setTimeout(resolve, 300));
    return { id, name };
  },

  deleteDepartment: async (id: string) => {
    await new Promise(resolve => setTimeout(resolve, 300));
    return null;
  },

  getDesignations: async () => {
    await new Promise(resolve => setTimeout(resolve, 200));
    return MOCK_DESIGNATIONS;
  },

  createDesignation: async (name: string, code?: string) => {
    await new Promise(resolve => setTimeout(resolve, 300));
    return {
      id: 'des_' + Date.now(),
      name,
      code: code || '',
    };
  },

  updateDesignation: async (id: string, name: string, code?: string) => {
    await new Promise(resolve => setTimeout(resolve, 300));
    return { id, name, code: code || '' };
  },

  deleteDesignation: async (id: string) => {
    await new Promise(resolve => setTimeout(resolve, 300));
    return null;
  },
};

// Mock documents endpoints
export const mockDocumentsService = {
  getDocumentTemplates: async () => {
    await new Promise(resolve => setTimeout(resolve, 300));
    return MOCK_DOCUMENT_TEMPLATES;
  },

  getDocumentTemplateById: async (templateId: string) => {
    await new Promise(resolve => setTimeout(resolve, 300));
    const template = MOCK_DOCUMENT_TEMPLATES.find(t => t.id === templateId);
    if (!template) {
      throw {
        response: {
          status: 404,
          data: { message: 'Template not found' },
        },
      };
    }
    return template;
  },

  createDocumentTemplate: async (templateData: any) => {
    await new Promise(resolve => setTimeout(resolve, 400));
    return {
      id: 'template_' + Date.now(),
      ...templateData,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
  },

  updateDocumentTemplate: async (templateId: string, templateData: any) => {
    await new Promise(resolve => setTimeout(resolve, 400));
    const template = MOCK_DOCUMENT_TEMPLATES.find(t => t.id === templateId);
    if (!template) {
      throw {
        response: {
          status: 404,
          data: { message: 'Template not found' },
        },
      };
    }
    return {
      ...template,
      ...templateData,
      updatedAt: new Date().toISOString(),
    };
  },

  deleteDocumentTemplate: async (templateId: string) => {
    await new Promise(resolve => setTimeout(resolve, 300));
    return null;
  },
};

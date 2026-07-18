// Mock user data for prototype
import { User } from '@/features/authentication/types';

export const MOCK_ADMIN_USER: User = {
  id: 1,
  email: 'admin@claraflow.com',
  first_name: 'Admin',
  last_name: 'User',
  role: 'admin',
  profile_picture_url: null,
  department_id: 1,
  designation_id: 1,
  company_id: 1,
  is_active: true,
  phone: '+1234567890',
  gender: 'Other',
  dateOfBirth: '1990-01-01',
  nationality: 'UAE',
  maritalStatus: 'Single',
  empId: 'EMP001',
  jobType: 'Full-time',
  grade: 'A1',
  hiringDate: '2023-01-01',
  probationPeriod: '3 months',
  reportTo: null,
  created_at: '2023-01-01T00:00:00Z',
};

export const MOCK_LOGIN_CREDENTIALS = {
  email: 'admin@claraflow.com',
  password: 'admin',
};

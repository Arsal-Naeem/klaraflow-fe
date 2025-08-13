# Employees API Documentation

This document describes the API setup for the employees module using Axios and TanStack Query.

## Overview

The employees module is built with:
- **Axios** for HTTP requests with interceptors for auth and error handling
- **TanStack Query** for data fetching, caching, and state management
- **TypeScript** for type safety
- **Mock data** for development when backend is not available

## Architecture

### Files Structure
```
src/features/employees/
├── types.ts                    # TypeScript interfaces and types
├── hooks/
│   └── useEmployees.ts        # TanStack Query hooks
├── services/
│   ├── index.ts               # Exports
│   ├── employees.service.ts   # API service functions
│   └── mock-data.ts          # Mock data for development
└── components/               # React components
```

### Core Components

#### 1. Types (`types.ts`)
Defines all TypeScript interfaces:
- `Employee` - Main employee interface
- `CreateEmployeeRequest` - Data for creating employees
- `UpdateEmployeeRequest` - Data for updating employees
- `EmployeesResponse` - API response structure
- `EmployeeFilters` - Query filters
- `ApiResponse<T>` - Generic API response wrapper

#### 2. Service Layer (`employees.service.ts`)
Provides API functions:
- `getEmployees(filters?)` - GET list with filtering/pagination
- `getEmployeeById(id)` - GET single employee
- `createEmployee(data)` - POST create new employee
- `updateEmployee(id, data)` - PUT update employee
- `deleteEmployee(id)` - DELETE employee
- `updateEmployeeStatus(id, status)` - PUT status update
- `uploadDocument(id, file, type)` - POST file upload

#### 3. React Hooks (`useEmployees.ts`)
TanStack Query hooks:
- `useEmployees(filters?)` - Fetch employees list
- `useEmployee(id)` - Fetch single employee
- `useCreateEmployee()` - Create employee mutation
- `useUpdateEmployee()` - Update employee mutation
- `useDeleteEmployee()` - Delete employee mutation
- `useUpdateEmployeeStatus()` - Status update mutation
- `useUploadEmployeeDocument()` - Document upload mutation

## API Endpoints

### Base Configuration
```typescript
// Base URL configuration
const baseURL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api'
```

### Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/employees` | Get employees list with filters |
| GET | `/employees/:id` | Get single employee |
| POST | `/employees` | Create new employee |
| PUT | `/employees/:id` | Update employee |
| DELETE | `/employees/:id` | Delete employee |
| PUT | `/employees/:id/status` | Update employee status |
| POST | `/employees/:id/documents` | Upload employee document |

### Query Parameters
For GET `/employees`:
- `search` - Search in name, email, department, position
- `department` - Filter by department
- `status` - Filter by status (active, inactive, terminated)
- `page` - Page number for pagination
- `limit` - Items per page

## Usage Examples

### 1. Fetching Employees List
```tsx
import { useEmployees } from '@/features/employees/hooks/useEmployees';

function EmployeesList() {
  const { data, isLoading, error, refetch } = useEmployees({
    search: 'john',
    department: 'Engineering',
    page: 1,
    limit: 10
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      {data?.employees.map(employee => (
        <div key={employee.id}>
          {employee.firstName} {employee.lastName}
        </div>
      ))}
    </div>
  );
}
```

### 2. Creating an Employee
```tsx
import { useCreateEmployee } from '@/features/employees/hooks/useEmployees';

function CreateEmployeeForm() {
  const createMutation = useCreateEmployee();

  const handleSubmit = async (formData: CreateEmployeeRequest) => {
    try {
      await createMutation.mutateAsync(formData);
      // Success handling is done automatically by the hook
    } catch (error) {
      // Error handling is done automatically by the hook
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Form fields */}
      <button 
        type="submit" 
        disabled={createMutation.isPending}
      >
        {createMutation.isPending ? 'Creating...' : 'Create Employee'}
      </button>
    </form>
  );
}
```

### 3. Updating Employee Status
```tsx
import { useUpdateEmployeeStatus } from '@/features/employees/hooks/useEmployees';

function EmployeeStatusToggle({ employeeId, currentStatus }) {
  const updateStatusMutation = useUpdateEmployeeStatus();

  const handleStatusChange = (newStatus) => {
    updateStatusMutation.mutate({
      id: employeeId,
      status: newStatus
    });
  };

  return (
    <select 
      value={currentStatus}
      onChange={(e) => handleStatusChange(e.target.value)}
      disabled={updateStatusMutation.isPending}
    >
      <option value="active">Active</option>
      <option value="inactive">Inactive</option>
      <option value="terminated">Terminated</option>
    </select>
  );
}
```

## Mock Data Development

When `NODE_ENV === 'development'` or `NEXT_PUBLIC_API_URL` is not set, the system automatically uses mock data:

- **Mock employees** with realistic data
- **Simulated API delays** for realistic testing
- **In-memory persistence** during the session
- **All CRUD operations** supported

## Error Handling

### Automatic Error Handling
- **401 Unauthorized**: Automatically redirects to login
- **Network errors**: Displayed via toast notifications
- **Validation errors**: Shown in mutation error states

### Custom Error Handling
```tsx
const { data, error } = useEmployees();

if (error) {
  // Handle specific error cases
  if (error.response?.status === 403) {
    return <div>Access denied</div>;
  }
  return <div>Something went wrong: {error.message}</div>;
}
```

## Caching Strategy

TanStack Query provides automatic caching with:
- **5-minute stale time** for employee data
- **Automatic refetching** on window focus
- **Optimistic updates** for mutations
- **Cache invalidation** after mutations

### Cache Keys Structure
```typescript
export const employeeKeys = {
  all: ['employees'],
  lists: () => [...employeeKeys.all, 'list'],
  list: (filters) => [...employeeKeys.lists(), filters],
  details: () => [...employeeKeys.all, 'detail'],
  detail: (id) => [...employeeKeys.details(), id],
};
```

## Authentication

The API client automatically adds authorization headers:
```typescript
// Request interceptor adds auth token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('auth_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
```

## Environment Variables

```env
# Required for production
NEXT_PUBLIC_API_URL=https://api.yourcompany.com/v1

# Optional - defaults to development mode
NODE_ENV=development
```

## Testing

### Mock Data Testing
All functionality can be tested using the built-in mock data system without requiring a backend server.

### API Testing
To test with a real API:
1. Set `NEXT_PUBLIC_API_URL` in environment
2. Ensure backend implements the expected endpoints
3. Mock data will be automatically disabled

## Performance Optimizations

1. **Query Deduplication** - Multiple identical requests are deduped
2. **Background Refetching** - Data updates automatically when stale
3. **Optimistic Updates** - UI updates immediately on mutations
4. **Prefetching** - Use `usePrefetchEmployees()` for improved UX
5. **Pagination** - Large datasets are paginated server-side

## Migration from Mock to Real API

1. Deploy backend with matching endpoints
2. Update `NEXT_PUBLIC_API_URL` environment variable
3. Remove mock data logic if desired (optional)
4. All functionality will work with real API automatically

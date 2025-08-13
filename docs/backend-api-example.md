# Backend API Implementation Example

This document provides example implementations for the backend API endpoints that work with the frontend employees module.

## Express.js + TypeScript Example

### Setup Dependencies
```bash
npm install express cors helmet morgan
npm install --save-dev @types/express @types/cors
```

### Employee Model (TypeScript Interface)
```typescript
// types/employee.ts
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
  address?: Employee['address'];
  emergencyContact?: Employee['emergencyContact'];
  bankDetails?: Employee['bankDetails'];
}

export interface EmployeesResponse {
  employees: Employee[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  errors?: string[];
}
```

### Router Implementation
```typescript
// routes/employees.ts
import express from 'express';
import { Employee, CreateEmployeeRequest, EmployeesResponse, ApiResponse } from '../types/employee';

const router = express.Router();

// Mock database (replace with actual database)
let employees: Employee[] = [
  // ... mock data
];

// GET /api/employees - Get employees list with filtering
router.get('/', async (req, res) => {
  try {
    const {
      search,
      department,
      status,
      page = '1',
      limit = '10'
    } = req.query;

    let filteredEmployees = [...employees];

    // Apply filters
    if (search) {
      const searchLower = (search as string).toLowerCase();
      filteredEmployees = filteredEmployees.filter(emp =>
        emp.firstName.toLowerCase().includes(searchLower) ||
        emp.lastName.toLowerCase().includes(searchLower) ||
        emp.email.toLowerCase().includes(searchLower) ||
        emp.department.toLowerCase().includes(searchLower) ||
        emp.position.toLowerCase().includes(searchLower)
      );
    }

    if (department) {
      filteredEmployees = filteredEmployees.filter(emp =>
        emp.department === department
      );
    }

    if (status) {
      filteredEmployees = filteredEmployees.filter(emp =>
        emp.status === status
      );
    }

    // Pagination
    const pageNum = parseInt(page as string);
    const limitNum = parseInt(limit as string);
    const startIndex = (pageNum - 1) * limitNum;
    const endIndex = startIndex + limitNum;
    const paginatedEmployees = filteredEmployees.slice(startIndex, endIndex);

    const response: ApiResponse<EmployeesResponse> = {
      success: true,
      data: {
        employees: paginatedEmployees,
        total: filteredEmployees.length,
        page: pageNum,
        limit: limitNum,
        totalPages: Math.ceil(filteredEmployees.length / limitNum),
      }
    };

    res.json(response);
  } catch (error) {
    res.status(500).json({
      success: false,
      data: null,
      message: 'Failed to fetch employees',
      errors: [error.message]
    });
  }
});

// GET /api/employees/:id - Get single employee
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const employee = employees.find(emp => emp.id === id);

    if (!employee) {
      return res.status(404).json({
        success: false,
        data: null,
        message: 'Employee not found'
      });
    }

    const response: ApiResponse<Employee> = {
      success: true,
      data: employee
    };

    res.json(response);
  } catch (error) {
    res.status(500).json({
      success: false,
      data: null,
      message: 'Failed to fetch employee',
      errors: [error.message]
    });
  }
});

// POST /api/employees - Create new employee
router.post('/', async (req, res) => {
  try {
    const employeeData: CreateEmployeeRequest = req.body;

    // Validation
    if (!employeeData.firstName || !employeeData.lastName || !employeeData.email) {
      return res.status(400).json({
        success: false,
        data: null,
        message: 'Missing required fields',
        errors: ['firstName, lastName, and email are required']
      });
    }

    // Check if email already exists
    const existingEmployee = employees.find(emp => emp.email === employeeData.email);
    if (existingEmployee) {
      return res.status(409).json({
        success: false,
        data: null,
        message: 'Employee with this email already exists'
      });
    }

    // Create new employee
    const newEmployee: Employee = {
      id: generateId(), // Implement this function
      ...employeeData,
      status: 'active',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    employees.push(newEmployee);

    const response: ApiResponse<Employee> = {
      success: true,
      data: newEmployee,
      message: 'Employee created successfully'
    };

    res.status(201).json(response);
  } catch (error) {
    res.status(500).json({
      success: false,
      data: null,
      message: 'Failed to create employee',
      errors: [error.message]
    });
  }
});

// PUT /api/employees/:id - Update employee
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const employeeIndex = employees.findIndex(emp => emp.id === id);
    if (employeeIndex === -1) {
      return res.status(404).json({
        success: false,
        data: null,
        message: 'Employee not found'
      });
    }

    // Update employee
    const updatedEmployee = {
      ...employees[employeeIndex],
      ...updateData,
      updatedAt: new Date().toISOString(),
    };

    employees[employeeIndex] = updatedEmployee;

    const response: ApiResponse<Employee> = {
      success: true,
      data: updatedEmployee,
      message: 'Employee updated successfully'
    };

    res.json(response);
  } catch (error) {
    res.status(500).json({
      success: false,
      data: null,
      message: 'Failed to update employee',
      errors: [error.message]
    });
  }
});

// DELETE /api/employees/:id - Delete employee
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const employeeIndex = employees.findIndex(emp => emp.id === id);
    if (employeeIndex === -1) {
      return res.status(404).json({
        success: false,
        data: null,
        message: 'Employee not found'
      });
    }

    employees.splice(employeeIndex, 1);

    res.json({
      success: true,
      data: null,
      message: 'Employee deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      data: null,
      message: 'Failed to delete employee',
      errors: [error.message]
    });
  }
});

// PUT /api/employees/:id/status - Update employee status
router.put('/:id/status', async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!['active', 'inactive', 'terminated'].includes(status)) {
      return res.status(400).json({
        success: false,
        data: null,
        message: 'Invalid status value'
      });
    }

    const employeeIndex = employees.findIndex(emp => emp.id === id);
    if (employeeIndex === -1) {
      return res.status(404).json({
        success: false,
        data: null,
        message: 'Employee not found'
      });
    }

    employees[employeeIndex] = {
      ...employees[employeeIndex],
      status,
      updatedAt: new Date().toISOString(),
    };

    const response: ApiResponse<Employee> = {
      success: true,
      data: employees[employeeIndex],
      message: 'Employee status updated successfully'
    };

    res.json(response);
  } catch (error) {
    res.status(500).json({
      success: false,
      data: null,
      message: 'Failed to update employee status',
      errors: [error.message]
    });
  }
});

// POST /api/employees/:id/documents - Upload employee document
router.post('/:id/documents', upload.single('file'), async (req, res) => {
  try {
    const { id } = req.params;
    const { documentType } = req.body;
    const file = req.file;

    if (!file) {
      return res.status(400).json({
        success: false,
        data: null,
        message: 'No file uploaded'
      });
    }

    const employeeIndex = employees.findIndex(emp => emp.id === id);
    if (employeeIndex === -1) {
      return res.status(404).json({
        success: false,
        data: null,
        message: 'Employee not found'
      });
    }

    // Save file and create document record
    const document = {
      type: documentType,
      url: `/uploads/${file.filename}`, // Adjust based on your file storage
      uploadedAt: new Date().toISOString(),
    };

    employees[employeeIndex] = {
      ...employees[employeeIndex],
      documents: [...(employees[employeeIndex].documents || []), document],
      updatedAt: new Date().toISOString(),
    };

    const response: ApiResponse<Employee> = {
      success: true,
      data: employees[employeeIndex],
      message: 'Document uploaded successfully'
    };

    res.json(response);
  } catch (error) {
    res.status(500).json({
      success: false,
      data: null,
      message: 'Failed to upload document',
      errors: [error.message]
    });
  }
});

// Helper function to generate ID
function generateId(): string {
  return Math.random().toString(36).substr(2, 9);
}

export default router;
```

### Main App Setup
```typescript
// app.ts
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import employeesRouter from './routes/employees';

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(helmet());
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true
}));
app.use(morgan('combined'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/employees', employeesRouter);

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    data: null,
    message: 'Something went wrong!',
    errors: [err.message]
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
```

## Database Integration Examples

### MongoDB with Mongoose
```typescript
import mongoose from 'mongoose';

const employeeSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: String,
  department: { type: String, required: true },
  position: { type: String, required: true },
  hireDate: { type: Date, required: true },
  salary: Number,
  status: { 
    type: String, 
    enum: ['active', 'inactive', 'terminated'], 
    default: 'active' 
  },
  address: {
    street: String,
    city: String,
    state: String,
    zipCode: String,
    country: String,
  },
  emergencyContact: {
    name: String,
    relationship: String,
    phone: String,
    email: String,
  },
  documents: [{
    type: String,
    url: String,
    uploadedAt: Date,
  }]
}, {
  timestamps: true
});

export const Employee = mongoose.model('Employee', employeeSchema);
```

### PostgreSQL with Prisma
```prisma
// schema.prisma
model Employee {
  id          String   @id @default(cuid())
  firstName   String
  lastName    String
  email       String   @unique
  phone       String?
  department  String
  position    String
  hireDate    DateTime
  salary      Int?
  status      EmployeeStatus @default(ACTIVE)
  avatar      String?
  
  address     Address?
  emergencyContact EmergencyContact?
  bankDetails BankDetails?
  documents   Document[]
  
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}

model Address {
  id         String   @id @default(cuid())
  street     String
  city       String
  state      String
  zipCode    String
  country    String
  employee   Employee @relation(fields: [employeeId], references: [id])
  employeeId String   @unique
}

// ... other models

enum EmployeeStatus {
  ACTIVE
  INACTIVE
  TERMINATED
}
```

## Authentication Middleware
```typescript
// middleware/auth.ts
import jwt from 'jsonwebtoken';

export const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({
      success: false,
      data: null,
      message: 'Access token required'
    });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({
        success: false,
        data: null,
        message: 'Invalid or expired token'
      });
    }
    req.user = user;
    next();
  });
};

// Usage in routes
router.use(authenticateToken); // Apply to all routes
```

## Environment Variables
```env
# .env
PORT=3001
NODE_ENV=production
FRONTEND_URL=http://localhost:3000

# Database
DATABASE_URL=postgresql://user:password@localhost:5432/klaraflow

# JWT
JWT_SECRET=your-super-secret-jwt-key

# File Upload
UPLOAD_DIR=./uploads
MAX_FILE_SIZE=5242880
```

This backend implementation provides all the endpoints that the frontend expects and follows the same data structures and API patterns.

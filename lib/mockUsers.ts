export interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  role: 'admin' | 'student';
  profilePicture?: string;
  matriculationNumber?: string;
  course?: string;
  description?: string;
  phoneNumber?: string;
  organizationDetails?: string;
  joinDate: string;
  yearOfStudy?: number;
  faculty?: string;
  createdAt: string;
  status?: 'active' | 'inactive';
}

export const mockUsers: User[] = [
  {
    id: 1,
    name: 'Admin User',
    email: 'admin@aspirebridge.com',
    password: 'admin123',
    role: 'admin',
    profilePicture: '/admin-profile.jpg',
    description: 'Administrator for AspireBridge',
    phoneNumber: '+1234567890',
    organizationDetails: 'AspireBridge Main Office',
    joinDate: '2024-01-01',
    createdAt: '2024-01-01',
    status: 'active'
  },
  {
    id: 2,
    name: 'Student User',
    email: 'student@example.com',
    password: 'student123',
    role: 'student',
    profilePicture: '/student-profile.jpg',
    matriculationNumber: 'A12345',
    course: 'Computer Science',
    description: 'Aspiring software developer',
    phoneNumber: '+9876543210',
    joinDate: '2024-01-01',
    createdAt: '2024-01-01',
    status: 'active'
  },
  {
    id: 3,
    name: 'Jane Doe',
    email: 'jane@example.com',
    password: 'jane123',
    role: 'student',
    profilePicture: '/jane-profile.jpg',
    matriculationNumber: 'B12345',
    course: 'Mathematics',
    phoneNumber: '+1122334455',
    joinDate: '2024-01-01',
    createdAt: '2024-01-01',
    status: 'active'
  },
  {
    id: 4,
    name: 'John Smith',
    email: 'john@example.com',
    password: 'john123',
    role: 'student',
    profilePicture: '/john-profile.jpg',
    matriculationNumber: 'C12345',
    course: 'Physics',
    phoneNumber: '+5544332211',
    joinDate: '2024-01-01',
    createdAt: '2024-01-01',
    status: 'active'
  },
];

export function authenticateUser(email: string, password: string): User | null {
  const user = mockUsers.find(u => u.email === email && u.password === password);
  return user || null;
}

export function updateUser(updatedUser: User): User {
  const index = mockUsers.findIndex(u => u.id === updatedUser.id);
  if (index !== -1) {
    mockUsers[index] = updatedUser;
    return updatedUser;
  }
  throw new Error('User not found');
}


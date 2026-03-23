export interface AppUser {
  id: string;
  organizationId: string;
  azureObjectId: string;
  email: string;
  displayName: string | null;
  role: 'employee' | 'manager' | 'admin';
  onboardedAt: string | null;
  createdAt: string;
}

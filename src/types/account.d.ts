export interface Account {
  id: string;
  name: string;
  icon: string | null;
  balance: string;
  isDefault: boolean;
  createdAt: string;
  updatedAt: string;
}
export interface Report {
  id?: string;
  title: string;
  description: string;
  createdAt: Date;
  status: 'pending' | 'resolved';
  userId?: string;
  reporterId: string;
  priority: 'low' | 'medium' | 'high';
  date: Date;
  location?: {
    lat: number;
    lng: number;
    address?: string;
  };
  category?: string;
  attachments?: string[];
  updatedAt?: Date;
}

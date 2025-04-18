export interface Report {
  id?: string;
  title: string;
  description: string;
  createdAt: Date;
  status: 'pending' | 'resolved' | 'in_progress';
  userId: string;
  reporterId: string;
  priority: 'low' | 'medium' | 'high';
  date: Date;
  location: string;
  category?: string;
  attachments?: string[];
  updatedAt?: Date;
}

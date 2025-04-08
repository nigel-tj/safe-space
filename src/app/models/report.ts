export interface Report {
  id?: string;
  title: string;
  description: string;
  location: string;
  date: Date;
  status: 'pending' | 'in_progress' | 'resolved';
  priority: 'low' | 'medium' | 'high';
  category: string;
  reporterId: string;
  assignedTo?: string;
  createdAt: Date;
  updatedAt: Date;
  attachments?: string[];
  comments?: {
    userId: string;
    text: string;
    createdAt: Date;
  }[];
}

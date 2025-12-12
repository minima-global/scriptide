// Import types
import { EToastStatus, IToastError } from '@/types';

// ToastError class
class ToastError extends Error {
  title: string;
  status: EToastStatus;

  // Constructor
  constructor({ title, status, message }: IToastError) {
    super(message);
    this.name = 'ToastError';
    this.title = title;
    this.status = status;
  }
}

// Export
export default ToastError;

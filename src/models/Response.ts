// Import types
import { IResponse } from '@/types';

// Response class
class Response<T> {
  status: boolean;
  pending: boolean;
  response: T | null;
  error: string;

  // Constructor
  constructor({ status, pending, response, error }: IResponse<T>) {
    this.status = status;
    this.pending = pending;
    this.response = response;
    this.error = error;
  }
}

// Export
export default Response;

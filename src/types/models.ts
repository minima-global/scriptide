import { EToastStatus } from './toast-types';

interface IToastError {
  title: string;
  status: EToastStatus;
  message: string;
}

export type { IToastError };

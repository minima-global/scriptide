// ============================================================== //
// Response interfaces ------------------------------------------ //
// ============================================================== //
interface IResponse<T> {
  status: boolean;
  pending: boolean;
  response: T | null;
  error: string;
}

// ============================================================== //
// Response types ----------------------------------------------- //
// ============================================================== //
type TMessage<T> = {
  status: boolean;
  pending: boolean;
  response: T;
  error: string;
  message?: string;
  event?: string;
};
type TResolve<T> = (value: IResponse<T> | PromiseLike<IResponse<T>>) => void;
type TReject<T> = (reason: IResponse<T> | PromiseLike<IResponse<T>>) => void;

// ============================================================= //
export type { IResponse, TMessage, TResolve, TReject };

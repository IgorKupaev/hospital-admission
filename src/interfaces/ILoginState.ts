import type { IUser } from './IUser';

export interface ILoginState {
  user: IUser
  token: string | null
  error: string
  isLoading: boolean
};

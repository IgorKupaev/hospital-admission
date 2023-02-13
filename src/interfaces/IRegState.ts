import type { IUser } from './IUser';

export interface IRegState {
  user: IUser
  token: string
  error: string
  isLoading: boolean
  regStatus: string
};

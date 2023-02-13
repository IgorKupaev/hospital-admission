import type { AuthEnum } from './AuthEnum';

export interface IAuthSnackbar {
  renderType: AuthEnum
  setRenderType: (value: AuthEnum) => void
};

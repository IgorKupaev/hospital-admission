import type { AuthEnum } from '../AuthEnum';

export interface IAuthFormProps {
  setRenderType: (value: AuthEnum) => void
  renderType: AuthEnum
};

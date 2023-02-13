import type { AuthEnum } from './AuthEnum';

export interface IAuthFormProps {
  setTitleBody: (value: string) => void
  setRenderType: (value: AuthEnum) => void
  renderType: AuthEnum
};

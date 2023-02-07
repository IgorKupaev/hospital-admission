import type { AuthType } from './AuthType';

export interface IAuthFormProps {
  setTitleBody: (value: string) => void
  setRenderType: (value: AuthType) => void
  renderType: AuthType
};

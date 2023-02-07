import type { AuthType } from '../AuthType';

export interface IAuthFormProps {
  setRenderType: (value: AuthType) => void
  renderType: AuthType
};

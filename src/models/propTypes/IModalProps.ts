export interface IModalProps {
  children: JSX.Element
  title: string
  buttonSettings: [text: string, callBack: () => void]
  isOpened: boolean
  setIsOpened: (value: boolean) => void
  isDisabled?: boolean
};

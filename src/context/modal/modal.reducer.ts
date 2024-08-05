export interface ModalState {
  show: boolean;
  component?: React.ReactElement;
  direction?: 'bottom' | 'center' | 'off';
  closeOnBackButtonPress?: boolean;
}

export interface ModalAction {
  type: string;
  component?: React.ReactElement;
  direction?: 'bottom' | 'center' | 'off';
  closeOnBackButtonPress?: boolean;
}

export const initialState = {
  show: false,
  component: undefined,
  closable: true,
  closeOnBackButtonPress: true,
};

export const actions = {
  SHOW: 'SHOW',
  HIDE: 'HIDE',
};

export const reducer = (state: ModalState, action: ModalAction): ModalState => {
  switch (action.type) {
    case actions.SHOW:
      return {
        ...action,
        show: true,
      };
    case actions.HIDE:
      return { show: false };
    default:
      return state;
  }
};

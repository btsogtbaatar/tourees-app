export interface ModalState {
  show: boolean;
  component?: React.ReactElement;
}

export interface ModalAction {
  type: string;
  component?: React.ReactElement;
}

export const initialState = {
  show: false,
  component: undefined,
  closable: true,
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

import React, { useReducer } from 'react';
import {
  ModalAction,
  ModalState,
  initialState,
  reducer,
} from './modal.reducer';
import ModalContainer from '../../modules/Component/Modal/ModalContainer';

export const ModalContext = React.createContext<{
  state: ModalState;
  dispatch: React.Dispatch<ModalAction>;
}>({
  state: initialState,
  dispatch: () => undefined,
});

export interface ProviderProps {
  children: React.ReactNode;
}

export const ModalProvider = (props: ProviderProps) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <ModalContext.Provider value={{ state, dispatch }}>
      <ModalContainer isVisible={state.show}>{state.component}</ModalContainer>
      {props.children}
    </ModalContext.Provider>
  );
};

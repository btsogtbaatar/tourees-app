import React, { useReducer } from 'react';
import ModalContainer from '../../components/Modal/ModalContainer';
import {
  ModalAction,
  ModalState,
  initialState,
  reducer,
} from './modal.reducer';

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

const InnerModalProvider = React.memo((props: ProviderProps) => {
  return <>{props.children}</>;
});

export const ModalProvider = (props: ProviderProps) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <ModalContext.Provider value={{ state, dispatch }}>
      <ModalContainer
        direction={state.direction}
        closeOnBackDropPress={state.closeOnBackDropPress}
        closeOnSwipeComplete={state.closeOnSwipeComplete}
        isVisible={state.show}>
        {state.component}
      </ModalContainer>
      <InnerModalProvider>{props.children}</InnerModalProvider>
    </ModalContext.Provider>
  );
};

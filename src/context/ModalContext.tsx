import React from "react";
import { ViewStyle } from "react-native";

// export class ModalContextImpl extends BasePr

export interface ModalContext {
    show(
        component: JSX.Element,
        style?: ViewStyle,
        closable?: boolean,
        callBack?: ()=>void
     ): void;

     hide(feedBack?: boolean): void;
};

// export const modalContext: ModalContext = new ModalContr

// export const AppModalContext: React.Context<ModalContext> = React.createContext(modaContext,);
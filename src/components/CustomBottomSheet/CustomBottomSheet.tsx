import BottomSheet, { BottomSheetProps } from '@gorhom/bottom-sheet';
import { BottomSheetMethods } from '@gorhom/bottom-sheet/lib/typescript/types';
import React, { ForwardedRef } from 'react';
import { CustomBottomStyle } from './CustomBottomSheet.style';

export interface CustomBottomSheetProps extends BottomSheetProps {}

export const CustomBottomSheet = React.forwardRef(
  (
    props: Readonly<CustomBottomSheetProps>,
    ref: ForwardedRef<BottomSheetMethods>,
  ) => (
    <BottomSheet
      android_keyboardInputMode="adjustResize"
      index={-1}
      style={CustomBottomStyle.shadow}
      ref={ref}
      enableDynamicSizing={true}
      enablePanDownToClose={true}>
      {props.children}
    </BottomSheet>
  ),
);

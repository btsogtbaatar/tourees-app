import { BottomSheetScrollView } from '@gorhom/bottom-sheet';
import { BottomSheetViewProps } from '@gorhom/bottom-sheet/lib/typescript/components/bottomSheetView/types';
import * as React from 'react';

export interface CustomBottomSheetViewProps extends BottomSheetViewProps {}

export default function CustomBottomSheet(
  props: Readonly<CustomBottomSheetViewProps>,
) {
  return <BottomSheetScrollView scrollEnabled={false} {...props} />;
}

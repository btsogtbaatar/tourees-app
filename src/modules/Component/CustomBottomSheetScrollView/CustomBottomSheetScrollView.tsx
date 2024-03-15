import { BottomSheetScrollView } from '@gorhom/bottom-sheet';
import { BottomSheetScrollViewProps } from '@gorhom/bottom-sheet/lib/typescript/components/bottomSheetScrollable/types';
import * as React from 'react';

export interface CustomBottomSheetScrollViewProps extends BottomSheetScrollViewProps {}

export default function CustomBottomScrollViewSheet(
  props: Readonly<CustomBottomSheetScrollViewProps>,
) {
  return <BottomSheetScrollView scrollEnabled={false} {...props} />;
}

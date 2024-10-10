import { StyleSheet } from 'react-native'
import { colors, Typography } from '../../theme'
import { verticalScale } from '../../utilities'

export const CustomCurrencyInputStyle = StyleSheet.create({
  formController: {
    width: '60%',
    borderBottomWidth: 1,
    borderBottomColor: colors.gray100,
    paddingBottom: verticalScale(10),
    alignItems: 'center',
  },
  text: {
    ...Typography.textExtraLarge,
  },
})
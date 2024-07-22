// react native component that accepts string as a prop
import React, { PropsWithChildren } from 'react'
import { View, Text } from 'react-native'
import styles from './CustomDivider.style'


const CustomDivider: React.FC<PropsWithChildren> = ({children}) => {
  return (
    <View style={styles.dividerContainer}>
      <View style={styles.dividerLine} />
      <Text style={styles.dividerText}>{children}</Text>
      <View style={styles.dividerLine} />
    </View>
  )
}



export default CustomDivider

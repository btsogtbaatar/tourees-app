import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { Colors } from '../../../../constants/Colors';
import FooterBack from '../../../assets/svg/FooterBack';

function FooterIconButton() {
  return (
    <View
      style={{
        padding: 16,
        alignItems: 'flex-start',
        backgroundColor: Colors.textWhite,
        gap: 16,
        borderTopStartRadius: 28,
        borderTopEndRadius: 28,
        flexDirection: 'row',
      }}>
      <View>
        <TouchableOpacity
          style={{
            padding: 10,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 12,
            borderWidth: 1,
            borderColor: Colors.borderColor,
          }}>
          <FooterBack color="#21272D" />
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        style={{
          borderRadius: 12,
          backgroundColor: Colors.primaryColor,
          paddingHorizontal: 16,
          height: 40,
          justifyContent: 'center',
          alignItems: 'center',
          flex: 1,
          gap: 8,
        }}>
        {/* <View> */}
          <Text>test</Text>
        {/* </View> */}
      </TouchableOpacity>
    </View>
  );
}

export default FooterIconButton;
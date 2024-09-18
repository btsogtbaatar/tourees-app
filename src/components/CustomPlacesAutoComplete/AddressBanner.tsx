import { Address } from '../../modules/Shared/pages/AddressMapView/AddressesMapView';
import { AddressCardStyles } from './AddressCard.style';
import { Text, View } from 'react-native';

export interface AddressBannerProps {
  address: Address;
  icon: React.JSX.Element;
  text: string;
}
export default function AddressBannerProps(
  props: Readonly<AddressBannerProps>,
) {
  return (
    <View style={[AddressCardStyles.card, AddressCardStyles.selected]}>
      <View style={AddressCardStyles.iconContainer}>{props.icon}</View>
      <View style={AddressCardStyles.textContainer}>
        {props.address.displayName ? (
          <Text
            numberOfLines={2}
            style={[
              AddressCardStyles.addressText,
              AddressCardStyles.selectedText,
            ]}>
            {props.address.displayName}
          </Text>
        ) : (
          <Text
            style={[
              AddressCardStyles.addressText,
              AddressCardStyles.unselectedText,
            ]}>
            {props.text}
          </Text>
        )}
      </View>
    </View>
  );
}

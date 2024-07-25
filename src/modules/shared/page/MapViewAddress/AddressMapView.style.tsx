import { StyleSheet } from 'react-native';

const AddressMapViewStyle = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 0,
  },
  searchContainer: {
    paddingHorizontal: 16,
    zIndex: 1,
    position: 'absolute',
    width: '100%',
  },
  selectedAddressContainer: {
    flexDirection: 'row',
  },
  leftSelectedAdress: {
    flex: 1,
  },
  rightSelectedAdress: {
    flex: 1,
    marginLeft: 10,
  },
});

export default AddressMapViewStyle;

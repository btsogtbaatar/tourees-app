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

  controllerContainer: {
    paddingHorizontal: 16,
    zIndex: 1,
    position: 'absolute',
    width: '100%',
  },
  addressContainer: {
    flexDirection: 'row',
  },
  left: {
    flex: 1,
  },
  right: {
    flex: 1,
    marginLeft: 10,
  },
});

export default AddressMapViewStyle;
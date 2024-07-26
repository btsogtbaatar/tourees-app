import { StyleSheet } from 'react-native';

const HomeStyle = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 12,
  },
  title: {
    fontSize: 12,
    fontFamily: 'Nunito',
    fontWeight: '400',
    marginBottom: 10,
  },
  listContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
});

export default HomeStyle;

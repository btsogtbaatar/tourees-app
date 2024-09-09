import { StyleSheet } from 'react-native';
import { colors } from '../../theme';

const StepStyle = StyleSheet.create({
  container: {
    height: 20,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  step: {
    width: 12,
  },
  trail: {
    flex: 1,
    borderWidth: 0.5,
    alignSelf: 'center',
    alignItems: 'center',
    marginHorizontal: 8,
  },
  completed: {
    height: 20,
    width: 20,
    borderRadius: 10,
    marginRight: 4,
    backgroundColor: colors.success,
    alignItems: 'center',
    justifyContent: 'center',
  },
  uncompleted: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: colors.borderColor,
  },
  active: {
    height: 20,
    width: 20,
    padding: 4,
    borderRadius: 10,
    backgroundColor: colors.primary200,
    zIndex: -1,
  },
});

export default StepStyle;

import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { colors, Typography } from '../../theme';
import { moderateScale, verticalScale } from '../../utilities';
import { FlatList } from 'react-native-gesture-handler';
import { MNFlag, TWFlag, USFlag, WWFlag } from '../Icon';
const flags = [
  { label: 'US', value: '+1' },
  { label: 'MN', value: '+976' },
  { label: 'TW', value: '+886' },
];
export const Flag = ({ code, size }: { code?: string; size?: number }) => {
  if (!size) size = 24;
  switch (code) {
    case '+1':
      return <USFlag size={size} width={size} />;
    case '+976':
      return <MNFlag size={size} width={size} />;
    case '+886':
      return <TWFlag size={size} width={size} />;
    default:
      return <WWFlag size={size} width={size} />;
  }
};
const Flags = ({ onChange }: { onChange: (code: string) => void }) => {
  return (
    <View style={style.container}>
      <FlatList
        data={flags}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => {
              onChange(item.value);
            }}
            style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
            <Flag code={item.value} />
            <Text style={[Typography.textSmall, { padding: moderateScale(8) }]}>
              {item.label}
            </Text>
            <Text style={[Typography.textSmall, { padding: moderateScale(8) }]}>
              {item.value}
            </Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};
const style = StyleSheet.create({
  container: {
    flexDirection: 'column',
    display: 'flex',
    backgroundColor: colors.white,
    paddingVertical: verticalScale(12),
    paddingHorizontal: moderateScale(16),
    borderRadius: moderateScale(16),
  },
});
export default Flags;

import React from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { horizontalScale, verticalScale } from '../../../uitls/metrics';
import { Colors } from '../../../../constants/Colors';

export type FilledListProps = {
  onPress: () => void;
  values: string[];
  prefix: React.ReactNode;
  suffix: React.ReactNode;
};
export type GroupedMenuListProps = {
  listItems: Array<FilledListProps>;
};

const GroupedMenuList: React.FC<GroupedMenuListProps> = ({ listItems }) => {
  return (
    <FlatList
      data={listItems}
      contentContainerStyle={{
        backgroundColor: 'white',
        justifyContent: 'space-between',
        borderRadius: 8,
      }}
      keyExtractor={(_, index) => index.toString()}
      renderItem={({ item, index }) => {
        return (
          <TouchableOpacity style={styles.container} onPress={item.onPress}>
            <View style={styles.subContainer}>
              {item.prefix}
              <View
                style={{
                  flexDirection: 'row',
                  flex: 1,
                }}>
                <Text
                  style={[
                    styles.menuText,
                    index === listItems.length - 1 && {
                      color: Colors.logoColor,
                    },
                  ]}>
                  {item.values[0]}
                </Text>
              </View>
              {item.values[1] && (
                <Text style={styles.subMenuText}>{item.values[1]}</Text>
              )}
            </View>
            {item.suffix}
          </TouchableOpacity>
        );
      }}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    padding: horizontalScale(16),
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomColor: Colors.otpBorder,
    borderBottomWidth: 1,
    alignSelf: 'stretch',
  },
  menuText: {
    fontSize: 16,
    fontWeight: '500',
    lineHeight: 18,
    color: Colors.textColor,
    marginLeft: horizontalScale(16),
    fontFamily: 'Nunito',
  },
  subMenuText: {
    color: Colors.gray300,
    fontSize: 16,
    fontWeight: '600',
    lineHeight: 24,
    marginRight: horizontalScale(12),
    fontFamily: 'Nunito',
  },
  subContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
});

export default GroupedMenuList;

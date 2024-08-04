import { RouteProp } from '@react-navigation/native';
import { NativeStackNavigationOptions } from '@react-navigation/native-stack';
import { HeaderBackButtonProps } from '@react-navigation/native-stack/lib/typescript/src/types';
import React from 'react';
import CustomHeaderBackButton from '../components/CustomHeader/CustomHeaderBackButton';
import { RootStackParamList } from '../navigation/types';
import { colors } from './colors';
import { FontWeight, getFontWeight, Typography } from './typography';

const getTextColor = (routeName: string) => {
  switch (routeName) {
    case 'UserRequest':
      return colors.white;
    default:
      return colors.gray700;
  }
};

const getBackgroundColor = (routeName: string) => {
  switch (routeName) {
    case 'UserRequest':
      return colors.dark600;
    default:
      return colors.silver;
  }
};

const customScreenOption:
  | ((props: {
      route: RouteProp<RootStackParamList, keyof RootStackParamList>;
      navigation: any;
    }) => NativeStackNavigationOptions)
  | undefined = ({ route, navigation }) => ({
  headerShown: route.name !== 'HomeTab',
  headerStyle: {
    elevation: 0,
    shadowOpacity: 0,
    shadowOffset: {
      height: 0,
    },
    shadowRadius: 0,
    backgroundColor: getBackgroundColor(route.name),
  },
  animationDuration: 0,
  headerShadowVisible: false,
  headerTitleStyle: {
    ...Typography.textRegular,
    color: getTextColor(route.name),
    ...getFontWeight(FontWeight.bold),
  },
  headerTitleAlign: 'center',
  headerBackTitleVisible: false,
  headerLeft: (props: HeaderBackButtonProps) =>
    props.canGoBack ? (
      <CustomHeaderBackButton
        {...props}
        color={getTextColor(route.name)}
        navigation={navigation}
      />
    ) : (
      <></>
    ),
});

export default customScreenOption;

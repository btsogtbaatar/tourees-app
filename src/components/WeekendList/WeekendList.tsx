import React, { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { horizontalScale, verticalScale } from '../../utilities';
import { colors } from '../../theme';
import { CheckIcon, CheckSelectedIcon, UnCheckIcon } from '../Icon';
import { ModalContext } from '../../context/modal/modal.context';
import { actions } from '../../context/modal/modal.reducer';
import TimeDownModal from '../TimeDownModal/TimeDownModal';

interface WeekendListProps {
  items?: any[];
}

const WeekendList = ({ items }: WeekendListProps) => {
  const { dispatch: dispatchModal } = useContext(ModalContext);
  const { t } = useTranslation();
  const showTimeModal = (index: number) => {
    dispatchModal({
      type: actions.SHOW,
      component: (
        <TimeDownModal
          onClick={() => {
            dispatchModal({ type: actions.HIDE });
          }}
        />
      ),
      direction: 'bottom',
    });
  };
  const datas = [
    {
      values: t('profile.l_monDay'),
      onPress: () => {
        console.log('test');
      },
      isCheck: false,
    },
    {
      values: t('profile.l_tuesDay'),
      onPress: () => {
        console.log('test');
      },
      isCheck: true,
    },
    {
      values: t('profile.l_wednesDay'),
      onPress: () => {
        console.log('test');
      },
      isCheck: false,
    },
    {
      values: t('profile.l_thursDay'),
      onPress: () => {
        console.log('test');
      },
      isCheck: true,
    },
    {
      values: t('profile.l_friDay'),
      onPress: () => {
        console.log('test');
      },
      isCheck: true,
    },
    {
      values: t('profile.l_saturDay'),
      onPress: () => {
        console.log('test');
      },
      isCheck: false,
    },
    {
      values: t('profile.l_sunDay'),
      onPress: () => {
        console.log('test');
      },
      isCheck: true,
    },
  ];
  return (
    <FlatList
      data={items ?? datas}
      scrollEnabled={false}
      renderItem={({ item, index }) => {
        return (
          <TouchableOpacity
            style={styles.container}
            onPress={() => showTimeModal(index)}>
            <View style={styles.subContainer}>
              <View
                style={{
                  height: 20,
                  width: 20,
                  borderRadius: 10,
                  marginRight: 4,
                  backgroundColor: item.isCheck
                    ? colors.borderPrimaryColor
                    : colors.brandGray,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <CheckIcon />
              </View>
              <View style={styles.textContainer}>
                <Text style={[item.isCheck && styles.selectText]}>
                  {item.values}
                </Text>
              </View>
            </View>
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
    borderColor: colors.otpBorder,
    borderBottomWidth: 1,
    alignSelf: 'stretch',
    backgroundColor: 'white',
    marginTop: verticalScale(10),
    borderRadius: verticalScale(10),
  },
  subContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  textContainer: {
    marginLeft: horizontalScale(10),
  },
  selectText: {
    color: colors.borderPrimaryColor,
    fontWeight: '700',
  },
});

export default WeekendList;

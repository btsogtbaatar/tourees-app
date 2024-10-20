import { useNavigation } from '@react-navigation/core';
import { useIsFocused } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FlatList, ScrollView, Text, TouchableOpacity } from 'react-native';
import ContainerView from '../../../../components/ContainerView/ContainerView';
import CustomImage from '../../../../components/CustomImage/CustomImage';
import CustomSafeAreaView from '../../../../components/CustomSafeAreaView/CustomSafeAreaView';
import FullHeightView from '../../../../components/FullHeightView/FullHeightView';
import HeaderBar from '../../../../components/HeaderBar/HeaderBar';
import { HeaderEditIcon } from '../../../../components/Icon';
import RemarkTextView from '../../../../components/RemarkTextView/RemarkTextView';
import { horizontalScale, moderateScale } from '../../../../utilities/metrics';
import { ProfileModel } from '../../entities/profile.model';
import { getProfile } from '../../service/profile.service';
import { TaskerViewStyle } from './TaskerView.style';

const TaskerView = () => {
  const isFocused = useIsFocused();
  const [profile, setProfile] = useState<ProfileModel.ProfileRequest>();
  const { t } = useTranslation();
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      header: () => (
        <HeaderBar
          backButtonVisible={true}
          title={t('headers.taskerProfile')}
          suffix={
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('RegisterTasker', { profile: profile });
              }}>
              <HeaderEditIcon />
            </TouchableOpacity>
          }
        />
      ),
    });
  }, [profile]);

  useEffect(() => {
    if (isFocused) {
      getProfile().then(res => {
        setProfile(res);
      });
    }
  }, [isFocused]);

  return (
    <CustomSafeAreaView>
      <FullHeightView>
        <ScrollView>
          <ContainerView>
            <RemarkTextView
              label={t('tasker.tagLine')}
              text={profile?.tagLine}
            />
            <RemarkTextView
              label={t('tasker.description')}
              text={profile?.description}
            />
            <Text style={TaskerViewStyle.headerLabael}>{t('Skills')}</Text>
            <RemarkTextView
              label={t('tasker.education')}
              arrayText={profile?.educations}
            />
            <RemarkTextView
              label={t('tasker.specialities')}
              arrayText={profile?.specialities}
            />
            <RemarkTextView
              label={t('tasker.languages')}
              arrayText={profile?.languages}
            />
            <RemarkTextView
              label={t('tasker.rank')}
              arrayText={profile?.ranks}
            />
            <RemarkTextView
              label={t('tasker.workingType.name')}
              text={
                profile?.workingType
                  ? t(`tasker.workingType.${profile?.workingType}`)
                  : ''
              }
            />
            <RemarkTextView label={t('tasker.portfolio')} />
            <FlatList
              keyExtractor={(_, index) => index.toString()}
              data={profile?.files}
              numColumns={4}
              columnWrapperStyle={{ gap: horizontalScale(12) }}
              contentContainerStyle={{ gap: horizontalScale(12) }}
              renderItem={({ item }) => (
                <CustomImage
                  source={{ uri: item.url }}
                  width={horizontalScale(72)}
                  height={horizontalScale(72)}
                  style={{
                    borderRadius: moderateScale(12),
                  }}
                  resizeMode="cover"
                />
              )}
            />
          </ContainerView>
        </ScrollView>
      </FullHeightView>
    </CustomSafeAreaView>
  );
};

export default TaskerView;

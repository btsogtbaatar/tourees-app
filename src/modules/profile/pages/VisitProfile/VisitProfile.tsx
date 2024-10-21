import { useEffect, useState } from 'react';
import Loading from '../../../../components/Loading/Loading';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../../navigation/types';
import CustomSafeAreaView from '../../../../components/CustomSafeAreaView/CustomSafeAreaView';
import { Text, View } from 'react-native';
import { getUserInformation } from '../../service/profile.service';
import { horizontalScale, verticalScale } from '../../../../utilities';
import CustomImage from '../../../../components/CustomImage/CustomImage';
import { Typography, getFontWeight } from '../../../../theme';
import { useTranslation } from 'react-i18next';
import { MailIcon, PhoneIcon } from '../../../../components/Icon';
import { ProfileModel } from '../../entities/profile.model';

type Props = NativeStackScreenProps<RootStackParamList, 'VisitProfile'>;
const VisitProfile = (props: Props) => {
  const { id } = props.route.params;
  const [loading, setLoading] = useState(true);
  const { t } = useTranslation();
  const [profile, setProfile] = useState<ProfileModel.User | null>(null);
  useEffect(() => {
    getUserInformation(id)
      .then((e: ProfileModel.User) => setProfile(e))
      .finally(() => {
        setLoading(false);
      });
  }, []);
  if (loading) {
    return <Loading />;
  }
  return (
    <CustomSafeAreaView>
      <View
        style={{
          display: 'flex',
          gap: 12,
          padding: 20,
        }}>
        <View
          style={{
            gap: verticalScale(8),
            height: verticalScale(120),
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <CustomImage
            height={verticalScale(76)}
            width={verticalScale(76)}
            style={{ borderRadius: horizontalScale(76) }}
            source={{ uri: profile?.profile.url }}
          />
          <Text style={[Typography.textLarge, { ...getFontWeight('700') }]}>
            {profile?.firstName} {profile?.lastName}
          </Text>
        </View>
        <View style={{ gap: verticalScale(8) }}>
          <Text style={[Typography.textRegular, { ...getFontWeight('700') }]}>
            {t('visitProfile.contacts')}
          </Text>
          {profile?.phone && (
            <View
              style={{ flexDirection: 'row', gap: 8, alignItems: 'center' }}>
              <PhoneIcon
                width={horizontalScale(20)}
                height={horizontalScale(18)}
              />
              <Text
                style={[Typography.textRegular, { ...getFontWeight('700') }]}>
                {profile?.phone}
              </Text>
            </View>
          )}
          {profile?.email && (
            <View
              style={{ flexDirection: 'row', gap: 8, alignItems: 'center' }}>
              <MailIcon
                width={horizontalScale(20)}
                height={horizontalScale(18)}
              />
              <Text
                style={[Typography.textRegular, { ...getFontWeight('700') }]}>
                {profile?.email}
              </Text>
            </View>
          )}
        </View>
        <View>
          <Text style={[Typography.textRegular, { ...getFontWeight('700') }]}>
            {t('visitProfile.feedback')}
          </Text>
        </View>
      </View>
    </CustomSafeAreaView>
  );
};
export default VisitProfile;

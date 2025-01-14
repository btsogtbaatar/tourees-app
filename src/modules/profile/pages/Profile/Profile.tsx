import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useSelector } from 'react-redux';
import ProfileImage from '../../../../components/ProfileImage/ProfileImage';
import ProfileMenu from '../../../../components/ProfileMenu/ProfileMenu';
import { colors } from '../../../../theme/colors';
import { horizontalScale, verticalScale } from '../../../../utilities/metrics';
import { selectUser } from '../../../Auth/slice/authSlice';

const Profile = () => {
  const user = useSelector(selectUser);
  return (
    <View>
      <LinearGradient
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        locations={[0, 1]}
        colors={['#37414B', '#161A1E']}
        style={styles.container}>
        <View style={styles.headerContainer}>
          <View>
            <Image
              source={require('../../../../../assets/images/rectangle.png')}
            />
          </View>
          <View style={styles.headerUsername}>
            <ProfileImage />
            <View style={styles.mt16}>
              <Text style={styles.titleMail}>
                {user?.email ?? user?.phoneNumber?.lineNumber}
              </Text>
            </View>
          </View>
          <View style={styles.alignEnd}>
            <Image
              source={require('../../../../../assets/images/rectangle-profile.png')}
            />
          </View>
        </View>
      </LinearGradient>
      <View style={styles.profileContainer}>
        <ProfileMenu />
      </View>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    borderBottomLeftRadius: horizontalScale(16),
    borderBottomRightRadius: horizontalScale(16),
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: verticalScale(160),
  },
  subHeaderContainer: {
    justifyContent: 'center',
    flex: 1,
  },
  headerUsername: {
    justifyContent: 'flex-end',
    paddingTop: verticalScale(16),
    alignItems: 'center',
  },
  titleUsername: {
    color: colors.white,
    fontSize: 20,
    fontWeight: '700',
    lineHeight: 30,
    marginTop: verticalScale(16),
    fontFamily: 'Nunito',
  },
  mt16: {
    marginTop: verticalScale(16),
  },
  titleMail: {
    marginBottom: verticalScale(12),
    color: colors.white,
    textAlign: 'center',
  },
  seedContainer: {
    borderRadius: horizontalScale(12),
    paddingHorizontal: horizontalScale(8),
    paddingVertical: verticalScale(4),
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
    flexDirection: 'row',
  },
  seedText: {
    color: colors.white,
    fontSize: 12,
    fontWeight: '700',
    lineHeight: 18,
    fontFamily: 'Nunito',
  },
  alignEnd: {
    alignSelf: 'flex-end',
  },
  profileContainer: {
    padding: horizontalScale(16),
  },
});

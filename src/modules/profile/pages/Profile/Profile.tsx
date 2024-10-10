import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useSelector } from 'react-redux';
import { LogoMini } from '../../../../components/Icon';
import { colors } from '../../../../theme/colors';
import { horizontalScale, verticalScale } from '../../../../utilities/metrics';
import { selectUser } from '../../../Auth/slice/authSlice';
import ProfileMenu from '../../components/ProfileMenu/ProfileMenu';

const Profile = () => {
  const user = useSelector(selectUser);
  console.log(user);
  return (
    <View>
      <LinearGradient
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        locations={[0, 1]}
        colors={['#37414B', '#161A1E']}
        style={styles.container}>
        <View style={styles.headerContainer}>
          <View style={{}}>
            <Image
              source={require('../../../../../assets/images/rectangle.png')}
            />
          </View>
          <View style={styles.headerUsername}>
            <View style={styles.subHeaderContainer}>
              <Text style={styles.titleUsername}>{user?.username}</Text>
            </View>
            <View style={styles.mt16}>
              <Text style={styles.titleMail}>
                {user?.email ?? user?.phoneNumber}
              </Text>
              <LinearGradient
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                locations={[0, 1]}
                colors={['#FF9646', '#FA6432']}
                style={styles.seedContainer}>
                <LogoMini />
                <Text style={styles.seedText}>45,000</Text>
              </LinearGradient>
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
    flex: 1,
    height: '100%',
    justifyContent: 'flex-end',
    paddingVertical: verticalScale(16),
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

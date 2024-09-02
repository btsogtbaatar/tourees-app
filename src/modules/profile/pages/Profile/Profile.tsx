import React from 'react';
import { ImageBackground, StyleSheet, Text, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { ChevronRightIcon } from '../../../../components/Icon';
import { authStore } from '../../../../context/auth/store';
import { colors } from '../../../../theme/colors';
import { horizontalScale, verticalScale } from '../../../../utilities/metrics';
import ProfileMenu from '../../components/ProfileMenu/ProfileMenu';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';

const Profile = () => {
  const authState = authStore(state => state);
  const navigation = useNavigation();
  console.log(authState.auth?.user);
  return (
    <View>
      <LinearGradient
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        locations={[0, 1]}
        colors={['#37414B', '#161A1E']}
        style={styles.container}>
        <ImageBackground
          style={styles.headerContainer}
          source={require('../../../../../assets/images/profile-background.png')}>
          <View style={styles.headerUsername}>
            <View style={styles.subHeaderContainer}>
              <Text style={styles.titleUsername}>
                {authState.auth?.user?.username}
              </Text>
            </View>
            <View style={styles.mt16}>
              <Text style={styles.titleMail}>
                {authState.auth?.user?.email
                  ? authState.auth.user?.email
                  : authState.auth?.user?.phoneNumber}
              </Text>
            </View>
            <TouchableOpacity
              style={styles.buttonWrapper}
              onPress={() => {
                navigation.navigate('TaskerRegister');
              }}>
              <LinearGradient
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                locations={[0, 1]}
                colors={['#FF9646', '#FA6432']}
                style={styles.seedContainer}>
                <Text style={styles.seedText}>What is it</Text>
                <ChevronRightIcon color={colors.white} />
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </ImageBackground>
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
  buttonWrapper: {
    paddingHorizontal: horizontalScale(20),
    gap: 8,
    flexDirection: 'row',
  },
  seedContainer: {
    borderRadius: horizontalScale(12),
    paddingHorizontal: horizontalScale(20),
    paddingVertical: verticalScale(8),
    width: '100%',
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
    flex: 2,
  },
  alignEnd: {
    alignSelf: 'flex-end',
  },
  profileContainer: {
    padding: horizontalScale(16),
  },
});

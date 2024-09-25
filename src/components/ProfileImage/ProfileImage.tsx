import React, { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { Platform, TouchableOpacity, View } from 'react-native';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { Camera } from 'react-native-vision-camera';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../../context/app/store';
import { ModalContext } from '../../context/modal/modal.context';
import { actions } from '../../context/modal/modal.reducer';
import {
  selectProfile,
  setProfileImage,
} from '../../modules/Auth/slice/authSlice';
import { ProfileModel } from '../../modules/Profile/entities/profile.model';
import { uploadProfile } from '../../modules/Profile/services/profile.service';
import { uploadFile } from '../../modules/Shared/services/shared.service';
import { horizontalScale } from '../../utilities';
import CustomImage from '../CustomImage/CustomImage';
import { notifyMessage } from '../CustomToast/CustomToast';
import { HeaderEditIcon, SearchMdIcon, UserCircleIcon } from '../Icon';
import { ImageSource } from '../ImageUploadButton/ImageUploadButton';
import AvatarModal from './AvatarModal';
import { ProfileImageStyle } from './ProfileImage.style';

const ProfileImage = () => {
  const { dispatch: dispatchModal } = useContext(ModalContext);
  const { t } = useTranslation();
  const profileImage = useSelector(selectProfile);
  const dispatch = useAppDispatch();
  console.log(profileImage?.url, 'ss');

  const onCamera = async () => {
    await Camera.requestCameraPermission();
    await launchCamera({
      mediaType: 'photo',
      maxHeight: 300,
      maxWidth: 300,
      includeBase64: true,
    }).then(res => {
      console.log('res', res);
    });
  };

  const onGallery = async () => {
    await launchImageLibrary({
      mediaType: 'photo',
      maxHeight: 300,
      maxWidth: 300,
      includeBase64: true,
    }).then(res => {
      if (!res.didCancel && !res.errorCode && res.assets) {
        const { uri, fileName, type } = res.assets[0];
        const source: ImageSource = {
          uri: Platform.OS === 'ios' ? uri?.replace('file://', '') : uri,
          name: fileName,
          type,
        };
        uploadFile(source).then(file => {
          const profilePicture: ProfileModel.ProfilePicture = {
            profilePicture: file,
          };
          uploadProfile(profilePicture).then(() => {
            dispatchModal({ type: actions.HIDE });

            notifyMessage(
              t('profile.imageSuccess.title'),
              t('profile.imageSuccess.message'),
            );
            dispatch(setProfileImage(file));
          });
        });
      }
    });
  };

  const showAvatarModal = () => {
    dispatchModal({
      type: actions.SHOW,
      component: <AvatarModal onCamera={onCamera} onGallery={onGallery} />,
      direction: 'bottom',
      closeOnBackDropPress: true,
    });
  };
  return (
    <View style={ProfileImageStyle.container}>
      {profileImage ? (
        <TouchableOpacity onPress={showAvatarModal}>
          <CustomImage
            style={ProfileImageStyle.picture}
            width={horizontalScale(84)}
            height={horizontalScale(84)}
            source={{
              uri: profileImage.url,
            }}
            resizeMode="cover"
          />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          style={ProfileImageStyle.image}
          onPress={showAvatarModal}>
          <UserCircleIcon width={80} height={80} />
        </TouchableOpacity>
      )}
      <TouchableOpacity
        style={ProfileImageStyle.editBtn}
        onPress={showAvatarModal}>
        <HeaderEditIcon width={24} />
      </TouchableOpacity>
    </View>
  );
};

export default ProfileImage;

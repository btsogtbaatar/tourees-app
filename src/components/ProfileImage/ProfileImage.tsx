import React, { useContext } from 'react';
import { TouchableOpacity, View } from 'react-native';
import { SearchMdIcon, UserCircleIcon } from '../Icon';
import { ProfileImageStyle } from './ProfileImage.style';
import { ModalContext } from '../../context/modal/modal.context';
import { actions } from '../../context/modal/modal.reducer';
import AvatarModal from './AvatarModal';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { Camera } from 'react-native-vision-camera'

const ProfileImage = () => {
  const { dispatch: dispatchModal } = useContext(ModalContext);

  const onCamera = async () => {
    await Camera.requestCameraPermission();
    await launchCamera({
      mediaType: 'photo',
      maxHeight: 300,
      maxWidth: 300,
      includeBase64: true,
    }).then((res) => {
      console.log('res', res);
    });
  };

  const onGallery = async () => {
    await launchImageLibrary({mediaType: 'photo',
      maxHeight: 300,
      maxWidth: 300,
      includeBase64: true,}).then((res)=>{
        console.log("galley, res", res);
        
      })
  }

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
      <TouchableOpacity style={ProfileImageStyle.image}>
        <UserCircleIcon width={80} height={80} />
      </TouchableOpacity>
      <TouchableOpacity
        style={ProfileImageStyle.editBtn}
        onPress={showAvatarModal}
      >
        <SearchMdIcon />
      </TouchableOpacity>
    </View>
  );
};

export default ProfileImage;

import { Platform, TextInput, TouchableOpacity, View } from 'react-native';
import {
  CameraIcon,
  ImagePlaceHolderIcon,
  SendIcon,
} from '../../../../components/Icon';
import { useState } from 'react';
import { colors, Typography } from '../../../../theme';
import { launchImageLibrary } from 'react-native-image-picker';
import { ImageSource } from '../../../../components/ImageUploadButton/ImageUploadButton';

type Prop = {
  onSubmit: (result: string) => void;
  onImageSubmit: (images: ImageSource[]) => void;
};

const InputSection = ({ onSubmit, onImageSubmit }: Prop) => {
  const [text, setText] = useState('');
  const submit = () => {
    onSubmit(text);
    setText('');
  };
  const chooseFile = () => {
    launchImageLibrary(
      {
        mediaType: 'photo',
        includeBase64: false,
        selectionLimit: 0,
        maxHeight: 200,
        maxWidth: 200,
      },
      response => {
        if (!response.didCancel && !response.errorCode && response.assets) {
          const source = response.assets.map(({ uri, fileName, type }) => {
            return {
              uri: Platform.OS === 'ios' ? uri?.replace('file://', '') : uri,
              name: fileName,
              type,
            } as ImageSource;
          });
          onImageSubmit(source);
        }
      },
    );
  };
  return (
    <View style={{ flexDirection: 'column', marginTop: 16 }}>
      <View style={{ flexDirection: 'row', gap: 10 }}>
        <TouchableOpacity
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            width: 30,
          }}>
          <CameraIcon height={20} width={20} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={chooseFile}
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            width: 30,
          }}>
          <ImagePlaceHolderIcon height={20} width={20} />
        </TouchableOpacity>
        <TextInput
          value={text}
          onChangeText={e => {
            setText(e);
          }}
          placeholder="Aa"
          style={[
            Typography.textRegular,
            {
              backgroundColor: colors.otpBorder,
              borderColor: colors.gray100,
              borderWidth: 1,
              padding: 8,
              borderRadius: 16,
              flex: 1,
            },
          ]}
        />
        <TouchableOpacity
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            width: 30,
          }}
          onPress={submit}>
          <SendIcon height={20} width={20} color={colors.primary500} />
        </TouchableOpacity>
      </View>
    </View>
  );
};
export default InputSection;

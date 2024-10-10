import { TextInput, TouchableOpacity, View } from 'react-native';
import {
  CameraIcon,
  ImagePlaceHolderIcon,
  SendIcon,
} from '../../../../components/Icon';
import { useState } from 'react';
import { colors, Typography } from '../../../../theme';

type Prop = {
  callback: (result: string) => void;
};

const InputSection = ({ callback }: Prop) => {
  const [state, setState] = useState('');
  const submit = () => {
    callback(state);
    setState('');
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
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            width: 30,
          }}>
          <ImagePlaceHolderIcon height={20} width={20} />
        </TouchableOpacity>
        <TextInput
          value={state}
          onChangeText={e => {
            setState(e);
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

import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import { View } from 'react-native';
import RequestMessage from '../../../../components/Requests/RequestMessage';
import { RequestStackParamList } from '../../navigation/types';
import styles from './RequestDetail.style';

type Props = NativeStackScreenProps<RequestStackParamList, 'RequestDetail'>;

const RequestDetail = (props: Props) => {
  const { status } = props.route.params;
  console.log('params', props.route.params);

  return (
    <View style={styles.container}>
      <RequestMessage time="18:11" newRequest={true} />
      {status != 1 && <RequestMessage time="18:11" newRequest={false} />}
    </View>
  );
};

export default RequestDetail;

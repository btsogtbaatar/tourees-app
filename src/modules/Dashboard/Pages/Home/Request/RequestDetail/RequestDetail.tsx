import React from 'react';
import { View } from 'react-native';
import RequestMessage from '../../../../../Component/Requests/RequestMessage';
import styles from './RequestDetail.style';

const RequestDetail = () => {
  return (
    <View style={styles.container}>
      <RequestMessage time="18:11" newRequest={true} />
      <RequestMessage time="18:11" newRequest={false} />
    </View>
  );
};

export default RequestDetail;

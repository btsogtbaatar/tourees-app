import React from 'react';
import { View } from 'react-native';
import RequestMessage from '../../../../../Component/Requests/RequestMessage';
import styles from './RequestDetail.style';
import { RequestModule } from '../../../../../../context/entities/request.model';

interface RequestDetailProps {
  route: {
    params: {
      title: string;
      url: string;
      statusType: RequestModule.StatusType;
    };
  };
}

const RequestDetail = (props: RequestDetailProps) => {
  const { statusType, title, url } = props.route.params;
  console.log('status', statusType);

  return (
    <View style={styles.container}>
      <RequestMessage time="18:11" newRequest={true} />
      {statusType.code != '1' && (
        <RequestMessage time="18:11" newRequest={false} />
      )}
    </View>
  );
};

export default RequestDetail;

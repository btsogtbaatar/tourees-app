import { Text, View } from 'react-native';
import { colors, Typography } from '../../../../theme';
import moment from 'moment';

type Prop = {
  time: string;
};

const LeftSeparator = ({ time }: Prop) => {
  return (
    <View style={{ flexDirection: 'row-reverse' }}>
      <Text style={[Typography.textSmall, { color: colors.gray200 }]}>
        {time}
      </Text>
    </View>
  );
};
const RightSeparator = ({ time }: Prop) => {
  return (
    <View style={{ flexDirection: 'row' }}>
      <Text style={[Typography.textSmall, { color: colors.gray200 }]}>
        {time}
      </Text>
    </View>
  );
};
type TimeProp = {
  time: string;
  userID: number | undefined;
  ownerID: number;
};
const TimeSeparator = ({ time, userID, ownerID }: TimeProp) => {
  if (userID === ownerID) {
    return <LeftSeparator time={time} />;
  } else {
    return <RightSeparator time={time} />;
  }
};

export default TimeSeparator;

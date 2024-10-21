import { FlatList, ImageBackground, Text, View } from 'react-native';
import { TaskModel } from '../../entities/request.model';
import { colors, Typography } from '../../../../theme';
import { verticalScale } from '../../../../utilities';
import moment from 'moment';
import CustomImage from '../../../../components/CustomImage/CustomImage';

type Prop = {
  item: TaskModel.Chat;
};

const RightSpeechBubble = ({ item }: Prop) => {
  return (
    <View style={{ flexDirection: 'row-reverse' }}>
      <View style={{ flexDirection: 'column' }}>
        {item.message?.length > 0 && (
          <View
            style={{
              paddingTop: verticalScale(8),
              paddingBottom: verticalScale(8),
              paddingRight: verticalScale(16),
              paddingLeft: verticalScale(16),
              borderRadius: 16,
              backgroundColor: colors.gray100,
            }}>
            <Text style={[Typography.textSmall]}>{item.message}</Text>
          </View>
        )}
        <FlatList
          numColumns={3}
          scrollEnabled={false}
          data={item?.files}
          keyExtractor={item => item.id.toString()}
          renderItem={({ item }) => {
            return (
              <CustomImage
                key={item.id}
                height={100}
                width={100}
                source={{ uri: item.url }}
              />
            );
          }}
        />
      </View>
    </View>
  );
};
const LeftSpeechBubble = ({ item }: Prop) => {
  return (
    <View style={{ flexDirection: 'row' }}>
      <View style={{ flexDirection: 'column' }}>
        {item.message?.length > 0 && (
          <View
            style={{
              paddingTop: verticalScale(8),
              paddingBottom: verticalScale(8),
              paddingRight: verticalScale(16),
              paddingLeft: verticalScale(16),
              borderRadius: 16,
              borderWidth: 1,
              borderColor: colors.gray100,
            }}>
            <Text style={[Typography.textSmall]}>{item.message}</Text>
          </View>
        )}
        <FlatList
          numColumns={3}
          scrollEnabled={false}
          data={item?.files}
          keyExtractor={item => item.id.toString()}
          renderItem={({ item }) => {
            return (
              <CustomImage
                key={item.id}
                height={100}
                width={100}
                source={{ uri: item.url }}
              />
            );
          }}
        />
      </View>
    </View>
  );
};
type PropBubble = {
  item: TaskModel.Chat;
  id: number | undefined;
};
const SpeechBubble = ({ item, id }: PropBubble) => {
  if (id === item.user.id) {
    return <RightSpeechBubble item={item} />;
  }
  return <LeftSpeechBubble item={item} />;
};

export default SpeechBubble;

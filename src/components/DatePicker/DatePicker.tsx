import { Text, TouchableOpacity, View } from 'react-native';
import { horizontalScale } from '../../utilities';
import DatePicker from 'react-native-date-picker';

interface CustomDatePickerProps {
  date: Date;
  onChange(date: Date): void;
}
const CustomDatePicker: React.FC<CustomDatePickerProps> = ({
  date,
  onChange,
}) => {
  return (
    <View
      style={{
        display: 'flex',
        alignItems: 'center',
      }}>
      <Text
        style={{
          fontFamily: 'Nunito',
          fontWeight: '500',
          lineHeight: 21,
        }}>
        Date and time
      </Text>
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          gap: horizontalScale(16),
        }}>
        <TouchableOpacity>
          <Text>Today</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text>Tomorrow</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text>Date</Text>
        </TouchableOpacity>
      </View>
      <View>
        <Text>{date.toISOString()}</Text>
      </View>
      <DatePicker
        mode="date"
        minimumDate={new Date(Date.now())}
        date={date}
        onDateChange={onChange}
      />
    </View>
  );
};
export default CustomDatePicker;

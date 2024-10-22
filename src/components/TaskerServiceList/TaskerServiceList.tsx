import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { FlatList, Text, TouchableOpacity, View } from 'react-native';
import HomeStyle from '../../modules/Home/pages/Home/Home.style';
import TaskerSearchStyles from '../../modules/Home/pages/TaskerServiceSearch/TaskerServiceSearch.style';
import { SharedModel } from '../../modules/Shared/entities/shared.model';
import { colors } from '../../theme/colors';
import CustomCurrencyView from '../CustomCurrencyView/CustomCurrencyView';
import CustomImage from '../CustomImage/CustomImage';
import { ChevronRightIcon } from '../Icon';
import TaskerServiceListStyle from './TaskerServiceList.style';

interface TaskerServiceListProps {
  title: string | string[];
  services: Array<SharedModel.TaskerServiceModel>;
}

const TaskerServiceList = (props: TaskerServiceListProps) => {
  const { title, services } = props;
  const navigation = useNavigation();
  const { t } = useTranslation();
  return (
    <View>
      <TouchableOpacity
        style={TaskerServiceListStyle.container}
        onPress={() => {
          navigation.navigate('TaskerServiceSearch', {
            subCategoryId: title[1] ? Number(title[1]) : undefined,
            subCategoryName: title[0],
          });
        }}>
        <Text style={TaskerServiceListStyle.title}>{title[0]}</Text>
        <ChevronRightIcon color={colors.gray700} width={16} />
      </TouchableOpacity>
      <FlatList
        data={services}
        horizontal={true}
        scrollEnabled={true}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        keyExtractor={item => item.id.toString()}
        ItemSeparatorComponent={() => <View style={HomeStyle.divider} />}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('TaskerServiceView', {
                id: item.id,
                title: item.name,
              });
            }}>
            {item.files && item.files[0] && (
              <CustomImage
                source={{
                  uri: item.files[0].url,
                }}
                width={150}
                height={120}
              />
            )}
            <Text style={TaskerServiceListStyle.serviceNameStyles}>
              {item.name}
            </Text>
            <CustomCurrencyView amount={item.price} />
            {item.contractor && item.contractor.user && (
              <View style={TaskerSearchStyles.nameContainer}>
                <Text style={TaskerSearchStyles.nameTitle}>
                  {item.contractor.user.lastName &&
                    item.contractor.user.lastName?.charAt(0).toUpperCase() +
                      '.'}
                  {item.contractor.user?.firstName}
                </Text>
                <Text style={TaskerSearchStyles.rateStyles}>
                  {t('service.status.new')}
                </Text>
              </View>
            )}
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default TaskerServiceList;

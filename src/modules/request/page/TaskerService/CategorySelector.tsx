import React, { useRef } from 'react';
import { TouchableOpacity, Text, ScrollView, View } from 'react-native';
import { Controller } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { CustomBottomSheet } from '../../../../components/CustomBottomSheet/CustomBottomSheet';
import CustomBottomScrollViewSheet from '../../../../components/CustomBottomSheetScrollView/CustomBottomSheetScrollView';
import { TaskerServiceStyle } from './TaskerService.style';

interface CategorySelectorProps {
  control: any;
  categories: any;
  selectedCategoryName: string;
  setSelectedCategoryName: (name: string) => void;
  setSelectedCategory: (id: number) => void;
  fetchSubCategories: (id: number, filter: string) => void;
  filter: string;
  subCategorySheetRef: React.RefObject<any>;
}

export default function CategorySelector(props: CategorySelectorProps) {
  const bottomSheetRef = useRef<any>(null);
  const { t } = useTranslation();

  return (
    <Controller
      name="category"
      control={props.control}
      render={({ field: { onChange, value } }) => (
        <>
          <TouchableOpacity
            onPress={() => {
              bottomSheetRef.current?.expand();
              props.setSelectedCategoryName('');
              props.setSelectedCategory(null);
            }}>
            <Text style={TaskerServiceStyle.categoryClickableText}>
              {props.selectedCategoryName || t('service.category.category')}
            </Text>
          </TouchableOpacity>

          <CustomBottomSheet
            ref={bottomSheetRef}
            snapPoints={['50%', '100%']}
            enablePanDownToClose>
            <CustomBottomScrollViewSheet
              style={TaskerServiceStyle.bottomSheetContainer}>
              <View style={TaskerServiceStyle.contentContainer}>
                <ScrollView>
                  {props.categories?.map(category => (
                    <TouchableOpacity
                      key={category.id}
                      style={[
                        TaskerServiceStyle.categoryItem,
                        value === category.id
                          ? TaskerServiceStyle.categoryItemSelected
                          : null,
                      ]}
                      onPress={() => {
                        props.setSelectedCategoryName(category.name);
                        props.setSelectedCategory(category.id);
                        props.fetchSubCategories(category.id, props.filter);
                        bottomSheetRef.current?.close();
                        props.subCategorySheetRef.current?.expand();
                      }}>
                      <Text style={TaskerServiceStyle.categoryItemText}>
                        {category.name}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              </View>
            </CustomBottomScrollViewSheet>
          </CustomBottomSheet>
        </>
      )}
    />
  );
}

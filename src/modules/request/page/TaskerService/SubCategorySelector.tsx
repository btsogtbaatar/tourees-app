import React, { useRef } from 'react';
import { TouchableOpacity, Text, ScrollView, View } from 'react-native';
import { Controller } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { CustomBottomSheet } from '../../../../components/CustomBottomSheet/CustomBottomSheet';
import CustomBottomScrollViewSheet from '../../../../components/CustomBottomSheetScrollView/CustomBottomSheetScrollView';
import CustomInput from '../../../../components/CustomInput/CustomInput';
import { TaskerServiceStyle } from './TaskerService.style';
import { SearchMdIcon } from '../../../../components/Icon/index';
import { colors } from '../../../../theme/colors';
import { SharedModel } from '../../../Shared/entities/shared.model';

interface SubCategorySelectorProps {
  control: any;
  subCategories: SharedModel.SubCategory[] | undefined;
  selectedSubCategoryName: string;
  setSelectedSubCategoryName: (name: string) => void;
  selectedId: number | null;
  setSelectedId: (id: number) => void;
  filter: string;
  setFilter: (text: string) => void;
  debouncedSearch: (categoryId: number, text: string) => void;
  selectedCategory: number;
  subCategorySheetRef: React.RefObject<any>;
}

export default function SubCategorySelector (props:SubCategorySelectorProps){
  
  const { t } = useTranslation();

  return (
    <Controller
      name="subCategory"
      control={props.control}
      render={({ field: { onChange, value } }) => (
        <>
          <TouchableOpacity
            onPress={() => {
              props.subCategorySheetRef.current?.expand();
            }}>
            <Text style={TaskerServiceStyle.categoryClickableText}>
              {props.selectedSubCategoryName || t('service.category.subCategory')}
            </Text>
          </TouchableOpacity>

          <CustomBottomSheet
            ref={props.subCategorySheetRef}
            snapPoints={['50%', '100%']}
            enablePanDownToClose>
            <CustomBottomScrollViewSheet
              style={TaskerServiceStyle.bottomSheetContainer}>
              <View style={TaskerServiceStyle.contentContainer}>
                <CustomInput
                  clearButton
                  placeholder={t('service.category.searchCategory')}
                  icon={
                    <SearchMdIcon
                      style={{ color: colors.primaryGradient }}
                      height={20}
                    />
                  }
                  onChangeText={(text: string) => {
                    props.setFilter(text);
                    props.debouncedSearch(props.selectedCategory, text);
                  }}
                />
                <ScrollView>
                  {props.subCategories?.map(subCategory => (
                    <TouchableOpacity
                      key={subCategory.id}
                      style={[
                        TaskerServiceStyle.categoryItem,
                        props.selectedId === subCategory.id
                          ? TaskerServiceStyle.categoryItemSelected
                          : null,
                      ]}
                      onPress={() => {
                        props.setSelectedSubCategoryName(subCategory.name);
                        props.setSelectedId(subCategory.id);
                        onChange({ id: subCategory.id });
                        props.subCategorySheetRef.current?.close();
                      }}>
                      <Text style={TaskerServiceStyle.categoryItemText}>
                        {subCategory.name}
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
};

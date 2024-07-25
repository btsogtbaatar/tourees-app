import { debounce } from 'lodash';
import React, { useCallback, useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { FlatList, View } from 'react-native';
import { Typography } from '../../constants';
import { SharedModel } from '../../modules/shared/entities/shared.model';
import { Address } from '../../modules/shared/page/MapViewAddress/AddressMapView';
import {
  getNearbyPlacesFromCoordinates,
  getPlacesByText,
} from '../../utilities';
import CustomInput from '../CustomInput/CustomInput';
import { CustomInputStyle } from '../CustomInput/CustomInput.style';
import { CustomPlacesAutoCompleteStyle } from './CustomPlacesAutoComplete.style';
import InfoItem from './InfoItem';
import SuggestionItem from './SuggestionItem';

export interface CustomPlacesAutoCompleteProps {
  address: Address;
  onChange: (value: SharedModel.Place) => void;
}

export default function CustomPlacesAutoComplete(
  props: Readonly<CustomPlacesAutoCompleteProps>,
) {
  const [places, setPlaces] = useState<SharedModel.Place[]>([]);
  const [selectedPlace, setSelectedPlace] = useState<
    SharedModel.Place | undefined
  >();
  const [loading, setLoading] = useState(false);
  const { t } = useTranslation(undefined, { keyPrefix: 'addressMapView' });

  const form = useForm({
    mode: 'onChange',
  });

  useEffect(() => {
    if (props.address.displayName === undefined) {
      setSelectedPlace(undefined);
      setLoading(true);

      getNearbyPlacesFromCoordinates(props.address)
        .then(setPlaces)
        .finally(() => setLoading(false));
    }
  }, [props.address]);

  const onChangeText = (text: string) => {
    if (text.length > 0) {
      setSelectedPlace(undefined);
      setLoading(true);

      getPlacesByText(text)
        .then(setPlaces)
        .finally(() => setLoading(false));
    } else {
      setPlaces([]);
    }
  };

  const handler = useCallback(debounce(onChangeText, 500), []);

  const renderSeperator = () => (
    <View style={CustomPlacesAutoCompleteStyle.seperator} />
  );

  const onItemPressed = (place: SharedModel.Place) => {
    form.setValue('name', '');
    setSelectedPlace(place);
    props.onChange(place);
  };

  return (
    <View style={CustomPlacesAutoCompleteStyle.container}>
      <FormProvider {...form}>
        <CustomInput
          numberOfLines={2}
          style={{
            container: !selectedPlace
              ? CustomInputStyle.containerWithSuggestion
              : undefined,
            input: Typography.textSmaller,
          }}
          clearButton
          name={'name'}
          placeholder={t('autoComplete.placeholder')}
          onChangeText={handler}
        />
      </FormProvider>
      {selectedPlace === undefined && (
        <View style={CustomPlacesAutoCompleteStyle.listContainer}>
          {loading ? (
            <InfoItem label={t('autoComplete.loading')} />
          ) : (
            <FlatList
              scrollEnabled={true}
              data={places}
              ListEmptyComponent={
                <InfoItem label={t('autoComplete.notFound')} />
              }
              ItemSeparatorComponent={renderSeperator}
              renderItem={place => (
                <SuggestionItem place={place.item} onPress={onItemPressed} />
              )}
            />
          )}
        </View>
      )}
    </View>
  );
}

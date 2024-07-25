import { debounce } from 'lodash';
import React, { useCallback, useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
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

  return (
    <View style={CustomPlacesAutoCompleteStyle.wrappingContainer}>
      <FormProvider {...form}>
        <CustomInput
          numberOfLines={2}
          style={{
            container: !selectedPlace
              ? CustomInputStyle.containerWithSuggestion
              : undefined,
            input: Typography.textSmaller,
          }}
          enableClear
          name={'name'}
          placeholder="Хайх хаягаа оруулна уу."
          onChangeText={handler}
        />
      </FormProvider>
      {selectedPlace === undefined && (
        <View style={CustomPlacesAutoCompleteStyle.container}>
          {loading ? (
            <InfoItem label={'Уншиж байна...'} />
          ) : (
            <FlatList
              scrollEnabled={true}
              data={places}
              ListEmptyComponent={<InfoItem label={'Хаяг олдсонгүй.'} />}
              ItemSeparatorComponent={() => (
                <View style={CustomPlacesAutoCompleteStyle.seperator} />
              )}
              renderItem={place => (
                <SuggestionItem
                  place={place.item}
                  onPress={_place => {
                    form.setValue('name', '');
                    setSelectedPlace(_place);
                    props.onChange(_place);
                  }}
                />
              )}
            />
          )}
        </View>
      )}
    </View>
  );
}

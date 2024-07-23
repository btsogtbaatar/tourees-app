import { debounce } from 'lodash';
import React, { useCallback, useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { FlatList, View } from 'react-native';
import { LatLng } from 'react-native-maps';
import { Typography } from '../../constants';
import { SharedModel } from '../../modules/shared/entities/shared.model';
import {
  getNearbyPlacesFromCoordinates,
  getPlacesByText,
} from '../../utilities';
import CustomInput from '../CustomInput/CustomInput';
import { CustomInputStyle } from '../CustomInput/CustomInput.style';
import { CustomPlacesAutoCompleteStyle } from './CustomPlacesAutoComplete.style';
import InfoItem from './InfoItem';
import SelectedPlace from './SelectedPlace';
import SuggestionItem from './SuggestionItem';

export interface CustomPlacesAutoCompleteProps {
  latLng: LatLng;
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
    if (
      props.latLng.latitude !== selectedPlace?.location.latitude &&
      props.latLng.longitude !== selectedPlace?.location.longitude
    ) {
      setSelectedPlace(undefined);
      setLoading(true);

      getNearbyPlacesFromCoordinates(props.latLng)
        .then(setPlaces)
        .finally(() => setLoading(false));
    }
  }, [props.latLng]);

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
    <View>
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
      {selectedPlace !== undefined && (
        <SelectedPlace
          place={selectedPlace}
          onDelete={() => setSelectedPlace(undefined)}
        />
      )}
    </View>
  );
}

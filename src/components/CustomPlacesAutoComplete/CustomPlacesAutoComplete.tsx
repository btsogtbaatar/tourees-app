import { debounce } from 'lodash';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FlatList, View } from 'react-native';
import { SharedModel } from '../../modules/Shared/entities/shared.model';
import { Address } from '../../modules/Shared/pages/AddressMapView/AddressesMapView';
import { Typography } from '../../theme';
import {
  getNearbyPlacesFromCoordinates,
  getPlacesByText,
} from '../../utilities';
import CustomInput, { CustomInputRef } from '../CustomInput/CustomInput';
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
  const textInputRef = useRef<CustomInputRef>(null);

  useEffect(() => {
    // TODO: Compare with radius

    if (
      props.address.latitude !== selectedPlace?.location.latitude &&
      props.address.longitude !== selectedPlace?.location.longitude
    ) {
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

      getPlacesByText(text, props.address)
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
    textInputRef.current?.clear();
    setSelectedPlace(place);
    props.onChange(place);
  };

  return (
    <View style={CustomPlacesAutoCompleteStyle.container}>
      <CustomInput
        ref={textInputRef}
        style={{
          container: !selectedPlace
            ? CustomInputStyle.containerWithSuggestion
            : undefined,
          input: Typography.textSmaller,
        }}
        clearButton
        placeholder={t('autoComplete.placeholder')}
        onChangeText={handler}
      />
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

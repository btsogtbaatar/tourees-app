import axios, { AxiosResponse } from 'axios';
import { LatLng } from 'react-native-maps';
import { SharedModel } from '../modules/Shared/entities/shared.model';
import i18n from '../../i18n';

export const excludedTypes = [
  'administrative_area_level_1',
  'administrative_area_level_2',
  'country',
  'locality',
  'postal_code',
  'school_district',
];

export const headers = {
  'Content-Type': 'application/json',
  'X-Goog-Api-Key': process.env.GOOGLE_API_KEY,
  'X-Goog-FieldMask':
    'places.id,places.displayName,places.location,places.types,places.formattedAddress,places.shortFormattedAddress',
};

export async function getNearbyPlacesFromCoordinates(
  latLng: LatLng,
): Promise<SharedModel.Place[]> {
  const url = 'https://places.googleapis.com/v1/places:searchNearby';

  let response: AxiosResponse<SharedModel.NearbyPlacesResponse> =
    await axios.post(
      url,
      {
        excludedTypes: excludedTypes,
        maxResultCount: 10,
        languageCode: i18n.language,
        rankPreference: 'DISTANCE',
        locationRestriction: {
          circle: {
            center: {
              latitude: latLng.latitude,
              longitude: latLng.longitude,
            },
            radius: 500,
          },
        },
      },
      {
        headers: headers,
      },
    );
  return response.data?.places ? response.data.places : [];
}

export async function getPlacesByText(
  text: string,
  latlng: LatLng,
): Promise<SharedModel.Place[]> {
  if (text.length === 0) {
    return [];
  }

  const url = 'https://places.googleapis.com/v1/places:searchText';

  let response: AxiosResponse<SharedModel.NearbyPlacesResponse> =
    await axios.post(
      url,
      {
        textQuery: text,
        pageSize: 10,
        languageCode: i18n.language,
        rankPreference: 'RELEVANCE',
        locationBias: {
          circle: {
            center: {
              latitude: latlng.latitude,
              longitude: latlng.longitude,
            },
            radius: 50000,
          },
        },
      },
      {
        headers: headers,
      },
    );

  return response.data?.places ? response.data.places : [];
}

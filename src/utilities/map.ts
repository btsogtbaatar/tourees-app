import Geocoder from 'react-native-geocoding';
import { TaskModel } from '../modules/request/entities/request.model';

export const getAddressFromCoordinates = (
  coordinates: TaskModel.RequestAdditional,
): Promise<TaskModel.RequestAdditional> => {
  return new Promise((resolve, reject) => {
    Geocoder.from(coordinates).then(response => {
      let places = response.results.filter(
        types => types.types.filter(_type => _type === 'route').length > 0,
      );

      console.log('🚀 ~ places:', places);

      if (places && places.length > 0) {
        resolve({
          address: places[0].formatted_address,
          latitude: places[0].geometry.location.lat,
          longitude: places[0].geometry.location.lng,
        });
      } else {
        reject(new Error('Place not found.'));
      }
    });
  });
};

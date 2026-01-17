import { useCallback } from 'react';
import type { FormattedLocation, LocationData } from '../types/location';

export const useLocationFormatter = (data: LocationData[] | undefined) => {
	const formatLocationData = useCallback(():
		| FormattedLocation[]
		| undefined => {
		if (!data) return undefined;

		return data.map((location: LocationData): FormattedLocation => {
			return {
				text: location.text,
				placeName: !location.place_type.includes('country')
					? location.place_name
					: '',
				longitude: +location.geometry.coordinates[0].toFixed(2),
				latitude: +location.geometry.coordinates[1].toFixed(2),
			};
		});
	}, [data]);

	return formatLocationData;
};

export interface LocationData {
	text: string;
	place_type: string[];
	place_name: string;
	geometry: {
		coordinates: [number, number];
	};
}

export interface FormattedLocation {
	text: string;
	placeName: string;
	longitude: number;
	latitude: number;
}

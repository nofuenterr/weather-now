import type {
	PrecipitationUnit,
	TemperatureUnit,
	WindSpeedUnit,
} from '../stores/units';

export function isTemperatureUnit(value: string): value is TemperatureUnit {
	return value === 'celsius' || value === 'fahrenheit';
}

export function isWindSpeedUnit(value: string): value is WindSpeedUnit {
	return value === 'km/h' || value === 'mph';
}

export function isPrecipitationUnit(value: string): value is PrecipitationUnit {
	return value === 'mm' || value === 'in';
}

import type {
	PrecipitationUnit,
	TemperatureUnit,
	WindSpeedUnit,
} from '../stores/units';

export function getTemperature(
	value: number,
	unit: TemperatureUnit,
	decimalPlaces: number
): string {
	if (unit === 'celsius') return `${value.toFixed(decimalPlaces)}°`;
	if (unit === 'fahrenheit')
		return `${(value * 1.8 + 32).toFixed(decimalPlaces)}°`;
	return `${value.toFixed(decimalPlaces)}°`;
}

export function getWindSpeed(
	value: number,
	unit: WindSpeedUnit,
	decimalPlaces: number
): string {
	if (unit === 'km/h') return `${value.toFixed(decimalPlaces)} km/h`;
	if (unit === 'mph') return `${(value / 1.609).toFixed(decimalPlaces)} mph`;
	return `${value.toFixed(decimalPlaces)} km/h`;
}

export function getPrecipitation(
	value: number,
	unit: PrecipitationUnit,
	decimalPlaces: number
): string {
	if (unit === 'mm') return `${value.toFixed(decimalPlaces)} mm`;
	if (unit === 'in') return `${(value / 25.4).toFixed(decimalPlaces)} in`;
	return `${value.toFixed(decimalPlaces)} mm`;
}

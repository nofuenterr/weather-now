import type { WeatherCodeTypes } from '../utils/getWeatherIcon';

export type TemperatureUnitType = '°C' | '°F';
export type WindSpeedUnitType = 'km/h' | 'mph';
export type PrecipitationUnitType = 'mm' | 'in';

export interface CurrentUnits {
	temperature_2m: TemperatureUnitType;
	apparent_temperature: TemperatureUnitType;
	relative_humidity_2m: '%';
	wind_speed_10m: WindSpeedUnitType;
	precipitation: PrecipitationUnitType;
	weather_code: 'wmo code';
}

export interface CurrentData {
	temperature_2m: number;
	apparent_temperature: number;
	relative_humidity_2m: number;
	wind_speed_10m: number;
	precipitation: number;
	weather_code: WeatherCodeTypes;
}

export interface HourlyUnits {
	time: 'iso8601';
	temperature_2m: TemperatureUnitType;
	weather_code: 'wmo code';
}

export interface HourlyData {
	time: string[];
	temperature_2m: number[];
	weather_code: WeatherCodeTypes[];
}

export interface DailyUnits {
	time: 'iso8601';
	temperature_2m_min: TemperatureUnitType;
	temperature_2m_max: TemperatureUnitType;
	weather_code: 'wmo code';
}

export interface DailyData {
	time: string[];
	temperature_2m_min: number[];
	temperature_2m_max: number[];
	weather_code: WeatherCodeTypes[];
}

export interface WeatherData {
	current_units: CurrentUnits;
	current: CurrentData;
	hourly_units: HourlyUnits;
	hourly: HourlyData;
	daily_units: DailyUnits;
	daily: DailyData;
}

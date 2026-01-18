export type TemperatureUnitType = '°C' | '°F';
export type WindSpeedUnitType = 'km/h' | 'mph';
export type PrecipitationUnitType = 'mm' | 'in';

export interface CurrentUnits {
	temperature_2m: TemperatureUnitType;
	apparent_temperature: TemperatureUnitType;
	relative_humidity_2m: '%';
	wind_speed_10m: WindSpeedUnitType;
	precipitation: PrecipitationUnitType;
}

export interface CurrentData {
	temperature_2m: number;
	apparent_temperature: number;
	relative_humidity_2m: number;
	wind_speed_10m: number;
	precipitation: number;
}

export interface HourlyUnits {
	time: 'iso8601';
	temperature_2m: TemperatureUnitType;
}

export interface HourlyData {
	time: string[];
	temperature_2m: number[];
}

export interface DailyUnits {
	time: 'iso8601';
	temperature_2m_min: TemperatureUnitType;
	temperature_2m_max: TemperatureUnitType;
}

export interface DailyData {
	time: string[];
	temperature_2m_min: number[];
	temperature_2m_max: number[];
}

export interface WeatherData {
	current_units: CurrentUnits;
	current: CurrentData;
	hourly_units: HourlyUnits;
	hourly: HourlyData;
	daily_units: DailyUnits;
	daily: DailyData;
}

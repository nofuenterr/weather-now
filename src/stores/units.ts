import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { persist } from 'zustand/middleware';

export type UnitSystems = 'metric' | 'imperial';
export type TemperatureUnit = 'celsius' | 'fahrenheit';
export type WindSpeedUnit = 'km/h' | 'mph';
export type PrecipitationUnit = 'mm' | 'in';

export interface UnitsState {
	unitSystem: UnitSystems;
	temperatureUnit: TemperatureUnit;
	windSpeedUnit: WindSpeedUnit;
	precipitationUnit: PrecipitationUnit;
	setUnitSystem: (unitSystem: UnitSystems) => void;
	setTemperatureUnit: (temperatureUnit: TemperatureUnit) => void;
	setWindSpeedUnit: (windSpeedUnit: WindSpeedUnit) => void;
	setPrecipitationUnit: (precipitationUnit: PrecipitationUnit) => void;
}

export const useUnitsStore = create<UnitsState>()(
	persist(
		immer((set) => ({
			unitSystem: 'metric',
			temperatureUnit: 'celsius',
			windSpeedUnit: 'km/h',
			precipitationUnit: 'mm',
			setUnitSystem: (unitSystem: UnitSystems) => set({ unitSystem }),
			setTemperatureUnit: (temperatureUnit: TemperatureUnit) =>
				set({ temperatureUnit }),
			setWindSpeedUnit: (windSpeedUnit: WindSpeedUnit) =>
				set({ windSpeedUnit }),
			setPrecipitationUnit: (precipitationUnit: PrecipitationUnit) =>
				set({ precipitationUnit }),
		})),
		{
			name: 'units-storage',
		}
	)
);

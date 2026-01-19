import { useUnitsStore } from '../stores/units';
import type { ShortDayLabelTypes } from '../types/dayLabel';
import type { DailyData } from '../types/weatherData';
import { formatDayOfWeek } from '../utils/formatTimeAndDate';
import { getTemperature } from '../utils/getValuesFromUnits';
import getWeatherIcon, { type WeatherCodeTypes } from '../utils/getWeatherIcon';

interface DailyForecastProps {
	dailyData: DailyData;
}

export default function DailyForecast({ dailyData }: DailyForecastProps) {
	const temperatureUnit = useUnitsStore((s) => s.temperatureUnit);

	return (
		<section className="grid gap-5">
			<h2 className="text-xl font-semibold">Daily forecast</h2>
			<ul className="grid grid-cols-[repeat(auto-fit,minmax(76px,1fr))] gap-4">
				{Array.from({ length: 7 }, (_, index) => index).map((_, index) => {
					return (
						<DailyWeatherCard
							key={formatDayOfWeek(dailyData.time[index])}
							dayLabel={formatDayOfWeek(dailyData.time[index])}
							maxTemp={getTemperature(
								dailyData.temperature_2m_max[index],
								temperatureUnit,
								0
							)}
							minTemp={getTemperature(
								dailyData.temperature_2m_min[index],
								temperatureUnit,
								0
							)}
							weatherCode={dailyData.weather_code[index]}
						/>
					);
				})}
			</ul>
		</section>
	);
}

interface DailyWeatherCardProps {
	dayLabel: ShortDayLabelTypes;
	maxTemp: string;
	minTemp: string;
	weatherCode: WeatherCodeTypes;
}

function DailyWeatherCard({
	dayLabel,
	maxTemp,
	minTemp,
	weatherCode,
}: DailyWeatherCardProps) {
	return (
		<li className="grid justify-center gap-4 rounded-xl bg-neutral-800 px-2.5 py-4">
			<h3 className="text-center text-[1.125rem]">{dayLabel}</h3>
			<div className="size-15">
				<img src={getWeatherIcon(weatherCode)} alt="Weather icon" />
			</div>
			<div className="flex items-center justify-between">
				<span>{maxTemp}</span>
				<span className="text-neutral-200">{minTemp}</span>
			</div>
		</li>
	);
}

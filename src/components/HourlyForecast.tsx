import type { Dispatch, SetStateAction } from 'react';
import { useUnitsStore } from '../stores/units';
import type { FullDayLabelTypes } from '../types/dayLabel';
import type { HourlyData } from '../types/weatherData';
import type { WeatherCodeTypes } from '../utils/getWeatherIcon';
import { formatHourOfDay } from '../utils/formatTimeAndDate';
import {
	currentDayOfTheWeek,
	getHourOffsetFromToday,
	getNumberOfHours,
} from '../utils/getTimeAndDate';
import { getTemperature } from '../utils/getValuesFromUnits';
import getWeatherIcon from '../utils/getWeatherIcon';
import SelectDay from './SelectDay';

interface HourlyForecastProps {
	selectedDay: FullDayLabelTypes;
	setSelectedDay: Dispatch<SetStateAction<FullDayLabelTypes>>;
	hourlyData: HourlyData;
}

export default function HourlyForecast({
	selectedDay,
	setSelectedDay,
	hourlyData,
}: HourlyForecastProps) {
	const temperatureUnit = useUnitsStore((s) => s.temperatureUnit);

	const hourOffsetFromToday = getHourOffsetFromToday(selectedDay);
	const numberOfHours = getNumberOfHours(selectedDay);

	return (
		<section className="grid content-start gap-4 rounded-[20px] bg-neutral-800 px-4 py-5 md:p-6 xl:col-start-2 xl:row-start-1 xl:row-end-3">
			<div className="flex items-center justify-between">
				<h2 className="text-xl font-semibold">Hourly forecast</h2>
				<SelectDay
					currentDayOfTheWeek={currentDayOfTheWeek}
					setSelectedDay={setSelectedDay}
				/>
			</div>

			<ul className="grid gap-4">
				{Array.from({ length: numberOfHours }, (_, index) => index).map(
					(_, index) => {
						return (
							<HourlyWeatherCard
								key={`${currentDayOfTheWeek}-${formatHourOfDay(
									hourlyData.time[hourOffsetFromToday + index]
								)}`}
								timeLabel={formatHourOfDay(
									hourlyData.time[hourOffsetFromToday + index]
								)}
								temp={getTemperature(
									hourlyData.temperature_2m[hourOffsetFromToday + index],
									temperatureUnit,
									0
								)}
								weatherCode={
									hourlyData.weather_code[hourOffsetFromToday + index]
								}
							/>
						);
					}
				)}
			</ul>
		</section>
	);
}

interface HourlyWeatherCardProps {
	timeLabel: string;
	temp: string;
	weatherCode: WeatherCodeTypes;
}

function HourlyWeatherCard({
	timeLabel,
	temp,
	weatherCode,
}: HourlyWeatherCardProps) {
	return (
		<li className="flex items-center justify-between rounded-lg border border-neutral-600 bg-neutral-700 px-3 py-2.5">
			<div className="flex items-center gap-2">
				<div className="size-10">
					<img src={getWeatherIcon(weatherCode)} alt="Weather icon" />
				</div>
				<h3 className="text-xl">{timeLabel}</h3>
			</div>

			<p className="">{temp}</p>
		</li>
	);
}

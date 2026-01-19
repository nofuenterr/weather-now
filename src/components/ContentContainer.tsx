import { useState } from 'react';
import type { WeatherData } from '../types/weatherData';
import type { FormattedLocation } from '../types/location';
import type { FullDayLabelTypes } from '../types/dayLabel';
import { currentDayOfTheWeek } from '../utils/getTimeAndDate';
import CurrentForecast from './CurrentForecast';
import DailyForecast from './DailyForecast';
import HourlyForecast from './HourlyForecast';

interface ContentContainerProps {
	weatherData: WeatherData;
	query: FormattedLocation;
}

export default function ContentContainer({
	weatherData,
	query,
}: ContentContainerProps) {
	const [selectedDay, setSelectedDay] =
		useState<FullDayLabelTypes>(currentDayOfTheWeek);

	return (
		<div className="grid gap-8 xl:grid-cols-[1fr_24rem]">
			<CurrentForecast query={query} currentData={weatherData.current} />

			<DailyForecast dailyData={weatherData.daily} />

			<HourlyForecast
				selectedDay={selectedDay}
				setSelectedDay={setSelectedDay}
				hourlyData={weatherData.hourly}
			/>
		</div>
	);
}

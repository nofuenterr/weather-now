import { useUnitsStore } from '../stores/units';
import type { FormattedLocation } from '../types/location';
import type { CurrentData } from '../types/weatherData';
import { formatDate } from '../utils/formatTimeAndDate';
import { today } from '../utils/getTimeAndDate';
import {
	getPrecipitation,
	getTemperature,
	getWindSpeed,
} from '../utils/getValuesFromUnits';
import getWeatherIcon from '../utils/getWeatherIcon';

interface CurrentForecastProps {
	query: FormattedLocation;
	currentData: CurrentData;
}

export default function CurrentForecast({
	currentData,
	query,
}: CurrentForecastProps) {
	const temperatureUnit = useUnitsStore((s) => s.temperatureUnit);
	const windSpeedUnit = useUnitsStore((s) => s.windSpeedUnit);
	const precipitationUnit = useUnitsStore((s) => s.precipitationUnit);

	return (
		<section className="grid gap-5">
			<div className='grid gap-4 rounded-[20px] bg-[url("/src/assets/images/bg-today-small.svg")] bg-cover bg-center bg-no-repeat px-6 py-10 md:grid-cols-[auto_1fr] md:bg-[url("/src/assets/images/bg-today-large.svg")] md:py-20'>
				<div className="grid gap-3 text-center md:self-center md:justify-self-start md:text-start">
					<h1 className="text-[1.75rem] font-bold text-balance">
						{query.placeName}
					</h1>
					<p className="text-[1.125rem]">{formatDate(today)}</p>
				</div>

				<div className="flex flex-wrap items-center justify-center gap-5 justify-self-center md:justify-end md:justify-self-end">
					<div className="size-30 rounded-full">
						<img
							src={getWeatherIcon(currentData.weather_code)}
							alt="Weather icon"
						/>
					</div>

					<p className="text-8xl leading-none font-semibold tracking-[-2%] italic [@media(max-width:25rem)]:text-7xl">
						{getTemperature(currentData.temperature_2m, temperatureUnit, 1)}
					</p>
				</div>
			</div>

			<div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-5 lg:gap-6">
				<WeatherDataCard
					label="Feels Like"
					value={getTemperature(
						currentData.apparent_temperature,
						temperatureUnit,
						1
					)}
				/>
				<WeatherDataCard
					label="Humidity"
					value={`${currentData.relative_humidity_2m}%`}
				/>
				<WeatherDataCard
					label="Wind"
					value={getWindSpeed(currentData.wind_speed_10m, windSpeedUnit, 1)}
				/>
				<WeatherDataCard
					label="Precipitation"
					value={getPrecipitation(
						currentData.precipitation,
						precipitationUnit,
						2
					)}
				/>
			</div>
		</section>
	);
}

interface WeatherDataCardProps {
	label: string;
	value: string;
}

function WeatherDataCard({ label, value }: WeatherDataCardProps) {
	return (
		<div className="grid gap-6 rounded-xl border border-neutral-600 bg-neutral-800 p-5">
			<h2 className="truncate text-[1.125rem] text-neutral-200">{label}</h2>
			<p className="text-2xl leading-none font-light [@media(max-width:25rem)]:text-xl">
				{value}
			</p>
		</div>
	);
}

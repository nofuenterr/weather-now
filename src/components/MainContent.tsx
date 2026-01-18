import { Select } from 'radix-ui';
import DropdownIcon from './icons/DropdownIcon';
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import SearchLocation from './SearchLocation';
import type { FormattedLocation } from '../types/location';
import type { WeatherData } from '../types/weatherData';
import { format } from 'date-fns';
import WeatherDataLoading from './WeatherDataLoading';

async function fetchWeatherData(location: string | FormattedLocation | null) {
	if (!location || typeof location === 'string') return null;
	const response = await fetch(
		`https://api.open-meteo.com/v1/forecast?latitude=${location.latitude}4&longitude=${location.longitude}&daily=temperature_2m_min,temperature_2m_max&hourly=temperature_2m&current=apparent_temperature,temperature_2m,relative_humidity_2m,wind_speed_10m,precipitation&timezone=auto`
	);
	if (!response.ok) throw new Error('Network error');
	return response.json();
}

export default function MainContent() {
	const [query, setQuery] = useState<FormattedLocation | null>(null);

	const { data, isLoading, error } = useQuery({
		queryKey: ['weatherData', query],
		queryFn: () => {
			return fetchWeatherData(query);
		},
	});

	return (
		<main className="grid gap-8">
			{error ? (
				<ErrorDisplay error={error} />
			) : (
				<>
					<p className="font-header mb-4 text-center text-[3.25rem] font-bold text-balance lg:mb-8">
						How’s the sky looking today?
					</p>

					<div className="grid auto-rows-[3.5rem] gap-3 md:grid-cols-[1fr_7.125rem] md:gap-4 lg:grid-cols-[minmax(0,32.875rem)_7.125rem] lg:justify-self-center">
						<SearchLocation query={query} setQuery={setQuery} />

						<button className="cursor-pointer rounded-xl bg-blue-500 px-6 py-4 hover:bg-blue-700 focus-visible:outline-3 focus-visible:outline-offset-3 focus-visible:outline-blue-500">
							Search
						</button>
					</div>

					{isLoading ? (
						<WeatherDataLoading />
					) : data && query ? (
						<ContentContainer weatherData={data} query={query} />
					) : query ? (
						<NoResults />
					) : (
						<SearchNow />
					)}
				</>
			)}
		</main>
	);
}

function ErrorDisplay({ error }: { error: Error }) {
	return (
		<div className="grid justify-items-center gap-6 pt-10 text-center">
			<div>
				<svg
					width={41}
					height={41}
					viewBox="0 0 41 41"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						d="M20.344 0C31.5 0 40.687 9.188 40.687 20.344c0 11.238-9.187 20.343-20.343 20.343C9.105 40.688 0 31.582 0 20.345 0 9.187 9.105 0 20.344 0zM31.91 8.777C25.922 2.79 16.57 2.461 10.172 7.465l23.05 23.05c5.005-6.398 4.676-15.75-1.312-21.738zM8.695 31.992c5.989 5.988 15.34 6.317 21.739 1.313L7.383 10.254c-5.004 6.398-4.676 15.75 1.312 21.738z"
						className="fill-neutral-200"
					/>
				</svg>
			</div>
			<h1 className="font-header text-[3.25rem] font-bold text-balance">
				Something went wrong
			</h1>
			<p className="text-xl">An error has occured. {error.message}</p>
			<button className="flex cursor-pointer justify-center gap-2.5 rounded-lg bg-neutral-800 px-2.5 py-3">
				<div className="aria-hidden:">
					<svg
						width={16}
						height={16}
						viewBox="0 0 16 16"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							d="M14.875.656c.25-.25.656-.062.656.25v4.469a.38.38 0 01-.375.375h-4.5a.36.36 0 01-.25-.625l1.688-1.688A5.992 5.992 0 007.78 1.625a6.134 6.134 0 00-6.125 5.781c-.031.219-.187.344-.375.344H.406c-.219 0-.406-.156-.375-.375C.22 3.281 3.625 0 7.781 0c2.125 0 4.063.875 5.469 2.281L14.875.656zm.25 7.094c.219 0 .406.188.375.406-.188 4.094-3.594 7.344-7.719 7.344-2.156 0-4.093-.844-5.5-2.25L.656 14.875a.36.36 0 01-.625-.25v-4.5a.38.38 0 01.375-.375h4.469c.313 0 .5.406.25.656l-1.688 1.688c1.094 1.125 2.626 1.781 4.344 1.781a6.1 6.1 0 006.094-5.75c.031-.219.188-.375.375-.375h.875z"
							className="fill-neutral-0"
						/>
					</svg>
				</div>
				<span>Retry</span>
			</button>
		</div>
	);
}

interface ContentContainerProps {
	weatherData: WeatherData;
	query: FormattedLocation;
}

const today: number = Date.now();

function ContentContainer({ weatherData, query }: ContentContainerProps) {
	function formatDate(date: number): string {
		return format(new Date(date), 'EEEE, LLL d, u');
	}

	function formatDayOfWeek(date: string): DayLabelTypes {
		return format(new Date(date), 'iii') as DayLabelTypes;
	}

	function formatHourOfDay(date: string): string {
		return format(new Date(date), 'h a');
	}

	function getCurrentHour(): number {
		return +format(new Date(today), 'H');
	}

	return (
		<div className="grid gap-8 xl:grid-cols-[1fr_24rem]">
			<section className="grid gap-5">
				<div className='grid gap-4 rounded-[20px] bg-[url("/src/assets/images/bg-today-small.svg")] bg-cover bg-center bg-no-repeat px-6 py-10 md:grid-cols-[auto_1fr] md:bg-[url("/src/assets/images/bg-today-large.svg")] md:py-20'>
					<div className="grid gap-3 text-center md:self-center md:justify-self-start md:text-start">
						<h1 className="text-[1.75rem] font-bold text-balance">
							{query.placeName}
						</h1>
						<p className="text-[1.125rem]">{formatDate(today)}</p>
					</div>

					<div className="flex flex-wrap items-center justify-center gap-5 justify-self-center md:justify-end md:justify-self-end">
						<div className="size-30 rounded-full border border-neutral-900"></div>

						<p className="text-8xl leading-none font-semibold tracking-[-2%] italic [@media(max-width:25rem)]:text-7xl">
							{`${weatherData.current.temperature_2m}${weatherData.current_units.temperature_2m}`}
						</p>
					</div>
				</div>

				<div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-5 lg:gap-6">
					<WeatherDataCard
						label="Feels Like"
						value={`${weatherData.current.apparent_temperature}${weatherData.current_units.apparent_temperature}`}
					/>
					<WeatherDataCard
						label="Humidity"
						value={`${weatherData.current.relative_humidity_2m}${weatherData.current_units.relative_humidity_2m}`}
					/>
					<WeatherDataCard
						label="Wind"
						value={`${weatherData.current.wind_speed_10m} ${weatherData.current_units.wind_speed_10m}`}
					/>
					<WeatherDataCard
						label="Precipitation"
						value={`${weatherData.current.precipitation} ${weatherData.current_units.precipitation}`}
					/>
				</div>
			</section>

			<section className="grid gap-5">
				<h2 className="text-xl font-semibold">Daily forecast</h2>
				<ul className="grid grid-cols-[repeat(auto-fit,minmax(76px,1fr))] gap-4">
					<DailyWeatherCard
						dayLabel={formatDayOfWeek(weatherData.daily.time[0])}
						maxTemp={`${weatherData.daily.temperature_2m_max[0].toFixed(0)}°`}
						minTemp={`${weatherData.daily.temperature_2m_min[0].toFixed(0)}°`}
					/>
					<DailyWeatherCard
						dayLabel={formatDayOfWeek(weatherData.daily.time[1])}
						maxTemp={`${weatherData.daily.temperature_2m_max[1].toFixed(0)}°`}
						minTemp={`${weatherData.daily.temperature_2m_min[1].toFixed(0)}°`}
					/>
					<DailyWeatherCard
						dayLabel={formatDayOfWeek(weatherData.daily.time[2])}
						maxTemp={`${weatherData.daily.temperature_2m_max[2].toFixed(0)}°`}
						minTemp={`${weatherData.daily.temperature_2m_min[2].toFixed(0)}°`}
					/>
					<DailyWeatherCard
						dayLabel={formatDayOfWeek(weatherData.daily.time[3])}
						maxTemp={`${weatherData.daily.temperature_2m_max[3].toFixed(0)}°`}
						minTemp={`${weatherData.daily.temperature_2m_min[3].toFixed(0)}°`}
					/>
					<DailyWeatherCard
						dayLabel={formatDayOfWeek(weatherData.daily.time[4])}
						maxTemp={`${weatherData.daily.temperature_2m_max[4].toFixed(0)}°`}
						minTemp={`${weatherData.daily.temperature_2m_min[4].toFixed(0)}°`}
					/>
					<DailyWeatherCard
						dayLabel={formatDayOfWeek(weatherData.daily.time[5])}
						maxTemp={`${weatherData.daily.temperature_2m_max[5].toFixed(0)}°`}
						minTemp={`${weatherData.daily.temperature_2m_min[5].toFixed(0)}°`}
					/>
					<DailyWeatherCard
						dayLabel={formatDayOfWeek(weatherData.daily.time[6])}
						maxTemp={`${weatherData.daily.temperature_2m_max[6].toFixed(0)}°`}
						minTemp={`${weatherData.daily.temperature_2m_min[6].toFixed(0)}°`}
					/>
				</ul>
			</section>

			<section className="grid h-min content-start gap-4 rounded-[20px] bg-neutral-800 px-4 py-5 md:p-6 xl:col-start-2 xl:row-start-1 xl:row-end-3">
				<div className="flex items-center justify-between">
					<h2 className="text-xl font-semibold">Hourly forecast</h2>
					<SelectDay />
				</div>

				<ul className="grid gap-4">
					<HourlyWeatherCard
						timeLabel={formatHourOfDay(
							weatherData.hourly.time[getCurrentHour()]
						)}
						minTemp={`${weatherData.hourly.temperature_2m[0].toFixed(0)}°`}
					/>
					<HourlyWeatherCard
						timeLabel={formatHourOfDay(
							weatherData.hourly.time[getCurrentHour() + 1]
						)}
						minTemp={`${weatherData.hourly.temperature_2m[1].toFixed(0)}°`}
					/>
					<HourlyWeatherCard
						timeLabel={formatHourOfDay(
							weatherData.hourly.time[getCurrentHour() + 2]
						)}
						minTemp={`${weatherData.hourly.temperature_2m[2].toFixed(0)}°`}
					/>
					<HourlyWeatherCard
						timeLabel={formatHourOfDay(
							weatherData.hourly.time[getCurrentHour() + 3]
						)}
						minTemp={`${weatherData.hourly.temperature_2m[3].toFixed(0)}°`}
					/>
					<HourlyWeatherCard
						timeLabel={formatHourOfDay(
							weatherData.hourly.time[getCurrentHour() + 4]
						)}
						minTemp={`${weatherData.hourly.temperature_2m[4].toFixed(0)}°`}
					/>
					<HourlyWeatherCard
						timeLabel={formatHourOfDay(
							weatherData.hourly.time[getCurrentHour() + 5]
						)}
						minTemp={`${weatherData.hourly.temperature_2m[5].toFixed(0)}°`}
					/>
					<HourlyWeatherCard
						timeLabel={formatHourOfDay(
							weatherData.hourly.time[getCurrentHour() + 6]
						)}
						minTemp={`${weatherData.hourly.temperature_2m[6].toFixed(0)}°`}
					/>
					<HourlyWeatherCard
						timeLabel={formatHourOfDay(
							weatherData.hourly.time[getCurrentHour() + 7]
						)}
						minTemp={`${weatherData.hourly.temperature_2m[7].toFixed(0)}°`}
					/>
				</ul>
			</section>
		</div>
	);
}

interface WeatherDataCardProps {
	label: string;
	value: string;
}

function WeatherDataCard({ label, value }: WeatherDataCardProps) {
	return (
		<div className="grid gap-6 rounded-xl border border-neutral-600 bg-neutral-800 p-5">
			<h2 className="text-[1.125rem] text-neutral-200">{label}</h2>
			<p className="text-[2rem] leading-none font-light">{value}</p>
		</div>
	);
}

export type DayLabelTypes =
	| 'Mon'
	| 'Tue'
	| 'Wed'
	| 'Thu'
	| 'Fri'
	| 'Sat'
	| 'Sun';

interface DailyWeatherCardProps {
	dayLabel: DayLabelTypes;
	maxTemp: string;
	minTemp: string;
}

function DailyWeatherCard({
	dayLabel,
	maxTemp,
	minTemp,
}: DailyWeatherCardProps) {
	return (
		<li className="grid justify-center gap-4 rounded-xl bg-neutral-800 px-2.5 py-4">
			<h3 className="text-center text-[1.125rem]">{dayLabel}</h3>
			<div className="size-15 border border-neutral-900"></div>
			<div className="flex items-center justify-between">
				<span>{maxTemp}</span>
				<span className="text-neutral-200">{minTemp}</span>
			</div>
		</li>
	);
}

function SelectDay() {
	return (
		<Select.Root>
			<Select.Trigger
				className="focus-visible:outline-neutral-0 inline-flex cursor-pointer items-center justify-center gap-3 rounded-lg bg-neutral-600 px-4 py-2 hover:bg-neutral-500 focus-visible:outline-3 focus-visible:outline-offset-3"
				aria-label="Select day"
			>
				<Select.Value placeholder="Select Day" />
				<Select.Icon>
					<DropdownIcon className="*:fill-neutral-0 h-4.5 w-3" />
				</Select.Icon>
			</Select.Trigger>

			<Select.Portal>
				<Select.Content
					position="popper"
					sideOffset={10}
					className="w-53.5 overflow-hidden rounded-xl border border-neutral-600 bg-neutral-800 drop-shadow-[0_8px_16px_rgba(241,96,9,0.32)]"
				>
					<Select.Viewport className="grid gap-1 p-2">
						<SelectItem value="monday" text="Monday" />
						<SelectItem value="tuesday" text="Tuesday" />
						<SelectItem value="wednesday" text="Wednesday" />
						<SelectItem value="thursday" text="Thursday" />
						<SelectItem value="friday" text="Friday" />
						<SelectItem value="saturday" text="Saturday" />
						<SelectItem value="sunday" text="Sunday" />
					</Select.Viewport>
				</Select.Content>
			</Select.Portal>
		</Select.Root>
	);
}

interface SelectItemProps {
	value: string;
	text: string;
}

function SelectItem({ value, text }: SelectItemProps) {
	return (
		<Select.Item
			value={value}
			className="focus-visible:outline-neutral-0 cursor-pointer rounded-lg px-2 py-2.5 hover:bg-neutral-700 focus-visible:outline-2 focus-visible:outline-offset-2"
		>
			<Select.ItemText>{text}</Select.ItemText>
			<Select.ItemIndicator />
		</Select.Item>
	);
}

interface HourlyWeatherCardProps {
	timeLabel: string;
	minTemp: string;
}

function HourlyWeatherCard({ timeLabel, minTemp }: HourlyWeatherCardProps) {
	return (
		<li className="flex items-center justify-between rounded-lg border border-neutral-600 bg-neutral-700 px-3 py-2.5">
			<div className="flex items-center gap-2">
				<div className="size-10 border border-neutral-900"></div>
				<h3 className="text-xl">{timeLabel}</h3>
			</div>

			<p className="">{minTemp}</p>
		</li>
	);
}

function NoResults() {
	return (
		<div className="justify-self-center">
			<h1 className="text-center text-[1.75rem] font-bold">
				No search result found!
			</h1>
		</div>
	);
}

function SearchNow() {
	return (
		<div className="justify-self-center">
			<h1 className="text-center text-[1.75rem] font-bold">
				Well, why don't you try searching for a place to find out?
			</h1>
		</div>
	);
}

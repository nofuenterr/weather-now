import { Select } from 'radix-ui';
import DropdownIcon from './icons/DropdownIcon';
import { useState } from 'react';
import SearchLocation from './SearchLocation';
import type { FormattedLocation } from '../types/location';

export default function MainContent() {
	const [query, setQuery] = useState<FormattedLocation | null>(null);

	return (
		<main className="grid gap-8">
			<div className="grid auto-rows-[3.5rem] gap-3 md:grid-cols-[1fr_7.125rem] md:gap-4 lg:grid-cols-[minmax(0,32.875rem)_7.125rem] lg:justify-self-center">
				<SearchLocation query={query} setQuery={setQuery} />

				<button className="cursor-pointer rounded-xl bg-blue-500 px-6 py-4">
					Search
				</button>
			</div>

			<div className="grid gap-8 xl:grid-cols-[1fr_24rem]">
				<section className="grid gap-5">
					<div className='grid gap-4 rounded-[20px] bg-[url("/src/assets/images/bg-today-small.svg")] bg-cover bg-center bg-no-repeat px-6 py-10 md:grid-cols-2 md:bg-[url("/src/assets/images/bg-today-large.svg")] md:py-20'>
						<div className="grid gap-3 text-center md:self-center md:justify-self-start md:text-start">
							<h1 className="text-[1.75rem] font-bold">Location</h1>
							<p className="text-[1.125rem]">Date</p>
						</div>

						<div className="flex items-center gap-5 justify-self-center md:justify-self-end">
							<div className="size-30 rounded-full border border-neutral-900"></div>

							<p className="text-8xl leading-none font-semibold tracking-[-2%] italic">
								67°
							</p>
						</div>
					</div>

					<div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-5 lg:gap-6">
						<WeatherDataCard label="Feels Like" value="18°" />
						<WeatherDataCard label="Humidity" value="46%" />
						<WeatherDataCard label="Wind" value="14 km" />
						<WeatherDataCard label="Precipitation" value="0 mm" />
					</div>
				</section>

				<section className="grid gap-5">
					<h2 className="text-xl font-semibold">Daily forecast</h2>
					<ul className="grid grid-cols-[repeat(auto-fit,minmax(76px,1fr))] gap-4">
						<DailyWeatherCard dayLabel="Tue" maxTemp="20°" minTemp="14°" />
						<DailyWeatherCard dayLabel="Wed" maxTemp="21°" minTemp="15°" />
						<DailyWeatherCard dayLabel="Thu" maxTemp="24°" minTemp="14°" />
						<DailyWeatherCard dayLabel="Fri" maxTemp="25°" minTemp="13°" />
						<DailyWeatherCard dayLabel="Sat" maxTemp="21°" minTemp="15°" />
						<DailyWeatherCard dayLabel="Sun" maxTemp="25°" minTemp="16°" />
						<DailyWeatherCard dayLabel="Mon" maxTemp="24°" minTemp="15°" />
					</ul>
				</section>

				<section className="grid h-min content-start gap-4 rounded-[20px] bg-neutral-800 px-4 py-5 md:p-6 xl:col-start-2 xl:row-start-1 xl:row-end-3">
					<div className="flex items-center justify-between">
						<h2 className="text-xl font-semibold">Hourly forecast</h2>
						<SelectDay />
					</div>

					<ul className="grid gap-4">
						<HourlyWeatherCard timeLabel="3 PM" minTemp="20°" />
						<HourlyWeatherCard timeLabel="4 PM" minTemp="20°" />
						<HourlyWeatherCard timeLabel="5 PM" minTemp="20°" />
						<HourlyWeatherCard timeLabel="6 PM" minTemp="19°" />
						<HourlyWeatherCard timeLabel="7 PM" minTemp="18°" />
						<HourlyWeatherCard timeLabel="8 PM" minTemp="18°" />
						<HourlyWeatherCard timeLabel="9 PM" minTemp="17°" />
						<HourlyWeatherCard timeLabel="10 PM" minTemp="17°" />
					</ul>
				</section>
			</div>
		</main>
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

type DayLabelTypes = 'Mon' | 'Tue' | 'Wed' | 'Thu' | 'Fri' | 'Sat' | 'Sun';

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
				className="inline-flex cursor-pointer items-center justify-center gap-3 rounded-lg bg-neutral-600 px-4 py-2"
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
			className="cursor-pointer rounded-lg px-2 py-2.5"
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

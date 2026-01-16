import searchIcon from '../assets/icons/icon-search.svg';

export default function MainContent() {
	return (
		<main className="grid gap-8">
			<div className="grid auto-rows-[3.5rem] gap-3 md:grid-cols-[1fr_7.125rem] md:gap-4 lg:grid-cols-[minmax(0,32.875rem)_7.125rem] lg:justify-self-center">
				<div className="relative w-full">
					<div className="pointer-events-none absolute top-4 left-6">
						<img src={searchIcon} alt="Search icon" />
					</div>
					<input
						className="w-full rounded-xl bg-neutral-800 py-4 pr-6 pl-15"
						type="search"
						placeholder="Search for a place..."
					/>
				</div>
				<button className="cursor-pointer rounded-xl bg-blue-500 px-6 py-4">
					Search
				</button>
			</div>

			<div className="grid gap-8">
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
					<ul className="grid grid-cols-[repeat(auto-fit,minmax(90px,1fr))] gap-4 md:grid-cols-7">
						<DailyWeatherCard dayLabel="Tue" maxTemp="20°" minTemp="14°" />
						<DailyWeatherCard dayLabel="Wed" maxTemp="21°" minTemp="15°" />
						<DailyWeatherCard dayLabel="Thu" maxTemp="24°" minTemp="14°" />
						<DailyWeatherCard dayLabel="Fri" maxTemp="25°" minTemp="13°" />
						<DailyWeatherCard dayLabel="Sat" maxTemp="21°" minTemp="15°" />
						<DailyWeatherCard dayLabel="Sun" maxTemp="25°" minTemp="16°" />
						<DailyWeatherCard dayLabel="Mon" maxTemp="24°" minTemp="15°" />
					</ul>
				</section>

				<section></section>
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

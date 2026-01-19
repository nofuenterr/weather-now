import DropdownIcon from './icons/DropdownIcon';

export default function WeatherDataLoading() {
	return (
		<div className="grid gap-8 xl:grid-cols-[1fr_24rem]">
			<section className="grid gap-5">
				<div className="grid h-71.5 place-content-center gap-3.5 rounded-[20px] bg-neutral-800">
					<div className="aria-hidden flex items-center justify-center gap-2.5">
						<div className="dot bg-neutral-0 size-3 rounded-full"></div>
						<div className="dot bg-neutral-0 size-3 rounded-full"></div>
						<div className="dot bg-neutral-0 size-3 rounded-full"></div>
					</div>
					<p className="text-[1.125rem] text-neutral-200">Loading...</p>
				</div>

				<div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-5 lg:gap-6">
					<WeatherDataSkeleton label="Feels Like" />
					<WeatherDataSkeleton label="Humidity" />
					<WeatherDataSkeleton label="Wind" />
					<WeatherDataSkeleton label="Precipitation" />
				</div>
			</section>

			<section className="grid gap-5">
				<h2 className="text-xl font-semibold">Daily forecast</h2>
				<div className="grid grid-cols-[repeat(auto-fit,minmax(76px,1fr))] gap-4">
					{Array.from({ length: 7 }, (_, index) => index).map((_, index) => {
						return <DailyWeatherSkeleton key={index} />;
					})}
				</div>
			</section>

			<section className="grid h-min content-start gap-4 rounded-[20px] bg-neutral-800 px-4 py-5 md:p-6 xl:col-start-2 xl:row-start-1 xl:row-end-3">
				<div className="flex items-center justify-between">
					<h2 className="text-xl font-semibold">Hourly forecast</h2>
					<div className="inline-flex cursor-pointer items-center justify-center gap-3 rounded-lg bg-neutral-600 px-4 py-2">
						<span>–</span>
						<DropdownIcon className="*:fill-neutral-0 h-4.5 w-3" />
					</div>
				</div>

				<div className="grid gap-4">
					{Array.from({ length: 8 }, (_, index) => index).map((_, index) => {
						return <HourlyWeatherSkeleton key={index} />;
					})}
				</div>
			</section>
		</div>
	);
}

function WeatherDataSkeleton({ label }: { label: string }) {
	return (
		<div className="grid gap-6 rounded-xl border border-neutral-600 bg-neutral-800 p-5">
			<h2 className="text-[1.125rem] text-neutral-200">{label}</h2>
			<div className="text-[2rem] leading-none font-light">–</div>
		</div>
	);
}

function DailyWeatherSkeleton() {
	return <div className="h-41 rounded-xl bg-neutral-800"></div>;
}

function HourlyWeatherSkeleton() {
	return (
		<div className="h-15 rounded-lg border border-neutral-600 bg-neutral-700"></div>
	);
}

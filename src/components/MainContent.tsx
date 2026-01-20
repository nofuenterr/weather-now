import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import type { FormattedLocation } from '../types/location';
import ContentContainer from './ContentContainer';
import SearchLocation from './SearchLocation';
import WeatherDataLoading from './WeatherDataLoading';

async function fetchWeatherData(location: string | FormattedLocation | null) {
	if (!location || typeof location === 'string') return null;
	const response = await fetch(
		`https://api.open-meteo.com/v1/forecast?latitude=${location.latitude}4&longitude=${location.longitude}&daily=temperature_2m_min,temperature_2m_max,weather_code&hourly=temperature_2m,weather_code&current=apparent_temperature,temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m,precipitation&timezone=auto`
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

					<div className="grid auto-rows-[3.5rem] lg:grid-cols-[minmax(0,40rem)] lg:justify-self-center">
						<SearchLocation query={query} setQuery={setQuery} />
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

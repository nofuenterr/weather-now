import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import loadingIcon from '../assets/icons/icon-loading.svg';
import searchIcon from '../assets/icons/icon-search.svg';
import { useLocationFormatter } from '../hooks/useLocationFormatter';
import type { FormattedLocation } from '../types/location';

const MAPBOX_API_KEY =
	'pk.eyJ1IjoicnJub2Z1ZW50ZSIsImEiOiJjbWtnaDEzMHMwN3VmM2tvZWFlb3c3bzZ0In0.RDIT6l4FDydq0gKIw82dTQ';

async function fetchLocation(location: string) {
	const response = await fetch(
		`https://api.mapbox.com/geocoding/v5/mapbox.places/${location}.json?access_token=${MAPBOX_API_KEY}`
	);
	if (!response.ok) throw new Error('Network error');
	return response.json();
}

interface SearchLocationProps {
	query: FormattedLocation | null;
	setQuery: React.Dispatch<React.SetStateAction<FormattedLocation | null>>;
}

export default function SearchLocation({
	query,
	setQuery,
}: SearchLocationProps) {
	const [locationValue, setLocationValue] = useState<string>('');
	const [locationsDisplay, setLocationsDisplay] = useState<boolean>(false);

	const { data, isLoading, error } = useQuery({
		queryKey: ['location', locationValue],
		queryFn: ({ queryKey }) => {
			const [, locationValue] = queryKey;
			return fetchLocation(locationValue);
		},
		enabled: Boolean(locationValue),
	});

	const formatLocations = useLocationFormatter(data?.features);
	const locations = formatLocations();

	return (
		<div className="relative w-full">
			<div className="pointer-events-none absolute top-4 left-6">
				<img src={searchIcon} alt="Search icon" />
			</div>
			<input
				className="w-full rounded-xl bg-neutral-800 py-4 pr-6 pl-15 hover:bg-neutral-700 focus-visible:outline-3 focus-visible:outline-offset-3 focus-visible:outline-neutral-200"
				type="search"
				placeholder="Search for a place..."
				value={locationValue}
				onChange={(e) => {
					setLocationValue(e.target.value);
					if (!locationsDisplay && e.target.value) setLocationsDisplay(true);
				}}
			/>

			{locationValue && locationsDisplay ? (
				<div className="relative -bottom-3.5 rounded-xl bg-neutral-800 p-2">
					{isLoading ? (
						<LoadingDisplay />
					) : error ? (
						<ErrorDisplay error={error} />
					) : locations && locations.length > 0 ? (
						<Locations
							locations={locations}
							query={query}
							setQuery={setQuery}
							setLocationsDisplay={setLocationsDisplay}
						/>
					) : (
						<NoResults />
					)}
				</div>
			) : null}
		</div>
	);
}

function LoadingDisplay() {
	return (
		<div className="flex items-center gap-2.5 rounded-lg px-2 py-2.5">
			<div>
				<img className="animate-spin" src={loadingIcon} alt="Loading icon" />
			</div>
			<p>Search in progress</p>
		</div>
	);
}

function ErrorDisplay({ error }: { error: Error }) {
	return (
		<div className="rounded-lg px-2 py-2.5">
			<p>An error has occured! {error.message}</p>
		</div>
	);
}

interface LocationsProps extends SearchLocationProps {
	locations: FormattedLocation[];
	setLocationsDisplay: React.Dispatch<React.SetStateAction<boolean>>;
}

function Locations({
	locations,
	query,
	setQuery,
	setLocationsDisplay,
}: LocationsProps) {
	return (
		<ul className="grid gap-1">
			{locations.map((location: FormattedLocation, index: number) => {
				return (
					<li key={`${index}-${location.text}`}>
						<button
							className="focus-visible:outline-neutral-0 grid w-full cursor-pointer gap-1 rounded-lg border border-transparent px-2 py-2.5 text-start hover:border-neutral-600 hover:bg-neutral-700 focus-visible:outline-2 focus-visible:outline-offset-2"
							onClick={() => {
								setQuery(location);
								setLocationsDisplay(false);
							}}
							style={{
								backgroundColor:
									query?.latitude === location.latitude &&
									query.longitude === location.longitude
										? 'var(--color-neutral-700)'
										: '',
								borderColor:
									query?.latitude === location.latitude &&
									query.longitude === location.longitude
										? 'var(--color-neutral-600)'
										: '',
							}}
						>
							<p>{location.text}</p>
							<p>
								{location.placeName ? location.placeName : ''}{' '}
								{`(${location.latitude}°N ${location.longitude}°E)`}
							</p>
						</button>
					</li>
				);
			})}
		</ul>
	);
}

function NoResults() {
	return (
		<div className="rounded-lg px-2 py-2.5">
			<p>No location found!</p>
		</div>
	);
}

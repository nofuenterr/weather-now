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

			<div>
				<section></section>

				<section></section>

				<section></section>
			</div>
		</main>
	);
}

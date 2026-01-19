import { DropdownMenu, Select } from 'radix-ui';
import { useUnitsStore } from '../stores/units';
import {
	isPrecipitationUnit,
	isTemperatureUnit,
	isWindSpeedUnit,
} from '../utils/confirmUnit';
import BrandLogo from './icons/BrandLogo';
import CheckIcon from './icons/CheckIcon';
import DropdownIcon from './icons/DropdownIcon';
import UnitsIcon from './icons/UnitsIcon';

export default function Header() {
	return (
		<header className="flex items-center justify-between">
			<div className="flex cursor-pointer items-center gap-2 md:gap-2.5">
				<BrandLogo className="*:fill-orange-500 md:size-10" />
				<span className="font-header font-bold md:text-[1.375rem]">
					Weather Now
				</span>
			</div>

			<SelectUnit />
		</header>
	);
}

function SelectUnit() {
	return (
		<DropdownMenu.Root>
			<DropdownMenu.Trigger
				className="focus-visible:outline-neutral-0 inline-flex cursor-pointer items-center justify-center gap-1.5 rounded-md bg-neutral-800 px-2.5 py-2 text-sm hover:bg-neutral-700 focus-visible:outline-3 focus-visible:outline-offset-3 md:gap-2.5 md:rounded-lg md:px-4 md:py-3 md:text-base"
				aria-label="Select units"
			>
				<UnitsIcon className="*:fill-neutral-0 md:size-4" />
				<span>Units</span>
				<DropdownIcon className="*:fill-neutral-0 h-3 md:h-4.5 md:w-3" />
			</DropdownMenu.Trigger>

			<DropdownMenu.Portal>
				<DropdownMenu.Content
					sideOffset={10}
					className="grid w-53.5 gap-1 overflow-hidden rounded-xl border border-neutral-600 bg-neutral-800 px-2 py-1.5 drop-shadow-[0_8px_16px_rgba(241,96,9,0.32)]"
				>
					<UnitSystemSwitch />

					<TemperatureGroup />

					<Select.Separator className="h-px bg-neutral-600" />

					<WindSpeedGroup />

					<Select.Separator className="h-px bg-neutral-600" />

					<PrecipitationGroup />
				</DropdownMenu.Content>
			</DropdownMenu.Portal>
		</DropdownMenu.Root>
	);
}

function UnitSystemSwitch() {
	const {
		unitSystem,
		setUnitSystem,
		setTemperatureUnit,
		setWindSpeedUnit,
		setPrecipitationUnit,
	} = useUnitsStore();

	function switchToImperial() {
		setTemperatureUnit('fahrenheit');
		setWindSpeedUnit('mph');
		setPrecipitationUnit('in');
	}

	function switchToMetric() {
		setTemperatureUnit('celsius');
		setWindSpeedUnit('km/h');
		setPrecipitationUnit('mm');
	}

	return (
		<DropdownMenu.Item
			onSelect={(event) => event.preventDefault()}
			className="focus-visible:outline-neutral-0 cursor-pointer rounded-lg px-2 py-2.5 hover:bg-neutral-700 focus-visible:outline-2 focus-visible:outline-offset-2"
			onClick={() => {
				setUnitSystem(unitSystem === 'metric' ? 'imperial' : 'metric');
				if (unitSystem === 'metric') switchToImperial();
				if (unitSystem === 'imperial') switchToMetric();
			}}
			aria-label={`Switch to ${unitSystem === 'metric' ? 'imperial' : 'metric'}`}
		>
			Switch to {unitSystem === 'metric' ? 'Imperial' : 'Metric'}
		</DropdownMenu.Item>
	);
}

function TemperatureGroup() {
	const { temperatureUnit, setTemperatureUnit } = useUnitsStore();

	return (
		<DropdownMenu.Group className="grid gap-2">
			<DropdownMenu.Label className="pt-1.5 pl-2 text-sm text-neutral-300">
				Temperature
			</DropdownMenu.Label>
			<DropdownMenu.RadioGroup
				value={temperatureUnit}
				onValueChange={(value) => {
					if (isTemperatureUnit(value)) {
						setTemperatureUnit(value);
					}
				}}
				className="grid gap-1"
			>
				<DropdownMenu.RadioItem
					onSelect={(event) => event.preventDefault()}
					className="focus-visible:outline-neutral-0 flex cursor-pointer items-center justify-between rounded-lg px-2 py-2.5 hover:bg-neutral-700 focus-visible:outline-2 focus-visible:outline-offset-2"
					value="celsius"
					style={{
						backgroundColor:
							temperatureUnit === 'celsius' ? 'var(--color-neutral-700)' : '',
					}}
				>
					<span>Celsius (°C)</span>
					{temperatureUnit === 'celsius' ? <CheckIcon /> : null}
				</DropdownMenu.RadioItem>
				<DropdownMenu.RadioItem
					onSelect={(event) => event.preventDefault()}
					className="focus-visible:outline-neutral-0 flex cursor-pointer items-center justify-between rounded-lg px-2 py-2.5 hover:bg-neutral-700 focus-visible:outline-2 focus-visible:outline-offset-2"
					value="fahrenheit"
					style={{
						backgroundColor:
							temperatureUnit === 'fahrenheit'
								? 'var(--color-neutral-700)'
								: '',
					}}
				>
					<span>Fahrenheit (°F)</span>
					{temperatureUnit === 'fahrenheit' ? <CheckIcon /> : null}
				</DropdownMenu.RadioItem>
			</DropdownMenu.RadioGroup>
		</DropdownMenu.Group>
	);
}

function WindSpeedGroup() {
	const { windSpeedUnit, setWindSpeedUnit } = useUnitsStore();

	return (
		<DropdownMenu.Group className="grid gap-2">
			<DropdownMenu.Label className="pt-1.5 pl-2 text-sm text-neutral-300">
				Wind Speed
			</DropdownMenu.Label>
			<DropdownMenu.RadioGroup
				value={windSpeedUnit}
				onValueChange={(value) => {
					if (isWindSpeedUnit(value)) {
						setWindSpeedUnit(value);
					}
				}}
				className="grid gap-1"
			>
				<DropdownMenu.RadioItem
					onSelect={(event) => event.preventDefault()}
					className="focus-visible:outline-neutral-0 flex cursor-pointer items-center justify-between rounded-lg px-2 py-2.5 hover:bg-neutral-700 focus-visible:outline-2 focus-visible:outline-offset-2"
					value="km/h"
					style={{
						backgroundColor:
							windSpeedUnit === 'km/h' ? 'var(--color-neutral-700)' : '',
					}}
				>
					<span>km/h</span>
					{windSpeedUnit === 'km/h' ? <CheckIcon /> : null}
				</DropdownMenu.RadioItem>
				<DropdownMenu.RadioItem
					onSelect={(event) => event.preventDefault()}
					className="focus-visible:outline-neutral-0 flex cursor-pointer items-center justify-between rounded-lg px-2 py-2.5 hover:bg-neutral-700 focus-visible:outline-2 focus-visible:outline-offset-2"
					value="mph"
					style={{
						backgroundColor:
							windSpeedUnit === 'mph' ? 'var(--color-neutral-700)' : '',
					}}
				>
					<span>mph</span>
					{windSpeedUnit === 'mph' ? <CheckIcon /> : null}
				</DropdownMenu.RadioItem>
			</DropdownMenu.RadioGroup>
		</DropdownMenu.Group>
	);
}

function PrecipitationGroup() {
	const { precipitationUnit, setPrecipitationUnit } = useUnitsStore();

	return (
		<DropdownMenu.Group className="grid gap-2">
			<DropdownMenu.Label className="pt-1.5 pl-2 text-sm text-neutral-300">
				Precipitation
			</DropdownMenu.Label>
			<DropdownMenu.RadioGroup
				value={precipitationUnit}
				onValueChange={(value) => {
					if (isPrecipitationUnit(value)) {
						setPrecipitationUnit(value);
					}
				}}
				className="grid gap-1"
			>
				<DropdownMenu.RadioItem
					onSelect={(event) => event.preventDefault()}
					className="focus-visible:outline-neutral-0 flex cursor-pointer items-center justify-between rounded-lg px-2 py-2.5 hover:bg-neutral-700 focus-visible:outline-2 focus-visible:outline-offset-2"
					value="mm"
					style={{
						backgroundColor:
							precipitationUnit === 'mm' ? 'var(--color-neutral-700)' : '',
					}}
				>
					<span>mm</span>
					{precipitationUnit === 'mm' ? <CheckIcon /> : null}
				</DropdownMenu.RadioItem>
				<DropdownMenu.RadioItem
					onSelect={(event) => event.preventDefault()}
					className="focus-visible:outline-neutral-0 flex cursor-pointer items-center justify-between rounded-lg px-2 py-2.5 hover:bg-neutral-700 focus-visible:outline-2 focus-visible:outline-offset-2"
					value="in"
					style={{
						backgroundColor:
							precipitationUnit === 'in' ? 'var(--color-neutral-700)' : '',
					}}
				>
					<span>in</span>
					{precipitationUnit === 'in' ? <CheckIcon /> : null}
				</DropdownMenu.RadioItem>
			</DropdownMenu.RadioGroup>
		</DropdownMenu.Group>
	);
}

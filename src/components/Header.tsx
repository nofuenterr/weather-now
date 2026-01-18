import BrandLogo from './icons/BrandLogo';
import { Select } from 'radix-ui';
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

			<SelectUnits />
		</header>
	);
}

function SelectUnits() {
	return (
		<Select.Root>
			<Select.Trigger
				className="focus-visible:outline-neutral-0 inline-flex cursor-pointer items-center justify-center gap-1.5 rounded-md bg-neutral-800 px-2.5 py-2 text-sm hover:bg-neutral-700 focus-visible:outline-3 focus-visible:outline-offset-3 md:gap-2.5 md:rounded-lg md:px-4 md:py-3 md:text-base"
				aria-label="Select units"
			>
				<Select.Icon>
					<UnitsIcon className="*:fill-neutral-0 md:size-4" />
				</Select.Icon>
				<Select.Value placeholder="Units" />
				<Select.Icon>
					<DropdownIcon className="*:fill-neutral-0 h-3 md:h-4.5 md:w-3" />
				</Select.Icon>
			</Select.Trigger>

			<Select.Portal>
				<Select.Content
					position="popper"
					sideOffset={10}
					className="w-53.5 overflow-hidden rounded-xl border border-neutral-600 bg-neutral-800 drop-shadow-[0_8px_16px_rgba(241,96,9,0.32)]"
				>
					<Select.Viewport className="grid gap-1 px-2 py-1.5">
						<Select.Group className="grid gap-2">
							<Select.Item
								value="imperial"
								className="focus-visible:outline-neutral-0 cursor-pointer rounded-lg px-2 py-2.5 hover:bg-neutral-700 focus-visible:outline-2 focus-visible:outline-offset-2"
							>
								<Select.ItemText>Switch to Imperial</Select.ItemText>
							</Select.Item>
							<Select.Item
								value="metric"
								className="hidden cursor-pointer px-2 py-2.5 hover:bg-neutral-700"
							>
								<Select.ItemText>Switch to Metric</Select.ItemText>
							</Select.Item>
						</Select.Group>

						<Select.Group className="grid gap-2">
							<Select.Label className="pt-1.5 pl-2 text-sm text-neutral-300">
								Temperature
							</Select.Label>
							<div className="grid gap-1">
								<SelectItem value="celsius" text="Celsius (°C)" />
								<SelectItem value="fahrenheit" text="Fahrenheit (°F)" />
							</div>
						</Select.Group>

						<Select.Separator className="h-px bg-neutral-600" />

						<Select.Group className="grid gap-2">
							<Select.Label className="pt-1.5 pl-2 text-sm text-neutral-300">
								Wind Speed
							</Select.Label>
							<div className="grid gap-1">
								<SelectItem value="windspeed-km/h" text="km/h" />
								<SelectItem value="windspeed-mph" text="mph" />
							</div>
						</Select.Group>

						<Select.Separator className="h-px bg-neutral-600" />

						<Select.Group className="grid gap-2">
							<Select.Label className="pt-1.5 pl-2 text-sm text-neutral-300">
								Precipitation
							</Select.Label>
							<div className="grid gap-1">
								<SelectItem value="precipitation-mm" text="Millimeters (mm)" />
								<SelectItem value="precipitation-in" text="Inches (in)" />
							</div>
						</Select.Group>
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

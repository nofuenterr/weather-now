import type { Dispatch, SetStateAction } from 'react';
import { Select } from 'radix-ui';
import type { FullDayLabelTypes } from '../types/dayLabel';
import DropdownIcon from './icons/DropdownIcon';

export default function SelectDay({
	currentDayOfTheWeek,
	setSelectedDay,
}: {
	currentDayOfTheWeek: FullDayLabelTypes;
	setSelectedDay: Dispatch<SetStateAction<FullDayLabelTypes>>;
}) {
	return (
		<Select.Root
			defaultValue={currentDayOfTheWeek}
			onValueChange={(value: FullDayLabelTypes) => setSelectedDay(value)}
		>
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
						<SelectItem value="Monday" text="Monday" />
						<SelectItem value="Tuesday" text="Tuesday" />
						<SelectItem value="Wednesday" text="Wednesday" />
						<SelectItem value="Thursday" text="Thursday" />
						<SelectItem value="Friday" text="Friday" />
						<SelectItem value="Saturday" text="Saturday" />
						<SelectItem value="Sunday" text="Sunday" />
					</Select.Viewport>
				</Select.Content>
			</Select.Portal>
		</Select.Root>
	);
}

interface SelectItemProps {
	value: FullDayLabelTypes;
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

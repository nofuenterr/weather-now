import { format } from 'date-fns';
import type { FullDayLabelTypes } from '../types/dayLabel';

const fullDayLabelList: FullDayLabelTypes[] = [
	'Monday',
	'Tuesday',
	'Wednesday',
	'Thursday',
	'Friday',
	'Saturday',
	'Sunday',
];

export const today: number = Date.now();

export const currentDayOfTheWeek: FullDayLabelTypes = format(
	new Date(today),
	'EEEE'
) as FullDayLabelTypes;

export function getHourOffsetFromToday(selectedDay: FullDayLabelTypes) {
	const hourStartIndex =
		selectedDay === currentDayOfTheWeek ? getCurrentHour() : 0;

	function getNumberOfDaysFromNow() {
		let counter = 0;
		let currentIndex = fullDayLabelList.indexOf(currentDayOfTheWeek);
		while (selectedDay !== fullDayLabelList[currentIndex]) {
			counter += 1;
			currentIndex += 1;
			if (currentIndex > fullDayLabelList.length) currentIndex = 0;
		}
		return counter;
	}

	const dayStartMultiplier = getNumberOfDaysFromNow();

	return hourStartIndex + 24 * dayStartMultiplier;
}

export function getNumberOfHours(selectedDay: FullDayLabelTypes) {
	return selectedDay === currentDayOfTheWeek
		? 23 - getCurrentHour() >= 8
			? 8
			: 23 - getCurrentHour() + 1
		: 8;
}

function getCurrentHour(): number {
	return +format(new Date(today), 'H');
}

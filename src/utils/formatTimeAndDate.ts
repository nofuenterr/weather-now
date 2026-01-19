import { format } from 'date-fns';
import type { ShortDayLabelTypes } from '../types/dayLabel';

export function formatDate(date: number): string {
	return format(new Date(date), 'EEEE, LLL d, u');
}

export function formatDayOfWeek(date: string): ShortDayLabelTypes {
	return format(new Date(date), 'iii') as ShortDayLabelTypes;
}

export function formatHourOfDay(date: string): string {
	return format(new Date(date), 'h a');
}

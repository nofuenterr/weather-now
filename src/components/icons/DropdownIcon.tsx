import { type IconComponentProps } from '../../types/iconComponentProps';

export default function DropdownIcon(props: IconComponentProps) {
	return (
		<svg
			width={9}
			height={6}
			viewBox="0 0 9 6"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			{...props}
		>
			<path d="M4.184 5.14L.137 1.122C0 1.011 0 .793.137.656l.547-.52a.315.315 0 01.464 0L4.43 3.364 7.684.137c.136-.137.355-.137.464 0l.547.52c.137.136.137.355 0 .464l-4.047 4.02a.315.315 0 01-.464 0z" />
		</svg>
	);
}

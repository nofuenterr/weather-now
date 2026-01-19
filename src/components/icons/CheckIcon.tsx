import { type IconComponentProps } from '../../types/iconComponentProps';

export default function CheckIcon(props: IconComponentProps) {
	return (
		<svg
			width={13}
			height={10}
			viewBox="0 0 13 10"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			{...props}
		>
			<path
				d="M11.184.137c.136-.137.355-.137.464 0l.793.765c.11.137.11.356 0 .465L4.238 9.57a.315.315 0 01-.465 0L.11 5.934C0 5.797 0 5.578.11 5.469l.793-.793c.11-.11.328-.11.465 0l2.625 2.652L11.184.137z"
				className="fill-neutral-0"
			/>
		</svg>
	);
}

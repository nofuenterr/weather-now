export type WeatherCodeTypes =
	| 0
	| 1
	| 2
	| 3
	| 45
	| 48
	| 51
	| 53
	| 55
	| 56
	| 57
	| 61
	| 63
	| 65
	| 66
	| 67
	| 71
	| 73
	| 75
	| 77
	| 80
	| 81
	| 82
	| 85
	| 86
	| 95
	| 96
	| 99;

export default function getWeatherIcon(weatherCode: WeatherCodeTypes): string {
	console.log(weatherCode);
	switch (weatherCode) {
		case 0:
		case 1:
			return '/icons/icon-sunny.webp';
		case 2:
			return '/icons/icon-partly-cloudy.webp';
		case 3:
			return '/icons/icon-overcast.webp';
		case 45:
		case 48:
			return '/icons/icon-fog.webp';
		case 51:
		case 53:
		case 55:
		case 56:
		case 57:
			return '/icons/icon-drizzle.webp';
		case 61:
		case 63:
		case 65:
		case 66:
		case 67:
		case 80:
		case 81:
		case 82:
			return '/icons/icon-rain.webp';
		case 71:
		case 73:
		case 75:
		case 77:
		case 85:
		case 86:
			return '/icons/icon-snow.webp';
		case 95:
		case 96:
		case 99:
			return '/icons/icon-storm.webp';
	}
}

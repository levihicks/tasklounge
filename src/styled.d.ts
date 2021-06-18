import 'styled-components';

declare module 'styled-components' {
	export interface DefaultTheme {
		colors: {
			white: string;
			blue: string;
			red: string;
			orange: string;
			navy: string;
			gray: string;
		};
		fontSizes: {
			extraSmall: string;
			small: string;
			medium: string;
			large: string;
			extraLarge: string;
		};
	}
}

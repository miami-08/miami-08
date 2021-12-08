import { buttonViews } from 'ui/components/BaseButton/buttonViews';

import { inputViews } from 'uicomponents/Input/inputViews';

import { colors } from './colors';

export interface ITheme {
    theme: typeof themes.light & typeof themes.sea;
}

export const themes = {
    light: {
        colors: {
            body: colors.white,
            text: colors.black,
            textInversion: colors.white,
            buttons: buttonViews.light,
            inputs: inputViews.light,
        },
    },
    sea: {
        colors: {
            body: `radial-gradient(white, ${colors.primary})`,
            text: colors.darkBlue,
            textInversion: colors.white,
            buttons: buttonViews.sea,
            inputs: inputViews.sea,
        },
    },
};

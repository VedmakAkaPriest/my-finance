import { DefaultTheme } from 'react-native-paper';

const defaultFontFamily = 'panton-semi';
export default {
  ...DefaultTheme,
  dark: false,
  roundness: 4,
  colors: {
    ...DefaultTheme.colors,
    primary: '#034748',
    accent: '#11B5E4',
    background: '#F1F7ED',
    surface: '#F1F7ED',
    text: '#001021',
    error: '#B71F0E',
    disabled: '#BEC6C6',
    placeholder: '#1481BA',
    backdrop: '#001021',
  },
  fonts: {
    regular: {
      fontFamily: defaultFontFamily,
      fontWeight: '400',
    },
    medium: {
      fontFamily: defaultFontFamily,
      fontWeight: '600',
    },
    light: {
      fontFamily: defaultFontFamily,
      fontWeight: '300',
    },
    thin: {
      fontFamily: defaultFontFamily,
      fontWeight: '100',
    },
  },
};

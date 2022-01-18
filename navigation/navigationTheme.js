import { DefaultTheme } from '@react-navigation/native';
import colors from '../config/colors';

const MyTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      primary: colors.primary,
      background: colors.white
    },
};

export default MyTheme;


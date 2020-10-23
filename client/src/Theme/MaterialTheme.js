import { createMuiTheme } from '@material-ui/core/styles';

export default function createTheme() {
  return createMuiTheme({
    direction: 'rtl',
    palette: {
      primary: { main: '#1C7690' },
      secondary: {
        main: '#1C7690',
      },
    },
  });
}

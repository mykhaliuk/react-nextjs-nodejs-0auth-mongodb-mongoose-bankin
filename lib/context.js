import {SheetsRegistry} from 'react-jss'
import {
  createGenerateClassName,
  createMuiTheme
}                       from 'material-ui/styles'
import blue             from 'material-ui/colors/blue'
import grey             from 'material-ui/colors/grey'

const theme = createMuiTheme({
  palette: {
    primary  : {
      main: blue[500],
      over: blue[700]
    },
    secondary: {
      main : grey[700],
      light: grey[500]
    }
  }
})

function createPageContext() {
  return {
    theme,
    sheetsManager    : new Map(),
    sheetsRegistry   : new SheetsRegistry(),
    generateClassName: createGenerateClassName()
  }
}

export default function getContext() {
  if (!process.browser) {
    return createPageContext()
  }

  if (!global.INIT_MATERIAL_UI) {
    global.INIT_MATERIAL_UI = createPageContext()
  }

  return global.INIT_MATERIAL_UI
}

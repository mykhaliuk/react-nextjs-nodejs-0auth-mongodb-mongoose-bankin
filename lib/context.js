import { SheetsRegistry } from 'react-jss'
import {
  createGenerateClassName,
  createMuiTheme
}                         from 'material-ui/styles'
import blue               from 'material-ui/colors/blue'
import grey               from 'material-ui/colors/grey'
import lightGreen         from 'material-ui/colors/lightGreen'
import blueGray           from 'material-ui/colors/blueGrey'
import red                from 'material-ui/colors/red'

const theme = createMuiTheme( {
  palette: {
    primary  : {
      main            : blue[ 500 ],
      over            : blue[ 700 ],
      amount          : lightGreen[ 500 ],
      listGroupHeading: blueGray[ 50 ]
    },
    secondary: {
      main    : grey[ 700 ],
      light   : grey[ 500 ],
      amount  : red[ 400 ],
    }
  }
} )

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

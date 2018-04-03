import PropTypes  from 'prop-types'
import Router     from 'next/router'
import NProgress  from 'nprogress'
import Toolbar    from 'material-ui/Toolbar'
import AppBar     from 'material-ui/AppBar'
import Button     from 'material-ui/Button'
import IconButton from 'material-ui/IconButton'
import MenuIcon   from 'material-ui-icons/Menu'
import ExitToApp  from 'material-ui-icons/ExitToApp'

import {withStyles} from 'material-ui/styles'

import MenuDrop from './MenuDrop'

// import {styleToolbar} from './SharedStyles'

Router.onRouteChangeStart = () => {
  NProgress.start()
}
Router.onRouteChangeComplete = () => NProgress.done()
Router.onRouteChangeError = () => NProgress.done()

const styles = theme => ({
  root      : {
    flexGrow  : 1,
    fontFamily: theme.typography.fontFamily
  },
  flex      : {
    flex: 1
  },
  menuButton: {
    marginLeft : -12,
    marginRight: 20
  },
  icon      : {
    margin: theme.spacing.unit
  }
})

const optionsMenu = [
  {
    text: 'Dashboard',
    href: '/'
  },
  {
    text: 'Log out',
    href: '/logout'
  }
]

const noUserAvatar = '/static/ic_account_circle_black_24px.svg'

function Header({user, classes}) {
  return (
    <div className={classes.root}>
      <AppBar position='static' color={'inherit'}>
        <Toolbar>
          <IconButton className={classes.menuButton} color="secondary" aria-label="Menu">
            <MenuIcon />
          </IconButton>
          <div className={classes.flex}></div>
          {user
            ? <MenuDrop options={optionsMenu} src={user.avatarUrl ? user.avatarUrl : noUserAvatar} alt="User menu" />
            : (<Button className={classes.button} href="/login" color="secondary">
                <ExitToApp />
                Sign In / Up
              </Button>
            )
          }
        </Toolbar>
      </AppBar>
    </div>
  )
}

Header.propTypes = {
  user: PropTypes.shape({
    avatarUrl: PropTypes.string,
    email    : PropTypes.string.isRequired
  })
}

Header.defaultProps = {
  user: null
}

export default withStyles(styles)(Header)

import PropTypes    from 'prop-types'
import Link         from 'next/link'
import Router       from 'next/router'
import NProgress    from 'nprogress'
import Toolbar      from 'material-ui/Toolbar'
import Grid         from 'material-ui/Grid'
import Hidden       from 'material-ui/Hidden'
import Home         from 'material-ui-icons/Home'
import {withStyles} from 'material-ui/styles'

import MenuDrop from './MenuDrop'

import {styleToolbar} from './SharedStyles'

Router.onRouteChangeStart = () => {
  NProgress.start()
}
Router.onRouteChangeComplete = () => NProgress.done()
Router.onRouteChangeError = () => NProgress.done()

const styles = theme => ({
  icon: {
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

function Header({user, classes}) {
  return (
    <div>
      <Toolbar style={styleToolbar}>
        <Grid container direction="row" justify="space-around" alignItems="center">
          <Grid item sm={10} xs={9} style={{textAlign: 'left'}}>
            {user ? (
              <div>
                <Hidden>
                  <Link prefetch href="/">
                    <a><Home className={classes.icon} color={'secondary'} /></a>
                  </Link>
                </Hidden>
              </div>
            ) : (
              <Link prefetch href="/">
                <a>
                  <Home className={classes.icon} color={'secondary'} />
                </a>
              </Link>
            )}
          </Grid>
          <Grid item sm={2} xs={3} style={{textAlign: 'right'}}>
            {user ? (
              <div style={{whiteSpace: ' nowrap'}}>
                {user.avatarUrl ? (
                  <MenuDrop options={optionsMenu} src={user.avatarUrl} alt="Builder Book" />
                ) : null}
              </div>
            ) : (
              <Link prefetch href="/login">
                <a style={{margin: '0px 20px 0px auto'}}>Log&nbsp;in</a>
              </Link>
            )}
          </Grid>
        </Grid>
      </Toolbar>
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

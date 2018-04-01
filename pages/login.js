import Head               from 'next/head'
import Button             from 'material-ui/Button'
import {withStyles}       from 'material-ui/styles'
import withAuth           from '../lib/withAuth'
import withLayout         from '../lib/withLayout'
import {styleLoginButton} from '../components/SharedStyles'

const styles = theme => ({
  root      : {
    fontFamily: theme.typography.fontFamily,
    textAlign : 'center',
    margin    : `0 ${theme.typography.pxToRem(20)}`
  },
  heading   : {
    margin    : `${theme.typography.pxToRem(45)} auto`,
    fontSize  : `${theme.typography.pxToRem(44)}`,
    fontWeight: 400
  },
  loginButton: {
    borderRadius   : '2px',
    textTransform  : 'none',
    fontWeight     : 400,
    fontSize : theme.typography.pxToRem(16),
    letterSpacing  : '0.01em',
    color          : 'white',
    backgroundColor: '#DF4930'
  }
})

const Login = ({classes}) => (
  <div className={classes.root}>
    <Head>
      <title>Log in</title>
      <meta name="description" content="Login page" />
    </Head>
    <br />
    <p className={classes.heading}>Log in</p>
    <p>You’ll be logged in for 14 days unless you log out manually.</p>
    <br />
    <Button variant="raised" className={classes.loginButton} href="/auth/google">
      <img src="https://storage.googleapis.com/nice-future-2156/G.svg" alt="Log in with Google" />
      &nbsp;&nbsp;&nbsp; Log in with Google
    </Button>
  </div>
)

export default withAuth(withLayout(withStyles(styles)(Login)), {logoutRequired: true})

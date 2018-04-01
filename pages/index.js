/* eslint react/prefer-stateless-function: 0 */

import React        from 'react'
import PropTypes    from 'prop-types'
import {withStyles} from 'material-ui/styles'
import Head         from 'next/head'
import Grid         from 'material-ui/Grid'

import withAuth   from '../lib/withAuth'
import withLayout from '../lib/withLayout'
import Dashboard  from '../components/Dashboard'

const styles = theme => ({
  root: {
    flexGrow: 1
  }
})

class Index extends React.Component {

  static propTypes = {
    user: PropTypes.shape({
      email: PropTypes.string.isRequired
    })
  }

  static defaultProps = {
    user: null
  }

  render() {
    const {user, classes} = this.props
    // console.log('\n %c index.props: ', 'color: green', this.props)
    return (
      <div className={classes.root}>
        <Head>
          <title>Dashboard</title>
          <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
          <meta name="apple-touch-fullscreen" content="yes" />
          <meta name="apple-mobile-web-app-capable" content="yes" />
          <meta name="apple-mobile-web-app-status-bar-style" content="black" />
          <meta name="description" content="money tracking web application" />

        </Head>
        <Grid container spacing={16} justify="center">
          <Grid item xs={12} md={9} lg={6}>
            <Dashboard {...this.props} />
          </Grid>
        </Grid>

      </div>
    )
  }
}

export default withAuth(withLayout(withStyles(styles)(Index)))

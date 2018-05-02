/* eslint react/prefer-stateless-function: 0 */

import React          from 'react'
import PropTypes      from 'prop-types'
import { withStyles } from 'material-ui/styles'
import Head           from 'next/head'
import Grid           from 'material-ui/Grid'

import { InitFontAwesome } from '../lib/getIcon'
import withAuth            from '../lib/withAuth'
import dashboardLayout     from '../layouts/dashboardLayout'
import Dashboard           from '../components/Dashboard'

const styles = theme => ( {
  root: {
    flexGrow: 1
  }
} )

class Index extends React.Component {

  static propTypes = {
    user: PropTypes.shape( {
      email: PropTypes.string.isRequired
    } )
  }

  static defaultProps = {
    user: null
  }

  componentDidMount() {
    // Initialize font library
    InitFontAwesome()

    //  Add FastClick globally to document doesn't work well with a material-ui tabs
    /*const FastClick = require( 'fastclick' )
    FastClick.attach( document.body, false )*/
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

export default withAuth( dashboardLayout( withStyles( styles )( Index ) ) )

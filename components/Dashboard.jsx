import React          from 'react'
import PropTypes      from 'prop-types'
import {withStyles}   from 'material-ui/styles'
import SwipeableViews from 'react-swipeable-views'
import AppBar         from 'material-ui/AppBar'
import Tabs, {Tab}    from 'material-ui/Tabs'
import Typography     from 'material-ui/Typography'

import {getAllCategories} from '../lib/api/user'

const styles = theme => ({
  root: {
    backgroundColor: theme.palette.background.paper
  }
})

function TabContainer({children, dir}) {
  return (
    <Typography component="div" dir={dir} style={{padding: 8 * 3}}>
      {children}
    </Typography>
  )
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
  dir     : PropTypes.string.isRequired
}

class Dashboard extends React.Component {
  state = {
    activeTab : 0,
    categories: null,
    loading   : false,
    error     : null
  }

  handleChange = () => (event, activeTab) => {
    this.setState({activeTab})
  }

  handleChangeIndex = () => activeTab => {
    this.setState({activeTab})
  }

  async componentDidMount() {
    try {
      const categories = await getAllCategories()
      this.setState({
        categories
      })
    } catch (err) {
      this.setState({
        loading: false, error: err.message || err.toString()
      })
    }
  }

  render() {
    const {classes, theme} = this.props

    return (
      <div className={classes.root}>
        <AppBar position="static" color="default">
          <Tabs
            value={this.state.activeTab}
            onChange={this.handleChange()}
            indicatorColor="primary"
            textColor="primary"
            fullWidth
            centered
            scrollable
            scrollButtons="auto"
          >
            <Tab label="All" />
            <Tab label="Item Two" />
            <Tab label="Item Three" />
          </Tabs>
        </AppBar>
        <SwipeableViews
          axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
          index={this.state.activeTab}
          onChangeIndex={this.handleChangeIndex()}
        >
          <TabContainer dir={theme.direction}>Item One</TabContainer>
          <TabContainer dir={theme.direction}>Item Two</TabContainer>
          <TabContainer dir={theme.direction}>Item Three</TabContainer>
        </SwipeableViews>
      </div>
    )
  }
}

Dashboard.propTypes = {
  classes: PropTypes.object.isRequired,
  theme  : PropTypes.object.isRequired
}

export default withStyles(styles, {withTheme: true})(Dashboard)

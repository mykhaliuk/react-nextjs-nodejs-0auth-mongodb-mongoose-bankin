import React          from 'react'
import PropTypes      from 'prop-types'
import {withStyles}   from 'material-ui/styles'
import SwipeableViews from 'react-swipeable-views'
import AppBar         from 'material-ui/AppBar'
import Tabs, {Tab}    from 'material-ui/Tabs'
import Typography     from 'material-ui/Typography'

import GetTabContent from './GetTabContent'

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

  /*async componentDidMount() {
    const newAccountData = {name:"main",description:"Credit Agricole PACA"}
    try {
      await createBankAccount(newAccountData)
    } catch (err) {
      this.setState({
        loading: false,
        error  : err.message || err.toString()
      })
    }
  }
*/
  render() {
    const {classes, theme, user} = this.props
    console.log(`%c \n rendering <Dashboard/>\n`, 'color: red')

    return (
      <div className={classes.root}>
        <AppBar className={''} position="static" color="default">
          <Tabs
            value={this.state.activeTab}
            onChange={this.handleChange()}
            indicatorColor="primary"
            textColor="primary"
            fullWidth
            scrollable
            scrollButtons="auto"
          >
            <Tab label="All" />
            {user.bankAccounts.map(accountID => <GetTabContent id={accountID} key={accountID} />)}
          </Tabs>
        </AppBar>
        <SwipeableViews
          axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
          index={this.state.activeTab}
          onChangeIndex={this.handleChangeIndex()}
        >
          <TabContainer dir={theme.direction}>Item One</TabContainer>
          <TabContainer value={'5ab63ac6d135e800f9c33d8e'} dir={theme.direction}>Tab Two</TabContainer>
          <TabContainer value={'5ab63a76d135e800f9c33d8d'} dir={theme.direction}>Tab Three</TabContainer>
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

import React          from 'react'
import PropTypes      from 'prop-types'
import {withStyles}   from 'material-ui/styles'
import SwipeableViews from 'react-swipeable-views'
import AppBar         from 'material-ui/AppBar'
import Grid           from 'material-ui/Grid'
import Tabs, {Tab}    from 'material-ui/Tabs'
import Typography     from 'material-ui/Typography'

import userAPI                 from '../lib/api/user'
import GetTabContent           from './GetTabContent'
import TotalAmount             from './TotalAmount'
import CreateTransactionButton from './CreateTransactionButton'

import TransactionsList from './TransactionsList'
import notify           from '../lib/notifier'

const styles = theme => ({
  root   : {
    backgroundColor: theme.palette.background.paper
  },
  caption: {
    textTransform: 'uppercase',
    paddingBottom: theme.typography.pxToRem(20) + `!important`
  }
})

function TabContainer({children, dir}) {
  return (
    <Typography component="div" dir={dir} style={{padding: 10}}>
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
    userTransactions: null,
    activeTab       : 0,
    categories      : null,
    loading         : false,
    isSnackbarOpen  : false
  }

  handleChangeTab = () => (event, activeTab) => {
    this.setState({activeTab})
  }

  handleChangeIndex = () => activeTab => {
    this.setState({activeTab})
  }

  createTransaction = () => (transaction) => this.setState({
    userTransaction: {...this.state.userTransactions, transaction}
  })

  async componentDidMount() {
    const {user} = this.props

    try {
      const userTransactions = await userAPI.getAllUserTransactions(user.id)

      this.setState({
        loading: false,
        userTransactions
      })
    } catch (err) {
      this.setState({
        loading: false
      })
      notify('Oops! Unable to load your transactions. Try to reload page')
    }
  }

  render() {
    const {classes, theme, user} = this.props

    return (
      <div className={classes.root}>
        <AppBar position="static" color="default">
          <Tabs
            value={this.state.activeTab}
            onChange={this.handleChangeTab()}
            indicatorColor="primary"
            textColor="primary"
            fullWidth
            scrollable
            scrollButtons="auto"
          >
            <Tab label="All" />
            {user.bankAccounts.map(accountID => <GetTabContent id={accountID.toString()} key={accountID.toString()} />)}
          </Tabs>
        </AppBar>
        <SwipeableViews
          axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
          index={this.state.activeTab}
          onChangeIndex={this.handleChangeIndex()}
        >
          <TabContainer dir={theme.direction}>
            <Grid container align-items='flex-end'>
              <TotalAmount transactions={this.state.userTransactions} />
              <CreateTransactionButton createTransaction={this.createTransaction} user={user} />
              <TransactionsList transactions={this.state.userTransactions} />
            </Grid>
          </TabContainer>
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

import React          from 'react'
import PropTypes      from 'prop-types'
import {withStyles}   from 'material-ui/styles'
import SwipeableViews from 'react-swipeable-views'
import AppBar         from 'material-ui/AppBar'
import Grid           from 'material-ui/Grid'
import Tabs, {Tab}    from 'material-ui/Tabs'
import Typography     from 'material-ui/Typography'

import userAPI                 from '../lib/api/user'
import TotalAmount             from './TotalAmount'
import CreateTransactionButton from './CreateTransactionButton'

import TransactionsList from './TransactionsList'
import notify           from '../lib/notifier'
import moment           from 'moment'

const styles = theme => ({
  root   : {
    backgroundColor: theme.palette.background.paper
  },
  appBar : {
    margin: theme.typography.pxToRem(20) + ' 0'
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
    loading         : false
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

  addTransaction = async (transaction) => {
    // save old state
    const oldTransactions = this.state.userTransactions
    try {
      // change state immediately
      await this.setState(({userTransactions}) => ({
          // put item in right place relatively creation Date
          userTransactions: [
            ...userTransactions.filter(i => moment(i.creationDate) > moment(transaction.creationDate)),
            transaction,
            ...userTransactions.filter(i => moment(i.creationDate) <= moment(transaction.creationDate))
          ]
        })
      )

      // trying to make changes at the back end
      await userAPI.createTransaction(transaction)  // !!!!!!! should be uncommented  !!!!!!
      // if successful
      notify(`Successfully saved transaction "<strong>${transaction.name}</strong>".`)
    } catch (error) {
      // if no, revert the old state and notify
      notify(`<strong>Can't save</strong>. Error: ${error.message}`)
      this.setState(({userTransactions}) => ({
        userTransactions: oldTransactions
      }))
    }
  }

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

    return <div className={classes.root}>
      <AppBar position="sticky" color="default" className={classes.appBar}>
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
          {user.bankAccounts.map(account => <Tab label={account.name} key={account._id.toString()} />)}
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
            <CreateTransactionButton createTransaction={this.createTransaction} user={user} addTransaction={this.addTransaction} />
            <TransactionsList transactions={this.state.userTransactions} accounts={user.bankAccounts} />
          </Grid>
        </TabContainer>
        <TabContainer value={'5ab63ac6d135e800f9c33d8e'} dir={theme.direction}>Tab Two</TabContainer>
        <TabContainer value={'5ab63a76d135e800f9c33d8d'} dir={theme.direction}>Tab Three</TabContainer>
      </SwipeableViews>
    </div>
  }
}

Dashboard.propTypes = {
  classes: PropTypes.object.isRequired,
  theme  : PropTypes.object.isRequired
}

export default withStyles(styles, {withTheme: true})(Dashboard)

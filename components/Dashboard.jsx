import React          from 'react'
import PropTypes      from 'prop-types'
import {withStyles}   from 'material-ui/styles'
import SwipeableViews from 'react-swipeable-views'
import AppBar         from 'material-ui/AppBar'
import Grid           from 'material-ui/Grid'
import Tabs, {Tab}    from 'material-ui/Tabs'
import Typography     from 'material-ui/Typography'

import Snackbar   from 'material-ui/Snackbar'
import IconButton from 'material-ui/IconButton'
import CloseIcon  from 'material-ui-icons/Close'

import userAPI                 from '../lib/api/user'
import GetTabContent           from './GetTabContent'
import TotalAmount             from './TotalAmount'
import CreateTransactionButton from './CreateTransactionButton'

import TransactionsList from './TransactionsList'

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
    userTransactions: null,
    activeTab       : 0,
    categories      : null,
    loading         : false,
    error           : null,
    isSnackbarOpen  : false
  }

  handleChangeTab = () => (event, activeTab) => {
    this.setState({activeTab})
  }

  handleChangeIndex = () => activeTab => {
    this.setState({activeTab})
  }

  handleCloseSnackbar = () => (event, reason) => {
    if (reason === 'clickaway') {
      return
    }
    this.setState({open: false})
  }

  createTransaction = () => (transaction) => this.setState({
    userTransaction: {...this.state.userTransactions, transaction}
  })

  async componentDidMount() {
    const {user} = this.props
    // const newTransactionData = {
    //   name: 'Salary', account: '5ab63ac6d135e800f9c33d8e', amount: 140000, category: `${user.categories.Incomes.Salaries}`
    // }
    // const newAccountData = {name:"main",description:"Credit Agricole PACA"}

    try {
      const userTransactions = await userAPI.getAllUserTransactions(user.id)

      // await userAPI.createBankAccount(newAccountData)
      // await userAPI.createTransaction(newTransactionData)

      this.setState({
        loading: false,
        error  : null,
        userTransactions
      })

    } catch (err) {
      this.setState({
        loading: false,
        error  : err.message || err.toString()
      })
    }

  }

  render() {
    // console.log(`%c \n rendering <Dashboard/>\n`, 'color: red') TODO: Notifer

    const {classes, theme, user} = this.props

    return <React.Fragment>
      <Snackbar
        anchorOrigin={{
          vertical  : 'bottom',
          horizontal: 'center'
        }}
        open={this.state.error}
        autoHideDuration={6000}
        onClose={this.handleCloseSnackbar()}
        SnackbarContentProps={{
          'aria-describedby': 'message-id'
        }}
        message={<span id="message-id">{this.state.error}</span>}
        action={[
          <IconButton
            key="close"
            aria-label="Close"
            color="inherit"
            className={classes.close}
            onClick={this.handleCloseSnackbar()}
          >
            <CloseIcon />
          </IconButton>
        ]}
      />
      <div className={classes.root}>
        <AppBar className={''} position="static" color="default">
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
    </React.Fragment>
  }
}

Dashboard.propTypes = {
  classes: PropTypes.object.isRequired,
  theme  : PropTypes.object.isRequired
}

export default withStyles(styles, {withTheme: true})(Dashboard)

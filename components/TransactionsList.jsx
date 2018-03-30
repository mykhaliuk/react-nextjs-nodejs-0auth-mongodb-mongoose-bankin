import React        from 'react'
import PropTypes    from 'prop-types'
import {withStyles} from 'material-ui/styles'

import Transaction from './Transaction'

const styles = theme => ({
  root            : {
    flexGrow: 1
  },
  heading         : {
    fontSize: theme.typography.pxToRem(15)
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color   : theme.palette.text.secondary
  },
  amount          : {
    paddingRight: `${theme.typography.pxToRem(15)} !important`
  },
  icon            : {
    verticalAlign: 'bottom',
    height       : 20,
    width        : 20
  },
  details         : {
    padding   : theme.typography.pxToRem(24) + `!important`,
    paddingTop: 0 + `!important`
  },
  column          : {
    flexBasis: '50%'
  },
  date            : {
    textAlign: 'right !important',
    padding  : `${theme.spacing.unit}px  ${theme.spacing.unit * 4}px 0 0 `
  },
  account         : {
    textAlign: 'left !important',
    padding  : `${theme.spacing.unit}px 0 0 ${theme.spacing.unit * 4}px`
  },
  helper          : {
    borderLeft: `2px solid ${theme.palette.divider}`
  },
  note            : {
    justifyContent: 'left !important',
    paddingLeft   : theme.typography.pxToRem(20) + `!important`
  },
  link            : {
    color         : theme.palette.primary.main,
    textDecoration: 'none',
    '&:hover'     : {
      textDecoration: 'underline'
    }
  }
})

class TransactionsList extends React.Component {
  state = {
    expanded: null
  }

  handleChange = panel => (event, expanded) => {
    this.setState({
      expanded: expanded ? panel : null
    })
  }

  render() {
    const {classes, transactions} = this.props
    const {expanded} = this.state

    return (
      !transactions ? <span /> : <div className={classes.root}>
        {transactions.map(transaction => <Transaction
          key={transaction._id.toString()}
          expanded={this.state.expanded}
          transaction={transaction}
          handleChange={this.handleChange}
        />)}
      </div>
    )
  }
}

TransactionsList.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(TransactionsList)
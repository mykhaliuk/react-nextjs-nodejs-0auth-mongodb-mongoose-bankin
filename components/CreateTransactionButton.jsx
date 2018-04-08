import React          from 'react'
import PropTypes      from 'prop-types'
import {withStyles}   from 'material-ui/styles'
import classNames     from 'classnames'
import ExpansionPanel, {
  ExpansionPanelDetails,
  ExpansionPanelSummary,
  ExpansionPanelActions
}                     from 'material-ui/ExpansionPanel'
import Typography     from 'material-ui/Typography'
import ExpandMoreIcon from 'material-ui-icons/ExpandMore'
import Divider        from 'material-ui/Divider'
import Grid           from 'material-ui/Grid'

import CreateTransactionModal from './CreateTransactionModal'

const styles = theme => ({
  root: {
    backgroundColor: theme.palette.background.paper
  },
  link: {
    padding       : `0 0 ${theme.typography.pxToRem(20)} 0`,
    textAlign     : 'center',
    color         : theme.palette.primary.main,
    textDecoration: 'none',
    '&:hover'     : {
      color : theme.palette.primary.over,
      cursor: 'pointer'
    }
  }
})

class CreateTransactionButton extends React.Component {

  state = {
    isModalOpen: false
  }

  handleModalToggle = () => (e) => {
    // e.preventDefault()
    this.setState({
      isModalOpen: !this.state.isModalOpen
    })
  }

  render() {
    const {user, classes, addTransaction} = this.props

    return (
      <React.Fragment>
        <Grid item className={classes.root} xs={12}>
          <Typography variant='button' className={classNames(classes.link)} onClick={this.handleModalToggle()}>Add new transaction</Typography>
        </Grid>
        <CreateTransactionModal onClose={this.handleModalToggle} open={this.state.isModalOpen} user={user} addTransaction={addTransaction} />
      </React.Fragment>
    )
  }
}

CreateTransactionButton.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(CreateTransactionButton)
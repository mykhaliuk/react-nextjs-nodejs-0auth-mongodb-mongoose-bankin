import React             from 'react'
import PropTypes         from 'prop-types'
import {withStyles}      from 'material-ui/styles'
import Modal             from 'material-ui/Modal'
import classNames        from 'classnames'
import DotsMobileStepper from './DotsMobileStepper'

const styles = theme => ({
  root : {
    flexGrow: 1,
    padding : theme.spacing.unit * 2,
    height  : '100%',
    width   : '100%',
    // maxWidth : theme.typography.pxToRem(375) + '!important',
    // maxHeight: theme.typography.pxToRem(667) + '!important',
    overflow: 'scroll'
  },
  paper: {
    position       : 'absolute',
    // width          : theme.spacing.unit * 45,
    backgroundColor: theme.palette.background.paper,
    boxShadow      : theme.shadows[5]
    // padding        : theme.spacing.unit * 4
  }
})

class CreateTransactionModal extends React.Component {

  render() {
    const {classes, open, onClose, user} = this.props

    return (
      <Modal
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={open}
        onClose={onClose()}
      >
        <div className={classNames(classes.paper, classes.root)}>
          <DotsMobileStepper closeModal={onClose} user={user} />
        </div>
      </Modal>
    )
  }
}

CreateTransactionModal.propTypes = {
  classes: PropTypes.object.isRequired,
  open   : PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired
}

export default withStyles(styles)(CreateTransactionModal)

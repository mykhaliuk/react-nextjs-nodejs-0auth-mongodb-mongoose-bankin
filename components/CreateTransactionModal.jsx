import React        from 'react'
import PropTypes    from 'prop-types'
import {withStyles} from 'material-ui/styles'
import Typography   from 'material-ui/Typography'
import Modal        from 'material-ui/Modal'
import Button       from 'material-ui/Button'
import classNames   from 'classnames'
import moment       from 'moment'

import MobileStepper from 'material-ui/MobileStepper'

import KeyboardArrowLeft      from 'material-ui-icons/KeyboardArrowLeft'
import KeyboardArrowRight     from 'material-ui-icons/KeyboardArrowRight'
import InputNameTransaction   from './InputNameTransaction'
import InputAmountTransaction from './InputAmountTransaction'
import InputDateTransaction   from './InputDateTransaction'

import TextField from 'material-ui/TextField'

function rand() {
  return Math.round(Math.random() * 20) - 10
}

const styles = theme => ({
  root   : {
    flexGrow : 1,
    height   : '100%',
    maxWidth : theme.typography.pxToRem(375) + '!important',
    maxHeight: theme.typography.pxToRem(667) + '!important',
    overflow : 'hidden !important'
  },
  paper  : {
    position       : 'absolute',
    width          : theme.spacing.unit * 50,
    backgroundColor: theme.palette.background.paper,
    boxShadow      : theme.shadows[5],
    padding        : theme.spacing.unit * 4
  },
  stepper: {
    maxWidth: 400,
    flexGrow: 1
  },
  hidden : {
    display: 'none'
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
          <MyStepper closeModal={onClose} user={user} />
        </div>
      </Modal>
    )
  }
}

class DotsMobileStepper extends React.Component {
  state = {
    activeStep: 0,
    name      : '',
    account   : this.props.user.bankAccounts[0],
    date      : moment(),
    okGo      : false,
    category  : '',
    hidden    : false
  }

  handleNext = () => {
    this.setState({
      activeStep: this.state.activeStep + 1
    })
  }

  handleBack = () => {
    this.setState({
      activeStep: this.state.activeStep - 1
    })
  }

  getSteps = () => {
    return [
      'For what or where money was spent?',
      'How much money did you spend?',
      'Choose a category',
      `That wasn't today? Choose when or pass this step`,
      'On which account?',
      `You can add a note or mark it as a hidden`

    ]
  }
  getStepsContent = stepIndex => {
    switch (stepIndex) {
      case 0:
        return <InputNameTransaction onChange={this.handleOnChange} isError={this.state.okGo} />
      case 1:
        return <InputAmountTransaction onChange={this.handleOnChange} isError={this.state.okGo} />
      case 2:
        return '👮‍♂️ Under Construction'
      case 3:
        return <InputDateTransaction onChange={this.handleOnChange} isError={this.state.okGo} />
      case 4:
        return '👮‍♂️ Under Construction'
      case 5:
        return '👮‍♂️ Under Construction'
      default:
        return 'Unknown stepIndex'
    }
  }

  totalSteps = () => {
    return this.getSteps().length
  }

  verifyNmae = () => {
    if (this.state.name && this.state.name.length >= 3) {
      return this.setState({okGo: true})
    }
    this.setState({okGo: false})
  }

  handleOnChange = ctx => async (e) => {
    await this.setState({
      [ctx]: e.target.value
    })
    console.log('state: ', this.state)
    this.verifyNmae()
  }

  isLastStep() {
    return this.state.activeStep === this.totalSteps() - 1
  }

  render() {
    const {classes, theme, closeModal} = this.props
    const steps = this.getSteps()
    const {activeStep} = this.state

    return (
      <React.Fragment>
        {steps.map((content, index) => {
          return (<div className={classNames(activeStep !== index ? classes.hidden : '')} key={index}>
            <Typography variant="display1">
              {content}
            </Typography>
            {this.getStepsContent(index)}
          </div>)
        })}
        <MobileStepper
          variant="dots"
          steps={this.totalSteps()}
          position="static"
          activeStep={this.state.activeStep}
          className={classes.stepper}
          nextButton={
            <Button
              size="small"
              onClick={this.isLastStep() ? closeModal() : this.handleNext}
              disabled={!this.state.okGo}
            >
              {this.isLastStep() ? 'Create' : 'Next'}
              {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
            </Button>
          }
          backButton={
            <Button size="small" onClick={this.handleBack} disabled={this.state.activeStep === 0 || !this.state.okGo}>
              {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
              Back
            </Button>
          }
        />
      </React.Fragment>
    )
  }
}

CreateTransactionModal.propTypes = {
  classes: PropTypes.object.isRequired,
  open   : PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired
}

DotsMobileStepper.propTypes = {
  user   : PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  theme  : PropTypes.object.isRequired
}

export const MyStepper = withStyles(styles, {withTheme: true})(DotsMobileStepper)

export default withStyles(styles)(CreateTransactionModal)

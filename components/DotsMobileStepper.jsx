import moment        from 'moment/moment'
import classNames    from 'classnames'
import PropTypes     from 'prop-types'
import {withStyles}  from 'material-ui/styles/index'
import React         from 'react'
import Typography    from 'material-ui/Typography'
import Button        from 'material-ui/Button'
import MobileStepper from 'material-ui/MobileStepper'

import KeyboardArrowLeft      from 'material-ui-icons/KeyboardArrowLeft'
import KeyboardArrowRight     from 'material-ui-icons/KeyboardArrowRight'
import InputNameTransaction   from './InputNameTransaction'
import InputAmountTransaction from './InputAmountTransaction'
import InputDateTransaction   from './InputDateTransaction'
import CtegoriesList          from './CategoriesList'

import SelectAccount from './SelectAccount'

const styles = theme => ({
  stepper: {
    flexGrow: 1
  },
  hidden : {
    display: 'none'
  }
})

class DotsMobileStepper extends React.Component {
  state = {
    activeStep: 0,
    name      : '',
    account   : this.props.user.bankAccounts[0]._id.toString(),
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
      `Here you can add a note and mark it as a hidden`
    ]
  }

  getAccounts = () => {
    const {user} = this.props

    return user.bankAccounts.map(account => ({id: account._id, name: account.name}))
  }

  isCredit = () => () => {
    const {amount} = this.state
    return (amount > 0)

  }

  getStepsContent = stepIndex => {
    const {user} = this.props

    switch (stepIndex) {
      case 0:
        return <InputNameTransaction onChange={this.handleOnChange} isError={this.state.okGo} />
      case 1:
        return <InputAmountTransaction onChange={this.handleOnChange} isError={this.state.okGo} />
      case 2:
        return <CtegoriesList categories={user.categories} onSelect={this.handleOnChange} isCredit={this.isCredit()} />
      case 3:
        return <InputDateTransaction onChange={this.handleOnChange} isError={this.state.okGo} />
      case 4:
        return <SelectAccount onChange={this.handleOnChange} accounts={this.getAccounts()} value={this.state.account} />
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
          position="bottom"
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
            <Button size="small" onClick={this.state.activeStep === 0 ? closeModal() : this.handleBack}>
              {!(this.state.activeStep === 0) && (theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />)}
              {this.state.activeStep === 0 ? 'Cancel' : 'Back'}
            </Button>
          }
        />
      </React.Fragment>
    )
  }
}

DotsMobileStepper.propTypes = {
  user   : PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  theme  : PropTypes.object.isRequired
}

export default withStyles(styles, {withTheme: true})(DotsMobileStepper)
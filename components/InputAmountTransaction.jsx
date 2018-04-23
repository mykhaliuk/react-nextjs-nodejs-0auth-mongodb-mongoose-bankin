import React, {
  Fragment
}                      from 'react'
import PropTypes       from 'prop-types'
import { withStyles }  from 'material-ui/styles/index'
import NumberFormat    from 'react-number-format'
import Input, {
  InputLabel,
  InputAdornment
}                      from 'material-ui/Input'
import { FormControl } from 'material-ui/Form'

class InputAmountTransaction extends React.Component {
  removeDecimals = () => ( e ) => {
    const {onChange} = this.props

    e.target.value *= 100
    onChange( 'amount' )( e )
  }

  render() {
    const {onChange, next, isError = false} = this.props

    return (
      <Fragment>
        <FormControl fullWidth>
          <Input
            type='text'
            placeholder='€ 0.00'
            fullWidth
            autoFocus
            error={!isError}
            onChange={this.removeDecimals()}
            onBlur={next}
            inputComponent={NumberFormatCustom}
          />
        </FormControl>
      </Fragment>
    )
  }
}

InputAmountTransaction.propTypes = {
  onChange: PropTypes.func.isRequired,
  isError : PropTypes.bool
}

export function NumberFormatCustom( props ) {
  const {inputRef, onChange, ...other} = props

  return (
    <NumberFormat
      {...other}
      ref={inputRef}
      onValueChange={values => {
        onChange( {
          target: {
            value: values.value
          }
        } )
      }}
      decimalScale={2}
      fixedDecimalScale
      thousandSeparator=' '
      prefix="€ "
    />
  )
}

NumberFormatCustom.propTypes = {
  inputRef: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired
}

export default InputAmountTransaction

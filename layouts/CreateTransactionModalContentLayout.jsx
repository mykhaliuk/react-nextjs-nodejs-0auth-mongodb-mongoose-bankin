import React from 'react'

const styles = theme => ( {
  root: {
    padding: theme.spacing.unit * 2
  }
} )

function CreateTransactionModalContentLayout( props ) {
  class Comp extends React.Component {

    render() {
      return <React.Fragment>
        <props.cc {...props} />
      </React.Fragment>
    }
  }

  return Comp
}

export default CreateTransactionModalContentLayout

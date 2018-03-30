import React        from 'react'
import Snackbar     from 'material-ui/Snackbar'
import IconButton   from 'material-ui/IconButton'
import CloseIcon    from 'material-ui-icons/Close'
import {withStyles} from 'material-ui/styles'

let openSnackbarFn

const styles = theme => ({
  root   : {
    backgroundColor: theme.palette.background.paper
  },
  caption: {
    textTransform: 'uppercase',
    paddingBottom: theme.typography.pxToRem(20) + `!important`
  }
})

class Notifier extends React.Component {
  state = {
    open   : false,
    message: ''
  }

  handleSnackbarClose = () => {
    this.setState({
      open   : false,
      message: ''
    })
  }

  openSnackbar = ({message}) => {
    this.setState({open: true, message})
  }

  componentDidMount() {
    openSnackbarFn = this.openSnackbar
  }

  handleCloseSnackbar = () => (event, reason) => {
    if (reason === 'clickaway') {
      return
    }
    this.setState({open: false})
  }

  render() {
    const {classes} = this.props
    const message = (
      <span id="snackbar-message-id" dangerouslySetInnerHTML={{__html: this.state.message}} />
    )

    return (
      <Snackbar
        anchorOrigin={{vertical: 'bottom', horizontal: 'center'}}
        message={message}
        autoHideDuration={6000}
        onClose={this.handleSnackbarClose}
        open={this.state.open}
        SnackbarContentProps={{
          'aria-describedby': 'snackbar-message-id'
        }}
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
    )
  }
}

export function openSnackbar({message}) {
  openSnackbarFn({message})
}

export default withStyles(styles)(Notifier)

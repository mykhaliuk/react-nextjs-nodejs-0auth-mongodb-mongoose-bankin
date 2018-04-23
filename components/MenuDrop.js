import React              from 'react'
import PropTypes          from 'prop-types'
import Link               from 'next/link'
import Menu, { MenuItem } from 'material-ui/Menu'
import Avatar             from 'material-ui/Avatar'
import { withStyles }     from 'material-ui/styles'

const styles = theme => ( {
  link: {
    fontFamily    : theme.typography.fontFamily,
    padding       : '0px 20px',
    textDecoration: 'none',
    color         : theme.palette.secondary.main + ' !important'
  }
} )

class MenuDrop extends React.Component {
  static propTypes = {
    src    : PropTypes.string.isRequired,
    alt    : PropTypes.string.isRequired,
    options: PropTypes.arrayOf( String ).isRequired
  }

  state = {
    open    : false,
    anchorEl: undefined
  }

  button = undefined

  handleClick = ( event ) => {
    this.setState( {open: true, anchorEl: event.currentTarget} )
  }

  handleClose = () => {
    this.setState( {open: false} )
  }

  render() {
    const {classes, options, src, alt} = this.props

    return (
      <div>
        <Avatar
          role="presentation"
          aria-owns="simple-menu"
          aria-haspopup="true"
          onClick={this.handleClick}
          onKeyPress={this.handleClick}
          src={src}
          alt={alt}
          style={{cursor: 'pointer'}}
        />
        <Menu
          id="simple-menu"
          anchorEl={this.state.anchorEl}
          open={this.state.open}
          onClose={this.handleClose}
        >
          {options.map( option => (
            <MenuItem onClick={this.handleClose} key={option.text}>
              <Link prefetch href={option.href} as={option.as || option.href}>
                <a className={classes.link}>{option.text}</a>
              </Link>
              <p />
            </MenuItem>
          ) )}
        </Menu>
      </div>
    )
  }
}

export default withStyles( styles )( MenuDrop )

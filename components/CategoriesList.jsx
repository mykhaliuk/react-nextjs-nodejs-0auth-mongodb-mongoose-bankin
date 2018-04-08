import React        from 'react'
import PropTypes    from 'prop-types'
import {withStyles} from 'material-ui/styles'
import List, {
  ListItem,
  ListItemIcon,
  ListItemText
}                   from 'material-ui/List'
import Collapse     from 'material-ui/transitions/Collapse'
import ExpandLess   from 'material-ui-icons/ExpandMore'
import ExpandMore   from 'material-ui-icons/ChevronRight'

import {is} from 'immutable'

import Spinner from './Spinner'
import getIcon from '../lib/getIcon'

const styles = theme => ({
  root       : {
    backgroundColor: theme.palette.background.paper
  },
  nested     : {
    paddingLeft: theme.spacing.unit * 4
  },
  icon       : {
    color : '#FFF',
    // margin: '0 0 0 6px'
    margin: theme.spacing.unit * .5
  },
  iconWrapper: {
    width       : '2rem',
    height      : '2rem',
    borderRadius: '50%'
  }
})

class CategoriesList extends React.Component {
  state = {
    open          : [],
    categoriesList: null
  }

  handleClick = (id) => async () => {
    await this.setState(({open}) => {
      return open.includes(id)
        ? {open: open.filter(itemId => itemId !== id)}
        : {open: open.concat(id)}
    })
  }

  onSelect = (value) => () => {
    const {onSelect, next} = this.props

    onSelect('category')({target: {value}})
    next()
  }

  async componentDidMount() {
    const {categories, isCredit} = this.props

    const incomes = categories.Incomes
    const expenses = categories.Expenses
    const categoriesList = isCredit() ? incomes : expenses

    await this.setState({
      categoriesList,
      expenses,
      incomes
    })
  }

  componentDidUpdate(prevProps, {incomes, expenses, categoriesList}, snapshot) {
    const {isCredit} = this.props
    const categories = isCredit() ? incomes : expenses

    !is(categoriesList, categories) && this.setState(() => ({
      categoriesList: categories
    }))

    /*categoriesList && Object.keys(categoriesList).map((category) => {
      console.log('===========================================')
      if (categoriesList[category] instanceof Object) {
        console.log('name', categoriesList[category].name)
        console.log('icon', categoriesList[category].icon)
        console.log('color', categoriesList[category].color)

        Object.keys(categoriesList[category]).map(sub => {
            if (['name', 'icon', 'color', 'group'].includes(sub)) {
              console.log('\n    >>> passing', sub)
              return null
            }
            console.log('\n   name', categoriesList[category][sub].name)
            console.log('   icon', categoriesList[category][sub].icon)
            console.log('   color', categoriesList[category][sub].color)
          }
        )
      } else return null
    })*/

  }

  render() {
    const {classes} = this.props
    const {open, categoriesList} = this.state

    return (!categoriesList
        ? <Spinner />
        : <div className={classes.root}>
          <List component="nav">
            {Object.keys(categoriesList).map(category => {
              if (categoriesList[category] instanceof Object && categoriesList[category].group) {
                return (
                  <React.Fragment key={categoriesList[category].name}>
                    <ListItem button onClick={this.handleClick(categoriesList[category].name)}>
                      <div className={classes.iconWrapper} style={{backgroundColor: `${categoriesList[category].color}`}}>
                        <ListItemIcon className={classes.icon}>
                          {getIcon(categoriesList[category])}
                        </ListItemIcon>
                      </div>
                      <ListItemText inset primary={categoriesList[category].name} />
                      {open.includes(categoriesList[category].name) ? <ExpandLess /> : <ExpandMore />}
                    </ListItem>
                    <Collapse in={open.includes(categoriesList[category].name)} timeout="auto" unmountOnExit>
                      <List component="div" disablePadding>
                        {Object.keys(categoriesList[category]).map((sub) => {
                            if (['name', 'icon', 'color', 'group'].includes(sub)) {
                              return null
                            }
                            return (
                              <ListItem
                                key={categoriesList[category][sub].name}
                                button
                                className={classes.nested}
                                onClick={this.onSelect(categoriesList[category][sub])}>
                                <div className={classes.iconWrapper} style={{backgroundColor: `${categoriesList[category][sub].color}`}}
                                >
                                  <ListItemIcon className={classes.icon}>
                                    {getIcon(categoriesList[category][sub])}
                                  </ListItemIcon>
                                </div>
                                <ListItemText inset primary={categoriesList[category][sub].name} />
                              </ListItem>
                            )
                          }
                        )}
                      </List>
                    </Collapse>
                  </React.Fragment>
                )
              } else {
                if (categoriesList[category] instanceof Object) {
                  return (
                    <ListItem
                      button
                      key={categoriesList[category].name}
                      onClick={this.onSelect(categoriesList[category])}
                    >
                      <div className={classes.iconWrapper} style={{backgroundColor: `${categoriesList[category].color}`}}>
                        <ListItemIcon className={classes.icon}>
                          {getIcon(categoriesList[category])}
                        </ListItemIcon>
                      </div>
                      <ListItemText inset primary={categoriesList[category].name} />
                    </ListItem>
                  )
                }
              }
            })}
          </List>
        </div>
    )
  }
}

CategoriesList.propTypes = {
  classes   : PropTypes.object.isRequired,
  categories: PropTypes.object.isRequired,
  onSelect  : PropTypes.func.isRequired,
  isCredit  : PropTypes.func.isRequired,
  next      : PropTypes.func.isRequired
}

export default withStyles(styles)(CategoriesList)
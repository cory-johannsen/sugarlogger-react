import React, { Component } from 'react';
import cx from 'classnames'
import style from "./Menu.scss"

class MenuItem extends Component {
  static propTypes = {
    title: React.PropTypes.string.isRequired,
    onClick: React.PropTypes.func.isRequired,
    selected: React.PropTypes.bool.isRequired
  }

  render() {
    return (
      <div className={ this.props.selected ? cx(style.menuItem, style.selected) : style.menuItem } onClick={ () => this.props.onClick(this.props.title) }>{this.props.title}</div>
    )
  }
}

export default class Menu extends Component {

  propTypes: {
    onMenuItemClick: React.PropTypes.func.required,
    selectedMenuItem: React.PropTypes.string.isRequired
  }

  render() {
    const { onMenuItemClick, selectedMenuItem} = this.props
    return (
      <div className={style.menu}>
        <MenuItem title='Readings' onClick={onMenuItemClick} selected={selectedMenuItem === 'Readings'}/>
        <MenuItem title='Doses' onClick={onMenuItemClick} selected={selectedMenuItem === 'Doses'}/>
        <MenuItem title='Meals' onClick={onMenuItemClick} selected={selectedMenuItem === 'Meals'}/>
      </div>
    )
  }
}

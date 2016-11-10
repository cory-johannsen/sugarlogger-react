import React, { Component } from 'react'
import cx from 'classnames'

import style from './AddReadingButton.scss'

export default class AddReadingButton extends Component {
  static propTypes = {
    onClick: React.PropTypes.func.isRequired
  }

  handleClick(e) {
    e.stopPropagation()
    this.props.onClick({
      value: this.refs.reading.value,
      takenAt: new Date()
    })
  }

  handleKeyPress(e) {
    if (e.key === 'Enter') {
      this.handleClick(e)
    }
  }

  render () {
    return (
      <div className={style.addReadingButton}>
        <input className={style.input} type='text' ref='reading' onClick={(e) => e.stopPropagation()} onKeyPress={(e) => this.handleKeyPress(e)}/>
        <span className={style.plus} onClick={(e) => this.handleClick(e)}>+</span>
      </div>
    )
  }
}

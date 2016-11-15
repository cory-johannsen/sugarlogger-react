import React, { Component } from 'react'
import cx from 'classnames'

import style from './AddReadingButton.scss'

export default class AddReadingButton extends Component {
  static propTypes = {
    onClick: React.PropTypes.func.isRequired
  }

  handleClick(e) {
    e.stopPropagation()
    const takenAt = this.refs.takenAt.value === 'Now' ? new Date() : new Date(this.refs.takenAt.value)
    this.props.onClick({
      value: this.refs.reading.value,
      takenAt: takenAt
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
        <input className={style.readingInput} type='text' ref='reading' defaultValue='reading' onClick={(e) => e.stopPropagation()} onKeyPress={(e) => this.handleKeyPress(e)}/>
        <div className={style.at}>at</div>
        <input className={style.dateInput} type='text' ref='takenAt' defaultValue={'Now'} onClick={(e) => e.stopPropagation()} onKeyPress={(e) => this.handleKeyPress(e)}/>
        <span className={style.plus} onClick={(e) => this.handleClick(e)}>+</span>
      </div>
    )
  }
}

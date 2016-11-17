import React, { Component } from 'react'
import cx from 'classnames'

import style from './AddMealButton.scss'

export default class AddDoseButton extends Component {
  static propTypes = {
    onClick: React.PropTypes.func.isRequired
  }

  handleClick(e) {
    e.stopPropagation()
    const eatenAt = this.refs.eatenAt.value === 'Now' ? new Date() : new Date(this.refs.eatenAt.value)
    this.props.onClick({
      description: this.refs.description.value,
      sugars: this.refs.sugars.value,
      carbohydrates: this.refs.carbohydrates.value,
      calories: this.refs.calories.value,
      eatenAt: eatenAt
    })
  }

  handleKeyPress(e) {
    if (e.key === 'Enter') {
      this.handleClick(e)
    }
  }

  render () {
    return (
      <div className={style.addMealButton}>
        <input className={style.descriptionInput} type='text' ref='description' defaultValue='description' onClick={(e) => e.stopPropagation()} onKeyPress={(e) => this.handleKeyPress(e)}/>
        <div className={style.sugars}>Sugars:</div>
        <input className={style.sugarsInput} type='text' ref='sugars' defaultValue='0' onClick={(e) => e.stopPropagation()} onKeyPress={(e) => this.handleKeyPress(e)}/>
        <div className={style.carbohydrates}>Carbs:</div>
        <input className={style.carbohydratesInput} type='text' ref='carbohydrates' defaultValue='0' onClick={(e) => e.stopPropagation()} onKeyPress={(e) => this.handleKeyPress(e)}/>
        <div className={style.calories}>Calories:</div>
        <input className={style.caloriesInput} type='text' ref='calories' defaultValue='0' onClick={(e) => e.stopPropagation()} onKeyPress={(e) => this.handleKeyPress(e)}/>
        <div className={style.at}>at</div>
        <input className={style.dateInput} type='text' ref='eatenAt' defaultValue='Now' onClick={(e) => e.stopPropagation()} onKeyPress={(e) => this.handleKeyPress(e)}/>
        <span className={style.plus} onClick={(e) => this.handleClick(e)}>+</span>
      </div>
    )
  }
}

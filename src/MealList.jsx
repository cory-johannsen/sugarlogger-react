import React, { Component } from 'react'
import cx from 'classnames'

import AddMealButton from './AddMealButton'
import style from './MealList.scss'

export default class MealList extends Component {

  static propTypes = {
    meals: React.PropTypes.array.isRequired,
    onMealAdd: React.PropTypes.func.isRequired,
    onMealRemove: React.PropTypes.func.isRequired
  }

  constructor(props) {
    super(props)
    this.dateFormat = new Intl.DateTimeFormat('en-US', {
      timeZone: 'America/Los_Angeles',
      timeZoneName: 'short',
      weekday: 'short',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  handleAddMealClick(meal) {
    this.props.onMealAdd(meal)
  }

  handleRemoveMealClick(meal) {
    this.props.onMealRemove(meal)
  }

  render () {
    return (
      <div className={style.mealList} >
        <AddMealButton onClick={(meal) => this.handleAddMealClick(meal)} />
        <div className={style.mealListHeaderRow}>
          <div className={style.mealListHeader}>Description</div>
          <div className={style.mealListHeader}>Sugars</div>
          <div className={style.mealListHeader}>Carbohydrates</div>
          <div className={style.mealListHeader}>Eaten At</div>
        </div>
        {
          this.props.meals.map (
            (meal, i) => {

              const eatenAt = new Date(meal.eatenAt)
              return (
                <div className= {style.mealListDataRow} key={meal.eatenAt + '_' + i}>
                  <div className={style.mealContainer}>
                    <div className={style.mealListItem}>{meal.description}</div>
                    <div className={style.mealListItem}>{meal.sugars}</div>
                    <div className={style.mealListItem}>{meal.carbohydrates}</div>
                    <div className={style.mealListItem}>{eatenAt.toLocaleString()}</div>
                  </div>
                  <div className={style.removeContainer}>
                    <div className={style.remove} onClick={() => this.handleRemoveMealClick(meal)}>+</div>
                  </div>
                </div>
              )
            }
          )
        }
      </div>
    )
  }
}

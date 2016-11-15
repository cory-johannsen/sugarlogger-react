import React, { Component } from 'react'
import cx from 'classnames'

import AddDoseButton from './AddDoseButton'
import style from './DoseList.scss'

export default class DoseList extends Component {

  static propTypes = {
    doses: React.PropTypes.array.isRequired,
    onDoseAdd: React.PropTypes.func.isRequired,
    onDoseRemove: React.PropTypes.func.isRequired
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

  handleAddDoseClick(dose) {
    this.props.onDoseAdd(dose)
  }

  handleRemoveDoseClick(dose) {
    this.props.onDoseRemove(dose)
  }

  render () {
    return (
      <div className={style.doseList} >
        <AddDoseButton onClick={(dose) => this.handleAddDoseClick(dose)} />
        <div className={style.doseListHeaderRow}>
          <div className={style.doseListHeader}>Dose</div>
          <div className={style.doseListHeader}>Taken At</div>
        </div>
        {
          this.props.doses.map (
            (dose, i) => {

              const takenAt = new Date(dose.takenAt)
              return (
                <div className= {style.doseListDataRow} key={dose.takenAt + '_' + i}>
                  <div className={style.doseContainer}>
                    <div className={style.doseListItem}>{dose.value}</div>
                    <div className={style.doseListItem}>{takenAt.toLocaleString()}</div>
                  </div>
                  <div className={style.removeContainer}>
                    <div className={style.remove} onClick={() => this.handleRemoveDoseClick(dose)}>+</div>
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

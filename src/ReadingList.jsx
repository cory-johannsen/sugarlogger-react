import React, { Component } from 'react'
import cx from 'classnames'

import AddReadingButton from './AddReadingButton'
import style from './ReadingList.scss'

export default class ReadingList extends Component {

  static propTypes = {
    readings: React.PropTypes.array.isRequired,
    onReadingAdd: React.PropTypes.func.isRequired,
    onReadingRemove: React.PropTypes.func.isRequired
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

  handleAddReadingClick(reading) {
    this.props.onReadingAdd(reading)
  }

  handleRemoveReadingClick(reading) {
    this.props.onReadingRemove(reading)
  }

  render () {
    return (
      <div className={style.readingList} >
        <AddReadingButton onClick={(reading) => this.handleAddReadingClick(reading)} />
        <div className={style.readingListRow}>
          <div className={style.readingListHeader}>Reading</div>
          <div className={style.readingListHeader}>Taken At</div>
        </div>
        {
          this.props.readings.map (
            (reading, i) => {

              const takenAt = new Date(reading.takenAt)
              return (
                <div className= {style.readingListRow} key={reading.takenAt + '_' + i}>
                  <div className={style.readingListItem}>{reading.value}</div>
                  <div className={style.readingListItem}>{takenAt.toLocaleString()}</div>
                  <div className={style.removeContainer}>
                    <div className={style.remove} onClick={() => this.handleRemoveReadingClick(reading)}>+</div>
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

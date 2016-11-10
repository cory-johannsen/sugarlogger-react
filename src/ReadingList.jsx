import React, { Component } from 'react'
import cx from 'classnames'

import AddReadingButton from './AddReadingButton'
import style from './ReadingList.scss'

export default class ReadingList extends Component {

  static propTypes = {
    readings: React.PropTypes.array.isRequired,
    onReadingAdd: React.PropTypes.func.isRequired
  }

  handleAddReadingClick(reading) {
    this.props.onReadingAdd(reading)
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
              const readingCount = this.props.readings.length;
              return (
                <div className= {style.readingListRow} key={reading.name + '_' + i}>
                  <div className={style.readingListItem}>{reading.value}</div>
                  <div className={style.readingListItem}>{reading.takenAt}</div>
                </div>
              )
            }
          )
        }
      </div>
    )
  }
}

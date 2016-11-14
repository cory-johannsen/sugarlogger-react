import React, { Component } from 'react';

import ReadingList from './ReadingList'
import style from './App.scss'

export default class App extends Component {

  static propTypes = {
    apiUrlBase: React.PropTypes.string.isRequired
  }

  constructor() {
    super()
    this.state = {
      readings: []
    }
  }

  componentDidMount() {
    const url = this.props.apiUrlBase
    const query = {
      query: '{ readings { id, value, takenAt } }'
    }
    fetch(url,
      {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(query)
      }
    ).then (
      (response) => {
        return response.json()
      }
    ).then (
      (json) => {
        this.setState({
          readings: json.data.readings
        })
      }
    ).catch (
      (err) => {
        console.log(err)
      }
    )
  }

  handleAddReading = (reading) => {
    console.log('handleAddReading:', reading)

    if (reading) {
      // Do not allow duplicates
      const url = this.props.apiUrlBase
      const dateString = reading.takenAt.toISOString();
      console.log('dateString', dateString)
      const query = {
        query: 'mutation addReading($value: Int!, $takenAt: String!)' +
          ' { addReading(value: $value, takenAt: $takenAt)' +
          ' { id, value, takenAt } }',
        variables: {
          value: reading.value,
          takenAt: dateString
        }
      }
      const body = JSON.stringify(query)
      // console.log('query body:', body)

      fetch(url,
        {
          method: 'post',
          headers: {
            'Content-Type': 'application/json'
          },
          body: body
        }
      ).then (
        (response) => {
          if (response.status != 200) {
            console.log('Error adding reading:', response)
          }
          else {
            return response.json()
          }
        }
      ).then(
        (json) => {
          const { readings } = this.state
          const reading = json.data.addReading
          readings.unshift(reading)

          this.setState({
            readings
          })
        }
      ).catch (
        (err) => {
          console.log(err)
        }
      )
    }
  }

  handleRemoveReading = (reading) => {
    console.log('handleRemoveReading:', reading)

    if (reading) {
      // Do not allow duplicates
      const url = this.props.apiUrlBase
      const query = {
        query: 'mutation removeReading($id: Int!)' +
          ' { removeReading(id: $id)' +
          ' { success, error} }',
        variables: {
          id: reading.id
        }
      }
      const body = JSON.stringify(query)
      // console.log('query body:', body)

      fetch(url,
        {
          method: 'post',
          headers: {
            'Content-Type': 'application/json'
          },
          body: body
        }
      ).then (
        (response) => {
          console.log(response)
          if (response.status != 200) {
            console.log('Error removing reading:', response)
          }
          else if (response.success === false) {
            console.log('Error removing reading:', response.error)
          }
          else {
            const { readings } = this.state
            readings.forEach((r, i) => {
              if (r.id === reading.id) {
                readings.splice(i, 1)
              }
            })

            this.setState({
              readings
            })
          }
        }
      ).catch (
        (err) => {
          console.log(err)
        }
      )
    }
  }


  render() {
    return (
      <div className={style.app}>
        <div className={style.appHeader}>
          <h2>SugarLogger</h2>
        </div>
        <ReadingList readings={this.state.readings} onReadingAdd={this.handleAddReading} onReadingRemove={this.handleRemoveReading} />
      </div>
    )
  }
}

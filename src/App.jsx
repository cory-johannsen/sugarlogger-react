import React, { Component } from 'react';

import Menu from './Menu'
import DoseList from './DoseList'
import ReadingList from './ReadingList'
import style from './App.scss'

export default class App extends Component {

  static propTypes = {
    apiUrlBase: React.PropTypes.string.isRequired
  }

  constructor() {
    super()
    this.state = {
      readings: [],
      doses: [],
      selectedMenuItem: 'Readings'
    }
  }

  componentDidMount() {
    this.fetchReadings()
    this.fetchDoses()
  }

  fetchReadings() {
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
        console.log('fetchReadings error:', err)
      }
    )
  }

  fetchDoses() {
    const url = this.props.apiUrlBase
    const query = {
      query: '{ doses { id, value, takenAt } }'
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
          doses: json.data.doses
        })
      }
    ).catch (
      (err) => {
        console.log('fetchDoses', err)
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

  handleAddDose = (dose) => {
    console.log('handleAddDose:', dose)

    if (dose) {
      // Do not allow duplicates
      const url = this.props.apiUrlBase
      const dateString = dose.takenAt.toISOString();
      console.log('dateString', dateString)
      const query = {
        query: 'mutation addDose($value: Int!, $takenAt: String!)' +
          ' { addDose(value: $value, takenAt: $takenAt)' +
          ' { id, value, takenAt } }',
        variables: {
          value: dose.value,
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
            console.log('Error adding dose:', response)
          }
          else {
            return response.json()
          }
        }
      ).then(
        (json) => {
          const { doses } = this.state
          const dose = json.data.addDose
          doses.unshift(dose)

          this.setState({
            doses
          })
        }
      ).catch (
        (err) => {
          console.log(err)
        }
      )
    }
  }

  handleRemoveDose = (dose) => {
    console.log('handleRemoveDose:', dose)

    if (dose) {
      // Do not allow duplicates
      const url = this.props.apiUrlBase
      const query = {
        query: 'mutation removeDose($id: Int!)' +
          ' { removeDose(id: $id)' +
          ' { success, error} }',
        variables: {
          id: dose.id
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
            console.log('Error removing dose:', response)
          }
          else if (response.success === false) {
            console.log('Error removing dose:', response.error)
          }
          else {
            const { doses } = this.state
            doses.forEach((r, i) => {
              if (r.id === dose.id) {
                doses.splice(i, 1)
              }
            })

            this.setState({
              doses
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

  handleMenuItemClick = (selectedMenuItem) => {
    this.setState({
      selectedMenuItem: selectedMenuItem
    })
  }

  renderContent(selectedMenuItem) {
    if (selectedMenuItem === 'Readings') {
      return (
        <ReadingList readings={this.state.readings} onReadingAdd={this.handleAddReading} onReadingRemove={this.handleRemoveReading} />
      )
    }
    else {
      return (
        <DoseList doses={this.state.doses} onDoseAdd={this.handleAddDose} onDoseRemove={this.handleRemoveDose} />
      )
    }
  }

  render() {
    const {selectedMenuItem} = this.state
    return (
      <div className={style.app}>
        <div className={style.appHeader}>
          <h2>SugarLogger</h2>
        </div>
        <Menu onMenuItemClick={this.handleMenuItemClick} selectedMenuItem={this.state.selectedMenuItem}/>
        {
          this.renderContent(selectedMenuItem)
        }
      </div>
    )
  }
}

import React from 'react'
import { DrupalField } from '../DrupalField/DrupalField'
import { Link } from 'react-router'

export class DrupalFieldEntityReference extends DrupalField {
  /**
   * Extract values from array.
   */
  getValues () {
    return this.props.field.map((item) => {
      return item.target_uuid
    })
  }

  render () {
    const values = this.getValues()

    return (
      <div className={this.getClasses()} key={this.props.name}>
        <div className='label'>{this.props.label}</div>
        {values.map((value, index) => {
          return <Link to={`/entity/${value}`}>{value}</Link>
        })}
      </div>
    )
  }
}

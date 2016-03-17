import React from 'react'
import { DrupalField } from '../DrupalField/DrupalField'

export class DrupalFieldText extends DrupalField {
  render () {
    const values = this.getValues()

    return (
      <div className={this.getClasses()} key={this.props.name}>
        {values.map((value, index) => {
          const markup = { __html: value }
          return <div className='value' dangerouslySetInnerHTML={markup} key={index} />
        })}
      </div>
    )
  }
}


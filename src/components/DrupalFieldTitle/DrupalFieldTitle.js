import React from 'react'
import { DrupalField } from '../DrupalField/DrupalField'

export class DrupalFieldTitle extends DrupalField {
  render () {
    const title = this.getValues()[0]

    return <h1 className={this.getClasses()}>{title}</h1>
  }
}

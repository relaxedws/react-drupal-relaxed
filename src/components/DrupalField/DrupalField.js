import React from 'react'

/**
 * Base class for field renderers.
 */
export class DrupalField extends React.Component {
  static propTypes = {
    entity: React.PropTypes.object.isRequired,
    field: React.PropTypes.array.isRequired,
    name: React.PropTypes.string.isRequired,
    label: React.PropTypes.string
  };

  /**
   * Generate class names based on key.
   */
  getClasses () {
    return 'field field-' + this.props.name
  }

  /**
   * Extract values from array.
   */
  getValues () {
    return this.props.field.map((item) => {
      return item.value
    })
  }
}

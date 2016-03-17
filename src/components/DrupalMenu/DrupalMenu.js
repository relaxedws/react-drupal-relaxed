import React from 'react'
import { Link } from 'react-router'

export class DrupalMenu extends React.Component {
  static propTypes = {
    className: React.PropTypes.string,
    items: React.PropTypes.arrayOf(React.PropTypes.object).isRequired
  };

  prepareLinks (items) {
    return items.map((row) => {
      return {
        key: row.id,
        title: row.doc.title[0].value,
        uri: row.doc.link[0].uri.replace(':', '/')
      }
    })
  }

  render () {
    const links = this.prepareLinks(this.props.items)

    return (
      <nav className={this.props.className}>
        {links.map((link) => {
          return <Link key={link.key} to={link.uri}>{link.title}</Link>
        })}
      </nav>
    )
  }
}

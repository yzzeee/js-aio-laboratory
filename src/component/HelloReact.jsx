import React from 'react';

export default class HelloReact extends React.Component {
  render() {
    return <div>Hello {this.props.name}</div>;
  }
}

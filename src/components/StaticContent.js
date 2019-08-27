// a react component to inject the returned html
import React, { Component } from "react";
import {withRouter} from 'react-router-dom';
import "whatwg-fetch";

export default class StaticContent extends Component {
  state = {
    __html: ""
  }

  componentWillMount() {
    console.log('================= StaticContent Will Mount ===================');
    console.log('fetching content... ', this.props.content);
    
    // fetch the HTML fragment with a local API request
    fetch(`/helpFiles${this.props.content}.html`)
      .then(resp => {
        // fetch returns a readable stream, so translate it into stringified HTML
        console.log('readable stream successfully fetched, translating it to stringified HTML');
        return resp.text();
      })
      .then(content => {
        // dangerouslySetInnerHTML requires using an object with an `__html` key
        console.log('setting state __html');
        this.setState({
          __html: content
        });
      })
      .catch(err => {
        // handle the error
        console.log('error occured while fetching ', this.props.content);
        this.setState({
          __html: 'content not found'
        });
      });
  }

  render() {
    return (
        <div dangerouslySetInnerHTML={this.state} />
    );
  }
}
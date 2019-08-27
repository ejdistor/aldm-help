// a React Component that includes the header and footer 
import React from "react";

import StaticContent from "./../components/StaticContent";

class StaticContainer extends React.Component {
  
  render() {
    return(
      //pass the pathname e.g /hello
      <StaticContent content={this.props.location.pathname} />
    )
  }
}

export default StaticContainer;
import React from 'react';

export default class HelpCore extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        const { menuExpanded, htmlContent } = this.props;
        return ( 
            <div className="scrollcontent" style={{left: (menuExpanded) ? '220px' : '60px'}}>
                {htmlContent &&
                    <div className="help-content">{htmlContent}</div>
                }
                {htmlContent === undefined &&
                    <>
                        <h2>Help System</h2>
                        <p>Click on menu button (upper left of header bar) to access help.</p>
                    </>
                }
            </div>
        );
    }
}

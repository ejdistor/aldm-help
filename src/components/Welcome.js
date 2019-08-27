"use strict";
import React, {Component} from 'react'
import { Button } from 'carbon-components-react';
import { Grid, Row, Col } from 'react-flexbox-grid';
import { Link } from 'react-router-dom';

let Background = '../images/resiliency-lead2000x400.jpg';
let sectionStyle = {
    grid: {
        marginTop: '30px'
    },
    image: {
        marginTop: "-20px",
        background: '#090909 url(' + Background + ') no-repeat 50% 50%',
        backgroundSize: 'cover',
        height: "300px"
    },
    titleLine: {
        marginTop: "0px",
        height: "60px"
    },
    welcomeLine: {
        color: 'white',
        fontSize: '37px',
        fontWeight: 'bold',
        marginLeft: '27px',
        marginTop: '20px',
        marginBottom: '10px',
        lineHeight: '1.1',
        padding: '0'
    },
    welcome: {
        fontSize: '37px',
        fontWeight: 'bold',
        marginLeft: '27px',
        marginTop: '20px',
        marginBottom: '10px',
        lineHeight: '1.1',
        padding: '0'
    }
}

export default class Welcome extends Component { 
    render() {
        return (
            <>
            <div className="Welcome">
                <div style={sectionStyle.image}>
                    <center>
                        <div style={sectionStyle.titleLine}>
                            <h2 style={sectionStyle.welcomeLine}>IBM Business Resiliency Services</h2>
                        </div>
                        <Button>Learn More</Button>
                        <div style={sectionStyle.titleLine}>
                            <h2 style={sectionStyle.welcome}>Analytics and Logical Dependency Mapping Help System</h2>
                        </div>
                    </center>
                </div>
            </div>
            <Grid fluid style={sectionStyle.grid}>
                <Row>
                    <Col xsOffset={5} xs={2}>
                        <Link to="./help" >
                            <Button style={{background:'green',width:'200px'}}>
                                Open
                            </Button>
                        </Link>
                    </Col>
                </Row>
            </Grid>
            </>
        );
    }
}
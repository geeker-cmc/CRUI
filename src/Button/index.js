import React, { Component } from 'react';
import classnames from 'classNames';
import PropTypes from '../utils/PropTypes';


Button.propTypes = {
    text: PropTypes.string,
    size: PropTypes.oneOf([ 'sm', 'xm', 'lg' ])
}

export default class Button extends Component{
    constructor(props){
        super(props)
    }
    render(){
        const {
            text,
        } = this.porps;
        return <button>{text}</button>
    }
}

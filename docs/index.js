import React from 'react';
import ReactDom from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import Router from './Router';
import './style/index.less';

ReactDom.render(<AppContainer><Router /></AppContainer>, document.querySelector('#app'));

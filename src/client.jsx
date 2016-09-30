import 'babel-polyfill';
import 'semantic-ui';
import './style.scss';


import React from 'react';
import { render } from 'react-dom';
import Root from './components/Root';

render (
    <Root />,
    document.getElementById('root')
);

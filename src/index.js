import './style/main.css';
import _ from 'lodash';
import * as S from 'fxjs/Strict';
import * as L from 'fxjs/Lazy';
import * as C from 'fxjs/Concurrency';
import moment from 'moment';
import moment_timezone from 'moment-timezone';
import ip from 'ip';
import * as ip_utils from 'ip-utils';
import * as dummy from './dummy';
import * as util from './util';
import * as playground from './playground';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

Object.assign(window, dummy, util, playground, {
  _,
  S,
  L,
  C,
  moment,
  moment_timezone,
  ip,
  ip_utils,
});

ReactDOM.render(<App />, document.getElementById('root'));

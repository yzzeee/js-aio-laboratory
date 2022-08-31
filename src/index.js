import './style/main.css';
import { createRoot } from 'react-dom/client';
import * as C from 'fxjs/Concurrency';
import * as L from 'fxjs/Lazy';
import * as S from 'fxjs/Strict';
import ip from 'ip';
import * as ip_utils from 'ip-utils';
import _ from 'lodash';
import moment from 'moment';
import moment_timezone from 'moment-timezone';
import App from './App';
import * as dummy from './dummy';
import * as playground from './playground';
import * as util from './util';

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

const container = document.getElementById('root');
const root = createRoot(container);
root.render(<App/>);

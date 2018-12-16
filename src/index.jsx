import React from 'react';
import ReactDOM from 'react-dom';

import 'reset-css';
import 'src/styles/index.scss';

import Root from 'src/components/Root/Root';

import * as serviceWorker from './serviceWorker';

ReactDOM.render(<Root />, document.getElementById('root'));

serviceWorker.unregister();

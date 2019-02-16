import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import App from './App';
// import App from './AppRedux';
// import App from './AppContext';
// import App from './Lights';
// import App from './LightsRepeat';
// import App from './LightsRedux';
import App from './LightsContextRepeat';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();

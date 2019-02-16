import React from 'react';
import PropTypes from 'prop-types';
import { createStore } from 'redux';
import { connect, Provider } from 'react-redux';
import './lights.css';

import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import BrightnessHighIcon from '@material-ui/icons/BrightnessHigh';
import BrightnessLowIcon from '@material-ui/icons/BrightnessLow';

import { SWITCH_LIGHTS } from './actionTypes';
import { toggleLight } from './actions';

const initialState = {
  isLit: false,
};

function reducer(state = initialState, action) {
  switch(action.type) {
    case SWITCH_LIGHTS:
      return {
        ...state,
        isLit: !state.isLit   
      };
    default:
    return state;
  }
}

const store = createStore(
  reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
);

// console.log(store.getState());

// const unsubscribe = store.subscribe(() => console.log(store.getState()));

// store.dispatch(toggleLight('Flip the lights'));

// unsubscribe();

const mapStateToProps = state => ({
  isLit: state.isLit,
});

const test = state => ({
  isLit: state.isLit,
});

const mapDispatchToProps = dispatch => ({
  toggleLight: () => {
    dispatch(toggleLight('Flip the lights'));
  },
});

const Room = connect(mapStateToProps, mapDispatchToProps)(({ isLit, toggleLight }) => (
  <div className={`room ${isLit ? "lit" : "dark"}`}>
    <Typography variant="headline" style={{color:'inherit'}} gutterBottom>
      {`The room is ${isLit ? "lit" : "dark"}`.toUpperCase()}
    </Typography>
    <Button
      variant="contained"
      color="default"
      onClick={toggleLight}
    >
      Switch
    </Button>
    <LightsIndicator />
  </div>
));

const LightsIndicator = connect(test)(({ isLit }) => (
  <div style={{marginTop: 60}}>
    {isLit ? (
        <BrightnessHighIcon style={{fontSize: 160, color: 'yellow'}} />
      ) : (
        <BrightnessLowIcon style={{fontSize: 160}} />
    )}
  </div>
));

Room.propTypes = {
  isLit: PropTypes.bool.isRequired,
  toggleLight: PropTypes.func.isRequired,
};

Room.defaultProps = {
  isLit: false,
  toggleLight: () => {},
};

const App = () => (
  <div className="app">
    <Room />
  </div>
);

const AppWithStore = () => (
  <Provider store={store}>
    <App />
  </Provider>
);

export default AppWithStore;
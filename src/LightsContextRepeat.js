import React from 'react';
import PropTypes from 'prop-types';
import './lights.css';

import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import BrightnessHighIcon from '@material-ui/icons/BrightnessHigh';
import BrightnessLowIcon from '@material-ui/icons/BrightnessLow';

const RoomContext = React.createContext();

function withRoomStore(Component) {
  return function ConnectedComponent(props) {
    return (
      <RoomContext.Consumer>
        {({ isLit, toggleLight }) => <Component {...props} isLit={isLit} toggleLight={toggleLight} />}
      </RoomContext.Consumer>
    );
  }
}

class RoomStore extends React.Component {
  state = {
    isLit: false,
  };

  toggleLight = () => {
    this.setState(prev => ({ isLit: !prev.isLit }));
  }

  render() {
    const { isLit } = this.state;
    const { children } = this.props;
    
    return (
      <RoomContext.Provider
        value={{
          isLit,
          toggleLight: this.toggleLight,
        }}
      >
        {children}
      </RoomContext.Provider>
    );
  }
}

const Room = withRoomStore(({ isLit, toggleLight }) => {
  return (
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
  );
});

const LightsIndicator = withRoomStore(({ isLit }) => (
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
  <RoomStore>
    <App />
  </RoomStore>
);

export default AppWithStore;

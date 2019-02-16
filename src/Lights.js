import React from 'react';
import './lights.css';

const RoomContext = React.createContext();

class RoomStore extends React.Component {
  state = {
    isLit: false,
  };

  toggleLight = () => {
    this.setState(prev => ({ isLit: !prev.isLit }))
  };

  render() {
    // Pass down the state and the onToggleLight action
    const { isLit } = this.state;
    const { children } = this.props;
    
    return (
      <RoomContext.Provider
        value={{
          isLit,
          toggleLight: this.toggleLight
        }}
      >
        {children}
      </RoomContext.Provider>
    );
  }
}

const Room = () => (
  <RoomContext.Consumer>
    {({ isLit, toggleLight }) => (
      <div className={`room ${isLit ? 'lit' : 'dark'}`}>
        The room is {isLit ? 'lit' : 'dark'}.
        <br />
        <button onClick={toggleLight}>Flip</button>
      </div>
    )}
  </RoomContext.Consumer>
);

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

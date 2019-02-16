import React, { Component } from 'react';
import './lights.css';

const Context = React.createContext();

function withStore(Component) {
  return function ConnectedComponent(props) {
    return (
      <Context.Consumer>
        {({ isLit, toggleLight }) => (
          <Component {...props} isLit={isLit} toggleLight={toggleLight} />
        )}
      </Context.Consumer>
    );
  }
}

class Store extends Component {
  state = {
    isLit: false,
  };

  toggleLight = () => {
    this.setState(prev => ({ isLit: !prev.isLit }));
  };

  render() {
    const { isLit } = this.state;
    const { children } = this.props;

    return (
      <Context.Provider
        value={{
          isLit,
          toggleLight: this.toggleLight,
        }}
      >
        {children}
      </Context.Provider>
    );
  }
}

const Room = withStore(({ isLit, toggleLight }) => (
  <div className={`room ${isLit ? "lit" : "dark"}`}>
    The room is {isLit ? "lit" : "dark"}.
    <br />
    <button onClick={toggleLight}>Switch</button>
  </div>
));

const App = () => (
  <div className="app">
    <Room />
  </div>
);

const AppWithStore = () => (
  <Store>
    <App />
  </Store>
);

export default AppWithStore;

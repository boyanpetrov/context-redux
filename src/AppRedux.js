import React from "react";
import "./styles.css";

import { createStore } from 'redux';
import { connect, Provider } from 'react-redux';

// Create a reducer with an empty initial state
const initialState = {};
function reducer(state = initialState, action) {
  switch(action.type) {
    case 'SET_USER':
      return {
        ...state,
        user: action.user,
      };
    default:
      return state;
  }
}

// Create the store with the reducer
const store = createStore(
  reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  );

// Dispatch an action to set the user
// (because initial state is empty)
store.dispatch({
  type: 'SET_USER',
  user: {
    avatar: 'http://placehold.it/90x90',
    name: 'Dave',
    followers: 1234,
    following: 123,
  },
});

// This mapStateToProps function extracts a single key from state (user) and passes it as the `user` prop
const mapStateToProps = state => ({
  user: state.user,
});

// connect() UserAvatar so it receives the `user` directly, withtout having to receive it from component above

// could also split this up into 2 variables:
// const UserAvatarAtom = ({ user, size }) => (...)
// const UserAvatar = connect(mapStateToProps)(UserAvatarAtom);
const UserAvatar = connect(mapStateToProps)(({ user, size }) => (
  <img
    className={`user-avatar ${size || ""}`}
    alt="user avatar"
    src={user.avatar}
  />
));

// connect() UserStats so it receives the `user` directly, without having to receive it from a component above (both use the same mapStateToProps function)
const UserStats = connect(mapStateToProps)(({ user }) => (
  <div className="user-stats">
    <div>
      <UserAvatar user={user} />
      {user.name}
    </div>
    <div className="stats">
      <div>{user.followers} Followers</div>
      <div>Following {user.following}</div>
    </div>
  </div>
));

// Nav doesn't need to know about `user` anymore
const Nav = () => (
  <div className="nav">
    <UserAvatar size="small" />
  </div>
);

const Content = () => <div className="content">main content here</div>;

// Sidebar doesn't need to know about `user` anymore
const Sidebar = () => (
  <div className="sidebar">
    <UserStats />
  </div>
);

// Body doesn't need to know about `user` anymore
const Body = () => (
  <div className="body">
    <Sidebar />
    <Content />
  </div>
);

// App doesn't hold state anymore , so it can be a stateless function
const App = () => (
  <div className="app">
    <Nav />
    <Body />
  </div>
);

const AppWithStore = () => (
  <Provider store={store}>
    <App />
  </Provider>
);

export default AppWithStore;

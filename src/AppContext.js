import React from "react";
import "./styles.css";

function withUser(Component) {
  return function ConnectedComponent(props) {
    return (
      <UserContext.Consumer>
        {user => <Component {...props} user={user} />}
      </UserContext.Consumer>
    );
  }
}

class UserStore extends React.Component {
  state = {
    user: {
      avatar:
        "http://placehold.it/90x90",
      name: "Dave",
      followers: 1234,
      following: 123
    }
  };

  render() {
    const { user } = this.state;
    const { children } = this.props;
    
    return (
      <UserContext.Provider value={user}>
        {children}
      </UserContext.Provider>
    );
  }
}

const UserContext = React.createContext();

const UserAvatar = withUser(({ size, user }) => (
    <img
      className={`user-avatar ${size || ""}`}
      alt="user avatar"
      src={user.avatar}
    />
));

const UserStats = withUser(({ user }) => (
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

const Nav = () => (
  <div className="nav">
    <UserAvatar size="small" />
  </div>
);

const Content = () => <div className="content">main content here</div>;

const Sidebar = () => (
  <div className="sidebar">
    <UserStats />
  </div>
);

const Body = () => (
  <div className="body">
    <Sidebar />
    <Content />
  </div>
);

const App = () => (
  <div className="app">
    <Nav />
    <Body />
  </div>
);

const AppWithStore = () => (
  <UserStore>
    <App />
  </UserStore>
);

export default AppWithStore;

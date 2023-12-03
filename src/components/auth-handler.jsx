import { Component } from 'react';
import { getUserLogged, putAccessToken } from '../utils/api';

class AuthHandler extends Component {
  constructor(props) {
    super(props);

    this.state = {
      authedUser: null,
      initializing: true,
    };

    this.onLoginSuccess = this.onLoginSuccess.bind(this);
    this.onLogout = this.onLogout.bind(this);
  }

  async componentDidMount() {
    const { data } = await getUserLogged();

    this.setState({
      authedUser: data,
      initializing: false,
    });
  }

  async onLoginSuccess({ accessToken }) {
    putAccessToken(accessToken);
    const { data } = await getUserLogged();

    this.setState({
      authedUser: data,
      
    });
  }

  onLogout() {
    this.setState({
      authedUser: null,
    });

    putAccessToken('');

  }

  render() {
    const { authedUser, initializing } = this.state;
    const { children } = this.props;

    return children({
      authedUser,
      onLoginSuccess: this.onLoginSuccess,
      onLogout: this.onLogout,
      initializing,
    });
  }
}

export default AuthHandler;

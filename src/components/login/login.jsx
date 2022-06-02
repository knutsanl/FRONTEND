//packages
import react from "react";
import { Redirect } from "react-router-dom";

// local files
import "./login.css";
import { AuthContext } from "../../context/authContext";

let initialValues = {
  email: "",
  password: "",
};

class Login extends react.Component {
  constructor(props) {
    super(props);

    this.state = {
      loginInfo: { ...initialValues },
      redirect: null,
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
  }
  componentDidMount() {
    let booleanValue = this.context.isAuthFunc();
    if (booleanValue) {
      this.context.logout();
    }
  }

  handleInputChange(event) {
    const { name, value } = event.target;
    this.setState(
      (prevState) => ({
        loginInfo: {
          ...prevState.loginInfo,
          [name]: value,
        },
      }),
      () => {}
    );
  }
  handleLogin(e) {
    e.preventDefault();
    const { email, password } = this.state.loginInfo;
    try {
      this.context.loginContext(email, password).then((data) => {
        if (data) {
          this.setState({ redirect: "/" });
        }
      });
    } catch (error) {
      console.log(error);
    }
  }
  render() {
    const { email, password } = this.state.loginInfo;

    if (this.state.redirect) {
      return <Redirect to={this.state.redirect} exact />;
    }

    return (
      <div id="login_box">
        <h1 id="login_h1">Log in</h1>
        <form onSubmit={this.handleLogin}>
          <label htmlFor="userEmail">Email:</label>
          <br />
          <input
            onChange={this.handleInputChange}
            type="email"
            className="user-formfield"
            id="userEmail"
            name="email"
            value={email}
            required
          />
          <br />

          <label htmlFor="password">Password:</label>
          <br />
          <input
            onChange={this.handleInputChange}
            type="password"
            className="user-formfield"
            id="password"
            name="password"
            value={password}
            required
          />
          <br />
          <br />

          <button type="submit" id="login_button" defaultValue="Login">
            Log in
          </button>
        </form>
      </div>
    );
  }
}

Login.contextType = AuthContext;

export default Login;

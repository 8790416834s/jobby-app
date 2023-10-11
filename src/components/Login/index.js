import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'

import './index.css'

class Login extends Component {
  state = {username: '', password: '', showErrMsg: false, errMsg: ''}

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  onSuccess = jwtToken => {
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    const {history} = this.props
    console.log(this.history)
    history.replace('/')
  }

  onFailure = errMsg => {
    this.setState({showErrMsg: true, errMsg})
  }

  onSubmitForm = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const url = `https://apis.ccbp.in/login`
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok === true) {
      this.onSuccess(data.jwt_token)
    } else {
      this.onFailure(data.error_msg)
    }
  }

  renderUsernameField = () => {
    const {username} = this.state
    return (
      <>
        <label htmlFor="username" className="label-username">
          USERNAME
        </label>
        <input
          type="text"
          id="username"
          value={username}
          placeholder="Username"
          className="username-input"
          onChange={this.onChangeUsername}
        />
      </>
    )
  }

  renderPasswordField = () => {
    const {password} = this.state
    return (
      <>
        <label htmlFor="password" className="label-password">
          PASSWORD
        </label>
        <input
          type="password"
          id="password"
          value={password}
          placeholder="Password"
          className="password-input"
          onChange={this.onChangePassword}
        />
      </>
    )
  }

  render() {
    const {showErrMsg, errMsg} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="login-container">
        <form onSubmit={this.onSubmitForm} className="login-card-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
            className="logo-img"
          />
          {this.renderUsernameField()}
          {this.renderPasswordField()}
          <button type="submit" className="login-btn">
            Login
          </button>
          {showErrMsg ? <p className="error-msg"> {errMsg}</p> : ''}
        </form>
      </div>
    )
  }
}
export default Login

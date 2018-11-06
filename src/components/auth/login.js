import React from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { firebaseConnect, isLoaded, isEmpty } from 'react-redux-firebase'
import { withRouter } from 'react-router-dom'
import '../../style/login.css'
import { FaGoogle, FaTwitter, FaFacebook, FaUserEdit, FaUserLock } from 'react-icons/fa'
import { UserIsNotAuthenticated } from '../../containers/authContainer'

class LoginPage extends React.Component{

  componentDidMount(){
    if(isLoaded(this.props.auth)&&!isEmpty(this.props.auth))
      this.props.history.push('/app')
  }

  render(){
  	return (
      <div className="container2">
      {isLoaded(this.props.auth)&&!isEmpty(this.props.auth)?
          this.props.history.push('/app'):
      <div>
        <div><h1>Login</h1></div><br /><br />
        <form className="form" onSubmit={e => { e.preventDefault(); }}>
          <div >
            <div className="label"><FaUserEdit /> &nbsp; Username</div>
            <input className="input100" type="text" name="username" placeholder="Type your username"/>
          </div><br /><br />

          <div className="wrap-input100 validate-input" data-validate="Password is required">
            <div className="label"><FaUserLock /> &nbsp; Password</div>
            <input className="input100" type="password" name="pass" placeholder="Type your password" />
          </div><br />
          <div style={{float: 'right'}}>
            <a href="google.com">
              Forgot password?
            </a>
          </div><br /><br />
          <div class="container-login100-form-btn">
            <div class="wrap-login100-form-btn">
              <div class="login100-form-bgbtn"></div>
              <button class="login100-btn" type="submit">
                Login
              </button>
            </div>
          </div><br /><br /><br /><br />
          <div class="txt1 text-center p-t-54 p-b-20">
            <span>
              Or Using
            </span>
          </div><br />
          <div class="flex-c-m">
            <button class="button" onClick={() => this.props.firebase.login({ provider: 'google', type: 'popup' })}>
              <FaGoogle />
            </button>

            <button class="button">
              <FaTwitter />
            </button>

            <button class="button">
              <FaFacebook />
            </button>
          </div><br /><br />
          </form>
    </div>
  }
  </div>
    )
  }
}

LoginPage.propTypes = {
  firebase: PropTypes.shape({
    login: PropTypes.func.isRequired
  }),
  auth: PropTypes.object
}

export default withRouter(compose(
  firebaseConnect(), // withFirebase can also be used
  connect(({ firebase: { auth } }) => ({ auth }))
)(LoginPage))
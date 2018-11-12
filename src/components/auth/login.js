import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import '../../style/login.css'
import { FaGoogle, FaTwitter, FaFacebook, FaUserEdit, FaUserLock } from 'react-icons/fa'
import { loginWithEmailPass, loginWithGoogle } from '../../actions/authActions'
import * as firebase from 'firebase'

class LoginPage extends React.Component{

  state = {
    email: '',
    password: ''
  }

  handleChange(e){
    this.setState({
      [e.target.id]: e.target.value
    })
  }

  handleSubmit(e){
    e.preventDefault();
    //this.props.loginWithEmailPass(this.state)
  }

  handleLoginWithGoogle(e){
    e.preventDefault();
    this.props.loginWithGoogle()
  }

  componentDidMount(){
    const uid = this.props.auth.uid;
    if(uid){
      this.updateOnConnect(uid)
      this.props.history.push('/app')
    }
      
  }

  updateStatus(status){
    if(!this.props.auth.uid) return;
    firebase.database().ref('users/' + this.props.auth.uid ).update({ status: status})
  }

  updateOnConnect(uid){
    return firebase.database().ref('.info/connected').on('value', snapshot => {
      let status = snapshot.val() ? 'online' : 'offline'
      this.updateStatus(status)
    })

  }

  componentDidUpdate(){
    const uid = this.props.auth.uid;
    if(uid){
      this.updateOnConnect(uid)
      this.props.history.push('/app')
    }
  }

  render(){
    const { authError } = this.props
  	return (
      <div className="container2">
        <div><h1>Login</h1></div><br /><br />
        <form className="form" onSubmit={this.handleSubmit}>
          <div >
            <div className="label"><FaUserEdit /> &nbsp; Username</div>
            <input className="input100" type="text" name="username" placeholder="Type your username" onChange={this.handleChange} />
          </div><br /><br />

          <div className="wrap-input100 validate-input" data-validate="Password is required">
            <div className="label"><FaUserLock /> &nbsp; Password</div>
            <input className="input100" type="password" name="pass" placeholder="Type your password" onChange={this.handleChange} />
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
            <div>{ authError?<p>{authError}</p>:null }</div>
          </div><br /><br /><br /><br />
          <div class="txt1 text-center p-t-54 p-b-20">
            <span>
              Or Using
            </span>
          </div><br />
          <div class="flex-c-m">
            <button class="button" onClick={this.handleLoginWithGoogle.bind(this)}>
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
    )
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth,
    authError: state.auth.authError
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    loginWithEmailPass: (creds) => dispatch(loginWithEmailPass(creds)),
    loginWithGoogle: () => dispatch(loginWithGoogle())
  }
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(LoginPage))
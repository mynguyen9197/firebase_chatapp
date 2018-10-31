import React from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { firebaseConnect, isLoaded, isEmpty, withFirebase } from 'react-redux-firebase'
import '../../style/App.css'
import { withRouter } from 'react-router-dom'
import { firebase } from 'firebase'

class LoginPage extends React.Component{
//export const LoginPage = ({ firebase, auth }) => (
render(){
	return (
  <div>
    <button // <GoogleButton/> button can be used instead
      onClick={() => this.props.firebase.login({ provider: 'google', type: 'popup' })}
    >Login With Google</button>
    <div>
      <h2>Auth</h2>
      {
        !isLoaded(this.props.auth)
        ? <span>Loading...</span>
        : isEmpty(this.props.auth)
          ? <span>Not Authed</span>
          : <pre>{JSON.stringify(this.props.auth, null, 2)}</pre>
      }
    </div>
    <button // <GoogleButton/> button can be used instead
      onClick={() => this.props.firebase.logout()}
    >Logout</button>
  </div>
)
}}

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
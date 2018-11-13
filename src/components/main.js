import React from 'react'
import { FaSearch } from 'react-icons/fa'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import '../style/main.css'
import UsersList from './user/UsersList';
import { logOut } from '../actions/authActions'
import { Redirect } from 'react-router'
//import { firestoreConnect } from 'react-redux-firebase'
//import { compose } from 'redux'
import * as firebase from 'firebase'
import { addConnectedUser } from '../actions/userActions'
import MessageHistory from './message/messageHistory'
import MessageInput from './message/messageInput'

class Main extends React.Component {

	componentDidMount(){
		const { auth } = this.props
		if(!auth.uid)
			this.props.history.push('/login')
		else {

			firebase.database().ref('users').on('child_added', (snapshot) => {
		    	this.props.addConnectedUser(snapshot.key, snapshot.val())
		    });
		}
	}

	updateStatus(){
	  if(!this.props.auth.uid) return;
	    firebase.database().ref('users/' + this.props.auth.uid ).update({ status: 'offline'})
	}

	handleLogout(e){
		e.preventDefault();
		this.updateStatus();
		this.props.logOut()
	}

	chatWith(users, uid){
		let u = {}
		Object.entries(users).map(user => {
			if(user[0] === uid ) {
				u = user[1]
			}
		})
		return u
	}

	render() {
		const { auth, users } = this.props
		const { uid } = this.props.match.params
		let chatWith = {}
		if( uid ){
			Object.entries(users).map(user => {
			if(user[0] === uid ) {
				chatWith = user[1]
			}
			})
		}

		if(!auth.uid)
			return <Redirect to='/login' />
		return (
			<div>
			<div style={{float: 'right'}}>
				<div className="clearfix">
					<div className="dropdown">
					  <button className="dropbtn"><img className="ava" src={this.props.auth.photoURL} alt="avatar" /></button>
					  <div className="dropdown-content">
					    <a href="#" onClick={this.handleLogout.bind(this)}>Log out</a>
					  </div>
					</div>
			        <div className="about">
			          {this.props.auth.displayName}
			        </div>
		        </div>
			</div>
			<div className="container clearfix">
			    <div className="people-list" id="people-list">
			      <div className="search">
			        <span><input type="text" placeholder="search" /></span>
			        <span><FaSearch className="fa-search" /></span>
			      </div>
			      <UsersList
			        uid={ auth.uid }
			        users={ users } />
			      
			    </div>
			    

			    <div className="chat">
			      { uid && chatWith ?  
			      <div className="chat-header clearfix">
			        <img className="ava" src={chatWith.avatarUrl} alt="avatar" />
			        
			        <div className="chat-about">
			          <div className="chat-with">Chat with {chatWith.displayName}</div>
			          {/*<div className="chat-num-messages">already 1 902 messages</div>*/}
			        </div>
			        <i className="fa fa-star"></i>
			      </div> :<div></div>
			  	}
			      
			      <div className="chat-history">
			        <MessageHistory />
			        
			      </div> {/*!-- end chat-history --*/}
			      
			      <MessageInput /> {/*!-- end chat-message --*/}
			      
			    </div> {/*!-- end chat --*/}
			    
			  </div> {/* end container */}

			{/*<script id="message-template" type="text/x-handlebars-template">
			  <li className="clearfix">
			    <div className="message-data align-right">
			      <span className="message-data-time" >{this.state.time}, Today</span> &nbsp; &nbsp;
			      <span className="message-data-name" >Olia</span> <i className="fa fa-circle me"></i>
			    </div>
			    <div className="message other-message float-right">
			      {this.state.messageOutput}
			    </div>
			  </li>
			</script>

			<script id="message-response-template" type="text/x-handlebars-template">
			  <li>
			    <div className="message-data">
			      <span className="message-data-name"><i className="fa fa-circle online"></i> Vincent</span>
			      <span className="message-data-time">{this.state.time}, Today</span>
			    </div>
			    <div className="message my-message">
			      {this.state.response}
			    </div>
			  </li>
			</script>*/}
		</div>
		)
	}
}

const mapStateToProps = (state) => {
	console.log(state)
	return {
		auth: state.firebase.auth,
		users: state.users
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		logOut: () => dispatch(logOut()),
		addConnectedUser: (uid, userPayload) => dispatch(addConnectedUser({uid, userPayload}))
	}
}

export default withRouter(
	connect(mapStateToProps, mapDispatchToProps)
	(Main)
)
import React from 'react'
import { FaSearch, FaFile, FaFileImage } from 'react-icons/fa'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import '../style/main.css'
import UserList from './UserList';
import { logOut } from '../actions/authActions'
import { Redirect } from 'react-router'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import * as firebase from 'firebase' 

class Main extends React.Component {

	componentDidMount(){
		if(!this.props.auth.uid)
			this.props.history.push('/login')
	}

	handleLogout(e){
		e.preventDefault();
		this.props.logOut()
	}

	render() {
		const { auth, users, dispatch } = this.props
		if(!auth.uid)
			return <Redirect to='/login' />
		return (
			<div>
			<div style={{float: 'right'}}>
				<div className="clearfix">
					<div className="dropdown">
					  <button className="dropbtn"><img id="ava" src={this.props.auth.photoURL} alt="avatar" /></button>
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
			      <UserList
			        dispatch={ dispatch }
			        users={ users }
			      />
			      {/*<ul className="list">
			      	
			        <li className="clearfix">
			          <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/195612/chat_avatar_01.jpg" alt="avatar" />
			          <div className="about">
			            <div className="name">Vincent Porter</div>
			            <div className="status">
			              <i className="fa fa-circle online"></i> online
			            </div>
			          </div>
			        </li>
			        
			        <li className="clearfix">
			          <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/195612/chat_avatar_02.jpg" alt="avatar" />
			          <div className="about">
			            <div className="name">Aiden Chavez</div>
			            <div className="status">
			              <i className="fa fa-circle offline"></i> left 7 mins ago
			            </div>
			          </div>
			        </li>
			        
			        <li className="clearfix">
			          <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/195612/chat_avatar_03.jpg" alt="avatar" />
			          <div className="about">
			            <div className="name">Mike Thomas</div>
			            <div className="status">
			              <i className="fa fa-circle online"></i> online
			            </div>
			          </div>
			        </li>
			        
			        <li className="clearfix">
			          <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/195612/chat_avatar_04.jpg" alt="avatar" />
			          <div className="about">
			            <div className="name">Erica Hughes</div>
			            <div className="status">
			              <i className="fa fa-circle online"></i> online
			            </div>
			          </div>
			        </li>
			        
			        <li className="clearfix">
			          <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/195612/chat_avatar_05.jpg" alt="avatar" />
			          <div className="about">
			            <div className="name">Ginger Johnston</div>
			            <div className="status">
			              <i className="fa fa-circle online"></i> online
			            </div>
			          </div>
			        </li>
			        
			        <li className="clearfix">
			          <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/195612/chat_avatar_06.jpg" alt="avatar" />
			          <div className="about">
			            <div className="name">Tracy Carpenter</div>
			            <div className="status">
			              <i className="fa fa-circle offline"></i> left 30 mins ago
			            </div>
			          </div>
			        </li>
			        
			        <li className="clearfix">
			          <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/195612/chat_avatar_07.jpg" alt="avatar" />
			          <div className="about">
			            <div className="name">Christian Kelly</div>
			            <div className="status">
			              <i className="fa fa-circle offline"></i> left 10 hours ago
			            </div>
			          </div>
			        </li>
			        
			        <li className="clearfix">
			          <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/195612/chat_avatar_08.jpg" alt="avatar" />
			          <div className="about">
			            <div className="name">Monica Ward</div>
			            <div className="status">
			              <i className="fa fa-circle online"></i> online
			            </div>
			          </div>
			        </li>
			        
			        <li className="clearfix">
			          <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/195612/chat_avatar_09.jpg" alt="avatar" />
			          <div className="about">
			            <div className="name">Dean Henry</div>
			            <div className="status">
			              <i className="fa fa-circle offline"></i> offline since Oct 28
			            </div>
			          </div>
			        </li>
			        
			        <li className="clearfix">
			          <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/195612/chat_avatar_10.jpg" alt="avatar" />
			          <div className="about">
			            <div className="name">Peyton Mckinney</div>
			            <div className="status">
			              <i className="fa fa-circle online"></i> online
			            </div>
			          </div>
			        </li>
			      </ul>*/}
			    </div>
			    
			    <div className="chat">
			      <div className="chat-header clearfix">
			        <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/195612/chat_avatar_01_green.jpg" alt="avatar" />
			        
			        <div className="chat-about">
			          <div className="chat-with">Chat with Vincent Porter</div>
			          <div className="chat-num-messages">already 1 902 messages</div>
			        </div>
			        <i className="fa fa-star"></i>
			      </div> {/*-- end chat-header -->*/}
			      
			      <div className="chat-history">
			        <ul>
			          <li className="clearfix">
			            <div className="message-data align-right">
			              <span className="message-data-time" >10:10 AM, Today</span> &nbsp; &nbsp;
			              <span className="message-data-name" >Olia</span> <i className="fa fa-circle me"></i>
			              
			            </div>
			            <div className="message other-message float-right">
			              Hi Vincent, how are you? How is the project coming along?
			            </div>
			          </li>
			          
			          <li>
			            <div className="message-data">
			              <span className="message-data-name"><i className="fa fa-circle online"></i> Vincent</span>
			              <span className="message-data-time">10:12 AM, Today</span>
			            </div>
			            <div className="message my-message">
			              Are we meeting today? Project has been already finished and I have results to show you.
			            </div>
			          </li>
			          
			          <li className="clearfix">
			            <div className="message-data align-right">
			              <span className="message-data-time" >10:14 AM, Today</span> &nbsp; &nbsp;
			              <span className="message-data-name" >Olia</span> <i className="fa fa-circle me"></i>
			              
			            </div>
			            <div className="message other-message float-right">
			              Well I am not sure. The rest of the team is not here yet. Maybe in an hour or so? Have you faced any problems at the last phase of the project?
			            </div>
			          </li>
			          
			          <li>
			            <div className="message-data">
			              <span className="message-data-name"><i className="fa fa-circle online"></i> Vincent</span>
			              <span className="message-data-time">10:20 AM, Today</span>
			            </div>
			            <div className="message my-message">
			              Actually everything was fine. I'm very excited to show this to our team.
			            </div>
			          </li>
			          
			          <li>
			            <div className="message-data">
			              <span className="message-data-name"><i className="fa fa-circle online"></i> Vincent</span>
			              <span className="message-data-time">10:31 AM, Today</span>
			            </div>
			            <i className="fa fa-circle online"></i>
			            <i className="fa fa-circle online" style={{color: '#AED2A6'}}></i>
			            <i className="fa fa-circle online" style={{color:"#DAE9DA"}}></i>
			          </li>
			          
			        </ul>
			        
			      </div> {/*!-- end chat-history --*/}
			      
			      <div className="chat-message clearfix">
			        <textarea name="message-to-send" id="message-to-send" placeholder ="Type your message" rows="3"></textarea>
			                
			        <button className="fa-file-o"><FaFile /></button> &nbsp;&nbsp;&nbsp;
			        <button className="fa-file-image-o"><FaFileImage /></button>
			        
			        <button>Send</button>

			      </div> {/*!-- end chat-message --*/}
			      
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
	}
}

export default withRouter(
	connect(mapStateToProps, mapDispatchToProps)
	(Main)
)
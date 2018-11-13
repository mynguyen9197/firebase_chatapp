import React, { Component } from 'react';
import '../../style/main.css'
import { Link } from "react-router-dom";
import { FaSearch } from 'react-icons/fa'
//import * as firebase 'firebase'

export default class UsersList extends Component {

  constructor(props){
    super(props)
    this.state = {
      name: ''
    }
  }

  showUsersList(users) {
    if(!users) {
      return [];
    }
    
    return Object.keys(users).reduce(
      (list, uid) => {
      return [
        ...list,
        {
          uid,
          ...users[uid]
        }
      ];
    }, []);
  }

  handleChange(e){
    this.setState({name: e.target.value})
  }

  render() {
    const { users, uid } = this.props;
    let usersList = []
    if(this.state.name){
      this.showUsersList(users).map(user => {
        if(user.displayName.toLowerCase().includes(this.state.name.toLowerCase()) === true){
          usersList.push(user)
        }
      })
    }else {
      this.showUsersList(users).map(user => {
        usersList.push(user)
      })
    }

    return (
      <div className="people-list" id="people-list">
            <div className="search">
              <span><input type="text" placeholder="search" onChange={this.handleChange.bind(this)}/></span>
              <span><FaSearch className="fa-search" /></span>
            </div>
            <ul className="list">
              { usersList.map(user => 
                {
                  if(user.uid!==uid){
                    return (
                      <li className="clearfix"><Link to={`/chat/${user.uid}`}>
                        <img className="ava" src={ user.avatarUrl} alt="avatar" />
                        <div className="about">
                          <div className="name">{ user.displayName }</div>
                          <div className="status">
                            <i className="fa fa-circle online"></i> { user.status }
                          </div>
                        </div></Link>
                      </li>
                    )
                  }
                }
                ) }
            </ul>
            
        </div>
    );
  }
}
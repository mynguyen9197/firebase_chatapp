import React, { Component } from 'react';
import '../../style/main.css'
import { Link } from "react-router-dom";
//import * as firebase 'firebase'

export default class UsersList extends Component {

  /**
   * showUsersList(<OBJECT>)
   *
   * @param users - the users object with uid keys straight from state
   * @return Array - an array of users objects with uid inside the objects to be used easily in JSX
     */
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

  render() {
    const { users, uid } = this.props;

    return (
      <ul className="list">
        { this.showUsersList(users).map(user => 
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
    );
  }
}
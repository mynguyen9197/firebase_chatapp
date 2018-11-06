import React, { Component } from 'react';
import { addConnectedUser } from '../actions/userAction';
import '../style/main.css'
import firebase from 'firebase'

export default class UsersList extends Component {
  componentDidMount() {
    firebase.database().ref('users').on('child_added', (snapshot) => {
      this.props.dispatch(
        addConnectedUser({
          uid: snapshot.key,
          userPayload: snapshot.val()
        })
      );
    });
  }

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
    const { users } = this.props;

    return (
      <ul className="list">
        { this.showUsersList(users).map(user => 
          <li className="clearfix">
            <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/195612/chat_avatar_01.jpg" alt="avatar" />
            <div className="about">
              <div className="name">{user.displayName}</div>
              <div className="status">
                <i className="fa fa-circle online"></i> online
              </div>
            </div>
          </li>
          ) }
      </ul>
    );
  }
}
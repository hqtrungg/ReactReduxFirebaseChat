import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { joinInbox } from '../Actions/inboxActions';
import { connect } from 'react-redux';
import { compose } from 'redux'
import { firebaseConnect, isLoaded, isEmpty } from 'react-redux-firebase'
import { favoriteList } from '../Reducers/authReducer';
import TimeAgo from 'react-timeago';
import enStrings from 'react-timeago/lib/language-strings/en'
import buildFormatter from 'react-timeago/lib/formatters/buildFormatter'

const formatter = buildFormatter(enStrings)

export class UserList extends Component {

  render() {
    const { users, dispatch, userInbox, favoriteList } = this.props;
    return (
      <div className="bot">
        {!isLoaded(users) ? (null)
          : isEmpty(users) ? (
            null
          ) : (
              <div className="inbox">
                <ul className="list">
                  {Object.keys(users).map((key, index) => {
                    const user = users[key].value;
                    user.uid = users[key].key;
                    const date = new Date(user.lastTimeLoggedOut);
                    const inbox = (user.uid === userInbox.uid) ? ' inboxing' : ' ';
                    if (user.isActive)
                      var style = { color: "#86BB71" }
                    return (
                      <Link key={index} to={`/inbox/${user.uid}`}>
                        <li className={`item ${inbox}`} onClick={() => {
                          dispatch(joinInbox(user));
                        }}>

                          <img className="avt" src={user.avatarUrl}></img>
                          <div className="content">
                            <div className="name" style={{color: "black"}}>{user.displayName}</div>
                            <div className="lastmessage">
                              <i className="fa fa-circle" style={style}></i>
                              {user.isActive ? (
                                "Online"
                              ) : (
                                <TimeAgo date={date} formatter={formatter} />
                                )}
                            </div>
                          </div>
                        </li>
                      </Link>
                    )
                  })}
                </ul>
              </div>
            )}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    users: state.firebase.ordered.users,
    userInbox: state.userInbox,
    favList: state.favList,
  }
};

export default compose(
  firebaseConnect([
    { path: '/users', queryParams: ['orderByChild=lastTimeLoggedOut'] }
  ]),
  connect(mapStateToProps)
)(UserList)

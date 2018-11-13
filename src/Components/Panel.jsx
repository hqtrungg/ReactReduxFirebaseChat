import React, { Component } from 'react';
import * as authActions from '../Actions/authActions';
import {setFavoriteUser} from "../Actions/inboxActions";
import { connect } from 'react-redux';
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { compose } from 'redux';
import { firebaseConnect } from 'react-redux-firebase';

export class Panel extends Component {
    static contextTypes = {
        firebase: PropTypes.shape({
            logout: PropTypes.func.isRequired,
          }).isRequired,
    };

    render() {
        const { dispatch, userInbox, roomName } = this.props;
        var favoriteCheck = (userInbox && userInbox.isFavoriteUser) ? 'fas fa-heart' : 'far fa-heart';
        return (
            <div className="top">
                {(roomName !== '') ? (
                    <div className="title">
                        <div className="name">{roomName}</div>
                    </div>

                ) : (null)}
                {(userInbox !== '') ? (
                    <div className="title"                       >
                        <img className="avt" src={userInbox.avatarUrl}></img>
                        <div className="name">{userInbox.displayName}</div>
                        <div id="favoriteIcon" className={`${favoriteCheck} fa-2x`} onClick={() => {dispatch(setFavoriteUser(userInbox))}}></div>
                    </div>
                ) : (null)
                }

                <div className="account">
                    <Link to='/'>
                        <i className="fa fa-sign-out fa-2x"></i>
                        <button
                            className="button"
                            onClick={() => {
                                dispatch(authActions.logout())
                            }}>
                            Logout
                        </button>
                    </Link>
                </div>
            </div >
        )
    }

}

const mapStateToProps = state => {
    return {
        auth: state.firebase.auth,
        roomName: state.roomName,
        userInbox: state.userInbox
    }
};


export default compose(
    firebaseConnect(),
    connect(
        mapStateToProps,
    )
)(Panel);
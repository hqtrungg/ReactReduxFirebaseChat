import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Redirect } from 'react-router-dom'
import { compose } from 'redux'
import { firebaseConnect, isLoaded, isEmpty } from 'react-redux-firebase'
import '../UI/images/icons/favicon.ico'
import '../UI/vendor/bootstrap/css/bootstrap.min.css'
import '../UI/fonts/font-awesome-4.7.0/css/font-awesome.min.css'
import '../UI/vendor/animate/animate.css'
import '../UI/vendor/css-hamburgers/hamburgers.min.css'
import '../UI/vendor/select2/select2.min.css'
import '../UI/css/util.css'
import '../UI/css/main.css'

export class Signin extends Component {

    static contextTypes = {
        firebase: PropTypes.shape({
            login: PropTypes.func.isRequired
        }),
        auth: PropTypes.object
    };

    render() {
        const {auth, firebase } = this.props;
        if (!isLoaded(auth)) {
            return (
               null
            )
        }
        else if (isEmpty(auth)) {
            return (
                <div className="limiter">
                    <div className="container-login100">
                        <span className="login100-form-title">
                            More Typing...More Funny
                        </span>
                        <div id="customBtn" className="customGPlusSignIn"
                             onClick={() => { firebase.login({ provider: 'google', type: 'popup' }) }}
                        >
                            <span className="icon"></span>
                            <span className="buttonText">Sign in with Google</span>
                        </div>
                    </div>
                </div>
            );
        }
        return <Redirect to='/home' />

    }
}
const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth
    }
};

export default compose(
    firebaseConnect(),
    connect(
        mapStateToProps
    )
)(Signin);

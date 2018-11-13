import React, { Component } from 'react';
import './images/icons/favicon.ico'
import './vendor/bootstrap/css/bootstrap.min.css'
import './fonts/font-awesome-4.7.0/css/font-awesome.min.css'
import './vendor/animate/animate.css'
import './vendor/css-hamburgers/hamburgers.min.css'
import './vendor/select2/select2.min.css'
import './css/util.css'
import './css/main.css'

export default class LoginForm extends Component {
    render() {
        return (
            <div className="limiter">
                <div className="container-login100">
                    <div className="wrap-login100">
                        <div className="login100-pic js-tilt" data-tilt>
                            <img src="images/img-01.png" alt="IMG">
                        </div>

                        <form className="login100-form validate-form">
					        <span className="login100-form-title">
						        Member Login
					        </span>
                            <div className="container-login100-form-btn">
                                <button className="login100-form-btn">
                                    Login
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

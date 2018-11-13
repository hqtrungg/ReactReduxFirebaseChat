import React, { Component } from 'react';
import MessageForm from './MessageForm';
import { connect } from 'react-redux';
import MessageList from './MessageList';

export class Message extends Component {

  
    render() {
        const { dispatch, userMessage, messageThread, uid } = this.props;

        return (
            <div id="message-box" className="bot">
                <MessageList
                    dispatch={dispatch}
                    messageThread={messageThread}
                    uid = {uid}
                />
                <MessageForm
                    userMessage={userMessage}
                    dispatch={dispatch}
                />
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        uid : state.firebase.auth.uid,
        userMessage: state.userMessage,
        messages: state.messages,
        messageThread: state.messageThread
    }
};
export default connect(
    mapStateToProps
)(Message);

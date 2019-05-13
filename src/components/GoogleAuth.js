import React from 'react';
import { connect } from 'react-redux';
import {signIn, signOut } from '../actions';

class GoogleAuth extends React.Component{

    componentDidMount(){
        window.gapi.load('client:auth2', ()=> {
            window.gapi.client.init({
                clientId: '894634139108-un85jquuv769iar8tll01q2mgona6iov.apps.googleusercontent.com',
                scope: 'email'
            }).then(()=>{
                this.auth = window.gapi.auth2.getAuthInstance();
                
                this.OnAuthChange(this.auth.isSignedIn.get()); 
                this.auth.isSignedIn.listen(this.OnAuthChange); 
            });
        });
    }

    OnAuthChange = (isSignedIn) => {
        if(isSignedIn){
            this.props.signIn();
        }else{
            this.props.signOut();
        }
    };

    OnSignInClick = () => {
        this.auth.signIn();
    };

    OnSignOutClick = () => {
        this.auth.signOut();
    };

    renderAuthButton(){
        if(this.props.isSignedIn === null){
            return null;
        }else if(this.props.isSignedIn){
            return (
                <button onClick={this.OnSignOutClick} className="ui red google button">
                    <i className="google icon" />
                    Sign Out
                </button>
            );
        }else {
            return (
                <button onClick={this.OnSignInClick} className="ui red google button">
                    <i className="google icon" />
                    Sign In with Google
                </button>
                );
        }
    }

    render(){
        return <div>{this.renderAuthButton()}</div>;
    }
}

const mapStateToProps = (state) => {
    return {isSignedIn: state.auth.isSignedIn};
};

export default connect(mapStateToProps,{signIn, signOut})(GoogleAuth);
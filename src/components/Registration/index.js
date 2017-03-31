import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import Dialog from 'material-ui/Dialog';

import * as actions from '../../redux/actions/passwordManage';

import '../Dashboard/PasswordAdder/style.css';


class Registration extends Component {

    constructor(props){
        super(props);

        this.state = {
            login: '',
            password: '',

            err_login: false,
            err_password: false,
        };

        this.handleUserRegistration = this.handleUserRegistration.bind(this);
    };


    handleUserRegistration(e){
        e.preventDefault();
        const { userRegistration } = this.props;
        const { login, password } = this.state;
        const userData = { login, password };

        if(!login || !password) {
            this.setState({ err_login: !login, err_password: !password });
            return;
        }

        userRegistration(userData);
    };


    render(){
        const { login, password, err_login, err_password } = this.state;

        return(
            <Dialog open>

                <div className="modal-head">
                    <h3 className="modal-title">Registration</h3>
                    <Link to={`/`} className="to-registration">
                        <FlatButton label="Go to Login" />
                    </Link>
                </div>

                <form onSubmit={this.handleUserRegistration} className="modal-form">
                    <TextField
                        autoFocus
                        errorText={err_login ? 'This field is required' : ''}
                        floatingLabelText="Your login"
                        value={login}
                        onChange={e => this.setState({ login: e.target.value, err_login: false })}
                    />
                    <br/>
                    <TextField
                        errorText={err_password ? 'This field is required' : ''}
                        floatingLabelText="Your password"
                        type="password"
                        value={password}
                        onChange={e => this.setState({ password: e.target.value, err_password: false })}
                    />
                    <br/>
                    <br/>
                    <RaisedButton
                        label="Registration"
                        primary={true}
                        type="submit"
                    />
                </form>
            </Dialog>
        );
    }
}



function mapStateToProps(state, ownProps){
    return {
        user: state.user,
    }
}


export default connect(mapStateToProps, actions)(Registration);
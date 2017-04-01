import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, browserHistory } from 'react-router';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import Dialog from 'material-ui/Dialog';


import * as actions from '../../redux/actions/passwordManage';
import './style.css';


class WrapLogin extends Component {

    static onEnter(nextState, replace) {
        if (localStorage.getItem('user')) replace('/dashboard');
    }

    constructor(props){
        super(props);

        this.state = {
            login: '',
            password: '',

            err_login: false,
            err_password: false,
        };

        this.handleUserLogin = this.handleUserLogin.bind(this);
    };


    handleUserLogin(e){
        e.preventDefault();
        const { userLogin } = this.props;
        const { login, password } = this.state;

        const userData = {
            login: this.state.login,
            password: this.state.password,
        };


        if(!login || !password)
            this.setState({ err_login: !login, err_password: !password });
        else
            userLogin(userData);
    };


    render(){
        const { login, password, err_login, err_password } = this.state;

        return(
            <div>
                <Dialog open>
                    <div className="modal-head">
                        <h3 className="modal-title">Login</h3>
                        <Link to={`/registration/`} className="to-registration">
                            <FlatButton label="Go to Registration" />
                        </Link>
                    </div>

                    <form onSubmit={this.handleUserLogin} className="modal-form">
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
                            label="Login"
                            primary={true}
                            type="submit"
                        />
                    </form>
                </Dialog>
            </div>
        );
    }
}



function mapStateToProps(state){
    return {
        user: state.user,
        error: state.error,
    }
}


export default connect(mapStateToProps, actions)(WrapLogin);
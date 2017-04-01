import React, { Component } from 'react';
import { connect } from 'react-redux';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import Dialog from 'material-ui/Dialog';


import * as actions from '../../../redux/actions/passwordManage';
import './style.css';


class PasswordAdder extends Component {

    constructor(props){
        super(props);

        this.state = {
            service: '',
            login: '',
            password: '',

            err_service: false,
            err_login: false,
            err_password: false,
        };

        this.submitAddPassword = this.submitAddPassword.bind(this);
        this.closeWindows      = this.closeWindows.bind(this);
    };



    submitAddPassword(e){
        e.preventDefault();
        const { service, login, password } = this.state;
        const { user, addPassword } = this.props;

        const addPasswordData = {
            login: user.login,
            passwordItem: {
                service,
                login,
                password
            }
        };


        if(!service.trim() || !login.trim() || !password)
            this.setState({ err_service: !service.trim(), err_login: !login.trim(), err_password: !password });
        else{
            addPassword(addPasswordData);
            this.closeWindows();
        }

    };


    closeWindows(){
        this.props.handleClose();
        this.setState({
            service: '', login: '',  password: '',
            err_service: false, err_login: false, err_password: false
        });
    }



    render(){
        const { open, modal } = this.props;
        const { service, login, password, err_service, err_login, err_password } = this.state;

        return(
            <Dialog open={open} modal={modal} onRequestClose={this.closeWindows}>

                <div className="modal-head">
                    <h3 className="modal-title">New password data</h3>
                </div>

                <form onSubmit={this.submitAddPassword} className="modal-form">
                    <TextField
                        autoFocus
                        errorText={err_service ? 'This field is required' : ''}
                        floatingLabelText="Service name"
                        value={service}
                        onChange={e => this.setState({ service: e.target.value, err_service: false })}
                    />
                    <br/>
                    <TextField
                        errorText={err_login ? 'This field is required' : ''}
                        floatingLabelText="Your login on service"
                        value={login}
                        onChange={e => this.setState({ login: e.target.value, err_login: false })}
                    />
                    <br/>
                    <TextField
                        errorText={err_password ? 'This field is required' : ''}
                        floatingLabelText="Your password on service"
                        type="password"
                        value={password}
                        onChange={e => this.setState({ password: e.target.value, err_password: false })}
                    />
                    <br/>
                    <br/>
                    <RaisedButton
                        label="Add"
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


export default connect(mapStateToProps, actions)(PasswordAdder);
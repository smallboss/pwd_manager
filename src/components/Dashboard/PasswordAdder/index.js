import React, { Component } from 'react';
import { connect } from 'react-redux';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import Dialog from 'material-ui/Dialog';


// import DialogExampleModal from './ModalDialog';
import * as actions from '../../../redux/actions/passwordManage';
import './style.css';


class PasswordAdder extends Component {

    constructor(props){
        super(props);

        this.state = {
            service: '',
            login: '',
            password: '',
        };

        this.submitAddPassword = this.submitAddPassword.bind(this);
    };



    submitAddPassword(e){
        e.preventDefault();
        const { service, login, password } = this.state;
        const { user, addPassword, handleClose } = this.props;

        const addPasswordData = {
            login: user.login,
            passwordItem: {
                service,
                login,
                password
            }
        };


        addPassword(addPasswordData);
        handleClose();
        this.setState({ service: '', login: '',  password: '',});
    };



    render(){
        const { open, modal, handleClose } = this.props;

        return(
            <Dialog open={open} modal={modal} onRequestClose={handleClose}>

                <div className="modal-head">
                    <h3 className="modal-title">New password data</h3>
                </div>

                <form onSubmit={this.submitAddPassword} className="modal-form">
                    <TextField
                        autoFocus
                        errorText=""
                        floatingLabelText="Service name"
                        value={this.state.service}
                        onChange={e => this.setState({ service: e.target.value })}
                    />
                    <br/>
                    <TextField
                        errorText=""
                        floatingLabelText="Your login on service"
                        value={this.state.login}
                        onChange={e => this.setState({ login: e.target.value })}
                    />
                    <br/>
                    <TextField
                        errorText=""
                        floatingLabelText="Your password on service"
                        type="password"
                        value={this.state.password}
                        onChange={e => this.setState({ password: e.target.value })}
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
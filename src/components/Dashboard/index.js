import React from 'react';
import { connect } from 'react-redux';
import { browserHistory, pushState } from 'react-router';
import { routeActions } from 'react-router-redux';

import AppHead from './AppHead';
import PasswordAdder from './PasswordAdder';
import PasswordList from './PasswordList';
import * as actions from '../../redux/actions/passwordManage';


class WrapDashboard extends React.Component{

    static onEnter(nextState, replace) {
        if (!localStorage.getItem('user')) replace('/');
    }

    constructor(props, context) {
        super(props, context);

        this.state = {
            addingPassword: false,
        };

        this.handleUserLogout     = this.handleUserLogout.bind(this);
        this.showModalAddPassword = this.showModalAddPassword.bind(this);
        this.hideModalAddPassword = this.hideModalAddPassword.bind(this);
    }

    componentWillMount(){
        this.props.getPasswordList( this.props.user )
    }


    handleUserLogout(){
        this.props.userLogout();
    }


    showModalAddPassword(){
        this.setState({addingPassword: true});
    }

    hideModalAddPassword(){
        this.setState({addingPassword: false});
    }


    render(){
        const { user } = this.props;
        if(!user) return null;

        return(
            <div>
                <AppHead login={user.login}
                         onAddPassword={this.showModalAddPassword}
                         onUserLogout={this.handleUserLogout}/>


                <PasswordAdder open={this.state.addingPassword} modal={false} handleClose={this.hideModalAddPassword} />

                <PasswordList/>
            </div>
        )
    }
}


function mapStateToProps(state){
    return {
        user: state.user,
        passwordList: state.passwordList,
    }
}


export default connect(mapStateToProps, actions)(WrapDashboard);

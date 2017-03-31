import React, { Component } from 'react';
import { connect } from 'react-redux';

import PasswordItem from './PasswordItem';
import * as actions from '../../../redux/actions/passwordManage';

import './style.css';

class PasswordList extends Component{

    constructor(props){
        super(props);

    }


    handleRemovePasswordItem(passwordItemIndex){
        const { user, removePasswordItem } = this.props;
        removePasswordItem( user, passwordItemIndex );
    }

    handleEditPasswordItem(passwordItem, passwordItemIndex){
        const { user, editPasswordItem } = this.props;
        const { service, login, password } = passwordItem;
        const newPasswordItem = { service, login, password };
        editPasswordItem( user, passwordItemIndex, newPasswordItem );
    }


    render(){

        const { passwordList } = this.props;

        const rendPasswordList = () => {
            return(
                passwordList.map((item, index) =>
                    <PasswordItem key={index}
                                  index={index}
                                  passwordItem={item}
                                  onRemove={this.handleRemovePasswordItem.bind(this, index)}
                                  onSave={this.handleEditPasswordItem.bind(this)}/>
                )
            )
        };

        return(
            <div className="password-list">
                {
                    (passwordList.length)
                        ? rendPasswordList()
                        : <div>List is empty</div>
                }
            </div>
        )
    }
}

function mapStateToProps(state, ownProps){
    return {
        user: state.user,
        passwordList: state.passwordList,
    }
}

export default connect(mapStateToProps, actions)(PasswordList);
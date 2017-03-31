import React, { Component } from 'react';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';

import './style.css';

class PasswordItem extends Component{

    constructor(props){
        super(props);

        const { service, login, password } = props.passwordItem;

        this.state = {
            showPassword: false,
            editing: false,

            service,
            login,
            password,
        };


        this.toggleShowPassword = this.toggleShowPassword.bind(this);
        this.toggleEditingMode  = this.toggleEditingMode.bind(this);
        this.savePasswordItem   = this.savePasswordItem.bind(this);
    }

    componentWillReceiveProps(nextProps){
        const { service, login, password } = nextProps.passwordItem;
        this.setState({ service, login, password });
    }

    toggleShowPassword(){
        this.setState({ showPassword: !this.state.showPassword })
    }

    toggleEditingMode(){
        const { service, login, password } = this.props.passwordItem;

        this.setState({
            service,
            login,
            password,
            editing: !this.state.editing,
        });
    }

    savePasswordItem(){
        const { onSave, index} = this.props;
        onSave(this.state, index);
        this.toggleEditingMode();
        this.setState({ showPassword: false });
    }


    render(){
        const { onRemove } = this.props;
        const { showPassword, editing, service, login, password } = this.state;
        
        const rendButtonBox = () => {
            return(
                <div className="buttons-box">
                    <RaisedButton label="remove" secondary={true} onClick={ onRemove }/>
                    <RaisedButton label={ editing ? 'cancel' : 'edit'} onClick={ this.toggleEditingMode } primary={true}/>
                    {
                        (editing)
                            ? <RaisedButton label="save" onClick={ this.savePasswordItem } />
                            : null
                    }
                    <RaisedButton label={ showPassword ? 'hide' : 'show'}
                                  className="shower"
                                  onClick={ this.toggleShowPassword } />
                </div>
            )
        };


        return(
            <Paper className="password-item" zDepth={1}>
                <div className="field-wrap">
                    <span className="field-name">Service:</span>
                    {
                        (editing)
                            ? <input type="text" value={ service } onChange={e => this.setState({ service: e.target.value })}/>
                            : <span>{ service }</span>
                    }
                </div>
                <div className="field-wrap">
                    <span className="field-name">Login:</span>
                    {
                        (editing)
                            ? <input type="text" value={ login } onChange={e => this.setState({ login: e.target.value })}/>
                            : <span>{ login }</span>
                    }
                </div>
                <div className="field-wrap">
                    <span className="field-name">Password:</span>
                    {
                        (editing)
                            ? <input type={showPassword ? 'text' : 'password'}
                                     value={password}
                                     onChange={e => {
                                         this.setState({ password: e.target.value })
                                     }}/>
                            : <span>{ showPassword ? password : password.replace(/./g,'*') }</span>

                    }
                </div>

                { rendButtonBox() }
            </Paper>
        )
    }
}

export default PasswordItem;
import React from 'react';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import ContentAddCircle from 'material-ui/svg-icons/content/add-circle';
import FlatButton from 'material-ui/FlatButton';


const AppHead = ({ login, onUserLogout, onAddPassword }) => (
    <AppBar
        title={<span>Hi {login} !</span>}
        iconElementLeft={<IconButton onTouchTap={onAddPassword}><ContentAddCircle /></IconButton>}
        iconElementRight={<FlatButton label="Logout" onTouchTap={onUserLogout} />}
    />
);

export default AppHead;
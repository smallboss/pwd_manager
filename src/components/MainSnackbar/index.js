import React from 'react';
import { connect } from 'react-redux';
import Snackbar from 'material-ui/Snackbar';

import * as actions from '../../../redux/actions/channelList';

@connect(mapStateToProps, actions)
export default class MainSnackbar extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            open: false,
        };

        this.handleRequestClose = this.handleRequestClose.bind(this);
    }


    handleTouchTap () {
        this.setState({
            open: true,
        });
    };


    handleRequestClose () {
        this.setState({
            open: false,
        });
    };

    render(){
        return(
            <Snackbar
                open={!!this.props.error}
                message={this.props.error}
                autoHideDuration={4000}
                onRequestClose={this.props.clearError}
            />
        )
    }
}

function mapStateToProps(state){
    return {
        error: state.error,
    }
}

import React from 'react';
import { connect } from 'react-redux';
import Snackbar from 'material-ui/Snackbar';

import * as actions from '../../redux/actions/passwordManage';


const MainSnackbar = ({ error, clearError }) => {

    return(
        <Snackbar
            open={!!error}
            message={error}
            autoHideDuration={4000}
            onRequestClose={clearError}
        />
    )
};


function mapStateToProps(state){
    return {
        error: state.error,
    }
}


export default connect(mapStateToProps, actions)(MainSnackbar);

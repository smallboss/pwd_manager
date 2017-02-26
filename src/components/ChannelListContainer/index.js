import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import autobind from 'autobind-decorator';
import { ListGroup, Button } from 'react-bootstrap';

import {
    addNewChannel,
    removeChannel,
    refreshChannel,
    clearStoreError,
    changeChannelRss
} from '../../redux/actions/channelList';
import { showALLNews } from '../../redux/actions/newsListTypeShow';

import ChannelItem from './ChannelItem';
import ChannelListHeader from './ChannelListHeader';
import ModalDialog from './ModalDialog';
import Navigation from '../Navigation';


@connect(mapStateToProps, mapDispatchToProps)
class ChannelListContainer extends Component {

    constructor(props){
        super(props);

        this.state = {
            showModal: false,
            channelIdEditig: -1,
            modalTitle: ''
        };
    }

    componentWillMount(){
        this.props.showALLNews();
    }

    @autobind
    addNewChannel(channelRss){ this.props.addNewChannel(channelRss) }

    @autobind
    handleRemove(channelId){ this.props.removeChannel(channelId) }


    @autobind
    showModalEdit(channelId){

        const { channelList } = this.props;

        this.setState({
            showModal: true,
            channelIdEditig: channelId,
            modalTitle: `Edit channel rss: ${channelList[channelId].title}`,
        });
    }


    @autobind
    handleEditChannelRss(newRss){
        this.props.changeChannelRss(newRss, this.state.channelIdEditig);
        this.setState({ showModal: false });
    }


    @autobind
    hideModal(){
        this.props.clearStoreError();
        this.setState({ showModal: false });
    }


    @autobind
    refreshChannelsData(){
        const { channelList } = this.props;

        channelList.forEach((channel, channelId) => {
            this.props.refreshChannel(channel.rss, channelId)
        });
    }


    componentWillReceiveProps(nextProps){
        if(nextProps.storeError){
            this.setState({
                showModal: true,
                modalTitle: 'Error saving channel'
            })
        }
    }


    render(){

        const { channelList, storeError, router } = this.props;
        const { showModal, channelIdEditig, modalTitle } = this.state;

        return(
            <div>
                <Navigation goForward={router.goForward} />

                <ChannelListHeader addNewChannel={this.addNewChannel}
                                   refreshChannels={this.refreshChannelsData}/>

                <ListGroup>
                    {channelList.map((channel, index) => (
                        <ChannelItem key={index}
                                     id={index}
                                     title={channel.title[0]}
                                     image={channel.image ? channel.image[0] : {}}
                                     rss={channel.rss}
                                     newsList={channel.item}
                                     onEdit={this.showModalEdit}
                                     onRemove={this.handleRemove}/>
                    ))}
                </ListGroup>

                <ModalDialog show={showModal}
                             errorText={storeError}
                             hideModal={this.hideModal}
                             channelRss={channelList[channelIdEditig] && channelList[channelIdEditig].rss}
                             edit={this.handleEditChannelRss}
                             title={modalTitle}/>
            </div>
        );
    }
}


function mapStateToProps(state, ownProps){
    return {
        channelList: state.channelList,
        storeError: state.error,
        router: ownProps.router
    }
}

function mapDispatchToProps(dispatch){
    return bindActionCreators({
        addNewChannel,
        removeChannel,
        refreshChannel,
        clearStoreError,
        changeChannelRss,
        showALLNews
    }, dispatch);
}

export default ChannelListContainer;
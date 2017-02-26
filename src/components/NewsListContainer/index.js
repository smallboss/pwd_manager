import React, { Component } from 'react';
import { connect } from 'react-redux';
import autobind from 'autobind-decorator';
import { bindActionCreators } from 'redux';

import { showALLNews, showUNREADNews, showREADNews } from '../../redux/actions/newsListTypeShow';

import NewsList from './NewsList';
import NewsListHeader from './NewsListHeader';
import Navigation from '../Navigation';

@connect(mapStateToProps, mapDispatchToProps)
class NewsListContainer extends Component{

    constructor(props) {
        super(props);

        if(!this.props.currChannel) window.location.href = '/';
    }


    @autobind
    handleShowAllNews(){ this.props.showALLNews() }

    @autobind
    handleShowOnlyUnreadNews(){ this.props.showUNREADNews() }

    @autobind
    handleShowOnlyReadNews(){ this.props.showREADNews() }


    @autobind
    getUnreadNews(){
        const { currChannel } = this.props;
        return currChannel.item.filter( news => news.state != 'read');
    }

    @autobind
    getReadNews(){
        const { currChannel } = this.props;
        return currChannel.item.filter( news => news.state == 'read');
    }


    render(){

        const { currChannel, channelId, newsListTypeShow, router } = this.props;
        const currNewsList = currChannel.item;

        const numbNews = {
            unread: this.getUnreadNews().length,
            read: this.getReadNews().length
        };

        const getNewsList = () => {
            switch (newsListTypeShow) {
                case 'UNREAD': return this.getUnreadNews();
                case 'READ': return this.getReadNews();
                default: return currNewsList;
            }
        };

        return(
            <div>
                <Navigation goBack={router.goBack} goForward={router.goForward}/>

                <NewsListHeader numbNews={numbNews}
                                activeButton={newsListTypeShow}
                                showAllNews={this.handleShowAllNews}
                                showOnlyUnreadNews={this.handleShowOnlyUnreadNews}
                                showOnlyReadNews={this.handleShowOnlyReadNews} />

                <NewsList newsList={getNewsList()} channelId={channelId} />
            </div>
        )
    }
}


function mapStateToProps(state, ownProps){
    return {
        currChannel: state.channelList[ownProps.params.id],
        channelId: ownProps.params.id,
        newsListTypeShow: state.newsListTypeShow,
        router: ownProps.router
    }
}

function mapDispatchToProps(dispatch){
    return bindActionCreators({
        showALLNews,
        showUNREADNews,
        showREADNews
    }, dispatch);
}

export default NewsListContainer;

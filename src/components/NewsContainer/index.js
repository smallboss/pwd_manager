import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ButtonGroup, Row, Col } from 'react-bootstrap';

import { setReadNews } from '../../redux/actions/channelList';
import Navigation from '../Navigation';


@connect(mapStateToProps, mapDispatchToProps)
class NewsContainer extends Component{

    constructor(props) {
        super(props);

        if(!this.props.currNews) window.location.href = '/';
    }


    componentDidMount(){
        const {channelId, newsId, currNews, newsListTypeShow} = this.props;

        if(currNews.state != 'read') {
            this.props.setReadNews(channelId, newsId, newsListTypeShow);
        }
    }


    render(){

        const { currNews, channelId, newsId, router } = this.props;

        return(
            <Row>

                <Navigation goBack={router.goBack} />

                <Col xs={12}>
                    <h2>{ currNews.title }</h2>

                    <div dangerouslySetInnerHTML={{__html: currNews.description}} />

                    <ButtonGroup vertical block>
                        <a href={ currNews.link } target="_blank" className="btn btn-default">Visit website</a>
                    </ButtonGroup>
                </Col>
            </Row>
        )
    }
}



const getCurrNews = (state, ownProps) => {
    const { newsId, channelId } = ownProps.location.query;
    let currNews;

    try {
        currNews = state.channelList[channelId].item[newsId];
    } catch (err) {
        currNews = undefined;
    }

    return currNews;
};



function mapStateToProps(state, ownProps){
    return {
        currNews: getCurrNews(state, ownProps),
        channelId: ownProps.location.query.channelId,
        newsId: ownProps.location.query.newsId,
        newsListTypeShow: state.newsListTypeShow,
        router: ownProps.router
    }
}

function mapDispatchToProps(dispatch){
    return bindActionCreators({ setReadNews }, dispatch);
}

export default NewsContainer;


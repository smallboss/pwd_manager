import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, hashHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';


import ChannelListContainer from './components/ChannelListContainer';
import NewsListContainer from './components/NewsListContainer';
import NewsContainer from './components/NewsContainer';
import store from './redux/store';
import { saveToLocalChannelList } from './helpers/syncStore';
import { addNewChannel, loadChannelListToStore } from './redux/actions/channelList';
import ActionTypes from './redux/constants/actionTypes';



const history = syncHistoryWithStore(hashHistory, store);



store.subscribe(() => {
    console.log(store.getState());
    saveToLocalChannelList( store.getState().channelList )
});


// ======================= INIT EMPTY CHANNELS LIST =======================
if(!store.getState().channelList.length) {
    const defaultChannels = [
        'http://news.liga.net/all/rss.xml',
        'http://news.liga.net/top/rss.xml',
        'http://newsrss.bbc.co.uk/rss/newsonline_world_edition/americas/rss.xml',
        'http://feeds.washingtonpost.com/rss/rss_act-four',
        'http://feeds.cfr.org/jlindsay?format=xml',
        'https://www.newswise.com/legacy/feed/channels.php?channel=6269',
    ];


    defaultChannels.forEach( channel =>
        store.dispatch(addNewChannel(channel))
    );
}
// END =================== INIT EMPTY CHANNELS LIST =======================


render(
    <Provider store={store}>
        <Router history={history}>
            <Route path="/"             component={ChannelListContainer} />
            <Route path="/channels/:id" component={NewsListContainer} />
            <Route path="/news/"        component={NewsContainer}/>
        </Router>
    </Provider>,
    document.getElementById("root")
);

let a = [{
    b: {
        c: {
            d: {
                q: 2
            }
        }
    }
},12,3,4,5,5, { a: 324}];

let b = _.cloneDeep(a);

a[0].b.c.d.q = 10;

console.log(b[0].b.c.d.q);

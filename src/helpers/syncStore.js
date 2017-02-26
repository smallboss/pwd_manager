export function saveToLocalChannelList( store ) {
    localStorage.setItem('channelList' , JSON.stringify(store));
}

export function getLocalChannelList() {
    return JSON.parse(localStorage.getItem('channelList'));
}
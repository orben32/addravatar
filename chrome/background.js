chrome.browserAction.setBadgeText({text: 'b'});

chrome.storage.sync.get((items) => {
    chrome.browserAction.setBadgeBackgroundColor({color: items.showAvatars !== false ? '#f2a900' : '#8b4c00'});
});
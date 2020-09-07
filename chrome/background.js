chrome.browserAction.onClicked.addListener(() => {
    chrome.tabs.query({}, function(tabs) {
        for (const tab of tabs) {
            chrome.tabs.sendMessage(tab.id, {action: "add_avatars"});            
        }
    });    
});

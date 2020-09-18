function sendMessageToTabs(msg) {
    chrome.tabs.query({}, function(tabs) {
        for (const tab of tabs) {
            chrome.tabs.sendMessage(tab.id, msg);
        }
    });    
}

const placeAvatarsBtn = document.getElementById('placeAvatars');
placeAvatarsBtn.onclick = function() {
    sendMessageToTabs({ action: "add_avatars" });
    window.close();
};

const hideAvatarsBtn = document.getElementById('hideAvatars');
hideAvatarsBtn.onclick = function() {
    sendMessageToTabs({ action: "hide_avatars" });
    window.close();
};
function sendMessageToTabs(msg) {
    chrome.tabs.query({}, function (tabs) {
        for (const tab of tabs) {
            chrome.tabs.sendMessage(tab.id, msg);
        }
    });
}

const placeAvatarsBtn = document.getElementById('placeAvatars');
placeAvatarsBtn.onclick = function () {
    sendMessageToTabs({ action: "add_avatars" });
    chrome.storage.sync.set({
        showAvatars: true,
    });
    chrome.browserAction.setBadgeBackgroundColor({color: '#f2a900'});
    window.close();
};

const hideAvatarsBtn = document.getElementById('hideAvatars');
hideAvatarsBtn.onclick = function () {
    sendMessageToTabs({ action: "hide_avatars" });
    chrome.storage.sync.set({
        showAvatars: false,
    });
    chrome.browserAction.setBadgeBackgroundColor({color: '#8b4c00'});
    window.close();
};

window.chrome.storage.sync.get((items) => {
    if (items.showAvatars !== false) {
        hideAvatarsBtn.style.display = 'flex';
    } else {
        placeAvatarsBtn.style.display = 'flex';
    }
    document.getElementById('status').innerHTML = items.showAvatars !== false ? 'Address avatars are displayed' : 'Address avatars are paused';
});
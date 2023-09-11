function playAudioCode() {
    // ce code sera exécuté directement dans la page de contenu
    const audioElement = new Audio(chrome.runtime.getURL('musics/GTA.mp3'));
    audioElement.play();
    window.__audioElement = audioElement;  // stocker dans une variable globale pour un accès ultérieur
}

function stopAudioCode() {
    // ce code arrête la musique sur la page de contenu
    if (window.__audioElement) {
        window.__audioElement.pause();
        window.__audioElement.currentTime = 0;
    }
}

chrome.runtime.onInstalled.addListener(() => {
    chrome.action.setBadgeText({
        text: "OFF",
    });
});

chrome.action.onClicked.addListener(async (tab) => {
    const prevState = await chrome.action.getBadgeText({ tabId: tab.id });
    const nextState = prevState === 'ON' ? 'OFF' : 'ON';

    await chrome.action.setBadgeText({
        tabId: tab.id,
        text: nextState,
    });

    chrome.tabs.sendMessage(tab.id, {action: nextState});

    if (nextState === "ON") {
        await chrome.scripting.executeScript({
            target: { tabId: tab.id },
            function: playAudioCode
        });
    } else if (nextState === "OFF") {
        await chrome.scripting.executeScript({
            target: { tabId: tab.id },
            function: stopAudioCode
        });
    }
});

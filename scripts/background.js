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

function recordBody(){
    const body = document.body;
    return body
}

function sendBody(recordBody){
   return document.body = document
   
}


async function getJson() {
    try {
        const url = "http://127.0.0.1:5500/scripts/traduction-jeunes.json";
        const response = await fetch(url);
        const data = await response.json();
  
        const elements = document.querySelectorAll('h1,h2,h3,h4,h5,h6,p,li,td,caption');
        
        elements.forEach(el => {
            if (!el.querySelector('img')) {
                Object.keys(data).forEach(key => {
                  const regex = new RegExp(`(?<![="])\\b${key}\\b(?!["=])(?![^<]*>)`, "ig");
                  const replacement = `<span style="color: red" title="${data[key].definition}">${data[key].mot}</span>`;
                  el.innerHTML = el.innerHTML.replace(regex, replacement);
                });
            }
        });
    } catch (err) {
        console.error("Error fetching or processing data:", err);
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
            function:playAudioCode,
        })

        await chrome.scripting.executeScript({
            target: { tabId: tab.id },
            function: recordBody
            
    
        });

        await chrome.scripting.executeScript({
            target: { tabId: tab.id },
            function: await getJson
            
                
            

        });
    } else if (nextState === "OFF") {
        await chrome.scripting.executeScript({
            target: { tabId: tab.id },
            function: stopAudioCode

        })
        await chrome.scripting.executeScript({
            target: { tabId: tab.id },
            function: window.location.href
    })
    }})

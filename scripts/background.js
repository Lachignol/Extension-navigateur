function playAudioCode() {
  // ce code sera exécuté directement dans la page de contenu
  const audioElement = new Audio(chrome.runtime.getURL("musics/GTA2.mp3"));
  audioElement.play();
  window.__audioElement = audioElement; // stocker dans une variable globale pour un accès ultérieur
}

function stopAudioCode() {
  // ce code arrête la musique sur la page de contenu
  if (window.__audioElement) {
    window.__audioElement.pause();
    window.__audioElement.currentTime = 0;
  }
}

async function getJson() {
  try {
    const url = "http://127.0.0.1:5500/scripts/traduction-jeunes.json";
    const response = await fetch(url);
    const data = await response.json();

    const elements = document.querySelectorAll(
      "h1,h2,h3,h4,h5,h6,p,li,td,caption"
    );

    elements.forEach((el) => {
      if (!el.querySelector("img")) {
        // on exclut les images pour ne pas casser les liens
        Object.keys(data).forEach((key) => {
          // The Object.keys() static method returns an array of a given object's own enumerable string-keyed property names.
          const regex = new RegExp(
            `(?<![="])\\b${key}\\b(?!["=])(?![^<]*>)`,
            "ig"
          );
          // \b = début/fin de mot = word character is not followed or preceded by another word-character
          // i = case-insensitive (so, for example, /a/i will match the string "a" or "A".
          // g = global, match all instances of the pattern in a string, not just one
          // (?<![="]) = vérifie qu’il n’y a pas de caractère “=” ou “”" avant le début de la clé.
          // (?!["=]) = vérifie qu’il n’y a pas de caractère “=” ou “”" après la fin de la clé.
          // (?![^<]*>) = pour s’assurer qu’il n’y a pas de caractère “>” après la clé, ce qui indiquerait la fin d’une balise HTML <a>.
          const replacement = `<span class="popup" data-title="${data[key].definition}">${data[key].mot}</span>`;
          el.innerHTML = el.innerHTML.replace(regex, replacement);
        });
      }
    });
  } catch (err) {
    console.error("Error fetching or processing data:", err);
  }
}

function resetContent() {
  location.reload();
}

chrome.runtime.onInstalled.addListener(() => {
  chrome.action.setBadgeText({
    text: "OFF",
  });
 
});

chrome.action.onClicked.addListener(async (tab) => {
  const prevState = await chrome.action.getBadgeText({ tabId: tab.id });
  const nextState = prevState === "ON" ? "OFF" : "ON";

  await chrome.action.setBadgeText({
    tabId: tab.id,
    text: nextState,
  });

  chrome.tabs.sendMessage(tab.id, { action: nextState });

  if (nextState === "ON") {
    await chrome.scripting.executeScript({
      target: { tabId: tab.id },
      function: playAudioCode,
    });
    await chrome.scripting.executeScript({
      target: { tabId: tab.id },
      function: await getJson,
    });
    await chrome.scripting.insertCSS({
      target: { tabId: tab.id },
      files: ["scripts/content.css"],
    });
  } else if (nextState === "OFF") {
    await chrome.scripting.executeScript({
      target: { tabId: tab.id },
      function: stopAudioCode,
    });
    await chrome.scripting.executeScript({
      target: { tabId: tab.id },
      function: resetContent,
    });
    await chrome.scripting.removeCSS({
      target: { tabId: tab.id },
      files: ["scripts/content.css"],
    });
  }
});

// console.log(originalContent)

// function resetContent() {
//   originalContent.forEach((originalHTML, element) => {
//       element.innerHTML = originalHTML;
//   });
// }


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

// getJson()

// // Écouteur pour les messages provenant du background.js
// chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
//     if (message.action === "ON") {
//         getJson();  // Lance la fonction de traduction quand l'extension est sur ON
//     }
//     if (message.action === "OFF") {
//         resetContent();
//     }
// });

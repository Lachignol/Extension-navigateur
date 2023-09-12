
// async function getJson() {
//   try {
//     const url = "http://127.0.0.1:5500/scripts/traduction-jeunes.json";
//     const response = await fetch(url);
//     const data = await response.json();

//     const elements = document.querySelectorAll('h1,h2,h3,h4,h5,h6,p,li,td,caption');

//     elements.forEach(el => {
//       if (!el.querySelector('img')) {
//         Object.keys(data).forEach(key => {
//           const regex = new RegExp(`(?<![="])\\b${key}\\b(?!["=])(?![^<]*>)`, "ig");
//           // \b = début/fin de mot = word character is not followed or preceded by another word-character
//           // i = case-insensitive (so, for example, /a/i will match the string "a" or "A".
//           // g = global, match all instances of the pattern in a string, not just one
//           // (?<![="]) = vérifie qu’il n’y a pas de caractère “=” ou “”" avant le début de la clé.
//           // (?!["=]) = vérifie qu’il n’y a pas de caractère “=” ou “”" après la fin de la clé.
//           // (?![^<]*>) = pour s’assurer qu’il n’y a pas de caractère “>” après la clé, ce qui indiquerait la fin d’une balise HTML <a>.
//           const replacement = `<span style="color: red" title="${data[key].definition}">${data[key].mot}</span>`;
//           el.innerHTML = el.innerHTML.replace(regex, replacement);
//         });
//       }
//     });
//   } catch (err) {
//     console.error("Error fetching or processing data:", err);
//   }
// }

// getJson()


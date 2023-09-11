async function getJson() {
  try {
      const url = "http://127.0.0.1:5500/scripts/traduction-jeunes.json";
      const response = await fetch(url);
      const data = await response.json();

      const elements = document.querySelectorAll('h1,h2,h3,h4,h5,h6,p,td,caption');

      elements.forEach(el => {
          if (!el.querySelector('img')) {
              Object.keys(data).forEach(key => {
                // La méthode Object.keys() renvoie un tableau contenant les noms des propriétés propres à un objet
                // .forEach permet de boucler sur tous les mots du dictionnaire (toutes les clefs)  
                const regex = new RegExp(`\\b${key}\\b`, "ig");
                // \b = début/fin de mot
                // i = case-insensitive (so, for example, /a/i will match the string "a" or "A".
                // g = global, match all instances of the pattern in a string, not just one
                  const replacement = `<span style="color: red" title="${data[key].definition}">${data[key].mot}</span>`;
                  el.innerHTML = el.innerHTML.replace(regex, replacement);
              });
          }
      });
  } catch (err) {
      console.error("Error fetching or processing data:", err);
  }
}

getJson();

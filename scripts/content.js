function isExcluded(elm) {
    if (elm.tagName == "STYLE") {
      return true;
    }
    if (elm.tagName == "SCRIPT") {
      return true;
    }
    if (elm.tagName == "NOSCRIPT") {
      return true;
    }
    if (elm.tagName == "IFRAME") {
      return true;
    }
    if (elm.tagName == "OBJECT") {
      return true;
    }
    return false
  }
  
  function traverse(elm) {
    if (elm.nodeType == Node.ELEMENT_NODE || elm.nodeType == Node.DOCUMENT_NODE) {
      // exclude elements with invisible text nodes
      if (isExcluded(elm)) {
        return
      }
      for (var i=0; i < elm.childNodes.length; i++) {
        // recursively call to traverse
        traverse(elm.childNodes[i]);
      }
    }
  
    if (elm.nodeType == Node.TEXT_NODE) {
      // exclude text node consisting of only spaces
      if (elm.nodeValue.trim() == "") {
        return
      }
      // elm.nodeValue here is visible text we need.
      console.log(elm.nodeValue);
      elm.nodeValue = elm.nodeValue.replace("Google", "***");
    }
  }
  
  traverse(document);

async function getJson() {
  try {
      const url = "http://127.0.0.1:5500/scripts/traduction-jeunes.json";
      const response = await fetch(url);
      const data = await response.json();

      const elements = document.querySelectorAll('h1,h2,h3,h4,h5,h6,p,li,td,caption');
        //.foreach(el => {…})
        //It iterates over each element in the elements. 
        //For each element the function el is executed. This function checks if each element contains an <img> element and replacing specific word. 
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

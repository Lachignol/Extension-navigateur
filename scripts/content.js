const body = document.querySelector("body");

//Methode pour chat gpt 
if (body) {
  const text = body.textContent;
  const resultTranslategpt = getTranslate(text);
  const correspondanceJson = /[^\s]+/g; // definir comment chercher les mots correspondant au json
  const resultFinal = text.matchAll(correspondanceJson);
  const badge = document.createElement("p");
  // Use the same styling as the publish information in an article's header
  badge.classList.add("color-secondary-text", "type--caption");
  badge.textContent = `${resultFinal}`;


  // defintion de la mise en page a voir 
  
  const heading = article.querySelector("h1");
  // Support for article docs with date
  const date = article.querySelector("time")?.parentNode;

  (date ?? heading).insertAdjacentElement("afterend", badge);
}


//fonction de récupération de la trad faite par chatgpt

async function getTranslate(text){

    //definir la requete a envoyé a chatgpt avec la variable ${text} a rentré dans le prompt:
                        let rep = await fetch('http://localhost:8000//books/api/v1.0/auteur');
                        let reponse = await rep.json();
                        return reponse;
}



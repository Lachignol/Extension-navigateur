
const text = document.querySelectorAll(
  "h1,h2,h3,h4,h5,h6,p,li,td,caption,span,a"
);
async function getJson()
{
    let url = "http://127.0.0.1:5500/scripts/traduction-jeunes.json"
    try
    {
        let response = await fetch(url);
        let json = await response.json();
        console.log(json)
        for (let i = 0; i < text.length; i++) {
            if (text[i] in json) {
              text[i].innerHTML = text[i].innerHTML.replace(`${text[i]}`,`${Json.mots}`);
            } else if (text[i].innerHTML.includes("Brady")) {
              text[i].innerHTML = text[i].innerHTML.replace("Brady","6-time Super Bowl champion Tom Brady");
            }
          }
        
    }
    
    catch(erreur)
    {
        console.log("Erreur : ", erreur.message);
    }
}

getJson()

/*
for (let i = 0; i < text.length; i++) {
  if (text[i] in json) {
    text[i].innerHTML = text[i].innerHTML.replace(`${text[i]}`,`${Json.mots}`);
  } else if (text[i].innerHTML.includes("Brady")) {
    text[i].innerHTML = text[i].innerHTML.replace("Brady","6-time Super Bowl champion Tom Brady");
  }
}

/*
function lookupDefinition(word) {
    const dictionary = {
      "fête": {
        "mot": "AFTER",
        "definition": "Désigne une fête qui se donne suite à la fête de la nuit et se prolonge le matin"
      },
      // ... (other entries)
    };
    if (word in dictionary) {
      return dictionary[word].definition;
    } else {
      return "Word not found in the dictionary.";
    }
  }
  const wordToLookup = "fête";
  const definition = lookupDefinition(wordToLookup);
  console.log(definition);


  const resultTranslategpt = getTranslate(text);
  const correspondanceJson = getCorrespondance(resultTranslategpt) // definir comment chercher les mots correspondant au json
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


function getCorrespondance(resultTranslategpt){
let splitResultTranslategpt = resultTranslategpt.split(" ")
    for(let i=0;i<splitResultTranslategpt.length;i++)
    replace(splitResultTranslategpt[i], traduction-jeunes.json.resultTranslategpt[i].mots);

})


*/

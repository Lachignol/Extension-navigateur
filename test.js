
let Dom = document.body;
console.log(Dom.childNodes)
console.log(Dom.children)

        const ShowElementIncludeOf=(Dom)=>{
            
          
            if(Dom.hasChildNodes()){
                console.table(Dom.nodeName)
                
                for(let node of Dom.childNodes){
                    if(node.hasChildNodes()){
                    console.log("début de boucle------------>")
                     console.table(`nom du node ${node.nodeName}`,`nodes enfants du noden actuel : ${node.childNodes}`,`contenu:${node.textContent}`)
                     const replacement = `<span style="color: red" title="coucou">fêtes</span>`;
                     el.innerText = el.innerTextL.replace("fêtes", replacement);
                
                     console.log("<---------------fin de boucle")
                     ShowElementIncludeOf(node)
                    }
                }
                }
                else{
                console.log(`nom du node sans enfant ${node.nodeName}`,`verif pas d'enfants ${node.children}`)
                return
                }
               
                
            }
        
    
        ShowElementIncludeOf(Dom)
     
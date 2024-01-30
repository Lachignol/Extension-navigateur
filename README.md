# JOUVENCE - extension navigateur Chrome

Notre extension permet de traduire une page web en langage de "jeunes".
Ce projet a pour objectifs pédagogiques de:
- découvrir l’écosystème et explorer les mécanismes d’un navigateur (DOM, moteur exécution JS, ...),
- se familiariser avec la documentation d’un navigateur et découvrir comment coder une extension pour navigateur,
- développer une API et l’utiliser pour créer son extension.

## Equipe de 4 personnes - 6 jours

Alexandre SCORDILIS - Tenzin CHOEZIN GYASHETSANG - Oscar CORTIJOS - Ghislaine AYBRAM

## Aperçu du projet

*AVANT : une page web*
![App Screenshot](/screen/page_wikipedia_avant.jpg)

*APRES : une page web "traduite" en langage de "jeunes" grâce à Jouvence*
![App Screenshot](/screen/page_wikipedia_apres.jpg)

## Tech Stack

- **Langages:** Javascript, CSS, JSON

## Fonctionnalités de l'extension

- [x] modification de la police et de la taille de tous les titres (balises h),
- [x] création d'un dictionnaire (fichier json) de mots / traductions / définitions,
- [x] mise en place d'une requête HTTP GET vers une URL locale (dictionnaire json),
- [x] mise en place d'une regex pour identifier les mots de la page web présents dans notre json (difficulté : les mots présents à l'intérieur des balises ne doivent pas être remplacés),
- [x] modification de la police et de la couleur des mots remplacés sur la page web,
- [x] mise en place d'info-bulles qui affichent la définition du mot au survol des mots "traduits",
- [x] ajout d'un bouton on/off pour activer ou désactiver l'extension,
- [x] lancement d'une musique lors de l'activation de l'extension (bouton on),

## Reste à implémenter

- [ ] une version de l'extension avec un dictionnaire de mots désuets pour apprendre des mots de vocabulaire.

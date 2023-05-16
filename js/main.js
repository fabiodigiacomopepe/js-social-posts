const posts = [
    {
        "id": 1,
        "content": "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
        "media": "https://unsplash.it/600/300?image=171",
        "author": {
            "name": "Phil Mangione",
            "image": "https://unsplash.it/300/300?image=15"
        },
        "likes": 80,
        "created": "2021-06-25"
    },
    {
        "id": 2,
        "content": "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
        "media": "https://unsplash.it/600/400?image=112",
        "author": {
            "name": "Sofia Perlari",
            "image": "https://unsplash.it/300/300?image=10"
        },
        "likes": 120,
        "created": "2021-09-03"
    },
    {
        "id": 3,
        "content": "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
        "media": "https://unsplash.it/600/400?image=234",
        "author": {
            "name": "Chiara Passaro",
            "image": "https://unsplash.it/300/300?image=20"
        },
        "likes": 78,
        "created": "2021-05-15"
    },
    {
        "id": 4,
        "content": "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
        "media": "https://unsplash.it/600/400?image=24",
        "author": {
            "name": "Luca Formicola",
            "image": null
        },
        "likes": 56,
        "created": "2021-04-03"
    },
    {
        "id": 5,
        "content": "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
        "media": "https://unsplash.it/600/400?image=534",
        "author": {
            "name": "Alessandro Sainato",
            "image": "https://unsplash.it/300/300?image=29"
        },
        "likes": 95,
        "created": "2021-03-05"
    }
];

/* RICHIESTA
Milestone 2
Prendendo come riferimento il layout di esempio presente nell’html, stampiamo i post del nostro feed.

Milestone 3
Se clicchiamo sul tasto “Mi Piace” cambiamo il colore al testo del bottone e incrementiamo il counter dei likes relativo.
Salviamo in un secondo array gli id dei post ai quali abbiamo messo il like.

BONUS possibili
-Formattare le date in formato italiano (gg/mm/aaaa)
-Gestire l’assenza dell’immagine profilo con un elemento di fallback che contiene le iniziali dell’utente (es. Luca Formicola > LF).
-Al click su un pulsante “Mi Piace” di un post, se abbiamo già cliccato dobbiamo decrementare il contatore e cambiare il colore del bottone.
*/

// Innesto in HTML dentro DIV container il template literal per creare il singolo post
posts.forEach(element => {
    document.getElementById("container").innerHTML +=
    `<div class="post">
        <div class="post__header">
            <div class="post-meta">                    
                <div class="post-meta__icon">
                    <img class="profile-pic" src="${element.author.image}" alt="${element.author.name}">                    
                </div>
                <div class="post-meta__data">
                    <div class="post-meta__author">${element.author.name}</div>
                    <div class="post-meta__time">${element.created}</div>
                </div>                    
            </div>
        </div>
        <div class="post__text">${element.content}</div>
        <div class="post__image">
            <img src="${element.media}" alt="${element.media}">
        </div>
        <div class="post__footer">
            <div class="likes js-likes">
                <div class="likes__cta">
                    <a class="like-button  js-like-button" data-postid="${element.id}">
                        <i class="like-button__icon fas fa-thumbs-up" aria-hidden="true"></i>
                        <span class="like-button__label">Mi Piace</span>
                    </a>
                </div>
                <div class="likes__counter">
                    Piace a <b id="like-counter-${element.id}" class="js-likes-counter">${element.likes}</b> persone
                </div>
            </div> 
        </div>            
    </div>`;
});

// Creo array per post piaciuti e lo imposto vuoto
let postPiaciuti = [];

// Creo ciclo per gestire like/unlike
for (let i = 0; i < posts.length; i++) {

    // Collego a costante "data" la data del post
    const data = document.querySelectorAll(".post-meta__time")[i];
    formatDate (data.innerHTML);            // Innesto l'HTML del DIV data, in una funzione
    function formatDate (input) {
        var datePart = input.match(/\d+/g),
        year = datePart[0],
        month = datePart[1], day = datePart[2];
        nuovaData = day+'/'+month+'/'+year;
    }
    data.innerHTML = `${nuovaData}`;        // Sostituisco vecchia data con nuova 

    // Collego ad una costante il pulsante mi piace
    const pulsanteMiPiace = document.querySelectorAll(".like-button.js-like-button")[i];    // con [i] ad ogni giro cambia
    console.log(pulsanteMiPiace);

    // Aggiungo un evento al click del pulsante
    pulsanteMiPiace.addEventListener("click", nLike);
    function nLike() {
        // Collego ad una costante il contatore dei mi piace
        let contatore = document.getElementById("like-counter-"+[i+1]);
        console.log(contatore);

        // SE pulsante mi piace è stato già cliccato
        if (pulsanteMiPiace.classList.contains("like-button--liked")) {
            pulsanteMiPiace.classList.remove("like-button--liked");         // Rimuovo classe "like-button--liked"
            contatore.innerHTML = (parseInt(contatore.innerHTML) - 1);      // Decremento contatore di 1
            // Rimuovo ID del post in array post piaciuti
            const indice = postPiaciuti.indexOf(i+1);                       // Cerco POSIZIONE dell'ID (che sarebbe i+1) del post, in array postPiaciuti
            if (indice > -1) {                                              // Eseguo SOLO quando viene trovato l'elemento
                postPiaciuti.splice(indice, 1);                             // Alla posizione dell'indice (quindi dove si trova ID) rimuovo l'elemento (quindi se stesso)
            }
            console.log(postPiaciuti);
        } else { // ALTRIMENTI (se non è stato già cliccato)
            pulsanteMiPiace.classList.add("like-button--liked");            // Aggiungo classe "like-button--liked"
            contatore.innerHTML = (parseInt(contatore.innerHTML) + 1);      // Incremento contatore di 1
            postPiaciuti.push(i+1);                                         // Pusho ID del post in array post piaciuti
            console.log(postPiaciuti);
        }
    }
}
// Variables de portees global utilisees pour la fonction displayData et mediaFilter
// Declarer au chargement de la page via displayData 
// Utiliser lors de l'utilisation du filtre des medias via mediaFilter
import { photographerFactory } from "../factories/photographer.js";
import { mediaFactory } from "../factories/media.js";


let mediaPopularity =[];
let mediaDate =[];
let mediaTitle =[];
let photographerModel;
let mediaModels = [];

// Recuperation des donnees
async function getPhotographer(id) {

    
  const url = './data/photographers.json';
  const requete = await fetch(url, {
    method: 'GET'
  });

  if (!requete.ok){
    alert('Un probleme est survenu. Veuillez recharger la page ulterieurement')
  }else{
    let data = await requete.json();
        
    const photographers = data.photographers;    
    const medias = data.media;
    let user;
    let userMedia = [];

    photographers.forEach((photographer) => {
            
      if(id == photographer.id) {                
        user = photographer; 
        
      }
      
    })

    medias.forEach((media) => {
      if(id == media.photographerId) {
        userMedia.push(media);
        
      }
    })

    return {
      photographer: user,
      media : userMedia      
    }
  }
}

// ------------------------------------------ Affichage des donnees ------------------------------------------

async function displayData(photographer,medias) {    

  // Partie Header
  const photographersSection = document.querySelector(".photograph-header");
  photographerModel = photographerFactory(photographer);    
  const userCardDOM = photographerModel.getUserCardDOMPhotographer();   
  photographersSection.appendChild(userCardDOM);   
    

  // Modal Contactez-moi    
  createContactForm(photographerModel.name);

  //Dropdown Menu
  const popularity = document.getElementById("popularity");
  const date = document.getElementById("date");
  const title = document.getElementById("title");
  const buttonElement = document.getElementById("buttonDropDown");
  const dropDownMenu = document.getElementById("dropdown-menu");

  buttonElement.addEventListener("click",toggleDropDownListItem);

  popularity.addEventListener("click",function() {
   
    buttonElement.textContent="Popularité"
    dropDownMenu.style.display="none";
    buttonElement.setAttribute("aria-expanded","false");
    mediaFilter()
  })
  date.addEventListener("click",function() {
   
    buttonElement.textContent="Date"
    dropDownMenu.style.display="none";
    buttonElement.setAttribute("aria-expanded","false");
    mediaFilter()
  })
  title.addEventListener("click",function() {
  
    buttonElement.textContent="Titre"
    dropDownMenu.style.display="none";
    buttonElement.setAttribute("aria-expanded","false");
    mediaFilter()
  })
    
    

  //Creation des listes de medias triees

  mediaPopularity = [...medias.sort(function(a,b){
    if (a.likes < b.likes){
      return 1;
    }
    if (a.likes > b.likes){
      return -1;
    }
    return 0;

  })];

  mediaDate = [...medias.sort(function(a,b){
    if (a.date < b.date){
      return 1;
    }
    if (a.date > b.date){
      return -1;
    }
    return 0;

  })];

  mediaTitle = [...medias.sort(function(a,b){
    if (a.title.toLowerCase() > b.title.toLowerCase()){
      return 1;
    }
    if (a.title.toLowerCase() < b.title.toLowerCase()){
      return -1;
    }
    return 0;

  })];
     

  // ------------------------------------------ Medias ------------------------------------------
        
  let sum = 0;
  let order = 0;
  // let totalLikes = document.getElementById('totalLikes');
  let number = document.getElementById('number');
  // let heart = document.getElementById('heart');
  let price = document.getElementById('price');

    

  const mediasSection = document.querySelector(".media");    
  mediaPopularity.forEach((media) => {
    const mediasModel = mediaFactory(media,photographerModel.name,order);                     
    const userMediaDOM = mediasModel.getUserMediaDOM();
    mediasSection.appendChild(userMediaDOM);
    mediaModels.push(mediasModel);
    sum+= media.likes;
    order++;        
  });    

    
    
  //Compteur global de likes
  number.textContent=sum;
  price.textContent=photographerModel.price+" €/jour";

    
  mediaModels.forEach((media) => {
    const medias = document.getElementById("media" + media.order)      
        
    medias.addEventListener('click', function(){
      updateLightbox(media.order);
            
    });
    medias.addEventListener('keypress', function(e) {
      if(e.key==='Enter'){
        updateLightbox(media.order);     
                         
      }
    });

  })     
    
}

// ------------------------------------------ Formulaire de contact ------------------------------------------

// Formulaire de contact de la page photographe
async function createContactForm(name) {

  let modal = document.querySelector('.modal');
  let contactButton = document.querySelector('.contact_button');
  
    
  modal.innerHTML=`
    <header>
        <h2>Contactez-moi</h2>                    
        <img tabindex="0" id="idCloseContact" src="assets/icons/close.svg" alt="Bouton de fermeture"/>
    </header>
    <h2 class="name">${name}</h2>
    <form
    id="reserve"
    name="reserve"
    action="index.html"
    method="get"
    >
        <div>
            <label id="firstname" for="first">Prénom</label>
            <input                        
            class="text-control"
            type="text"
            id="first"
            name="first"
            maxlength="60"
            aria-labellebdy="firstname"         
            aria-required=true
            
            />
        </div>
        <div>
            <label id="lastname" for="last">Nom</label>
            <input
            required
            aria-required=true
            aria-labellebdy="lastname"  
            class="text-control"
            type="text"
            id="last"
            name="last"
            maxlength="60"
            />
        </div>
        <div>
            <label id="emailadress" for="email">Email</label>
            <input
            required
            aria-required=true
            aria-labellebdy="emailadress" 
            class="text-control"
            type="email"
            id="email"
            name="email" 
            />
        </div>
        <div>
            <label id="votremessage" for="message">Votre message</label>            
            <textarea 
            required
            aria-required=true
            aria-labellebdy="votremessage"
            name="message" 
            id="message" 
            class="text-control" 
            cols="30" rows="10"
            wrap="hard"
            spellcheck="false"
            aria-label="Saisissez votre message">            
            </textarea>            
        </div>
        <button class="send_button" type="submit">Envoyer</button>
    </form>
`;
   
  let sendButton = document.querySelector('.send_button')
  let closeContactModal = document.getElementById('idCloseContact');
  contactButton.addEventListener('click', toggleContactForm);
  closeContactModal.addEventListener('click',toggleContactForm); 
  sendButton.addEventListener('click',validate)
}

// Gere l'affichage de la modal de contact
async function toggleContactForm() {
  let contactModal = document.getElementById('contact_modal');    
  let modal = document.querySelector('.modal');    
  const banner = document.getElementById("header")
  const photographerHeader = document.querySelector(".photograph-header")
  const globalCounter = document.querySelector(".container-counter");
  const menuMedias = document.querySelector(".media-dropdown");
  const lightbox = document.getElementById("lightbox2");
  const medias = document.querySelector(".media");
    

  if(contactModal.style.display === "block") {

    contactModal.style.display = "none";
    modal.setAttribute("tabindex","0");
    modal.setAttribute("aria-hidden","true")
    contactModal.setAttribute("role", "dialog");
    banner.setAttribute("aria-hidden","false");
    photographerHeader.setAttribute("aria-hidden","false");
    globalCounter.setAttribute("aria-hidden","false");
    menuMedias.setAttribute("aria-hidden","false");
    lightbox.setAttribute("aria-hidden","false");
    medias.setAttribute("aria-hidden","false");
        
        
  } else {

    contactModal.style.display = "block";
    contactModal.setAttribute("role", "dialog");
    modal.setAttribute("tabindex", "0");
    modal.setAttribute("role","group");
    modal.setAttribute("aria-labelledby", "Formulaire de contact")
    modal.focus();
    banner.setAttribute("aria-hidden","true");
    photographerHeader.setAttribute("aria-hidden","true");
    globalCounter.setAttribute("aria-hidden","true");
    menuMedias.setAttribute("aria-hidden","true");
    lightbox.setAttribute("aria-hidden","true");
    medias.setAttribute("aria-hidden","true");

        
        
  }
}

// Message d'erreur personnalise avec l'input concerne et un message a afficher.
async function errorMessage(element, message) {

  const newP = document.createElement("p");
  
  newP.classList.add("error");
  newP.textContent = message;
  newP.style.color = '#FF0000';
  newP.style.fontSize='1.5em'  
  
  // Injecte l'élément <p> précédemment créé à l'élément qui doit afficher l'erreur.
  element.parentNode.insertBefore(newP, element);
  
}

// Vérifie si le formulaire est valide à la soumission du formulaire.
async function validate(event) {
    

    
  const firstName = document.getElementById("first");
  const lastName = document.getElementById("last");
  const email = document.getElementById("email");
  const message = document.getElementById('message')
  let contactModal = document.getElementById("contact_modal")

    
  const name_regex = /^[A-zÀ-ú]+$/;    
  const mail_regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  // /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g
    
  const errors = document.querySelectorAll(".error");
  
  errors.forEach(function(value) {
    value.remove();
  });
  
    
  if (!name_regex.test(firstName.value)) {
    errorMessage(firstName, "Veuillez saisir un prenom valide");
    firstName.setAttribute("aria-invalid", "true");
    return false;
    
  } else if (firstName.value.length < 2) {
    errorMessage(firstName, "Ce champ doit contenir au minimum 2 caractères !");
    firstName.setAttribute("aria-invalid", "true");
    return false;
  } else {
    firstName.setAttribute("aria-invalid", "false");
  }

  if (!name_regex.test(lastName.value)) {
    errorMessage(lastName, "Veuillez saisir un nom valide");
    lastName.setAttribute("aria-invalid", "true");
    return false;
  } else if (lastName.value.length < 2) {
    errorMessage(lastName, "Ce champ doit contenir au minimum 2 caractères !");
    lastName.setAttribute("aria-invalid", "true");
    return false;
  } else {
    lastName.setAttribute("aria-invalid", "false");
  }
   
  if (!mail_regex.test(email.value)) {  
    errorMessage(email, "Ce champ doit contenir une adresse email valide !");
    email.setAttribute("aria-invalid", "true");
    return false;
  } else {
    email.setAttribute("aria-invalid", "false");
  }

    
  //* Si tout est OK */    
  event.preventDefault();  
  console.log(`${firstName.value} \n ${lastName.value} \n ${email.value} \n ${message.value}`);
  
  
  // event.stopPropagation();
  contactModal.style.display="none";
    

     
}

// Ferme la modale de formulaire quand on presse la touche ESC
async function escapeContactform() {
  let contactModal = document.getElementById('contact_modal')
  const closeButton = document.getElementById("idCloseContact");

  closeButton.addEventListener("keypress", function(e){

    if(e.key==='Enter'){
      contactModal.style.display = "none";   
                     
    }

  })
    
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      // close modal here
           
      toggleContactForm();
      contactModal.style.display="none";
    }
  })    
}

// ------------------------------------------ La modale Lightbox ------------------------------------------

async function updateLightbox(order) {
    
  if(order >= 0 && order < mediaModels.length) {

    let lightbox = document.getElementById('lightbox2');
    lightbox.style.display="none";
    
        
    let containerImg = document.getElementById('img-container2');
    let containerVideo = document.getElementById('video-container2');
    let leftArrow = document.getElementById('l2');
    let rightArrow = document.getElementById('r2');
    let xmark= document.getElementById('xmark2');
    let imgLightbox = document.getElementById('imgLightbox');
    let titreImgLightbox = document.getElementById('titreImgLightbox')
    let videoLightbox = document.getElementById('videoLightbox');
    let titreVideoLightbox = document.getElementById('titreVideoLightbox')

    const banner = document.getElementById("header")
    const photographerHeader = document.querySelector(".photograph-header")
    const globalCounter = document.querySelector(".container-counter");
    const menuMedias = document.querySelector(".media-dropdown");    
    const medias = document.querySelector(".media");
    
        
    const media = mediaModels[order]
        
        
    
    if (media.image !== undefined) {
      // img
      containerVideo.style.display="none";
      containerImg.style.display="flex";
            
      imgLightbox.setAttribute("src", media.mediaDirectory + media.image)
      imgLightbox.setAttribute("alt", `${media.title}`)        
      titreImgLightbox.textContent= media.title;
                    
            
    } else {
      //video
      containerVideo.style.display="flex";
      containerImg.style.display="none"            
            
      videoLightbox.setAttribute('src', media.mediaDirectory + media.video);
      videoLightbox.setAttribute("alt", `${media.title}`)
      videoLightbox.setAttribute('height', '900px')
      titreVideoLightbox.textContent= media.title;     

    }
            
          
        
    if(lightbox.style.display==="none"){
      lightbox.style.display="flex";
      lightbox.setAttribute("aria-hidden","false");            
      lightbox.setAttribute("role", "dialog");
            
      xmark.focus();

      banner.setAttribute("aria-hidden","true");
      photographerHeader.setAttribute("aria-hidden","true");
      globalCounter.setAttribute("aria-hidden","true");
      menuMedias.setAttribute("aria-hidden","true");        
      medias.setAttribute("aria-hidden","true");

    } else {
      lightbox.style.display="none";
            
    }  
    leftArrow.addEventListener('keypress', function(e) {
      if(e.key ==='Enter'){
        updateLightbox(order-1);
        leftArrow.focus();
      }
    });

    leftArrow.onclick =function() {     
            
      updateLightbox(order-1)


    };

    rightArrow.onclick = function() {

      updateLightbox(order+1)
            
    };

    rightArrow.addEventListener('keypress', function(e) {
      if(e.key ==='Enter')       {
        updateLightbox(order+1);
        rightArrow.focus()
                
      }
    });

    xmark.onclick = function() {

      if(lightbox.style.display==="none"){
        lightbox.style.display="flex";
      } else {
        lightbox.style.display="none";
        lightbox.setAttribute("aria-hidden","true");
        lightbox.setAttribute("role", "dialog");

        banner.setAttribute("aria-hidden","false");
        photographerHeader.setAttribute("aria-hidden","false");
        globalCounter.setAttribute("aria-hidden","false");
        menuMedias.setAttribute("aria-hidden","false");        
        medias.setAttribute("aria-hidden","false");
      }  
    }

    xmark.addEventListener('keypress', function(e) {
      if(e.key ==='Enter')            {
        lightbox.style.display="none";
        lightbox.setAttribute("aria-hidden","true");
        lightbox.setAttribute("role", "dialog");

        banner.setAttribute("aria-hidden","false");
        photographerHeader.setAttribute("aria-hidden","false");
        globalCounter.setAttribute("aria-hidden","false");
        menuMedias.setAttribute("aria-hidden","false");        
        medias.setAttribute("aria-hidden","false");
                
      }
    });
  }
   
   
  // la fonction updateLightbox doit recuperer l'objet media qui correspond au parametre order  
  // mediaModels[order];
  // La fonction updateLightbox, a appeler sur le bouton previous/next avec un onclick
  // onclick = appeler la function updateLightbox avec en parametre order
  // icone previous  = order--
  // icone next = order++    
        
}

async function escapeLightbox() {
  const lightbox = document.getElementById('lightbox2')
  const banner = document.getElementById("header")
  const photographerHeader = document.querySelector(".photograph-header")
  const globalCounter = document.querySelector(".container-counter");
  const menuMedias = document.querySelector(".media-dropdown");    
  const medias = document.querySelector(".media");
    
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
        
      lightbox.style.display="none";
      lightbox.setAttribute("aria-hidden","true");        
      lightbox.setAttribute("role", "dialog");

      banner.setAttribute("aria-hidden","false");
      photographerHeader.setAttribute("aria-hidden","false");
      globalCounter.setAttribute("aria-hidden","false");
      menuMedias.setAttribute("aria-hidden","false");        
      medias.setAttribute("aria-hidden","false");
    }
  })    
}

// ------------------------------------------  Le menu de tri des medias ------------------------------------------

async function toggleDropDownListItem() {
    
  const dropDownMenu = document.getElementById("dropdown-menu");
  const buttonElement = document.getElementById("buttonDropDown");    

  if(dropDownMenu.style.display === "none") {        
    dropDownMenu.style.display="block";
    buttonElement.setAttribute("aria-expanded","true");             
  } else {        
    dropDownMenu.style.display = "none";
    buttonElement.setAttribute("aria-expanded","false");  
  }
}

async function mediaFilter() {
           
  const mediasSection = document.querySelector(".media");
  const selectFilter = document.getElementById('buttonDropDown');

  

  mediasSection.innerHTML='';
  let mediaToDisplay=[];

  if (selectFilter.textContent === 'Date'){
    mediaToDisplay = mediaDate;
       
  } else if (selectFilter.textContent === 'Popularité'){
    mediaToDisplay = mediaPopularity;
       
  } else if (selectFilter.textContent === 'Titre'){
    mediaToDisplay = mediaTitle;
        
  }

  mediaModels = [];
  let order= 0;

  mediaToDisplay.forEach((media) => {
        
    const mediasModel = mediaFactory(media,photographerModel.name,order);        
    const userMediaDOM = mediasModel.getUserMediaDOM();
    mediasSection.appendChild(userMediaDOM);
    mediaModels.push(mediasModel);
    order++;

  });

  mediaModels.forEach((media) => {
    const medias = document.getElementById("media" + media.order)      
        
    medias.addEventListener('click', function(){
      updateLightbox(media.order)
    });
    medias.addEventListener('keypress', function(e) {
      if(e.key==='Enter'){
        updateLightbox(media.order)
      }
    });
  }) 


}


// ------------------------------------------ La fonction parent init ------------------------------------------
async function init() {
    
  const url = new URL(document.location.href);
  const idPhotographer = url.searchParams.get('q');
  const {photographer, media} = await getPhotographer(idPhotographer);
  
  displayData(photographer, media);  
  escapeContactform();
  escapeLightbox();    
}

init();






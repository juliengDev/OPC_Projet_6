/**
 * Plusieurs roles :
 * 1 - Stocker un objet contenant les proprietes des photographes dans une variable data
 * 2 - Recuperer la photo de profil du photographe dans les assets
 * 3 - Ajouter l'id du photographe dans l'url de la page photographer pour assurer la redirection du profil
 * 4 - Retourner la balise section a la condition d'etre sur la page d'acceuil
 * 5 - Retourner la balise div a la condition d'etre sur la page photographe
 *  
 * @param {*} data - Contient les donnees du photographe
 * @param {*} page - Contient la string "index" ou "photographer"
 * 
 * @return { Object } data
 * @return { <String> } data.name
 * @return { <Number> } data.id
 * @return { <String> } data.city
 * @return { <String> } data.country
 * @return { <String> } data.tagline
 * @return { <Number> } data.price
 * @return { <String> } data.portrait
 * @return { Function } getUserCardDOM
 */


export function photographerFactory(data) {
   
  const { city,country, id, name, price, tagline, portrait,likes } = data;
    
  const picture = `assets/photographers/${portrait}`; 
    
  const url = new URL('http://127.0.0.1:5501/photographer.html');
  url.searchParams.set('q', data.id);
  const href = "./photographer.html?q="+data.id
  // url.href; // contient l'url complete avec l'id photographer
    

  function getUserCardDOMIndex() {
          
    // Declarer les elements du DOM
    const card = document.createElement( 'section' );
          
          
    // Modifier les elements du DOM
    card.innerHTML =`
          <a class="card__photograph-profile" title="Visiter le profil de ${name}" href="${href}" target="_blank" role="link">
              <h2 class="card__name">
                  <img class="card__image" src="${picture}" alt="">
                  ${name}
              </h2>
          </a>
          <div class="card__text-container" tabindex="0">
              <h3 class="city">${city}</h3>
              <h4 class="tagline">${tagline}</h4>
              <h5 class="price">${price}€/jour</h5>
          </div>`;            
    card.className ="card";
    card.setAttribute("role", "region");
    card.setAttribute("aria-label", "Vignette de presentation du photographe "+name)
          
          
    return card;         

  
  }

  function getUserCardDOMPhotographer() {
          

    const headerPhotographer = document.createElement( 'div' );
    const profil = document.createElement('div');            
    const button = document.createElement('button');
    const img = document.createElement('img');
          
          
    headerPhotographer.className = "header";            
    profil.className = "profil";
          
    profil.innerHTML = `
          
          <h1 tabindex="0" class="name">${name}</h1>
          <div tabindex="0"> 
              <h2 class="city">${city}, ${country}</h2>
              <h3 class="tagline">${tagline}</h3>
          </div>
                    
          
          `;

    button.className="contact_button";
    button.textContent="Contactez-moi";
    button.setAttribute("aria-label", "Contact Me");
    button.setAttribute("lang", "en");
          
    img.className = "img";
    img.setAttribute("src", picture);
    img.setAttribute("alt", name)
    img.setAttribute("tabindex","0")

    headerPhotographer.appendChild(profil);
    headerPhotographer.appendChild(button);            
    headerPhotographer.appendChild(img);

    return headerPhotographer
  }       
 
    

       
  return { city,country,id, name, picture, price, tagline,likes,
    getUserCardDOMIndex,getUserCardDOMPhotographer} 
}







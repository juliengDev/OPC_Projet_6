import { photographerFactory } from "../factories/photographer.js";


/**
 * Permet de recuperer les donnees JSON en utilisant l'Api fetch.
 * @return { Promise } Promise.resolve
 * @return { Promise.resolve<Object[]> } photographers - Tableau contenant une liste d'objets des photographes
 * @return { Promise.resolve<String> } photographers[].name
 * @return { Promise.resolve<Number> } photographers[].id
 * @return { Promise.resolve<String> } photographers[].city
 * @return { Promise.resolve<String> } photographers[].country
 * @return { Promise.resolve<String> } photographers[].tagline
 * @return { Promise.resolve<Number> } photographers[].price
 * @return { Promise.resolve<String> } photographers[].portrait
 * 
 * @return { Promise.resolve<Object[]> } medias - Tableau contenant la liste des medias des photographes
 * @return { Promise.resolve<String> } medias[].date
 * @return { Promise.resolve<Number> } medias[].id
 * @return { Promise.resolve<String> } medias[].image
 * @return { Promise.resolve<Number> } medias[].likes
 * @return { Promise.resolve<Number> } medias[].photographerId
 * @return { Promise.resolve<Number> } medias[].price
 * @return { Promise.resolve<String> } medias[].title
 */

async function getPhotographers() {

    
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
        
        
    
    
    return {
      photographers: [...photographers],
      medias: [...medias]
    }
  }
}   
 
/**
 *  Affiche les donnees des photographers sur la page d'accueil.
 * @param {*} photographers - Tableau de donnees des photographes
 * 
 */

async function displayData(photographers) {
  const photographersSection = document.querySelector(".photographer_section");

  // Appel pour chaque photographe une factory qui genere l'affichage des donnees du photographe sur la page Accueil
  photographers.forEach((photographer) => {
    const photographerModel = photographerFactory(photographer);
    const userCardDOM = photographerModel.getUserCardDOMIndex();
    photographersSection.appendChild(userCardDOM); 
  });
}




/**
 * Stock le retour de la fonction getPhotographer dans une variable photographers
 * Appel la fonction DisplayData en passant la variable en parametre
 */
async function init() {
  // Récupère les datas des photographes
  const { photographers } = await getPhotographers();
  displayData(photographers);   
    
}

init();



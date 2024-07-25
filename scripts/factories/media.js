export function mediaFactory(data,photographerName,order) {
    
  let {date,id,image,likes,photographerId,price,title,video} = data;
    
  const mediaDirectory = `assets/SamplePhotos/${photographerName}/`
    
     
   
  function getUserMediaDOM() {
        
    let element;      

    if(image !== undefined) {
        
      // Declarer les elements du DOM
      element = document.createElement( 'div' );
      element.className= "img"; 
        
        

      let imgModel = document.createElement( 'img' );
      let legende = document.createElement( 'div' );
      let titre = document.createElement('h3');
      let nbLikes = document.createElement('div')
      let heart = document.createElement('i');
        

      // Modifier les elements du DOM
      imgModel.setAttribute("src", `${mediaDirectory}${image}`);
      imgModel.className = "box-img";
      imgModel.setAttribute("id",`media${order}`);
      imgModel.setAttribute("tabindex","0");
      imgModel.setAttribute("alt",`${title}, closeup view`)

      imgModel.style.cursor="pointer";
      legende.className = "legend";
        
      titre.className="text";
      titre.textContent= `${title}`;
      titre.setAttribute("tabindex","0")
      nbLikes.className="likes";
      nbLikes.textContent=`${likes}`;
      nbLikes.setAttribute("tabindex","0")
      nbLikes.setAttribute("aria-label","likes")
      heart.className="heart fa-solid fa-heart";

      heart.addEventListener('click', function(){
        let total = document.getElementsByClassName('number')[0];
        total.textContent = parseInt(total.textContent)+1           
        likes+=1;
        nbLikes.textContent=`${likes}`;          
      })

      // Ajouter les elements au DOM
      element.appendChild(imgModel);
      element.appendChild(legende);
      legende.appendChild(titre);
      legende.appendChild(nbLikes);       
      legende.appendChild(heart);
        
       

    } else {
        
      // Declarer les elements du DOM
      element = document.createElement( 'div' );
      element.className= "video";
        

      let videoModel = document.createElement( 'video' );
      let legende = document.createElement( 'div' );
      let titre = document.createElement('h3');
      let nbLikes = document.createElement('div');
      let heart = document.createElement('i');

      // Modifier les elements du DOM
      videoModel.setAttribute("src", `${mediaDirectory}${video}`);
      videoModel.className = "box-video";
      videoModel.setAttribute("id",`media${order}`)
      videoModel.setAttribute("tabindex","0");
      videoModel.setAttribute("alt",`${title}, closeup view`)
      videoModel.style.cursor="pointer";
      legende.className = "legend";
       
      titre.className="text";
      titre.textContent= `${title}`;
      titre.setAttribute("tabindex","0")
      nbLikes.className="likes";
      nbLikes.textContent=`${likes}`;
      nbLikes.setAttribute("tabindex","0");
      nbLikes.setAttribute("aria-label","likes");
      heart.className="heart fa-solid fa-heart";

      heart.addEventListener('click', function(){ 
        let total = document.getElementsByClassName('number')[0];
        total.textContent = parseInt(total.textContent)+1         
        likes+=1;
        nbLikes.textContent=`${likes}`;          
      })

      // Ajouter les elements au DOM
      element.appendChild(videoModel);
      element.appendChild(legende);
      legende.appendChild(titre);
      legende.appendChild(nbLikes);
      legende.appendChild(heart);


    }     
          
    return element;       
  }

  
        
    
  return {
    id,date,image,likes,photographerId,price,title,video,mediaDirectory,order,
    getUserMediaDOM,}
}


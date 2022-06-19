const button = document.querySelector(".buttonFetch");
const button2 = document.querySelector(".buttonAsync");
const fMiv = document.getElementById("fMichis");
const KittiesR = document.getElementById("imgsR");
const btnDelete = document.querySelector(".buttonDel")
const spanError = document.getElementById('error');
    


const API_URL = 'https://api.thecatapi.com/v1/images/search?limit=3';
const API_URL_FAVOURITES = 'https://api.thecatapi.com/v1/favourites?limit=1000';
const API_URL_FAVOURITES_DELETE = (id) => `https://api.thecatapi.com/v1/favourites/${id}`



async function cats2() {

    const res = await fetch(API_URL);
    const data = await res.json();
    
    if (res.status !== 200){
        spanError.innerHTML = `<span id="error"><i class="fa-solid fa-cat"></i> Michis Error</span><i class="fa-solid fa-shield-cat"></i>: ${res.status}`;
    }else{
        KittiesR.innerHTML = "";
        data.forEach(item =>  {
            let KittyR = document.createElement("article");
            KittyR.innerHTML = `<img id="imgapiFav1" src="${item.url}" class="img" alt="Foto gatito aleatoria"> 
            <button class="buttonFav" id="btnFav_${item.id}"><span class="material-symbols-outlined">
            bookmark_add</span><br>Add Favotire Michis</button>`;
            KittiesR.appendChild(KittyR);
        });
    }

    const btn1 = document.getElementById(`btnFav_${data[0].id}`);
    btn1.addEventListener('click', () =>{
        saveFavoriteMichi(data[0].id);
        console.log("Gatico1 ",data[0].id);
    });
    const btn2 = document.getElementById(`btnFav_${data[1].id}`);
    btn2.addEventListener('click', () =>{
        saveFavoriteMichi(data[1].id);
        console.log("Gatico2 ",data[1].id);
    });
    const btn3 = document.getElementById(`btnFav_${data[2].id}`);
    btn3.addEventListener('click', () =>{
        saveFavoriteMichi(data[2].id);
        console.log("Gatico3 ",data[2].id);
    });

}


button2.addEventListener('click', () =>{
    cats2();
})



async function loadFavoriteMichis() {
    const res = await fetch(API_URL_FAVOURITES,{
        method: 'GET',
        headers: {
            'X-API-KEY' : 'f013ed6b-7335-4fec-8dc6-f7602ed495a8',
        }
    });
    const data2 = await res.json();
    console.log('Favoritos data2',data2);

    if (res.status !== 200) {
     spanError.innerHTML = "Hubo un error: " + res.status + data2.message;
     
    }else{
        fMiv.innerHTML = "";
        
        data2.forEach(item =>  {

            let michiFav = document.createElement("article");
            michiFav.innerHTML = `<img id="imgapiFav1" src="${item.image.url}" class="img" alt="Foto gatito aleatoria"> 
            <button class="buttonDel" onclick= "deleteFavouriteMichi(${item.id})"><span class="material-symbols-outlined">
            bookmark_remove</span><br>Quit Favotire Michis</button>`;
            fMiv.appendChild(michiFav);
        })
    }
}


async function saveFavoriteMichi(id) {
    const res = await fetch(API_URL_FAVOURITES, {
        method: 'POST',
        headers: {
            'Content-Type':'application/json',
            'X-API-KEY' : 'f013ed6b-7335-4fec-8dc6-f7602ed495a8'
        },
        body:  JSON.stringify({
                image_id : id
            }),
    });
    console.log('Save', res);
    if (res.status !== 200) {
        spanError.innerHTML = "Hubo un error: " + res.status + data.message;
    }else{
        console.log("Michi Guardado en favoritos");
    }
    loadFavoriteMichis();
}


async function deleteFavouriteMichi(id){
    const res = await fetch( API_URL_FAVOURITES_DELETE(id), {
        method : 'DELETE',
        headers: {
            'X-API-KEY' : 'f013ed6b-7335-4fec-8dc6-f7602ed495a8',
        }
    });
    const data = await res.json();
    if (res.status !== 200) {
        spanError.innerHTML = "Hubo un error: " + res.status + data.message;
    }else{
        console.log("Michi borrado de favoritos");
        loadFavoriteMichis();
    }
}


cats2();
loadFavoriteMichis();


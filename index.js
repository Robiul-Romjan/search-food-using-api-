const loadFood = async (searchText, limitData) => {
    const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchText}`;
   try{
    isLoading(true);
    const res = await fetch(url);
    const data = await res.json();
    displayFood(data.meals, limitData);
   }catch(err){
    const foodContainer = document.getElementById("foods-container");
    let newMessage = "dont match your search";
     err.message = newMessage;
     foodContainer.innerHTML = err.message;
   };
};

const displayFood = (foods, limitData) => {
    const foodContainer = document.getElementById("foods-container");
    foodContainer.innerText = '';
    
    const showAll = document.getElementById("show-all")
    if(limitData && foods.length > 6){
      foods = foods.slice(0, 6);
      showAll.classList.remove("d-none");
    }else{
      showAll.classList.add("d-none");
    }

   foods.map((food) =>{
    const div = document.createElement("div");
    div.classList.add = "col";
    div.innerHTML = `
      <div class="card h-100">
        <img src="${food.strMealThumb}" class="card-img-top" alt="...">
        <div class="card-body">
         <h5 class="card-title">${food.strMeal}</h5>
         <button onclick="detailsFood(${food.idMeal})" type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
          See Details
        </button>
        </div>
     </div>
    `;
    foodContainer.appendChild(div);
    isLoading(false)
   });
};

const processSearch = (limitData) =>{
  const searchField = document.getElementById("search-field");
  const searchText = searchField.value;
  loadFood(searchText, limitData);
};

const searchFoods = () =>{
    processSearch(6)
};

const detailsFood = async (idMeal) =>{
    const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idMeal}`;
    const res = await fetch(url);
    const data = await res.json();
    showModal(data.meals[0]);  
};

const showModal = (modalData) =>{
   console.log(modalData);
   document.getElementById("exampleModalLabel").innerHTML = modalData.strMeal;
   document.getElementById("modal-body").innerHTML = modalData.strInstructions;
};

const isLoading = (spiner) => {
  const loader = document.getElementById('loader');
  if(spiner === true){
    loader.classList.add("d-block")
    loader.classList.remove("d-none")
  }else{
    loader.classList.add("d-none")
    loader.classList.remove("d-block")
  }
  
};

document.getElementById("show-all-btn").addEventListener("click", ()=>{
   processSearch()
})


// loadFood("");


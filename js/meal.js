const searchFood = () =>{
    const searchField = document .getElementById('search-field');
    const searchFieldText = searchField.value;
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchFieldText}`)
    .then(res => res.json())
    .then(data => loadFood(data.meals))
    

    /* clear input field */
    searchField.value='';
}
searchFood();
const loadFood = meals => {
    const foodContainer = document.getElementById('food-contianer');
    /* clear present food instead of you want another food  */
    // foodContainer.innerText='';
    foodContainer.textContent='';
    if(meals.length == 0){
        document.getElementById('error').innerText = 'No found result'
    }
    /* clear when showing meal details and need to search another meal */
    // mealDetails.innerText='';
    mealDetails.textContent='';
    
    // console.log(meals)
    for (const meal of meals) {
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
        <div onclick="loadMealDetails(${meal.idMeal})" class="card h-100">
            <img src="${meal.strMealThumb}" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">${meal.strMeal}</h5>
                <p class="card-text">${meal.strInstructions.slice(0,250)}</p>
            </div>
        </div>
        `
        foodContainer.appendChild(div)
    }
}

const loadMealDetails = mealId =>{
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`)
    .then(res => res.json())
    .then(data => displayMealDetails(data.meals[0]));
    // console.log(mealId)
}
const displayMealDetails = meal => {
    const mealDetails = document.getElementById('mealDetails');
    mealDetails.innerHTML = `
    <div class="card mb-4">
        <img src="${meal.strMealThumb}" class="card-img-top" alt="...">
        <div class="card-body">
            <h5 class="card-title">${meal.strMeal}</h5>
            <p class="card-text"${meal.strInstructions.slice(0,250)}</p>
            <a href="${meal.strYoutube}" class="btn btn-primary">Go somewhere</a>
        </div>
    </div>
    `
    console.log(meal)
}
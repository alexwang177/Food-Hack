const button = document.getElementById('submit');
const recipeList = document.getElementById('recipes');

function getRecipes(){
    fetch('http://localhost:5000/api/items', {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'cache-control': 'no-cache'
        },
    }).then(res => res.text())
    .then(data => {
        console.log(data);
        recipeList.innerHTML = data;
    })
    .catch(err => console.log(err));
}
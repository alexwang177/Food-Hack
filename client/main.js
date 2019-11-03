const button = document.getElementById('submit');
const recipeList = document.getElementById('recipeList');

const calories = document.getElementById('calories');
const fat = document.getElementById('fat');
const protein = document.getElementById('protein');
const carbohydrates = document.getElementById('carbohydrates');
const sodium = document.getElementById('sodium');

var recipeArray = [];

var a = carbohydrates.value;

function getRecipes(){

    a = carbohydrates.value;
    console.log("data" + a);

    fetch('http://localhost:5000/api/items', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'cache-control': 'no-cache'
        },
        body: JSON.stringify({
            carbs: a,
            fat: fat.value,
            protein: carbohydrates.value,
            sodium: sodium.value,
            calories: calories.value,
            test: '50'
        })
    }).then(res => res.json())
    .then(data => {
        recipeArray = data;
        console.log(recipeArray);
        displayRecipes();
    })
    .catch(err => console.log(err));
}

function displayRecipes(){
    if(recipeArray.length > 0){
        recipeList.innerHTML = ``;

        var myList = document.createElement('ul');
        myList.className = 'list';

        for(var i = 0; i < recipeArray.length; i++){
        
            // create list item for every element 
            var listItem = document.createElement("li");
            listItem.className = "card";
            listItem.style = "display: inline-flex; margin: 5px; width: 20rem; height: 25rem;";

            // create img for every element
            var img = document.createElement("img");
            img.src = recipeArray[i].image;
            img.alt = "..."

            // create card body for every element
            var cardBody = document.createElement("div");
            cardBody.className = "card-body"
            cardBody.style.textAlign = "center";

            // create card title for every element
            var cardTitle = document.createElement("h5");
            cardBody.className = "card-title"
            cardTitle.innerHTML = recipeArray[i].title;

            // create link for every element
            var link = document.createElement("a");
            link.className = "btn btn-primary";
            link.href = "#";
            link.innerHTML = "More Info";
            link.target = "_blank";

            // create a text node to store value
            var listValue = document.createTextNode(recipeArray[i].title + " " + Math.round(recipeArray[i].calories));
            
            // Appending...
            listItem.appendChild(img);

            cardBody.appendChild(cardTitle);
            cardBody.appendChild(link);

            listItem.appendChild(cardBody);
            
            // append the list item in the list
            myList.appendChild(listItem);
        }
        
        // append the list in the container
        //recipeList.style = "display: flex; justify-content: center;";
        recipeList.appendChild(myList);
      
    }
    else{
      // Create a text node with the message
      var message = document.createTextNode("No Recipes Found" + a);
      
      // Append the message to the container
      recipeList.appendChild(message);    
    }
}
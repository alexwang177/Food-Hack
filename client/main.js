const button = document.getElementById('submit');
const recipeList = document.getElementById('recipeList');

var recipeArray = [];

function getRecipes(){
    fetch('http://localhost:5000/api/items', {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'cache-control': 'no-cache'
        },
    }).then(res => res.json())
    .then(data => {
        //console.log(data);
        //recipeList.innerHTML = data;
        recipeArray = data.hits;
        console.log(recipeArray);
        displayRecipes();
    })
    .catch(err => console.log(err));
}

function displayRecipes(){
    console.log(recipeArray.length)

    if(recipeArray.length > 0){
        var myList = document.createElement('ul');
        myList.className = 'list';

        for(var i = 0; i < recipeArray.length; i++){
        
            // create list item for every element 
            var listItem = document.createElement("li");
            listItem.className = "card";
            listItem.style = "width: 18rem; height: 25rem; margin: 5px; display: inline-flex";

            // create img for every element
            var img = document.createElement("img");
            img.src = recipeArray[i].recipe.image;
            img.alt = "..."

            // create card body for every element
            var cardBody = document.createElement("div");
            cardBody.className = "card-body"
            cardBody.style.textAlign = "center";

            // create card title for every element
            var cardTitle = document.createElement("h5");
            cardBody.className = "card-title"
            cardTitle.innerHTML = recipeArray[i].recipe.label;

            // create link for every element
            var link = document.createElement("a");
            link.className = "btn btn-primary";
            link.href = recipeArray[i].recipe.url;
            link.innerHTML = "More Info"

            // create a text node to store value
            var listValue = document.createTextNode(recipeArray[i].recipe.label + " " + Math.round(recipeArray[i].recipe.calories));
            
            // Appending...
            listItem.appendChild(img);

            cardBody.appendChild(cardTitle);
            cardBody.appendChild(link);

            listItem.appendChild(cardBody);
            
            // append the list item in the list
            myList.appendChild(listItem);
        }
        
        // append the list in the container
        recipeList.style = "text-align: center;";
        recipeList.appendChild(myList);
      
    }
    else{
      // Create a text node with the message
      var message = document.createTextNode("No Recipes Found");
      
      // Append the message to the container
      recipeList.appendChild(message);    
    }
}
let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });



  //On the index.html page, there is a div with the id "toy-collection."
//When the page loads, make a 'GET' request to fetch all the toy objects. With the response data, make a <div class="card"> for each toy and add it to the toy-collection div.


fetch('http://localhost:3000/toys') 
.then(res => res.json())
.then((toysArray) => (toysArray.forEach(toy => {renderToy(toy)})));

  // fetch("http://localhost:4000/articles")
  //   .then((r) => r.json())
  //   .then((articlesArray) => console.log(articlesArray));
});

// Function of Rendering a Toy by creating a <div>

function renderToy(toy){

 let div = document.createElement('div')
 div.className = 'card'
 div.innerHTML = `
 <h2>${toy.name}</h2>
 <img src=${toy.image} class="toy-avatar">
 <p>${toy.likes}</p>
<button class="like-btn" id=${toy.id}>Like <3</button>`

document.getElementById('toy-collection').appendChild(div)

}






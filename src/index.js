let addToy = false;
//stable elements
let form = document.querySelector('.add-toy-form')

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
});


  //Fetch all the toy objects, and execute rendering function on each 
fetch('http://localhost:3000/toys') 
  .then(res => res.json())
  .then((toysArray) => (toysArray.forEach(toy => {renderToy(toy)})));

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

//come back and ask why ${toy.id} didn't work !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
let likeButton = div.querySelector('button')
likeButton.addEventListener('click', ()=>{
  // console.log(typeof toy.likes)
  // let newLikes = toy.likes + 1
  fetch(`http://localhost:3000/toys/${toy.id}`, {
  method: "PATCH",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json"
  },
  body: JSON.stringify({
    'likes' : toy.likes + 1
  }),
})
  .then((r) => r.json())
  .then((updatedToy) =>{
    toy.likes = updatedToy.likes
    div.querySelector('p').textContent = updatedToy.likes;
    // likeButton.reset();
  });
})

}




// POSTing form inputs to server, and rendering it to the DOM
form.addEventListener('submit',(e)=>{
  e.preventDefault();
  let toyName = e.target.getElementsByClassName('input-text')[0].value;
  let toyImageURL = e.target.getElementsByClassName('input-text')[1].value;
  let newToy = {
    "name": toyName,
    "image": toyImageURL,
    "likes": 0
  }

  fetch("http://localhost:3000/toys", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify(newToy),
  })
  .then((r) => r.json())
  .then((toyObj) => renderToy(toyObj));

})


//



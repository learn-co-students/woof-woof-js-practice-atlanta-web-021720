
document.addEventListener('DOMContentLoaded', (event) => {
   fetchPups()
});


function fetchPups(){

    fetch("http://localhost:3000/pups")
    .then(resp => resp.json())
    .then(data => {
        console.log(data)
        renderDogs(data)
    })
}

function renderDogs(data){

    let dogBar = document.querySelector("#dog-bar")

    for (dog of data){
    let spanL = document.createElement("span")
    spanL.innerHTML = dog.name
    console.log(dog.image)
    dogBar.appendChild(spanL)
    spanL.id = dog.image

    spanL.addEventListener("click",function(e){
        console.log(spanL)

        let dogInfo = document.querySelector("#dog-info")

        let dogImage = document.createElement("img")
        let dogName = document.createElement("h3")
        dogImage.src = dog.image
        dogName.innerHTML = dog.name

        dogInfo.appendChild(dogImage)
        dogInfo.appendChild(dogName)
        console.log(e.target)
    })

    }
}






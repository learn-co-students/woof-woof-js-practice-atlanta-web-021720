document.addEventListener("DOMContentLoaded", () => {
addPups();

})

function addPups() {
    const pupBar = document.querySelector("#dog-bar")
    const info = document.querySelector("#dog-info")

    fetch("http://localhost:3000/pups")
    .then(req => req.json())
    .then(dogData => {
        dogData.forEach(dog => {
            let dogSpan = document.createElement("span")
            dogSpan.innerHTML = dog.name

            dogSpan.addEventListener("click", e => {
                while(info.hasChildNodes()) {
                    info.removeChild(info.firstChild)
                }
                addingDog(dog, info)
            })

            pupBar.appendChild(dogSpan)
        })
    })
}

function addingDog(dog, info) {
    const dogInfo = document.querySelector("#dog-info")

    let dogImg = document.createElement("img")
    dogImg.src = dog.image

    let dogH2 = document.createElement("h2")
    dogH2.innerHTML = dog.name

    let dogBtn = document.createElement("button")
    if(dog.isGoodDog) {
        dogBtn.innerHTML = "Good Dog!"
    } else {
        dogBtn.innerHTML = "Bad Dog!"
    }

    info.appendChild(dogImg)
    info.appendChild(dogH2)
    info.appendChild(dogBtn)

    dogBtn.addEventListener("click", e => {
        if(dog.isGoodDog) {
            dog.isGoodDog = false
        } else {
            dog.isGoodDog = true
        }
        fetch(`http://localhost:3000/pups/${dog.id}`, {
            method: "PATCH",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                isGoodDog: dog.isGoodDog
            })
        })
        .then(req => req.json())
        .then(newDogData => {
            console.log(newDogData)
            while(dogInfo.hasChildNodes()) {
                dogInfo.removeChild(dogInfo.firstChild)
            }
            addingDog(newDogData, dogInfo)
        })
    })
}

// function toggleDogFilter(pupBar, dog, info) {
//     const dogFilter = document.querySelector("#good-dog-filter")
//     dogFilter.addEventListener("click", e => {
//         if(dogFilter.innerHTML === "Filter good dogs: OFF") {
//             dogFilter.innerHTML = "Filter good dogs: ON"
//             if(!dog.isGoodDog) {
//                 while(pupBar.hasChildNodes()) {
//                     pupBar.removeChild(pupBar.firstChild)
//                 }
//             }
//         }else {
//             dogFilter.innerHTML = "Filter good dogs: OFF"
//             addingDog(dog, info)
//         }
//     })
// }
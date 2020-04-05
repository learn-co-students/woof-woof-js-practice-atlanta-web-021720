document.addEventListener('DOMContentLoaded', function(e) {
    console.log("DOM loaded...")
    let pupFilter = document.querySelector("#good-dog-filter")
    pupFilter.addEventListener("click", function(e) {
        let pupParent = document.querySelector("#dog-bar")
        if (e.target.innerText === "Filter good dogs: OFF") {
            e.target.innerText = "Filter good dogs: ON"
            while (pupParent.firstElementChild) {
                pupParent.firstElementChild.remove()
            }
            fetch("http://localhost:3000/pups")
                .then(resp => resp.json())
                .then(pups => {
                    pups.forEach(pup => {
                        if (pup.isGoodDog === true) {
                            renderPup(pup)
                        }
                    })
                })
        } else {
            e.target.innerText = "Filter good dogs: OFF"
            while (pupParent.firstElementChild) {
                pupParent.firstElementChild.remove()
            }
            fetchPups()
        }
    })
    fetchPups()
})

//Render Single Pup with click event
function renderPup(pup) {
    let pupSpan = document.createElement("span")
    pupSpan.innerText = pup.name
    pupSpan.addEventListener("click", function(e) {
        let pupInfoParent = document.querySelector("#dog-info")
        pupInfoParent.firstChild.remove()
        let pupInfo = document.createElement("div")
        pupInfo.id = pup.id
        let pupImg = document.createElement("img")
        pupImg.src = pup.image
        let pupName = document.createElement("h2")
        pupName.innerText = pup.name
        let pupStatus = document.createElement("button")
        if (pup.isGoodDog === true) {
            pupStatus.textContent = "Good Dog!"
            pupStatus.value = true
        } else {
            pupStatus.textContent = "Bad Dog!"
            pupStatus.value = false
        }
        pupStatus.addEventListener("click", function(e) {
            let pupId = e.target.parentElement.id
            let newPupStatus;
            if (e.target.value === "false") {
                newPupStatus = true
            } else {
                newPupStatus = false
            }
            fetch(`http://localhost:3000/pups/${pupId}`, {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({ isGoodDog: newPupStatus })
                })
                .then(response => response.json())
                .then(updatedPup => {
                    console.log(updatedPup)
                    let updatedPupBtn = document.getElementById(updatedPup.id).querySelector("button")
                    if (updatedPup.isGoodDog === true) {
                        updatedPupBtn.textContent = "Good Dog!"
                        updatedPupBtn.value = true
                    } else {
                        updatedPupBtn.textContent = "Bad Dog!"
                        updatedPupBtn.value = false
                    }
                })

        })
        pupInfo.append(pupImg, pupName, pupStatus)
        pupInfoParent.appendChild(pupInfo)
    })
    let pupParent = document.querySelector("#dog-bar")
    pupParent.appendChild(pupSpan)
}

function fetchPups() {
    fetch("http://localhost:3000/pups")
        .then(resp => resp.json())
        .then(pups => {
            console.log(pups)
            pups.forEach(pup => {
                renderPup(pup)
            })

        })
}
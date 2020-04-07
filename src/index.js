document.addEventListener('DOMContentLoaded', () => {

    ////////////////////////////////////////////////////
    //        DOM Selectors
    const dogContainer = document.querySelector('#dog-bar')
    const dogInfo = document.querySelector('#dog-info')
    const filterButton = document.querySelector('#good-dog-filter')
    let allDogSpans;

    fetch('http://localhost:3000/pups')
    .then(response => response.json())
    .then(dogsData => {
        dogsData.forEach(dog => {
            renderDogSpan(dog)
        })
    })



    dogContainer.addEventListener('click', (e) => {
        if (e.target.nodeName === 'SPAN') {
            clearProfile()
            let dogId = e.target.dataset.id
            fetch(`http://localhost:3000/pups/${dogId}`)
            .then(response => response.json())
            .then(dogData => {
                renderProfile(dogData)
                const goodBadButton = dogInfo.querySelector('button')
                addButtonListener(goodBadButton, dogData)
                })
            } else {}})



///////////////////////////////////////////////
//        Event Listeners
function addButtonListener(button, dogData) {
    button.addEventListener('click', (e) => {
        let dogUpdate = { isGoodDog: reverse(dogData.isGoodDog) }
       // debugger
        fetch(`http://localhost:3000/pups/${e.target.dataset.id}`, {
            method: 'PATCH',
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json"
            },
            body: JSON.stringify(dogUpdate),
        })
        .then(response => response.json())
        .then( data => {
            allDogSpans = document.querySelectorAll('#dog-bar span')
            allDogSpans.forEach(span => {
                if (span.dataset.id === data.id.toString()) {
                    span.dataset.status = data.isGoodDog
                }
            })
            clearProfile();
            renderProfile(data)
        })
    })
}

    filterButton.addEventListener('click', (e) => {
        if (e.target.textContent.includes('OFF')) {
            allDogSpans = document.querySelectorAll('#dog-bar span')
            e.target.textContent = 'Filter good dogs: ON'
            allDogSpans.forEach(span => {
                if (span.dataset.status === 'false') {
                    span.style.display = 'none'
                }
            })
        } else {
            allDogSpans = document.querySelectorAll('#dog-bar span')
            e.target.textContent = 'Filter good dogs: OFF'
            allDogSpans.forEach(span => {
                span.style.display = 'flex'
            })
        }
    })

///////////////////////////////////////////////
//        Render Helpers
function renderDogSpan(dog) {
    let dogSpan = document.createElement('span');
    dogSpan.textContent = `${dog.name}`;
    dogSpan.dataset.id = dog.id;
    dogSpan.dataset.status = dog.isGoodDog;
    dogContainer.appendChild(dogSpan);
}

function renderProfile(dogData) {
    //debugger
    let pic = document.createElement('img')
    pic.src = dogData.image
    let header = document.createElement('h2')
    header.innerHTML = dogData.name
    let button = document.createElement('button')
    button.innerHTML = `${goodOrBad(dogData)} Dog!`
    button.dataset.id = dogData.id
    dogInfo.append(pic, header, button)
}


//////////////////////////////////////////////
//        Misc Helpers
function goodOrBad(dog) {
    if (dog.isGoodDog === 'true') {
        return 'Good'
    } else {
        return 'Bad'
    }
}

function reverse(status) {
    if (status === 'true') {
        return 'false'
    } else {
        return 'true'
    }
}
    function clearProfile() {
        while (dogInfo.firstChild) {
            dogInfo.firstChild.remove();
        }
    }




})//------------page load event listener closure


/////////////////////////////////////
//for bonus, querySelectorAll .isGoodDog === 'false' and set display to hidden/none
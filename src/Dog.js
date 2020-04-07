class Dog
{
    constructor(dog)
    {
        this.id = dog.id;
        this.name = dog.name;
        this.isGoodDog = dog.isGoodDog;
        this.image = dog.image;
    }

    spanEl(){
        const span = document.createElement("span")
        span.innerText = this.name
        span.addEventListener("click", () => DogController.showDog(this) )
        return span
    }
    
    imageEl(){
        const img = document.createElement("img")
        img.src = this.image
        return img
    }

    h2El(){
        const h2 = document.createElement("h2")
        h2.innerText = this.name
        return h2
    }

    buttonEl(){
        const button = document.createElement("button")
        button.innerText = this.isGoodDog ? "Good Dog!" : "Bad Dog!"
        button.addEventListener("click", (e) => DogController.toggleGoodDog(this, e))
        return button
    }
}
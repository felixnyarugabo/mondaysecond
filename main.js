const id = document.getElementById('id')
const firstName = document.getElementById('firstName')
const secondName = document.getElementById('secondName')
const age = document.getElementById('age')
const picture = document.getElementById('picture')
const save = document.getElementById('save')
const  display = document.getElementById('display')



const toggle = document.querySelector('.toggle');
const content = document.querySelector('.content');

toggle.addEventListener('click', function() {
    content.classList.toggle('show');

    toggle.textContent =
        content.classList.contains('show') ? '🙈' : '👁️';
});


const storage = JSON.parse(localStorage.getItem('users')) || []
save.addEventListener('click',function(){
    let ID = id.value.trim()
    let firstNames=firstName.value.trim()
    let secondNames = secondName.value.trim()
    let ages =age.value.trim()
    let pictures = picture.files[0]

    if(ID === "" || firstNames === "" || secondNames === "" || ages === "" || !pictures){
        console.log("fill every thing and try again ")
        return
    }
if(storage.some(function(user){
    return  user.id === ID
})){
    console.log("id all ready exist")
    return
}
    const reader = new FileReader()
    reader.onload= function(){
        const user ={
            id :ID,
            firstName:firstNames,
            secondName:secondNames,
            age:ages,
            picture:reader.result
        }

storage.push(user)

try {
    localStorage.setItem('users', JSON.stringify(storage))
    showMessage()
} catch (error) {
    console.log(error)
}       

id.value =""
firstName.value = ""
secondName.value = ""
age.value = ""
 picture.value= ""



    }
reader.readAsDataURL(pictures)
})

function showMessage(){
    storage.forEach(function(user){

    let card = document.createElement('div')
    let image = document.createElement('img')
    
    image.src=user.picture;
    image.alt = "profilepicture";
    image.width = 100;

    let detail = document.createElement('p')
    detail.textContent= `firstNmae : ${user.firstName} sunName : ${user.secondName}  age : ${user.age}`
    card.append(image,detail)
    display.appendChild(card)

    })
}
showMessage()
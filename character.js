



class Character {
    constructor(id, avatar, fullname, gender, dob, anime, costume_price) {
        this.id = id;
        this.avatar = avatar;
        this.fullname = fullname;
        this.gender = gender;
        this.dob = dob;
        this.anime = anime;
        this.costume_price = costume_price;
    }
}

var characters = []

var genders = [
    "Male",
    "Female",
    "Hideyoshi"
]

const character_db = "character_db"
function init(){
    if(localStorage.getItem(character_db) == null){
        characters = [
            new Character(1, "images/ken.jpg"    , "Ken Kaneki"      , "Male"   , "2000-10-20"  , "Tokyo Ghoul"     , 500000    ),
            new Character(2, "images/touka.png"  , "Touka Kirishima" , "Female" , "2002-01-01"  , "Tokyo Ghoul"     , 600000    ),
            new Character(3, "images/anya.jpg"   , "Anya Forger"     , "Female" , "2015-12-27"  , "Spy x Family"    , 450000    ),
            new Character(4, "images/denji.jpg"  , "Denji"           , "Male"   , "2007-03-15"  , "Chainsaw Man"    , 1000000   ),
        ]
        localStorage.setItem(character_db, JSON.stringify(characters))
    }
    else{
        characters = JSON.parse(localStorage.getItem(character_db));
    }
}
function renderCharacter() {
    let htmls = characters.map(function(char){
        return `
                <tr>
                    <td><input type="checkbox"></td>
                    <td>
                        <div class="avatar-fullname">
                            <img class="avatar" src="${char.avatar}" alt="">
                        </div>
                    </td>
                    <td>${char.fullname}</td>
                    <td>${char.gender}</td>
                    <td>${char.dob}</td>
                    <td>${char.anime}</td>
                    <td>${char.costume_price}</td>
                    <td>
                        <i class="fa-solid fa-user-pen"></i>
                    </td>
                </tr>
                `
    })
    document.querySelector(`.table>tbody`).innerHTML = htmls.join("")
}

function renderGender(){
    let htmls = genders.map(function(gender){
        return `<option value="${gender}">${gender}</option>`
    })
    document.querySelector(`#gender`).innerHTML = htmls.join("")
}

function changeAvatar() {
    let avatarUrl = document.querySelector('#avatar').value;
    if (avatarUrl != null && avatarUrl != "") {
        document.querySelector('#reviewAvatar').src = avatarUrl;
    }
    else {
        document.querySelector('#reviewAvatar').src = "images/noavatar.jpg"
    }
}

function createCharacter(){
    let id = getMaxId() + 1;
    let avatar = document.querySelector("#avatar").value; 
    let fullname = document.querySelector("#fullname").value; 
    let gender = document.querySelector("#gender").value; 
    let dob = document.querySelector("#dob").value; 
    let anime = document.querySelector("#anime").value; 
    let costume_price = document.querySelector("#costume-price").value;
    
    
    characters.push(new Character(id, avatar, fullname, gender, dob, anime, costume_price));
    localStorage.setItem(character_db, JSON.stringify(characters));
    renderCharacter();
    resetCreateForm();
}

function resetCreateForm(){
    document.querySelector("#avatar").value = ""; 
    document.querySelector("#fullname").value = ""; 
    document.querySelector("#gender").value = ""; 
    document.querySelector("#dob").value = ""; 
    document.querySelector("#anime").value = ""; 
    document.querySelector("#costume-price").value = "";
    document.querySelector('#reviewAvatar').src = "images/noavatar.jpg"
    
    renderGender()
}

function getMaxId(){
    let max = 0;
    for (let i = 0; i < characters.length; i++){
        if (characters[i].id > max ) {
            max = characters[i].id
        }
    }
    return max;
}

function ready(){
    init()
    renderGender()
    renderCharacter()
}

ready()



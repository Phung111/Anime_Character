// Nút search
function displaySearchInput(){
    document.querySelector(".search-input").classList.remove("d-none");
}

function cancelSearchInput(){
    document.querySelector(".search-input").classList.add("d-none");
}
// //////////

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

var selectedCharacters =[]

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
function renderCharacter(checked) {
    let htmls = characters.map(function(char){
        return `
                <tr>
                    <td>
                    <input onchange="selectCharacter(${char.id})" type="checkbox" ${checked ? "checked" : ""}>
                    </td>
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
                        <i class="fa-solid fa-user-pen" onclick="editCharacter(${char.id})"></i>
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
    renderCharacter(false);
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

    document.querySelector('.btn-create').classList.remove('d-none');
    document.querySelector('.btn-update').classList.add('d-none');
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

function showContainer(){
    document.querySelector('.create-character').classList.toggle('d-none');
    if ( document.querySelector('.btn-show').value == "Add+") {
        document.querySelector('.btn-show').value = "Hide"
    } else {
        document.querySelector('.btn-show').value = "Add+"
    }
}

function selectAllCharacter() {
    let ckbCharacters = document.querySelector("#ckbCharacters");
    renderCharacter(ckbCharacters.checked);
    if (ckbCharacters.checked) {
        selectedCharacters = characters.map(function (character) {
            return character.id;
        })
    } else {
        selectedCharacters = [];
    }
    console.log(selectedCharacters);
}

function selectCharacter(characterId){
    if (selectedCharacters.includes(characterId)) {
        selectedCharacters = selectedCharacters.filter(function (id) {
            return id != characterId;
        })
    } else {
        selectedCharacters.push(characterId)
    }
    document.querySelector("#ckbCharacters").checked = false;
    console.log(selectedCharacters);

}

function deleteCharacters() {
    if (selectedCharacters.length == 0) {
        alert("Please select character to remove!")
    } else {
        let confirmed = window.confirm("Are you sure to remove character(s)?");
        if (confirmed) {
            for (let id of selectedCharacters) {
                characters = characters.filter(function (char) {
                    return char.id != id;
                })
            }
            localStorage.setItem(character_db, JSON.stringify(characters));
            renderCharacter(false);
            selectedCharacters = [];
            document.querySelector("#ckbCharacters").checked = false;
        }
    }
}

function editCharacter(characterId) {
    showContainer()
    let character = characters.find(function (character) {
        return character.id == characterId
    })
    console.log(character.id);

    document.querySelector('#characterId').value = character.id;

    document.querySelector("#avatar").value = character.avatar; 
    document.querySelector("#fullname").value = character.fullname; 
    document.querySelector("#gender").value = character.gender; 
    document.querySelector("#dob").value = character.dob; 
    document.querySelector("#anime").value = character.anime; 
    document.querySelector("#costume-price").value = character.costume_price;
    document.querySelector('#reviewAvatar').src = character.avatar

    document.querySelector('.btn-create').classList.add('d-none');
    document.querySelector('.btn-update').classList.remove('d-none');
}

function updateCharacter() {
    let characterId = document.querySelector('#characterId').value;
    let character = characters.find(function (char) {
        return char.id == characterId;
    })

    character.fullname = document.querySelector('#fullname').value;
    character.avatar = document.querySelector('#avatar').value;
    character.gender = document.querySelector('#gender').value;
    character.dob = document.querySelector('#dob').value;
    character.anime = document.querySelector('#anime').value;
    character.costume_price = document.querySelector('#costume-price').value;

    localStorage.setItem(character_db, JSON.stringify(characters));
    renderCharacter(false);
    resetCreateForm();
    console.log(characterId);
}

function sort(direction){
    if (direction == 'asc') {
        characters.sort(function (character_1, character_2) {
            return character_1.id - character_2.id;
        })
        document.querySelector('#sort_asc').classList.add('sort-active');
        document.querySelector('#sort_desc').classList.remove('sort-active');
    }
    else {
        characters.sort(function (character_1, character_2) {
            return character_2.id - character_1.id;
        })
        document.querySelector('#sort_asc').classList.remove('sort-active');
        document.querySelector('#sort_desc').classList.add('sort-active');
    }
    renderCharacter(false)
}

function ready(){
    init()
    renderGender()
    
    sort('arc')
}

ready()



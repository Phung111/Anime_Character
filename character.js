// Nút search
function displaySearchInput(){
    document.querySelector(".search-input").classList.remove("d-none");
}

function cancelSearchInput(){
    document.querySelector(".search-input").classList.add("d-none");
}
// //////////


// Phần login

// function confirmLogin(){
//     let loginName = document.querySelector("#login .login-name").value;
//     if (loginName == null || loginName == ""){
//         alert("You must enter your account!!");
//         return;
//     } else if (loginName == "admin") {
//         document.querySelector(".account-div").innerHTML = "Admin";
//     } else if (loginName == "user") {
//         document.querySelector(".account-div").innerHTML = "User";
        
//         // document.querySelectorAll(".fa-user-pen").classList.add("dL-none");
//         // document.querySelectorAll(".btn-delete").classList.add("dL-none");
//         // document.querySelectorAll(".fa-trash").classList.add("dL-none");
//         // document.querySelectorAll(".").classList.toggle("dL-none");
//         // document.querySelectorAll(".").classList.toggle("dL-none");
//         // document.querySelectorAll(".").classList.toggle("dL-none");
//     }

//     document.querySelector("#login").classList.toggle("dL-none");
// }

// function cancelLogin(){
//     document.querySelector(".login-name").value = "";
// }

// function showLogin(){
//     document.querySelector("#login").classList.toggle("dL-none");
// }

///////////

// Phần cosplayer
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
            new Character(1, "images/ken.jpg"    , "Ken Kaneki"      , "Male"   , "2000-10-20"  , "Tokyo Ghoul"     , "500.000"    ),
            new Character(2, "images/touka.png"  , "Touka Kirishima" , "Female" , "2002-01-01"  , "Tokyo Ghoul"     , "600.000"   ),
            new Character(3, "images/anya.jpg"   , "Anya Forger"     , "Female" , "2015-12-27"  , "Spy x Family"    , "450.000"    ),
            new Character(4, "images/denji.jpg"  , "Denji"           , "Male"   , "2007-03-15"  , "Chainsaw Man"    , "1.000.000"   ),
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

function checkEmpty(value) {
    return value == null || value.trim() == '';
}

function createCharacter(){
    let id = getMaxId() + 1;
    let avatar = document.querySelector("#avatar").value; 
    let fullname = document.querySelector("#fullname").value; 
    let gender = document.querySelector("#gender").value; 
    let dob = document.querySelector("#dob").value; 
    let anime = document.querySelector("#anime").value; 
    let costume_price = document.querySelector("#costume-price").value;
    
    if (checkEmpty(avatar) || checkEmpty(fullname) || checkEmpty(gender) || checkEmpty(dob) || checkEmpty(anime) || checkEmpty(costume_price)){
        alert("Please enter full infomation");
        return;
    }

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

function updateCustomer() {
    alert("ok")
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



// Festival

class Festival {
    constructor(id, name, date, price, sold){
        this.id = id;
        this.name = name;
        this.date = date;
        this.price = price;
        this.sold = sold;
    }
}

var festivals=[]

const festival_db = "festival_db"
function init2(){   
    if(localStorage.getItem(festival_db) == null){
        festivals = [
            new Festival(0  ,   "Lễ hội giao lưu văn hoá Việt - Nhật "  , "27.12-28.12.2022" , "150.000", "1.5k sold"),
            new Festival(1  ,   "Lễ hội giao lưu văn hoá Việt - Nhật 2"  , "01.01-03.01.2023" , "200.000", "2k sold"),
            new Festival(2  ,   "Lễ hội giao lưu văn hoá Việt - Nhật 3"  , "24.05-27.05.2023" , "300.000", "3k sold"),
            new Festival(3  ,   "Lễ hội giao lưu văn hoá Việt - Nhật 4"  , "10.10-13.10.2023" , "400.000", "4k sold"),
            new Festival(4  ,   ""  , "", "", ""),
        ]
        localStorage.setItem(festival_db, JSON.stringify(festivals))
    }
    else {
        festivals = JSON.parse(localStorage.getItem(festival_db));
    }
}


function renderFestival(){
    let htmls = festivals.map(function(fes){
        return   `
                    <div class="fes-tr" id="fes_${fes.id}">
                        <div class="fes-td1">
                        ${fes.name}
                        </div>
                        <div class="fes-td5">
                        ${fes.date}
                        </div>
                        <div class="fes-td2">
                        ${fes.price}
                        </div>
                        <div class="fes-td3">
                        ${fes.sold}
                        </div>
                        <div class="fes-td4" >
                            <input type="text" class="d-none">
                            <i class="fa-solid fa-square-check d-none" onclick="confirmEditFestival()"></i>
                            <i class="fa-solid fa-square-xmark d-none" onclick="cancelEditFestival()"></i>
                            <i class="fa-solid fa-pen-to-square" onclick="editFestival(${fes.id})"></i>
                            <i class="fa-solid fa-trash" onclick="deleteFestival(${fes.id})"></i>
                        </div>
                    </div>
                `
    })
    document.querySelector(`.festival-list`).innerHTML = htmls.join("")
}

function editFestival(festivalId){
    let festival = festivals.find(function (festival) {
        return festival.id == festivalId;
    })

    document.querySelector('#festivalId').value = festival.id;

    document.querySelector(`#fes_${festivalId} .fes-td1`).innerHTML = `<input type="text" class="input-festival input-festival-name"    value="${festival.name}"    placeholder="Festival Name">`
    document.querySelector(`#fes_${festivalId} .fes-td5`).innerHTML = `<input type="text" class="input-festival input-festival-date"    value="${festival.date}"    placeholder="dd.mm-dd.mm.yyyy">`
    document.querySelector(`#fes_${festivalId} .fes-td2`).innerHTML = `<input type="text" class="input-festival input-festival-price"   value="${festival.price}"   placeholder="Price">`
    document.querySelector(`#fes_${festivalId} .fes-td3`).innerHTML = `<input type="text" class="input-festival input-festival-sold"    value="${festival.sold}"    placeholder="Total Sold">`
    
    document.querySelector(`#fes_${festivalId} .fa-square-check`).classList.toggle('d-none')
    document.querySelector(`#fes_${festivalId} .fa-square-xmark`).classList.toggle('d-none')
    document.querySelector(`#fes_${festivalId} .fa-pen-to-square`).classList.toggle('d-none')

}

function confirmEditFestival(){
    let festivalId = document.querySelector('#festivalId').value;
    let festival = festivals.find(function (festival) {
        return festival.id == festivalId;
    })
    let inputFestivalName = document.querySelector(`#fes_${festivalId} .fes-td1 .input-festival-name`).value;
    let inputFestivalDate = document.querySelector(`#fes_${festivalId} .fes-td5 .input-festival-date`).value;
    let inputFestivalPrice = document.querySelector(`#fes_${festivalId} .fes-td2 .input-festival-price`).value;
    let inputFestivalSold = document.querySelector(`#fes_${festivalId} .fes-td3 .input-festival-sold`).value;

    if (checkEmpty(inputFestivalName) || checkEmpty(inputFestivalPrice) || checkEmpty(inputFestivalSold) || checkEmpty(inputFestivalDate)){
        alert("Please enter full infomation");
        return;
    }

    festival.name = inputFestivalName;
    festival.date = inputFestivalDate;
    festival.price = inputFestivalPrice;
    festival.sold = inputFestivalSold;
    
    inputFestivalName  = document.querySelector(`#fes_${festivalId} .fes-td1`).innerHTML;
    inputFestivalDate  = document.querySelector(`#fes_${festivalId} .fes-td5`).innerHTML;
    inputFestivalPrice = document.querySelector(`#fes_${festivalId} .fes-td2`).innerHTML;
    inputFestivalSold  = document.querySelector(`#fes_${festivalId} .fes-td3`).innerHTML;
    
    document.querySelector(`#fes_${festivalId} .fa-square-check`).classList.toggle('d-none')
    document.querySelector(`#fes_${festivalId} .fa-square-xmark`).classList.toggle('d-none')
    document.querySelector(`#fes_${festivalId} .fa-pen-to-square`).classList.toggle('d-none')

    addFestivalList(festivalId)
    localStorage.setItem(festival_db, JSON.stringify(festivals));
    renderFestival();

    console.log(festivals);
}

function cancelEditFestival(){
    let festivalId = document.querySelector('#festivalId').value;
    let festival = festivals.find(function (festival) {
        return festival.id == festivalId;
    })
    
    document.querySelector(`#fes_${festivalId} .fa-square-check`).classList.toggle('d-none')
    document.querySelector(`#fes_${festivalId} .fa-square-xmark`).classList.toggle('d-none')
    document.querySelector(`#fes_${festivalId} .fa-pen-to-square`).classList.toggle('d-none')

    document.querySelector(`#fes_${festivalId} .fes-td1`).innerHTML = festival.name;
    document.querySelector(`#fes_${festivalId} .fes-td5`).innerHTML = festival.date;
    document.querySelector(`#fes_${festivalId} .fes-td2`).innerHTML = festival.price;
    document.querySelector(`#fes_${festivalId} .fes-td3`).innerHTML = festival.sold;

}

function deleteFestival(idDelete){
    let confirmed = window.confirm("Are you sure to remove this festival?");
    if (confirmed) {
        for (let id of festivals) {
            festivals = festivals.filter(function (festival) {
                return festival.id != idDelete;
            })
        }
        localStorage.setItem(festival_db, JSON.stringify(festivals));
        renderFestival();
    }

}

function addFestivalList(index){
    if (index == getIdMaxFestival()) {
        festivals.push(new Festival( getIdMaxFestival() + 1 ,   ""  , "", "",""));
        localStorage.setItem(festival_db, JSON.stringify(festivals));
        renderFestival();
    }
}

function getIdMaxFestival(){
    let max = 0;
    for (let i = 0; i < festivals.length; i++){
        if (festivals[i].id > max) {
            max = festivals[i].id
        }
    }
    return max;
}

// Phần shop//
class Shop {
    constructor(id, name, avatar, link) {
        this.id = id;
        this.name = name;
        this.avatar = avatar;
        this.link = link;
    }
}

var shops = []

const shop_db = "shop_db";
function init3(){
    if (localStorage.getItem(shop_db) == null){
        shops = [
            new Shop(0, "Otaku Store"       , "images/shop/otakustore.jpg"      , "https://otakustore.vn/"                            ),
            new Shop(1, "Phụ kiện One Piece", "images/shop/phukienonepiece.jpg" , "https://www.facebook.com/phukienonepiece"          ),
            new Shop(2, "Inox4u"            , "images/shop/inox4u.png"          , "https://www.facebook.com/inox4u"                   ),
            new Shop(3, "Shopee"            , "images/shop/shopee.jpg"          , "https://shopee.vn/"                                ),
            new Shop(4, "Tiki"              , "images/shop/tiki.jpg"            , "https://tiki.vn/"                                ),
        ]
        localStorage.setItem(shop_db, JSON.stringify(shops))
    } else {
        shops = JSON.parse(localStorage.getItem(shop_db));
    }
}

function renderShop(){
    let htmls = shops.map(function(shop){
        return  `
                <div class="shop-div">
                    <div class="shop-coverContent">
                        <a href="${shop.link}" style="text-decoration: none" target="_blank">
                        <div class="shop-avatar">
                            <img src="${shop.avatar}" alt="">
                        </div>
                        </a>
                        <div class="shop-nameAndDelete">
                            <div class="shop-name">
                                <p>${shop.name}</p>
                            </div>
                            <div class="shop-delete">
                                <i class="fa-solid fa-trash" onclick="deleteShop(${shop.id})"></i>
                            </div>
                        </div>
                    </div>
                </div>
                `
    })
    document.querySelector(".shop-displayshop").innerHTML = htmls.join("")
}

function changeShopAvatar(){
    let avatarUrl = document.querySelector("#shop-inputAvatar").value;
    if (avatarUrl != null && avatarUrl != "") {
        document.querySelector('#shop-review-avatar').src = avatarUrl;
    }
    else {
        document.querySelector('#shop-review-avatar').src = "images/shop/shopnoavatar.jpg"
    }
}

function getShopMaxId(){
    let max = 0;
    for (let i = 0; i < shops.length; i++){
        if (shops[i].id > max ) {
            max = shops[i].id
        }
    }
    return max;
}

function addShop(){
    document.querySelector(".shop-inputBg").classList.toggle("d-none")
}

function deleteShop(idShopDelete){
    let confirmed = window.confirm("Are you sure to remove this shop?");
    if (confirmed) {
        for (let id of shops) {
            shops = shops.filter(function (shop) {
                return shop.id != idShopDelete;
            })
        }
        localStorage.setItem(shop_db, JSON.stringify(shops));
        renderShop();
    }
}

function confirmShopAdd(){
    let id = getShopMaxId() + 1;
    let name = document.querySelector("#shop-inputName").value;
    let avatar = document.querySelector("#shop-inputAvatar").value;
    let link = document.querySelector("#shop-inputLink").value;
    
    if (checkEmpty(name) || checkEmpty(avatar) || checkEmpty(link)){
        alert("Please enter full infomation");
        return;
    }

    shops.push(new Shop(id, name, avatar, link));
    localStorage.setItem(shop_db, JSON.stringify(shops));
    renderShop();
    cancelShopAdd();
    
}

function cancelShopAdd(){
    document.querySelector(".shop-inputBg").classList.toggle("d-none");
    resetShopForm()
}

function resetShopForm(){
    document.querySelector("#shop-inputName").value = "";
    document.querySelector("#shop-inputAvatar").value = "";
    document.querySelector("#shop-inputLink").value = "";
    document.querySelector('#shop-review-avatar').src = "images/shop/shopnoavatar.jpg";
    renderShop();
}

// function toVndMoney(){
    //     characters.map(function(number){
    //         return number.costume_price = new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(number.costume_price);
    //     });
    //     festivals.map(function(fes){
    //         return fes.price = new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(fes.price);
    //     });
    // }    


//Run
function ready(){
    
    init()
    renderGender()
    renderCharacter(false)
    sort('arc')

    init2()  
    renderFestival()

    init3()
    renderShop()
}

ready()
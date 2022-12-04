
const number = 123456.789;

// console.log(new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(number));
// expected output: "123.457 ₫"

new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(number)

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
characters = [
    new Character(1, "images/ken.jpg"    , "Ken Kaneki"      , "Male"   , "2000-10-20"  , "Tokyo Ghoul"     , 500000    ),
    new Character(2, "images/touka.png"  , "Touka Kirishima" , "Female" , "2002-01-01"  , "Tokyo Ghoul"     , 600000    ),
    new Character(3, "images/anya.jpg"   , "Anya Forger"     , "Female" , "2015-12-27"  , "Spy x Family"    , 450000    ),
    new Character(4, "images/denji.jpg"  , "Denji"           , "Male"   , "2007-03-15"  , "Chainsaw Man"    , 1000000   ),
]

characters.map(function(number, index){
    // console.log(typeof(new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(number.costume_price)));
    return number.costume_price = new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(number.costume_price);
})
console.log(characters[0].costume_price);
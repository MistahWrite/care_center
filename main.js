let favorites_affirmations = [];
let favorites_mantras = [];

window.onload=function() {
    console.log("window.onload function()");
    let receiveMessageBtn = document.getElementById("receiveMessage");
    receiveMessageBtn.addEventListener("click", receiveMessage);

    let viewFavoritesBtn = document.getElementById("viewFavorites");
    viewFavoritesBtn.addEventListener("click", viewFavorites);

}

let quotes_affirmations = ["In the beginning it is you, in the middle it is you, and in the end it is you.",
"I forgive myself and set myself free.",
"I believe I can be all that I want to be.",
"I am in the process of becoming the best version of myself.",
"I have the freedom & power to create the life I desire.",
"I choose to be kind to myself and love myself unconditionally.",
"My possibilities are endless.",
"I am worthy of my dreams.",
"I am enough. ",
"I deserve to be healthy and feel good.",
"I am full of energy and vitality and my mind is calm and peaceful.",
"Every day I am getting healthier and stronger.",
"I honor my body by trusting the signals that it sends me.",
"I manifest perfect health by making smart choices."]

let quotes_mantras = ["Breathing in, I send myself love. Breathing out, I send love to someone else who needs it.",
"Don’t let yesterday take up too much of today.",
"Every day is a second chance.",
"Tell the truth and love everyone.", 
"I am free from sadness.",
"I am enough.",
"In the beginning it is you, in the middle it is you and in the end it is you.",
"I love myself.",
"I am present now.",
"Inhale the future, exhale the past.",
"This too shall pass.",
"Yesterday is not today.",
"The only constant is change.",
"Onward and upward.",
"I am the sky, the rest is weather."];

function getQuote() {
    let favorite = getFavorite();
    let index = 0;
    let affirmation = document.getElementsByName("type");
    if(affirmation[0].checked) {
        console.log("affirmation");
        favorite = getFavorite(index, true);
        index = Math.floor(Math.random() * (quotes_affirmations.length));
        return quotes_affirmations[index] + favorite;
    } else {
        console.log("mantra");
        index = Math.floor(Math.random() * (quotes_mantras.length));
        favorite = getFavorite(index, false);
        return quotes_mantras[index] + favorite;
    }
}
function receiveMessage(){
    console.log("receiveMessage()");
    let message = document.getElementById("message");
    let quote = getQuote();
    message.innerHTML = quote;
}

function getFavorite(index, affirmation) {
    if (affirmation) {
        getFavoritesAffirmations(index);
        if(favorites_affirmations[index]) {
            return "<div id='favorite'><a href='#' onclick='unfavorite(" + index + "," + affirmation + ")'><a href='#' onclick='unfavorite(" + index + "," + affirmation + ")'><img src='assets/favorite.png' height='40' width='40'></a></div>";
        } else {
            return "<div id='favorite'><a href='#' onclick='favorite(" + index + "," + affirmation + ")'><a href='#' onclick='favorite(" + index + "," + affirmation + ")'><img src='assets/unfavorite.png' height='40' width='40'></a></div>";
        }
    } else {
        getFavoritesMantras(index);
        if(favorites_mantras[index]) {
            return "<div id='favorite'><a href='#' onclick='unfavorite(" + index + "," + affirmation + ")'><a href='#' onclick='unfavorite(" + index + "," + affirmation + ")'><img src='assets/favorite.png' height='40' width='40'></a></div>";
        } else {
            return "<div id='favorite'><a href='#' onclick='favorite(" + index + "," + affirmation + ")'><a href='#' onclick='favorite(" + index + "," + affirmation + ")'><img src='assets/unfavorite.png' height='40' width='40'></a></div>";
        }
    }
}
function favorite(index,affirmation){
    console.log("favorite()");
    if(affirmation){
        setFavoritesAffirmations(index, true);
    } else {
        setFavoritesMantras(index, true);}
    
    let favorite = document.getElementById("favorite");
    favorite.innerHTML = "<a href='#' onclick='unfavorite(" + index + "," + affirmation + ")'><img src='assets/favorite.png' height='40' width='40'></a>";
}

function unfavorite(index,affirmation) {
    console.log("unfavorite()");
    if(affirmation){
        setFavoritesAffirmations(index, false);
    } else {
        setFavoritesMantras(index, false);
    }
    let favorite = document.getElementById("favorite");
    favorite.innerHTML = "<a href='#' onclick='favorite(" + index + "," + affirmation + ")'><img src='assets/unfavorite.png' height='40' width='40'></a>";
}

function setFavoritesAffirmations(index, value) {
    console.log("setFavoritesAffirmations(" + index + ", " + value + ")");
    favorites_affirmations[index] = value;
    var local = localStorage.setItem('favorites_affirmations[' + index + ']', value);
}
function setFavoritesMantras(index, value) {
    console.log("setFavoritesMantras(" + index + ", " + value + ")");
    favorites_mantras[index] = value;
    var local = localStorage.setItem('favorites_mantras[' + index + ']', value);
}
function getFavoritesAffirmations(index) {
    console.log("getFavoritesAffirmations(" + index + ")");
    var recvdValue = localStorage.getItem('favorites_affirmations[' + index + ']');
    console.log("getFavoritesAffirmations() recvdValue = " + recvdValue);
    favorites_mantras[index] = recvdValue;
    return recvdValue;
}
function getFavoritesMantras(index){
    console.log("getFavoritesMantras(" + index + ")");
    var recvdValue = localStorage.getItem('favorites_mantras[' + index + ']');
    console.log("getFavoritesMantras() recvdValue = " + recvdValue);
    favorites_mantras[index] = recvdValue;
    return recvdValue;
}
function viewFavorites() {
    console.log("viewFavorites()");
    var favoritesDIV = document.getElementById("favorites");
    
    favoritesDIV.innerHTML = "<h3>Affirmations</h3>";
    for(var i = 0; i < quotes_affirmations.length; i++) {
        console.log(quotes_affirmations[i]);
        if(getFavoritesAffirmations(i)) {
            favoritesDIV.innerHTML += quotes_affirmations[i] + "<br/>";
        }
    }

    favoritesDIV.innerHTML += "<h3>Mantras</h3>";
    for(var i = 0; i < quotes_mantras.length; i++) {
        console.log(quotes_mantras[i]);
        if(getFavoritesMantras(i)) {
            favoritesDIV.innerHTML += quotes_mantras[i] + "<br/>";
        }
    }
}
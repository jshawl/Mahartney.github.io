var cardDeck = [
  {"Question One" :"Answer One"},
  {"Question Two" :"Answer Two"},
  {"Question Three" :"Answer Three"},
  {"Question Four" : "Answer Four"},
];
var cardCount = Object.keys(cardDeck).length
var cardSolution = "";
var cardQuestion = "";
var cardSuggestions = [];
var currentCard = 0;

//Create Flashcard out of two inputs
var addQuestion = function(evt){
  evt.preventDefault();
  var question = $(".add > .question");
  var answer = $(".add > .answer");
  if (question.val()==""||answer.val()=="") {
    alert("Please enter both a valid question and answer")
  } else {
    cardDeck[question.val()] = answer.val();
    var cardCount = Object.keys(cardDeck).length;
    $("h2").html("You are on card " +currentCard +" of " + cardCount);
    question.val("");
    answer.val("");
    currentCard ++;
    $(".question").focus();
  }
}

//Change focus and start dealing
var shuffleAndDeal = function(evt){
  evt.preventDefault();
  if (Object.keys(cardDeck).length<4){
    $(".deal>p").html("You must submit more than 4 cards before dealing the deck.")
  } else {
    showCard()
  }
}
//start or flip through card deck
var showCard = function(){
  randomSelect();
  addSuggestions();
}
//select a random key/pair
var randomSelect = function(){
  $(".solution").addClass("hidden");
  $(".suggestions").addClass("hidden");
  rand = Math.floor(Math.random()*Object.keys(cardDeck).length);
  cardQuestion = Object.keys(cardDeck)[rand];
  cardSolution = cardDeck[cardQuestion];
  currentCard = rand+1
  $("h2").html("You are on card " +currentCard +" of " + cardCount);
  $("p").html(cardQuestion);
  $(".solutionadd").html(cardSolution);
  var tempDeck = jQuery.extend(true, {}, cardDeck)
  delete tempDeck[cardQuestion];
  for (var i = 0; i <3; i++) {
    cardSuggestions.push(tempDeck[Object.keys(tempDeck)[i]]);
  };
  cardSuggestions.push(cardSolution);
  shuffle(cardSuggestions);
}

var addSuggestions = function(){
  var testUl = $("<ul></ul>")
  for (var i = 0; i < cardSuggestions.length; i++) {
    $(testUl).append("<li>"+cardSuggestions[i]+"</li>")
  }
  $(".suggestions").html(testUl)
  console.log(cardSuggestions)
  cardSuggestions=[]
}

//nav button to start Add mode
var showAdd = function(evt){
  evt.preventDefault();
  $(".add").removeClass("hidden");
  $("#add").addClass("selected")
  $(".deal").addClass("hidden");
  $("#deal").removeClass("selected");
  $('#delete').html("Delete Card");
  var question = $(".add > .question");
  var answer = $(".add > .answer");
  question.val(Object.keys(cardDeck)[currentCard-1]);
  answer.val(cardDeck[Object.keys(cardDeck)[currentCard-1]]);
}

//nav button to start Deal mode
var showDeal = function(evt){
  evt.preventDefault();
  $(".deal").removeClass("hidden");
  $(".add").addClass("hidden");
  $("#deal").addClass("selected");
  $("#add").removeClass("selected");
  $("#delete").html("Get Random Card");
  cardCount = Object.keys(cardDeck).length;
  $("h2").html("You are on card " +currentCard +" of " + cardCount);
}

//Fisher-Yates (aka Knuth) Shuffle.
function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex ;
  // While there remain elements to shuffle...
  while (0 !== currentIndex) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
}

var showSolution = function(){
  if ($(".solution").hasClass("hidden")){
    $(".solution").removeClass("hidden")
  } else {
    $(".solution").addClass("hidden")
  }
}

var showSuggestions = function(){
  if ($(".suggestions").hasClass("hidden")){
    $(".suggestions").removeClass("hidden")
  } else {
    $(".suggestions").addClass("hidden")
  }
}

var cycleLeft = function(evt){
  evt.preventDefault();
  if (!$("#deal").hasClass("selected")){
    var question = $(".add > .question");
    var answer = $(".add > .answer");
    if (currentCard <= 0) {
      currentCard = 0;
    } else {
      currentCard --;
      question.val(Object.keys(cardDeck)[currentCard-1]);
      answer.val(cardDeck[Object.keys(cardDeck)[currentCard-1]]);
      $("h2").html("You are on card " +currentCard +" of " + cardCount);
    }
  } else {
    if (currentCard > 1) {
      $(".solution").addClass("hidden");
      $(".suggestions").addClass("hidden");
      currentCard --;
      cardQuestion = Object.keys(cardDeck)[currentCard-1];
      cardSolution = cardDeck[cardQuestion];
      $("h2").html("You are on card " + currentCard +" of " + cardCount);
      $("p").html(cardQuestion);
      $(".solutionadd").html(cardSolution);
      var tempDeck = jQuery.extend(true, {}, cardDeck)
      delete tempDeck[cardQuestion];
      for (var i = 0; i <3; i++) {
        cardSuggestions.push(tempDeck[Object.keys(tempDeck)[i]]);
      };
      cardSuggestions.push(cardSolution);
      shuffle(cardSuggestions);
    }
  }
}

var cycleRight = function(evt){
  evt.preventDefault();
  if (!$("#deal").hasClass("selected")){
    var question = $(".add > .question");
    var answer = $(".add > .answer");
    if (currentCard >= Object.keys(cardDeck).length) {
      currentCard = Object.keys(cardDeck).length;
    } else {
      question.val(Object.keys(cardDeck)[currentCard]);
      answer.val(cardDeck[Object.keys(cardDeck)[currentCard]]);
      currentCard ++;
    }
    $("h2").html("You are on card " +currentCard +" of " + cardCount);
  } else {
    if (currentCard< cardCount) {
      $(".solution").addClass("hidden");
      $(".suggestions").addClass("hidden");
      cardQuestion = Object.keys(cardDeck)[currentCard];
      cardSolution = cardDeck[cardQuestion];
      currentCard ++;
      $("h2").html("You are on card " + currentCard +" of " + cardCount);
      $("p").html(cardQuestion);
      $(".solutionadd").html(cardSolution);
      var tempDeck = jQuery.extend(true, {}, cardDeck)
      delete tempDeck[cardQuestion];
      for (var i = 0; i <3; i++) {
        cardSuggestions.push(tempDeck[Object.keys(tempDeck)[i]]);
      };
      cardSuggestions.push(cardSolution);
      shuffle(cardSuggestions);
    }
  }
}

var deleteCard = function(evt){
  evt.preventDefault();
  if (!$("#deal").hasClass("selected")){
    var question = $(".add > .question");
    var answer = $(".add > .answer");
    delete cardDeck[Object.keys(cardDeck)[currentCard]];
    currentCard --;
    cardCount = Object.keys(cardDeck).length
    $("h2").html("You are on card " +currentCard +" of " + cardCount);
    question.val(Object.keys(cardDeck)[currentCard-1]);
    answer.val(cardDeck[Object.keys(cardDeck)[currentCard-1]]);
  }
  randomSelect();
}

$("#delete").on('click',deleteCard)
$("#left_arrow").on('click',cycleLeft)
$("#right_arrow").on('click',cycleRight)
$("#nextCard").on('click',showCard)
$("#h3solution").on('click',showSolution);
$("#h3suggestion").on('click',showSuggestions);
$("h2").html("You are on card " +currentCard +" of " + cardCount);
$("#add").on('click',showAdd);
$("#deal").on('click',showDeal);
$(".nav>#deal").on('click',shuffleAndDeal);
$(".addButton").on("click",addQuestion);

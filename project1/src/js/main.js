var decksMaster=[{EmptyDeck:{}},
  {"Washington Redskins": {
    "#88":"Pierre Garcon",
    "#14":"Ryan Grant",
    "#71":"Trent Williams",
    "#76":"Morgan Moses",
    "#86":"Jordan Reed",
    "#11":"DeSean Jackson",
    "#91":"Ryan Kerrigan",
    "#52":"Keenan Robinson",
    "#26":"Bashaud Breeland",
    "#46":"Alfred Morris",
    "#8":"Kirk Cousins",
    "#12":"Andre Roberts",
    "#23":"Deangelo Hall",
    "#93":"Trent Murphy",
  }},
  {"Animals Genus": {
    "Cheetah":"Acinynox jubatus",
    "Impala":"Aepyceros mylampus",
    "Moose":"Alces alces",
    "Arctic Fox":"Alopex Lagopus",
    "Red Howler Monkey":"Alouatta seniculus",
    "Snow goose":"Answer caerulescens",
    "Roan antelope": "Hippotragus equinus",
    "Chimpanzee":"Pan troglodytes",
    "Asian lion":"Panthera leo persica",
    "Osprey":"Pandon haliaetus",
    "Polar bear":"Ursus maritimus",
    "Wombat":"Vombatus ursinus",
    "Manatee":"Trichechus inunguis",
    "Bateleur eagle":"Terathopius ecaudatus",
    "Wild boar":"Sus scrofa",
    "King vulture":"Sarcorhamphus papa",
    "Tasmanian devil":"Sarcophilus harrisii",
    "Harbor seal":"Phoca vitulina",
    "Platypus":"Ornithorhynchus anatinus",
    "Painted stork":"Mycteria leucocephala",
  }},
];
var loadNames=[];
var cardDeck = {
  "Question One" :"Answer One",
  "Question Two" :"Answer Two",
  "Question Three" :"Answer Three",
  "Question Four" : "Answer Four",
};
var cardCount = Object.keys(cardDeck).length
var cardSolution = "";
var cardQuestion = "";
var cardSuggestions = [];
var currentCard = 0;
var loadDeckX
var NewDeck = {}

var saveDeck = function(){
  var saveName = $("#savename").val();
  if (saveName=="") {
    alert("Please enter valid name")
  } else {
  console.log(saveName)
  var question = $(".add > .question");
  var answer = $(".add > .answer");
  var dropDown= $(".dropdown");
  var tempDeck = cardDeck;
  var deckToSave = {};
  deckToSave[saveName] = tempDeck;
  if ($.grep(decksMaster, function(e){ return e[saveName]}).length>0) {
    //is not saving over
    console.log(deckToSave)
    decksMaster[decksMaster.indexOf($.grep(decksMaster, function(e){ return e[saveName] }))] = deckToSave;
    console.log(decksMaster[decksMaster.indexOf($.grep(decksMaster, function(e){ return e[saveName] }))])
    popLoadMenu()
  } else {
    console.log("This Ran")
    loadNames.unshift(saveName)
    decksMaster.unshift(deckToSave);
    //cardDeck=[]
    //question.val("");
    //answer.val("");
    //var cardCount = Object.keys(cardDeck).length;
    //$("h2").html("You are on card " + currentCard +" of " + cardCount);
    //currentCard = 0;
    popLoadMenu()
  }
  }
}

var popLoadMenu = function(){
  $("#loadname").html('<li class="headerli">EmptyDeck</li>')
  $("#loadname").append('<li class="headerli">Washington Redskins</li>')
  $("#loadname").append('<li class="headerli">Animals Genus</li>')
  for( i=0;i<loadNames.length;i++) {
      $("#loadname").append('<li class="headerli">'+loadNames[i]+ '</li>')
    }
  $(".headerli").on('click',loadDeck)
}

var loadDeck = function(evt){
  evt.preventDefault;
  self = this
  loadDeckX = $(self).html()
  $("#savename").val(loadDeckX)
  console.log(loadDeckX)
  var testFunction = function(e){
    console.log("inside function" + loadDeckX)
    return e[loadDeckX];
  };
  cardDeckToLoad = $.grep(decksMaster, testFunction);
  cardDeck = cardDeckToLoad[Object.keys(cardDeckToLoad)][loadDeckX]
  $("#loadbutton").removeClass("hidden");
  $("#loadname").addClass("hidden");
  var cardCount = Object.keys(cardDeck).length;
  currentCard = 0;
  $("h2").html("You are on card " + currentCard +" of " + cardCount);
  $("#loadbutton").removeClass("hidden")
  $("#savename").val("")
}

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
    $("h2").html("You are on card " + currentCard +" of " + cardCount);
    question.val("");
    answer.val("");
    $(".question").focus();
    addReadOnlyA()
    addReadOnlyQ()
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
  console.log("Random Select Ran")
  $(".solution").addClass("hidden");
  $(".suggestions").addClass("hidden");
  rand = Math.floor(Math.random()*Object.keys(cardDeck).length);
  cardQuestion = Object.keys(cardDeck)[rand];
  cardSolution = cardDeck[cardQuestion];
  currentCard = rand+1
  $("h2").html("You are on card " +currentCard +" of " + cardCount);
  $("#hquestion").val(cardQuestion);
  $("#hsolution").val(cardSolution);
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
  addReadOnlyA()
  addReadOnlyQ()
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
  if ($("#hsolution").hasClass("hidden")){
    $("#hsolution").removeClass("hidden")
    $("#hquestion").addClass("hidden");
  } else {
    $("#hsolution").addClass("hidden");
    $("#hquestion").removeClass("hidden")
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
  if (evt == "") {
  evt.preventDefault();
  }
  var cardCount = Object.keys(cardDeck).length
  if (!$("#deal").hasClass("selected")){
    var question = $(".add > .question");
    var answer = $(".add > .answer");
    if (currentCard <= 0) {
      currentCard = cardCount;
      $("h2").html("You are on card " + currentCard +" of " + cardCount);
      question.val(Object.keys(cardDeck)[currentCard-1]);
      answer.val(cardDeck[Object.keys(cardDeck)[currentCard-1]]);
      addReadOnlyA()
      addReadOnlyQ()
    } else {
      currentCard --;
      question.val(Object.keys(cardDeck)[currentCard-1]);
      answer.val(cardDeck[Object.keys(cardDeck)[currentCard-1]]);
      $("h2").html("You are on card " +currentCard +" of " + cardCount);
      addReadOnlyA()
      addReadOnlyQ()
    }
  } else {
    if (currentCard > 1) {
      $("#hsolution").addClass("hidden");
      $("#hquestion").removeClass("hidden");
      $(".suggestions").addClass("hidden");
      currentCard --;
      cardQuestion = Object.keys(cardDeck)[currentCard-1];
      cardSolution = cardDeck[cardQuestion];
      $("h2").html("You are on card " + currentCard +" of " + cardCount);
      $("#hquestion").val(cardQuestion);
      $("#hsolution").val(cardSolution);
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

var cycleDown = function(evt) {
  if (evt == "") {
  evt.preventDefault();
  }
  if (!$("#deal").hasClass("selected")){
    var question = $(".add > .question");
    var answer = $(".add > .answer");
    var cardCount = Object.keys(cardDeck).length;
    question.val("");
    answer.val("");
    currentCard = 0;
    $("h2").html("You are on card " + currentCard +" of " + cardCount);
    addReadOnlyA()
    addReadOnlyQ()
  } else {
    showSolution();
  }
}

var cycleRight = function(evt) {
  if (evt == "") {
  evt.preventDefault();
  }
  var cardCount = Object.keys(cardDeck).length
  if (!$("#deal").hasClass("selected")){
    var question = $(".add > .question");
    var answer = $(".add > .answer");
    var cardCount = Object.keys(cardDeck).length;
    if (currentCard >= Object.keys(cardDeck).length) {
      currentCard = 0;
      question.val("");
      answer.val("");
      $("h2").html("You are on card " + currentCard +" of " + cardCount);
    } else {
      question.val(Object.keys(cardDeck)[currentCard]);
      answer.val(cardDeck[Object.keys(cardDeck)[currentCard]]);
      currentCard ++;
    }
    $("h2").html("You are on card " + currentCard +" of " + cardCount);
    addReadOnlyA()
    addReadOnlyQ()
  } else {
    if (currentCard< cardCount) {
      $("#hsolution").addClass("hidden");
      $("#hquestion").removeClass("hidden");
      $(".suggestions").addClass("hidden");
      cardQuestion = Object.keys(cardDeck)[currentCard];
      cardSolution = cardDeck[cardQuestion];
      currentCard ++;
      $("h2").html("You are on card " + currentCard +" of " + cardCount);
      $("#hquestion").val(cardQuestion);
      $("#hsolution").val(cardSolution);
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

var cycleUp = function(evt) {
  if (evt == "") {
  evt.preventDefault();
  }
  if (!$("#deal").hasClass("selected")){
    var question = $(".add > .question");
    var answer = $(".add > .answer");
    var cardCount = Object.keys(cardDeck).length;
    question.val(Object.keys(cardDeck)[cardCount-1]);
    answer.val(cardDeck[Object.keys(cardDeck)[cardCount-1]]);
    currentCard = cardCount;
    $("h2").html("You are on card " + currentCard +" of " + cardCount);
    addReadOnlyA()
    addReadOnlyQ()
  } else {
    showSuggestions();
  }
}

var deleteCard = function(evt){
  evt.preventDefault();
  if (!$("#deal").hasClass("selected")){
    if (currentCard==0) {

    } else {
      console.log("Delete Card Ran")
      var question = $(".add > .question");
      var answer = $(".add > .answer");
      delete cardDeck[Object.keys(cardDeck)[currentCard-1]];
      cardCount = Object.keys(cardDeck).length;
      currentCard --;
      question.val(Object.keys(cardDeck)[currentCard-1]);
      answer.val(cardDeck[Object.keys(cardDeck)[currentCard-1]]);
      $("h2").html("You are on card " + currentCard + " of " + cardCount);
      addReadOnlyA()
      addReadOnlyQ()
    }
  } else {
    randomSelect();
  }
}

var addReadOnlyQ = function(){
  if (currentCard>0) {
    $(".question").attr('readonly', true);
  } else {
    $(".question").attr('readonly', false);
  }
}

var addReadOnlyA = function(){
  if (currentCard>0) {
    $(".answer").attr('readonly', true);
  } else {
    $(".answer").attr('readonly', false);
  }
}

var showLoads = function(){
  if (decksMaster.length === 1) {
    alert("You have no decks to load");
  } else {
    $("#loadbutton").addClass("hidden")
    $("#loadname").removeClass("hidden")
  }
}

$("#loadbutton").on('click',showLoads)
$("#savebutton").on('click',saveDeck)
$("#delete").on('click',deleteCard)
$("#left_arrow").on('click',cycleLeft)
$("#right_arrow").on('click',cycleRight)
$("#flip_card").on('click',cycleDown)
$("#drop_suggestions").on('click',cycleUp)
$("#nextCard").on('click',showCard)
$("#h3suggestion").on('click',showSuggestions);
$("h2").html("You are on card " +currentCard +" of " + cardCount);
$("#add").on('click',showAdd);
$("#deal").on('click',showDeal);
$(".nav>#deal").on('click',shuffleAndDeal);
$(".addButton").on("click",addQuestion);
$(document).change(addReadOnlyQ);
$(document).change(addReadOnlyA);

//From stackoverflow
$(document).keydown(function(e) {
    switch(e.which) {
        case 37: // left
        cycleLeft();
        break;
        case 38:
        cycleUp();// up
        break;
        case 39: // right
        cycleRight();
        break;
        case 40: // down
        cycleDown()
        break;
        default: return; // exit this handler for other keys
    }
    e.preventDefault(); // prevent the default action (scroll / move caret)
});

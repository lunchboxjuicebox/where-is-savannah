$(document).ready(function(){
    $('div.app.messages').click(openMessagesApp);
    $('#messages-page > div > button').click(closeMessagesApp);
    initializeMessagesApp();
})

function openMessagesApp(){
    $('.messages-overlay').css("display","block");
}

function closeMessagesApp(){
    $('.messages-overlay').css("display","none");
}

function initializeMessagesApp(){
    $('.stack-message').click(handleMessageClick);
    $('.person-back-button').click(closePersonMessages);
}

var people = ['Ellis', 'Derrick', 'Mom', 'Amayah', 'Sydney', 'Leah', 'Christopher', 'Jalissa'];
var contactPhotos = [];
//var text = ['Hey you wanna go to the beach?', 'OMG you won\'t believe what happened to me', 'When do you plan on starting the next project?', 'Hello??', 'I don\'t know, was kinda hoping you would', 'TACOS lets goooo', 'Alright, officially over this breakup', 'can we switch cars this weekend?'];

function createTextMessages(){
    for(t=0; t<people.length; t++){
        var divStackMessage = "<div class='stack-message " + people[t].toLowerCase() + "'></div>";
        var divContactPhoto = "<div class='contact-photo'></div>";
        divStackMessage = $(divStackMessage).append(divContactPhoto);
        var div = "<div></div>";
        div = $(div).append('<h3>'+people[t]+'</h3>');
        div = $(div).append('<p></p>');
        divStackMessage = $(divStackMessage).append(div);
        $('.messages-container').append(divStackMessage);
        $('.messages-container').append('<hr>');
    }
}

var currentPerson = '';

function handleMessageClick(){
    var theText = $(this);
    var person = theText.find('h3').text();
    person = person.toLowerCase()
    currentPerson = person;
    console.log('the current person is: '+ currentPerson);
    closeMessagesApp();
    openPersonMessages(person);
}

function openPersonMessages(person){
    $('.'+person+'-overlay').css("display","block");
    scrollToBottom(person);
}

function scrollToBottom(person){
    var screenWidth = $(window).width();
    if(screenWidth>481){
        $('#'+person+'-messages').animate({ scrollTop: $(document).height()+9999 }, 1000);
        
    }else{
        $("html, body").animate({ scrollTop: $(document).height() }, 1000);
    }
}

function closePersonMessages(){
    $('.'+currentPerson+'-overlay').css("display","none");
    openMessagesApp();
}

function createCurrentPersonMessage(text){
    var divLeftBubble = "<div class='left-bubble'></div>";
    var pLeft = "<p class='left'>"+text+"</p>";
    divLeftBubble = $(divLeftBubble).append(pLeft);
    $('.'+currentPerson+'-chat').append(divLeftBubble);
    scrollToBottom(currentPerson);
    bringMessageToTop(currentPerson);
    textPreview(text, currentPerson);
    createAllTextPreviews();
}

// person is all lowercase
function createPersonMessage(text, person){
    var divLeftBubble = "<div class='left-bubble'></div>";
    var pLeft = "<p class='left'>"+text+"</p>";
    divLeftBubble = $(divLeftBubble).append(pLeft);
    $('.'+person+'-chat').append(divLeftBubble);
    bringMessageToTop(person);
    textPreview(text, person);
    createAllTextPreviews();
}

function createUserMessage(text){
    var divRightBubble = "<div class='right-bubble'></div>";
    var pRight = "<p class='right'>"+text+"</p>";
    divRightBubble = $(divRightBubble).append(pRight);
    $('.chat').append(divRightBubble);
    scrollToBottom(currentPerson);
}

function bringMessageToTop(person){
    var p = person;
    var firstLetter = p.slice(0,1);
    person = p.replace(firstLetter, firstLetter.toUpperCase());
    var personIndex = people.indexOf(person);
    var splicedPerson = people.splice(personIndex,1);
    people.unshift(splicedPerson[0]);
    $('.stack-message').remove();
    $('.messages-container hr').remove();
    createTextMessages();
    $('.stack-message').click(handleMessageClick);
}

function textPreview(text, person){
    var p = person.toLowerCase();
    var message = $('div.'+p+'-chat div:last-child p').text();
    $('div.'+p+' div p').text(message);
}

function createAllTextPreviews(){
    for(p=0; p<people.length; p++){
        var messageString = $('div.'+people[p]+'-chat div:last-child p').text();
        textPreview(messageString, people[p]);
    }
}

function textMessageAlert(sender){
    alert("New text message from "+sender);
}

// it's time to dynamically create these instead
function createNameChat(){

}
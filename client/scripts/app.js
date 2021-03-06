var app = {
  server: 'https://api.parse.com/1/classes/chatterbox',
  init: function(){},

  rooms: {
    currentRoom: "lobby",
    availableRooms: {}
  },

  send: function(message){
    $.ajax({
      url: 'https://api.parse.com/1/classes/chatterbox',
      type: 'POST',
      async: message.username === "Rick Astley" ? true : false,
      data: JSON.stringify(message),
      contentType: 'application/json',
      success: function (a,b,c) {
        app.fetch();
      }
    })
  },

  fetch: function(){
    $.ajax({
      url: 'https://api.parse.com/1/classes/chatterbox',
      type: 'GET',
      contentType: 'application/json',
      data: {
        order: "-createdAt",
        where: {
          roomname: app.rooms.currentRoom
        }
      },
      success: function(data){
        app.clearMessages();
        var results = data.results;
        var reg = /<script>/g
        for (var i = 0; i < results.length; i++){
          var newTime = moment(results[i].createdAt).format("MMM Do, h:mm a");
          // Refactor posts selector
          var $newPost = $("<div class='chat'></div>");
          var $user = $("<span class='username'></span>");
          var $message = $("<span></span>");
          var $time = $("<span class='time'>" + newTime + "</span>")
          $user.text("@" + results[i].username + ": ");
          $message.text(results[i].text);
          $newPost.append($user).append($time);
          $newPost.append("<br>").append($message);
          $("#chats").append($newPost);
        }
      }
    });
  },

  clearMessages: function(){
    $("#chats").empty();
  },

  addMessage: function(message){
    this.send(message);
  }
};

$(document).ready(function(){

  app.addRoom = function(roomName){
    app.rooms.availableRooms[roomName] = roomName;
    $("#roomSelect").append("<li>" + roomName + "</li>")
    $("#roomSelect").on('click', 'li', function(){
      app.rooms.currentRoom = $(this).text();
      $("#roomName").text(app.rooms.currentRoom);
      app.fetch();
    })
    // $(".blah").on("click", function(){
    //   app.rooms.currentRoom = $(this).text();
    //   $("#roomName").text(app.rooms.currentRoom);
    //   app.fetch();
    // });
    // $(".blah").removeClass("blah");
  }

  $("#roomButton").click(function(){
    console.log("hi");
    app.addRoom($("#roomInput").val());
  });


  $("#messageButton").click(function(){
    var message = {
      'username': (window.location.search).replace('?username=',''),
      'text': $("#messageInput").val(),
      'roomname': app.rooms.currentRoom
    };
    app.addMessage(message);
  });

  app.fetch();
  app.addRoom("lobby");
});

var friends = {};

setInterval(app.fetch, 1000);

var troll = function(){
  for(var i = yeah.length-1; i>= 0; i--){
    var message = {
        'username': "Rick Astley",
        'text': yeah[i],
        'roomname': app.rooms.currentRoom
      };
      app.addMessage(message);
  };
  app.fetch();
}

var yeah = ["Oooh",

"We're no strangers to love",
"You know the rules and so do I",
"A full commitment's what I'm thinking of",
"You wouldn't get this from any other guy",

"I just wanna tell you how I'm feeling",
"Gotta make you understand",

"Never gonna give you up",
"Never gonna let you down",
"Never gonna run around and desert you",
"Never gonna make you cry",
"Never gonna say goodbye",
"Never gonna tell a lie and hurt you",

"We've known each other for so long",
"Your heart's been aching, but",
"You're too shy to say it",
"Inside, we both know what's been going on",
"We know the game and we're gonna play it",

"And if you ask me how I'm feeling",
"Don't tell me you're too blind to see",

"Never gonna give you up",
"Never gonna let you down",
"Never gonna run around and desert you",
"Never gonna make you cry",
"Never gonna say goodbye",
"Never gonna tell a lie and hurt you",

"Never gonna give you up",
"Never gonna let you down",
"Never gonna run around and desert you",
"Never gonna make you cry",
"Never gonna say goodbye",
"Never gonna tell a lie and hurt you",

"(Ooh, give you up)",
"(Ooh, give you up)",
"Never gonna give, never gonna give",
"(Give you up)",
"Never gonna give, never gonna give",
"(Give you up)",

"We've known each other for so long",
"Your heart's been aching, but",
"You're too shy to say it",
"Inside, we both know what's been going on",
"We know the game and we're gonna play it",

"I just wanna tell you how I'm feeling",
"Gotta make you understand",

"Never gonna give you up",
"Never gonna let you down",
"Never gonna run around and desert you",
"Never gonna make you cry",
"Never gonna say goodbye",
"Never gonna tell a lie and hurt you",

"Never gonna give you up",
"Never gonna let you down",
"Never gonna run around and desert you",
"Never gonna make you cry",
"Never gonna say goodbye",
"Never gonna tell a lie and hurt you",

"Never gonna give you up",
"Never gonna let you down",
"Never gonna run around and desert you",
"Never gonna make you cry",
"Never gonna say goodbye",
"Never gonna tell a lie and hurt you"]

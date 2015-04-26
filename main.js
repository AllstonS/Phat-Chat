$(document).ready(function() {
  chat.init();
//setInterval(function() {
//      chat.renderMessages();
  //  }, 2000);

});

var chat = {

  // initialization method
  init: function() {
    chat.initStyling();
    chat.initEvents();
  },

  // styling initialization method
  initStyling: function () {
    chat.renderMessages ();
  },

  // events initialization method
  initEvents: function () {

  // Creation of message part
  $('.createMessage').on('submit', function (event) {
    event.preventDefault();
//    console.log("submit working");

    var newMessage = {
      user: $(this).find('input[name="newUser"]').val(),
      message: $(this).find('input[name="newMessage"]').val(),
    };
    console.log(newMessage);
    function populateStorage(newMessage) {
      localStorage.setItem(newMessage);
      console.log("my local storage")
    }

    //send the data to the server via ajax :POSTING
    //chat.config.url is the same as typing 'http://tiy-fee-rest.herokuapp.com/collections/griffin'
   chat.createMessage(newMessage);

    // render data again (by telling it to append inside of box):PUTTING
    chat.renderMessages();
  });

  // deletion of message part
  $('.chatbox').on('click', '.delete-message', function(event) {
      event.preventDefault();
      var chatId =
      $(this).closest('article').data('chatid');
        console.log(chatId);
        chat.deleteMessage(chatId);
        chat.renderMessages();
      });
    },
  // configuration details property
  config: {
    url: 'http://tiy-fee-rest.herokuapp.com/collections/griffin',
  },

  // render method
/////////////////////////////////////////////////////////////////////////

  renderMessages: function() {

    $.ajax({
      url: chat.config.url,
      type: 'GET',
      success: function (messages) {
        console.log(messages);
      var template = _.template($('#msgTmpl').html());
      var markup = "";
      messages.forEach(function (item,idx, arr) {
          markup += template(item);
      });
      console.log('markup is....', markup);
      $('.chatbox').html(markup);
    },
    error: function (err) {
      console.log(err);
    }
  });
},
  createMessage: function (message) {

    $.ajax({
      url: chat.config.url,
      data: message,
      type: 'POST',
      success: function (data) {
        console.log(data);
        var userInfo = JSON.stringify(data);
        localStorage.setItem('userInfo', userInfo);

      },
      error: function (err) {
        console.log(err);
      }
    });

  },
  deleteMessage: function (id) {

    $.ajax({
      url: chat.config.url + '/' + id,
      type: 'DELETE',
      success: function (data) {
        console.log(data);

      },
      error: function (err) {
        console.log (err);
      }
    });
  }
};

//update user needs to happen. Should be able to change or update our own user name


//  updateMessage: function (id, message) {
  //
  // $.ajax({
  //   url: chat.config.url + '/' + id,
  //   data: message,
  //   type: 'PUT',
  //   success: function (data) {
  //     console.log(data);
  //     chat.renderMessages();
  //   },
  //   error: function (err) {
  //     console.log(err);
  //   }

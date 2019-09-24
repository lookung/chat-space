document.addEventListener('turbolinks:load', function() {

  $('#new_message').on('submit', function(e) {
    e.preventDefault();
    var formData = new FormData(this);
    href = window.location.href

    $.ajax({
      type: 'POST',
      url: href,
      data: formData,
      processData: false,
      contentType: false,
      dataType: 'json'
    })
    .done(function(data) {
      // ScrollDown()
      var html = messageBuildHTML(data);
      $('.messages').append(html);
      $('#new_message')[0].reset();
    })
    .fail(function(data) {
      alert('error');
    });
    return false;
  });
  function messageBuildHTML(message) {
    var html = `<div class='message'>
                  <div class='upper-message'>
                    <div class='upper-message__user-name'>
                      ${message.name}
                    </div>
                    <div class='upper-message__date'>
                      ${message.time}
                    </div>
                  </div>
                  <div class='lower-message'>
                    <p class='lower-message__content'>
                      ${message.content}
                      ${message.image}
                    </p>
                      
                  </div>
                </div>`
    return html
  }
});
;

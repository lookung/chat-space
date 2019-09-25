$(document).on('turbolinks:load', function() {  

  $(function(){
    let searchList = $('#user-search-result');
    
    function appendUser(user) {
      let html = `<div class='chat-group-user clearfix' >
                    <p class='chat-group-user__name'>${user.name}</p>
                      <div class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${user.id}" data-user-name="${user.name}">
                      追加</div>
                  </div>`
      searchList.append(html);
    }
    function appendErrMsgUser(message){
      let html = `<div class='chat-group-user clearfix' >
                    <p class='chat-group-user__name'>${message}</p>
                  </div>`
      searchList.append(html);
    }

    function buildHTML(id, name) {
      var html = `<div class='chat-group-user'>
                    <input name='group[user_ids][]' type='hidden' value="${id}">
                    <p class="chat-group-user__name">${name}</p>
                    <div class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn'>削除</div>
                  </div>`
      return html
    }

    $("#user-search-field").on("keyup", function() {
      let input = $("#user-search-field").val();
      $.ajax({
        url: '/users',
        type: 'GET',
        data: { keyword: input },
        dataType: 'json'
      })
      .done(function(users){
        $('#user-search-result').empty();
        if (users.length !== 0 && input.length !== 0 ) {
          users.forEach(function(user) {
            appendUser(user); 
          });
        }
        else {
          appendErrMsgUser('一致するユーザーはいません');
        }
      })
      .fail(function(){
        alert('ユーザーの検索に失敗しました');
      })
    });

    $("#user-search-result").on("click", '.user-search-add', function(){
        let id = $(this).data('user-id');
        let name = $(this).data('user-name');
        let insertHTML = buildHTML(id, name);
        $('.chat-group-users').append(insertHTML);
        $(this).parent('.chat-group-user').remove();
    });

    $('.chat-group-users').on('click', '.user-search-remove', function(){ 
      $(this).parent().remove();      
    })
  });
});


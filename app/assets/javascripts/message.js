$(function () {

function messageBuildHTML(message) {
  var image = message.image ? `<img src=${message.image} >` : "";
  var basehtml = `<div class='message' data-message-id="${message.id}">
                  <div class='upper-message'>
                    <div class='uupper-message__user-name'>
                      ${message.user_name}
                    </div>
                    <div class='upper-message__date'>
                      ${message.date}
                    </div>
                  </div>
                  <div class='lower-message'>
                    <p class='lower-message__content'>
                      ${message.content}
                      ${image}
                    </p>
                  

                  </div>
                  </div>`
                  
  return basehtml;
}


  // ・・・インクリメンタルサーチの記述・・・
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
      var html = messageBuildHTML(data);
      $('.messages').append(html);
      $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight}, 'fast');   
      $('#new_message')[0].reset();
    })
    .fail(function(data) {
      alert('error');
    });
    return false;
  

  }) 
  // 自動更新はここから。 
  var reloadMessages = function () {
    if (window.location.href.match(/\/groups\/\d+\/messages/)){//今いるページのリンクが/groups/グループID/messagesのパスとマッチすれば以下を実行。
      var last_message_id = $('.message:last').data("message-id");
      console.log (last_message_id) //dataメソッドで.messageにある:last最後のカスタムデータ属性を取得しlast_message_idに代入。
      $.ajax({ //ajax通信で以下のことを行う
        url: "api/messages", //サーバを指定。今回はapi/message_controllerに処理を飛ばす
        type: 'get', //メソッドを指定
        dataType: 'json', //データはjson形式
        data: {last_id: last_message_id} //飛ばすデータは先ほど取得したlast_message_id。またparamsとして渡すためlast_idとする。
      })
      .done(function (messages) { //通信成功したら、controllerから受け取ったデータ（messages)を引数にとって以下のことを行う
        var insertHTML = '';//追加するHTMLの入れ物を作る
        console.log(messages)
        messages.forEach(function (message) {//配列messagesの中身一つ一つを取り出し、HTMLに変換したものを入れ物に足し合わせる
          insertHTML = messageBuildHTML(message); //メッセージが入ったHTMLを取得
          $('.messages').append(insertHTML);//メッセージを追加
        })
        $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight}, 'fast');//最新のメッセージが一番下に表示されようにスクロールする。
      })
      .fail(function () {
        alert('自動更新に失敗しました');//ダメだったらアラートを出す
      });
    }
  };
  setInterval(reloadMessages, 5000);//5000ミリ秒ごとにreloadMessagesという関数を実行し自動更新を行う。
  });

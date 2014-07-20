$(function() {
    var socket = io();
    $('#content-post').submit(function(){
        socket.emit('post', {
            username: $("#username").text(), 
            content: $('#content').val(),
            icon_url: $('#usericon').attr('src') ,
        });
        $('#content').val('');
        return false;
    });

    socket.on('post', function(msg){
        $('#tl-contents').prepend('<p>' + msg.username + ': ' + msg.content +'</p>');
        //$('#messages').append($('<li>').text(msg));
    });



    //$.on('submit_btn', function(){
    //        $.ajax({
    //            url: "service/post",
    //            type: "POST",
    //            username: ""
    //        });
    //    }
    //)
});

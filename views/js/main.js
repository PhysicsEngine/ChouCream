$(function() {
    var socket = io();
    $('#content-post').submit(function(){
        socket.emit('post', $('#content').val());
        $('#content').val('');
        return false;
    });

    socket.on('post', function(msg){
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

$(function () {
    var userIp= $('body').data().ip;
    var date = new Date();
    var user = $('body').data().user;
    var selectedUser = '';
    $onlineUserList = $('#online-users');
    $chatForm = $('#chat-input-area');
    $chatInput = $('#chat-input');
    $chatFile = $('#attach-file');
    $chatBoard = $('#chat-board');
    $chatBoard.animate({scrollTop:$chatBoard.height()},0);
    $('.js-attach-file').click(function(e){
        e.preventDefault();
        $(this).parent().find('#attach-file').click();
    });
    var connectionOptions = {
        'force new connection': true,
        'reconnectionAttems' : "Infinity",
        "timeout" : 10000,
        "transports" : ["websocket"]
    };
    var herokoUrl = 'https://whiteboardchatapp.herokuapp.com/'
    var socket = new io(herokoUrl,connectionOptions);
    socket.emit('add-user',{username:user});
    socket.on('update-online-users', function(data){
       for(var i in data){
           var u = data[i];
           if(i!=user && $('#'+u.socket).length<1){
               $onlineUserList.append('<li class="js-online-users" id="'+u.socket+'" data-user="'+i+'">'+i+'</li>')
           }
       }
    });
    socket.on('user-disconnect',function(data){
        $('#'+data).remove();
    })


    //send message to user
    $onlineUserList.on('click','.js-online-users', function(){
        $this = $(this);
        $('.js-online-users').removeClass('active');
        $this.addClass('active');
        selectedUser = $this.data().user;
    });

    $chatForm.submit(function(e){
        e.preventDefault();
        if(selectedUser.trim().length<1){
            alert('Please Select a user first');
            return false;
        }

        var date = new Date();
        var message = $chatInput.val();
        if(message.trim().length<1)
            return false;
        socket.emit('private-mesage',{username:selectedUser,message:message});
        $chatInput.val('');
        var html = '<li class="mine">\n' +
                    ' <div>\n' +
                    ' <p class="clearfix"><span class="pull-left username">'+user+'</span> <span class="pull-right time">'+date.getHours()+':'+date.getMinutes()+':'+date.getSeconds()+'</span></p>\n' +
                    ' <p class="message">\n' +
                        message +
                    ' </p>\n' +
                    '     </div>\n' +
                    ' </li>';
        $chatBoard.append(html);
        $chatBoard.animate({scrollTop:$chatBoard.height()},0);
    });

    socket.on('new-message', function(data){
        console.log(data);
        var date = new Date();
        selectedUser = data.username;
        $('.js-online-users').removeClass('active');
        $('#'+data.socket).addClass('active');
        var html = '<li class="from">\n' +
            ' <div>\n' +
            ' <p class="clearfix"><span class="pull-left username">'+data.username+'</span> <span class="pull-right time">'+date.getHours()+':'+date.getMinutes()+':'+date.getSeconds()+'</span></p>\n' +
            ' <p class="message">\n' +
            data.message +
            ' </p>\n' +
            '     </div>\n' +
            ' </li>';

        $chatBoard.append(html);
        $chatBoard.animate({scrollTop:$chatBoard.height()},0);
    })
});
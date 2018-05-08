"use strict";
$(function () {
    $('#user-input-modal').modal('show');
    var herokoUrl = 'http://localhost:8000/';//'https://whiteboardchatapp.herokuapp.com/'
    var $userName = $('#user_name');
    var $userType = $('#user_type');
    var $onlineUserList = $('#online-users'),
    $chatForm = $('#chat-input-area'),
    $chatInput = $('#chat-input'),
    $chatFile = $('#attach-file'),
    $chatBoard = $('#chat-board'),
     $chatRoom = $('.chat-room');
    $userType.change(function(){
        var type = $(this).val();

       getUsers(type);
    });
    function getUsers(type){
        $.ajax({
            type : 'post',
            url : herokoUrl+'get-users',
            data : {type : type},
            success : function(response){
                if(!response)
                    return false;
                var html = '';
                for(var i in response){
                    html += '<option value="'+response[i].ObjectID+'">'+response[i].Name+'</option>';
                }
                $userName.html(html);
            }
        })
    }
    getUsers('student');
    $('#prompt-form').submit(function (e) {
        e.preventDefault();
        var userId = $userName.val();
        var userType = $userType.val();
        $('#user-input-modal').modal('hide');
        enableChat(userId,userType);
    });
    // var userId = $('meta[name=user]').attr("content");
    // var userType = $('meta[name=type]').attr("content");

    function enableChat(userId,userType) {




        $chatRoom.animate({scrollTop: $chatBoard.height()}, 0);
        $('.js-attach-file').click(function (e) {
            e.preventDefault();
            $(this).parent().find('#attach-file').click();
        });
        $chatInput.on('keydown', function (e) {
            var $thist = $(this);
            if (e.keyCode == 13) {
                e.preventDefault();
                this.blur();
                $(this).closest('form').submit();
            }
        });
        //js to insert emoji
        $('.js-emoji').click(function (e) {
            e.preventDefault();
            var text = $(this).html();
            var extValue = $chatInput.html();
            $chatInput.html(extValue + ' ' + text);
        });
        /**
         * ======================================
         * AJAX REQ TO AUTH USER
         * =======================================
         */

        $.ajax({
            type: 'post',
            url: herokoUrl + 'authenticate',
            data: {id: userId, userType: userType},
            success: function (response) {

                if (response.status === 'success') {
                    var token = response.token;
                    var user = response.user;
                    user.token = token;
                    chatSystem(user);
                }
            }
        })


        function chatSystem(authUser) {
            var user = authUser;
            var token = user.token;
            var date = new Date();
            var receiver = '';
            var receiverName = '';
            var connectionOptions = {
                'force new connection': true,
                'reconnectionAttems': "Infinity",
                "timeout": 10000,
                "transports": ["websocket"],
                "query": {"token": token}
            };

            var socket = new io(herokoUrl, connectionOptions);
            socket.emit('add-user');


            //save user socket data on connection
            socket.on('save-socket', function (data) {
                user.socket = data;
            });

            var updateEvent = 'update-online-tutors';
            var type = 'tutors';
            var notiticationEvent = 'notify-student';
            var disconnectEvent = 'tutor-disconnect';
            if (user.userType === 'tutor') {
                notiticationEvent = 'notify-tutor';
                type = 'students';
                updateEvent = 'update-online-students';
                disconnectEvent = 'student-disconnect';
            } else if (user.userType === 'admin') {
                notiticationEvent = 'notify-admin';
                type = 'admins';
                updateEvent = 'update-online-admins';
            }
            socket.emit('get-online-users',type);


            /**
             * ======================================
             * GET CURRENTLY ONLINE USERS WHEN PAGE LOADS
             * ======================================
             */
            socket.on(updateEvent, function (data) {
                var $html = '';
                for (var i in data) {
                    var u = data[i];
                    if (i !== user.socket) {
                        $html += '<li class="js-online-users" id="' + i + '" data-user="' + i + '">' + u.Name + '</li>';
                    }
                }
                $onlineUserList.html($html);
            });

            /**
             * ================================
             * NOTIFY USER FOR NEW STUDENT ADMIN
             * ==================================
             */
            socket.on(notiticationEvent, function (data) {

                iziToast.show({class:'success',message:'New '+data.userType.toUpperCase()+' has joined the class',color:'green',icon:'',position:'topRight',timeout:5000});
                $onlineUserList.append('<li class="js-online-users" id="' + data.socket + '" data-user="' + data.socket + '">' + data.Name + '</li>');
            });


            socket.on(disconnectEvent, function (data) {
                iziToast.show({class:'error',message:data.userName.toUpperCase()+' has left the class',color:'green',icon:'',position:'topRight',timeout:5000});
                if( $('#' + data.socket).length>0)
                    $('#' + data.socket).remove();
            });


            /**
             * ================================
             * SEND MESSGE TO USER (STUDENT <=> TEACHER)
             * ==================================
             */
            $onlineUserList.on('click', '.js-online-users', function () {
                var $this = $(this);
                $('.js-online-users').removeClass('active');
                $this.addClass('active');
                receiver = $this.data().user;
                receiverName = $this.text();
            });

            $chatForm.submit(function (e) {
                e.preventDefault();
                if (receiver.trim().length < 1) {
                    alert('Please Select a user first');
                    return false;
                }

                var date = new Date();
                var message = $chatInput.html();
                if (message.trim().length < 1)
                    return false;
                socket.emit('private-mesage', {receiver: receiver, message: message,userName:user.Name});
                $chatInput.blur();
                $chatInput.html('');
                var html = '<li class="mine">\n' +
                    ' <div>\n' +
                    ' <p class="clearfix"><span class="pull-left username">' + user.Name + '</span> <span class="pull-left time">' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds() + '</span></p>\n' +
                    ' <p class="message">\n' +
                    message +
                    ' </p>\n' +
                    '     </div>\n' +
                    ' </li>';
                $chatBoard.append(html);
                $chatRoom.animate({scrollTop: $chatBoard.height()}, 0);
            });

            socket.on('new-message', function (data) {
                var date = new Date();
                receiver = data.socket;
                receiverName = data.userName;
                $('.js-online-users').removeClass('active');
                $('#' + data.socket).addClass('active');
                var html = '<li class="from">\n' +
                    ' <div>\n' +
                    ' <p class="clearfix"><span class="username">' + receiverName + '</span> <span class="time">' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds() + '</span></p>\n' +
                    ' <p class="message">\n' +
                    data.message +
                    ' </p>\n' +
                    '     </div>\n' +
                    ' </li>';

                $chatBoard.append(html);
                $chatRoom.animate({scrollTop: $chatBoard.height()}, 0);
            })
        }
    }
});

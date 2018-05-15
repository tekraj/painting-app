"use strict";
var socket;
var receiver ='';
var user;
var $sessionCanvasWrapper;
$(function () {
    $('#user-input-modal').modal('show');
    var herokoUrl = 'https://whiteboardchatapp.herokuapp.com/';
    var $userName = $('#user_name');
    var $userType = $('#user_type');
    var $onlineUserList = $('#online-users'),
        $onlineCanvasUser = $('#canvas-online-users'),
        $chatForm = $('#chat-input-area'),
        $chatInput = $('#chat-input'),
        $chatFile = $('#attach-file'),
        $chatBoard = $('#chat-board'),
        $chatRoom = $('.chat-room'),
        $subject = $('#subject'),
        $sessionCanvasWrapper = $('.session-canvas-wrapper'),
        $sessionCanvas = $('#session-canvas');
    $userType.change(function () {
        var type = $(this).val();
        getUsers(type);
    });

    function getUsers(type) {
        $.ajax({
            type: 'post',
            url: herokoUrl + 'get-users',
            data: {type: type},
            success: function (response) {
                if (!response)
                    return false;
                var html = '';
                for (var i in response) {
                    html += '<option value="' + response[i].ObjectID + '">' + response[i].Name + '</option>';
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
        var subject = $subject.val();
        $('#user-input-modal').modal('hide');
        enableChat(userId, userType,subject);
    });
    // var userId = $('meta[name=user]').attr("content");
    // var userType = $('meta[name=type]').attr("content");

    function enableChat(userId, userType,subject) {


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
            data: {id: userId, userType: userType,subject:subject},
            success: function (response) {
                if (response.status === 'success') {
                    var token = response.token;
                    var user = response.user;
                    chatSystem(user);
                }
            }
        });


        function chatSystem(authUser) {
            user = authUser;
            var token = user.token;
            var date = new Date();
            var receiverName = '';
            var connectionOptions = {
                'force new connection': true,
                'reconnectionAttems': "Infinity",
                "timeout": 10000,
                "transports": ["websocket"],
                "query": {"token": token}
            };

            socket = new io(herokoUrl, connectionOptions);
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
                type = 'students';
                disconnectEvent = 'student-disconnect';
            }

            /**
             * ======================================
             * GET CURRENTLY ONLINE USERS WHEN PAGE LOADS
             * ======================================
             */

            if(user.userType=='student') {
                socket.emit('get-online-users', type);
                /**
                 * =========================================
                 * UPDATE TEACHERS LIST AND SUBSCRIBE FIRST BY DEFAULT
                 * ===========================================
                 */
                socket.on(updateEvent, function (data) {
                    var $html = '';
                    var $canvasHtml = '';
                    for (var i in data) {
                        var u = data[i];
                        if (i !== user.socket) {
                            $html += '<li class="js-online-users" id="user-' + u.socket + '" data-user="' + u.socket + '">' + u.user.Name + '</li>';
                            $canvasHtml += '<li class="js-canvas-users" id="canvas-' + u.socket + '" data-user="' + u.socket + '">' + u.user.Name + '</li>';

                        }
                    }
                    $onlineUserList.html($html);
                    $onlineCanvasUser.html($canvasHtml);
                    $onlineUserList.find('li:first').click();
                });


                /**
                 * ================================
                 * NOTIFY STUDENT ABOUT NEW TEACHER
                 * ==================================
                 */


                socket.on(notiticationEvent, function (data) {
                    iziToast.show({
                        class: 'success',
                        message: 'New ' + data.userType.toUpperCase() + ' has joined the class',
                        color: 'green',
                        icon: '',
                        position: 'topRight',
                        timeout: 5000
                    });
                    $onlineUserList.append('<li class="js-online-users" id="user-' + data.socket + '" data-user="' + data.socket + '">' + data.Name + '</li>');
                    $onlineCanvasUser.append('<li class="js-canvas-users" id="canvas' + data.socket + '" data-user="' + data.socket + '">' + data.Name + '</li>')
                    if($onlineUserList.find('li').length==1){
                        $onlineUserList.find('li:first').click();
                    }
                });
            }
            if(user.userType=='tutor'){
                socket.on('tutor-subscribed', function(data){
                    iziToast.show({
                        class: 'success',
                        message:  data.Name.toUpperCase() + ' has joined the class',
                        color: 'green',
                        icon: '',
                        position: 'topRight',
                        timeout: 5000
                    });

                    $onlineUserList.append('<li class="js-online-users" id="user-' + data.student + '" data-user="' + data.student + '">' + data.Name + '</li>');
                    $onlineCanvasUser.append( '<li class="js-canvas-users" id="canvas-' + data.student + '" data-user="' + data.student + '">' + data.Name + '</li>')
                    if($onlineUserList.find('li').length==1){
                        $onlineUserList.find('li:first').click();
                    }
                });
                socket.on('unsubscribe-tutor', function (data){
                    if ($('#user-' + data.student).length > 0){
                        var activeClass = $('#user-' + data.student).hasClass('active');
                        $('#user-' + data.student).remove();
                        if(activeClass &&  $onlineUserList.find('li').length>0){
                            $onlineUserList.find('li:first').click();
                        }
                    }
                    if ($('#canvas-' + data.student).length > 0){
                        $('#canvas-' + data.student).remove();
                    }
                })
            }

            socket.on(disconnectEvent, function (data) {
                console.log(data);
                iziToast.show({
                    class: 'error',
                    message: data.userName.toUpperCase() + ' has left the class',
                    color: 'green',
                    icon: '',
                    position: 'topRight',
                    timeout: 5000
                });

                if ($('#user-' + data.socket).length > 0){
                    var activeClass = $('#user-' + data.socket).hasClass('active');
                    $('#user-' + data.socket).remove();
                    if(activeClass &&  $onlineUserList.find('li').length>0){
                        $onlineUserList.find('li:first').click();
                    }
                }
                if ($('#canvas-' + data.socket).length > 0){
                    $('#canvas-' + data.socket).remove();
                }
            });


            /**
             * ================================
             * SEND MESSGE TO USER (STUDENT <=> TEACHER)
             * ==================================
             */
            $onlineUserList.on('click', '.js-online-users', function () {
                if(user.userType=='student' && $onlineUserList.find('li').length>1){
                    user.previousTutor = receiver
                    socket.emit('tutor-unsubscribed',user);
                }
                var $this = $(this);
                $('.js-online-users').removeClass('active');
                $this.addClass('active');
                receiver = $this.data().user;
                receiverName = $this.text();
                var index = $this.index();
                $onlineCanvasUser.find('li').removeClass('active');
                $onlineCanvasUser.find('li:eq('+index+')').addClass('active');
                if(user.userType=='student') {
                    user.tutor = receiver;
                    socket.emit('subscribe-tutor', user);
                }

            });
            $onlineCanvasUser.on('click','.js-canvas-users', function(){
                if(user.userType=='student' && $onlineUserList.find('li').length>1){
                    user.previousTutor = receiver
                    socket.emit('tutor-unsubscribed',user);
                }
                var $this = $(this);
                $('.js-canvas-users').removeClass('active');
                $this.addClass('active');
                receiver = $this.data().user;
                receiverName = $this.text();
                var index = $this.index();
                $onlineUserList.find('li').removeClass('active');
                $onlineUserList.find('li:eq('+index+')').addClass('active');
                if(user.userType=='student'){
                    user.tutor = receiver;
                    socket.emit('subscribe-tutor',user);
                }
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
                socket.emit('private-mesage', {receiver: receiver, message: message, userName: user.Name});
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
            });
            var shareCanvas = document.getElementById('session-canvas').getContext('2d');
            if(user.userType=='tutor'){
                socket.on('draw-student-drawing', function(data){
                    var img = new Image();
                    img.onload = function (){
                        shareCanvas.drawImage(img,0,0);
                    };
                    img.src = data.image;
                })
            }else if(user.userType=='student'){
                socket.on('get-teacher-drawing', function (data){
                    var img = new Image();
                    img.onload = function (){
                        shareCanvas.drawImage(img,0,0);
                    };
                    img.src = data.image;
                })
            }

        }
    }
});


function broadCastCanvasImage(){

    var canvas = document.getElementById('drawing-board');
    var image = canvas.toDataURL();
    if(!user)
        return;

    if(user.userType=='student'){
        socket.emit('send-draw-to-tutor',{user:user,receiver:receiver,image:image});
    }else if(user.userType=='tutor'){
        socket.emit('send-draw-to-student',{user:user,image:image});
    }


}
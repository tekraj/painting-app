"use strict";
var socket;
var receiver ='';
var user;
var herokoUrl = 'https://chatappwhiteboard.herokuapp.com/';
var canvasObjects = [];
var currentStudentID ='';
var canvasStates = [];
var currentStateIndex = 1;
var $sessionCanvasWrapper;

$(function () {
    $('#user-input-modal').modal('show');
    var $userName = $('#user_name');
    var $userType = $('#user_type');
    var $onlineUserList = $('#online-users'),
        $chatForm = $('#chat-input-area'),
        $chatInput = $('#chat-input'),
        $chatFile = $('#attach-file'),
        $chatBoard = $('#chat-board'),
        $chatRoom = $('.chat-room'),
        $subject = $('#subject');

    $userType.change(function () {
        var type = $(this).val();
        getUsers(type);
    });

    function getUsers(type) {
        $.ajax({
            type: 'post',
            url: herokoUrl + 'get-users',
            data: {type: type},
            beforeSend: function(){
                $userName.html('<option>Loading...</option>')
            },
            success: function (response) {

                if (!response){
                    getUsers(type);
                }else{
                    var html = '';
                    for (var i in response) {
                        html += '<option value="' + response[i].ObjectID + '">' + response[i].Name + '</option>';
                    }
                    $userName.html(html);
                }


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
        var name = $userName.find('option:selected').text();
        enableChat(userId, userType,subject,name);
    });
    // var userId = $('meta[name=user]').attr("content");
    // var userType = $('meta[name=type]').attr("content");

    function enableChat(userId, userType,subject,name) {


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
            data: {id: userId, userType: userType,subject:subject,name:name},
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
            canvasDrawing(user,socket);
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
                    for (var i in data) {
                        var u = data[i];
                        if (u.user.ObjectID !== user.ObjectID  &&  $('#user-' + u.user.ObjectID.toLowerCase()).length<1 ) {
                            $html += '<li id="user-' + u.user.ObjectID.toLowerCase() + '"><span class="js-online-users user-name-span"  data-user="' + u.socket + '" data-uid="'+u.ObjectID+'">' + u.user.Name + '</span> '+(user.userType=='tutor'  ? '<span class="js-clear-std-board span-clear">Clear Student Board</span>' :'')+'</li>';
                        }


                    }
                    $onlineUserList.html($html);
                    if( $onlineUserList.find('li').length>0){
                        $onlineUserList.find('li:first').click();
                    }

                });


                /**
                 * ================================
                 * NOTIFY STUDENT ABOUT NEW TEACHER
                 * ==================================
                 */


                socket.on(notiticationEvent, function (data) {
                    if($('#user-' + data.ObjectID.toLowerCase()).length<1) {
                        iziToast.show({
                            class: 'success',
                            message: data.userType.toUpperCase() + ' has joined the class',
                            color: 'green',
                            icon: '',
                            position: 'topRight',
                            timeout: 5000
                        });
                        $onlineUserList.append('<li id="user-' + data.ObjectID.toLowerCase() + '"><span class="js-online-users user-name-span" data-uid="' + data.ObjectID + '"  data-user="' + data.socket + '">' + data.Name + '</span> '+(user.userType=='tutor'  ? '<span class="js-clear-std-board span-clear">Clear Student Board</span>' :'')+'</li>');
                        if ($onlineUserList.find('li').length == 1) {
                            $onlineUserList.find('li:first').click();
                            setTimeout(function(){
                                socket.emit('req-student-drawing',{receiver:receiver});
                            },2000)

                        }
                    }
                });



                //select the tutor if request is accepted
                socket.on('student-req-accepted', function (data) {
                    if(receiver){
                        user.previousTutor = receiver
                        socket.emit('tutor-unsubscribed', user);
                    }
                    var $this = $('#user-'+data.ObjectID.toLowerCase());
                    $onlineUserList.find('li').removeClass('active');
                    $this.addClass('active');
                    var $onlineUser = $this.find('.js-online-users');
                    receiver = $onlineUser.data().user;
                    var receiverId = $onlineUser.data().uid;
                    currentStudentID = receiverId;
                    canvasStates = [];
                    receiverName = $onlineUser.text();
                    var index = $this.index();
                    user.tutor = receiver;
                    socket.emit('req-student-drawing',{receiver:receiver});
                    getUserMessages(user.ObjectID, receiverId, user.userType);
                });

                socket.on('student-req-rejected',function(data){
                   alert('Sorry '+data.Name+' Rejected Your Reqest for joining class');
                });
            }

            if(user.userType=='tutor'){
                socket.on('class-join-req', function(data){

                    $('.student-request-list').show().append('<li><span class="pull-left">'+data.Name+' wants to join your class</span> <span class="pull-right" style="margin-top:-5px;"><button class="btn btn-default js-accept-reject-std-req" data-student="'+ data.student+'" data-value="reject">Reject</button>\n' +
                        '                <button class="btn btn-primary js-accept-reject-std-req" data-student="'+ data.student+'" data-value="accept">Accept</button></span></li>');
                });

                //accept reject request
                $('.student-request-list').on('click','.js-accept-reject-std-req', function(e){
                    e.preventDefault();
                   var std = $(this).data().student;
                   console.log(std);
                   var value = $(this).data().value;
                   console.log('test');
                   if(value=='accept'){
                        socket.emit('accept-student',{student:std});
                   }else{
                       socket.emit('reject-student',{student:std});
                   }
                   $(this).closest('li').hide().remove();

                   if($('.student-request-list').find('li').length==0){
                       $('.student-request-list').hide();
                   }

                });


                socket.on('student-req-accepted', function(data){
                    if($('#user-' + data.ObjectID.toLowerCase()).length<1) {
                        iziToast.show({
                            class: 'success',
                            message:  data.Name.toUpperCase() + ' has joined the class',
                            color: 'green',
                            icon: '',
                            position: 'topRight',
                            timeout: 5000
                        });

                        $onlineUserList.append('<li id="user-' + data.ObjectID.toLowerCase() + '"  ><span class="js-online-users user-name-span" data-uid="' + data.ObjectID + '" data-user="' + data.student + '">' + data.Name + '</span>'+(user.userType=='tutor'  ? '<span class="js-clear-std-board span-clear">Clear Student Board</span>' :'')+'</li>');
                        if ($onlineUserList.find('li').length == 1) {
                            $onlineUserList.find('li:first').click();
                        }
                    }
                });

                socket.on('force-student-mapped', function(data){
                    if($('#user-' + data.ObjectID.toLowerCase()).length<1) {
                        iziToast.show({
                            class: 'success',
                            message:  data.Name.toUpperCase() + ' has joined the class via admin',
                            color: 'green',
                            icon: '',
                            position: 'topRight',
                            timeout: 5000
                        });

                        $onlineUserList.append('<li id="user-' + data.ObjectID.toLowerCase() + '"  ><span class="js-online-users user-name-span" data-uid="' + data.ObjectID + '" data-user="' + data.student + '">' + data.Name + '</span>'+(user.userType=='tutor'  ? '<span class="js-clear-std-board span-clear">Clear Student Board</span>' :'')+'</li>');
                        if ($onlineUserList.find('li').length == 1) {
                            $onlineUserList.find('li:first').click();
                        }
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
                })
            }

            socket.on(disconnectEvent, function (data) {
                iziToast.show({
                    class: 'error',
                    message: data.userName.toUpperCase() + ' has left the class',
                    color: 'green',
                    icon: '',
                    position: 'topRight',
                    timeout: 5000
                });

                if ($('#user-' + data.user.ObjectID.toLowerCase()).length > 0){
                    var activeClass = $('#user-' + data.user.ObjectID.toLowerCase()).hasClass('active');
                    $('#user-' + data.user.ObjectID.toLowerCase()).remove();
                    if(activeClass &&  $onlineUserList.find('li').length>0){
                        $onlineUserList.find('li:first').click();
                    }
                }
            });


            /**
             * ================================
             * SEND MESSGE TO USER (STUDENT <=> TEACHER)
             * ==================================
             */

            $onlineUserList.on('click', 'li', function () {
                if(!$(this).hasClass('active')) {
                    var $this = $(this);
                    var $onlineUser = $this.find('.js-online-users');
                    if (user.userType == 'tutor') {
                        $onlineUserList.find('li').removeClass('active');
                        $this.addClass('active');
                        receiver = $onlineUser.data().user;
                        var receiverId = $onlineUser.data().uid;
                        currentStudentID = receiverId;
                        canvasStates = [];
                        receiverName = $onlineUser.text();
                        var index = $this.index();
                        user.student = receiver;
                        socket.emit('send-drawing', user);
                        getUserMessages(user.ObjectID, receiverId, user.userType);
                    }else{
                        user.tutor = $onlineUser.data().user;
                        console.log(user);
                        socket.emit('req-for-join-class', user);
                    }

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
                socket.emit('private-mesage', {receiver: receiver, message: message, userName: user.Name,userType:user.userType,id:user.ObjectID});
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
                $('#user-' + data.socket).addClass('active');
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
        }
    }
});

function streamCanvasDrawing(data,publicModeEnabled,redrawForeign){
    if(!user)
        return;
    var redrawForeign = redrawForeign ? redrawForeign : 'no';
    if(publicModeEnabled){
        if(user.userType=='student'){
            checkPublicMethodEnabled(function(response){
                if(response.status){
                    socket.emit('send-public-drawing',{user:user,receiver:receiver,canvasData:data});
                }else{
                    alert('Sorry currently public option is not avilable');
                    $('.js-public-mode').click();
                }
            });
        }else{
            socket.emit('send-public-drawing',{user:user,receiver:receiver,canvasData:data});
        }

    }else{
        socket.emit('send-private-drawing',{user:user,receiver:receiver,canvasData:data,redrawForeign:redrawForeign});
    }
}

function decodeHtml(str){
    if(!str)
        return '';
    var entityPairs = [
        {character: '&', html: '&amp;'},
        {character: '<', html: '&lt;'},
        {character: '>', html: '&gt;'},
        {character: "'", html: '&apos;'},
        {character: '"', html: '&quot;'}
    ];

    entityPairs.forEach( function(pair){
        var reg = new RegExp(pair.html, 'g');
        str = str.replace(reg, pair.character);
    });
    return str;
}

function getUserMessages(userId,receiverId,userType){
    if(!receiverId)
        return false;
    if(!userId)
        return false;
    $('#chat-board').html('');
    $.ajax({
        type : 'post',
        url : herokoUrl+'get-user-messages',
        data : {fromUser: userId.replace(/\s+/,''),toUser:receiverId.replace(/\s+/,''),userType:userType},
        success : function (response){
            if(response.status){
                var messages = response.messages;
                var html = '';
                for(var i in messages){
                    var message = messages[i];
                     html+= '<li class="'+(message.UserName==user.Name ? 'mine' : '')+'">\n' +
                        ' <div>\n' +
                        ' <p class="clearfix"><span class="pull-left username">' +message.UserName + '</span> <span class="pull-left time">' +moment(message.CreatedAt).format('MMM DD h:mm A')+ '</span></p>\n' +
                        ' <p class="message">\n' +
                        decodeHtml(message.Message) +
                        ' </p>\n' +
                        '     </div>\n' +
                        ' </li>';
                }
                $('#chat-board').html(html);
                $('.chat-room').animate({scrollTop: $('#chat-board').height()}, 0);
            }
        }
    })
}

function checkPublicMethodEnabled (callback){
    $.ajax({
        type : 'post',
        url : herokoUrl+'check-public-drawing',
        data : user,
        success : function (data){
            return callback(data);
        }
    });
}
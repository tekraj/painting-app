$(document).ready(function(){
    //script to hide save tab
    $('body').click(function(e){

        if( !$(e.target).is('.option-menu-wrapper a') && !$(e.target).is('.option-menu-wrapper .option-menu') &&  !$(e.target).is('.option-menu-wrapper a img') && !$(e.target).is('.option-menu-wrapper a span')){
            $('.option-menu').hide();
        }

    });
    $('[data-toggle="tooltip"]').tooltip();


    /**
     * ======================================================
     * *************** variable declaration *****************
     * =====================================================
     */
    var drawingC=document.getElementById('drawing-board'),
        drawingCanvas=drawingC.getContext('2d'),
        fakeC = document.getElementById('fake-canvas'),
        fakeCanvas = fakeC.getContext('2d'),
        cursor = 'default',
        currentColor = '#000',
        font = $('.js-font.active').data().font,
        fontSize = $('.js-font-size.active').data().size,
        fontStyle = $('.js-font-style.active').data().style,
        lineSize = 2,
        position = getCoords(drawingC),
        textInput = $('#canvas-text-input'),
        textEnabled = false,
        eraserSize = lineSize,
        dc=$('#drawing-board'),
        fa = $('#fake-canvas'),
        textLeftCord,
        textTopCord,
        mouseX= [],
        mouseY= [],
        pixColor =  [],
        drag= [],
        mouseDown,
        lineStartPoint ={x:-1,y:-1},
        j=0,
        background = '#fff',
        currentTool = 'pencil';

    dc.css({'cursor':cursor});


    /**
     * ======================================================
     * *************** script to change the value of variables
     * =====================================================
     */
    //default font-indicator
    $('#demo-font-text').css({'font-family':font,'font-size':fontSize,'font-style':fontStyle});
    //change default color
    $('.js-color-code').click(function(e){
        e.preventDefault();
        var color = $(this).data().color;
        currentColor = color;
        $('#color-indicator').css('background',color);
        $('#canvas-text-input').css('color',color);
        currentTool = 'none';
        dc.css({'cursor':cursor});
    });

    //change tools
    $('.js-tools').click(function (e){
        e.preventDefault();
        $('.js-tools').removeClass('active');
        $(this).addClass('active');
        currentTool = $(this).data().tool;
        var toolCursor = $(this).data().cursor;

        if(toolCursor){
            dc.css({'cursor':toolCursor});
        }
        //show options if exists
        var optionMenu = $(this).parent().find('.option-menu');
        if(optionMenu.length>0){
            optionMenu.show();
        }
    });

    // code for eraser slider
    $('#eraser-slider').slider({
        create: function (){
            $('#eraser-slider .ui-slider-handle').text(1);
        },
        slide : function (event,ui){
            $('#eraser-slider .ui-slider-handle').text(ui.value)
            eraserSize = ui.value;
        },
        range: "max",
        min: 1,
        max: 10,
    });
    //change line width
    $('.js-line-width').click(function(e){
        e.preventDefault();
        $('.js-line-width').removeClass('active');
        $(this).addClass('active');
        lineSize = $(this).data().line * 2;
        $('.option-menu').hide();
    });

    //change font family
    $('.js-font').click(function (e){
        e.preventDefault();
        $('.js-font').removeClass('active');
        $(this).addClass('active');
        var activeFont = $(this).data().font;
        $('.js-text-demo').css({'font-family':activeFont});
    });
    $('.js-font-style').click(function (e){
        e.preventDefault();
        $('.js-font-style').removeClass('active');
        $(this).addClass('active');
        var activeFontStyle = $(this).data().style;
        if(activeFontStyle=='italic' || activeFontStyle=='bold italic'){
            $('.js-text-demo').css({'font-style':'italic'});
        }else{
            $('.js-text-demo').css({'font-style':'normal'});
        }

        if(activeFontStyle=='bold' || activeFontStyle=='bold italic'){
            $('.js-text-demo').css({'font-weight':'bold'});
        }else{
            $('.js-text-demo').css({'font-weight':'normal'});
        }

    });
    $('.js-font-size').click(function (e){
        e.preventDefault();
        $('.js-font-size').removeClass('active');
        $(this).addClass('active');
        var activeFontSize = $(this).data().size;
        $('#demo-font-text').css({'font-size':activeFontSize});
    });

    $('#change-font').click(function (e){
        e.preventDefault();
        font = $('.js-font.active').data().font;
        fontSize = $('.js-font-size.active').data().size;
        fontStyle = $('.js-font-style.active').data().style;
        $('#demo-font-text').css({'font-family':font,'font-size':fontSize,'font-style':fontStyle});
        dc.css({'cursor':cursor});
        currentTool = 'none';
        $('.option-menu').hide();
    });

    $('#cancel-font').click(function (e){
        e.preventDefault();
        $('.option-menu').hide();
    });


    //clear canvas
    $('#new-paint').click(function(){
        drawingCanvas.clearRect(0,0,drawingC.width,drawingC.height);
        drag =[];
        mouseX = [];
        mouseY = [];
        pixColor =[];
    });




    //function for pushing the values in the arrays
    function clickIt(x,y,tf){
        mouseX.push(x);
        mouseY.push(y);
        pixColor.push(currentColor);
        drag.push(tf);
    }

    /**
     * ======================================================
     * *************** event handlers
     * =====================================================
     */
    //mouseDown Event Handler
    dc.mousedown(function(e){
        mouseDown = true;
        var left = e.pageX-position.left,
            top = e.pageY-position.top;
        if( textEnabled){

            textInput.blur().hide();
            drawingCanvas.font = fontStyle+' ' +fontSize+'px '+font;
            drawingCanvas.fillStyle = currentColor;
            drawingCanvas.fillText(textInput.val(),textLeftCord+10,textTopCord+20 );
            textInput.val('');
            textEnabled = false;
        }

        if(currentTool=='pencil'){

            clickIt(left,top)
            drawPencil();
        }else if( currentTool=='text' && !textEnabled  ){

             textEnabled = true;
             textInput.show().css({left:left,top:top});
             textLeftCord=left;
             textTopCord = top;
             setTimeout(function(){
                 textInput.focus();
             },100);

         }else if(currentTool=='line'){
            fa.show();
            lineStartPoint.x = left;
            lineStartPoint.y = top;
        }else if(currentTool=='cube'){
            fa.show();
            lineStartPoint.x = left;
            lineStartPoint.y = top;
        }else if(currentTool=='rectangle'){
            fa.show();
            lineStartPoint.x = left;
            lineStartPoint.y = top;
        }

    });
    //mousemove
    dc.mousemove(function(e){
        if(mouseDown) {
            var left = e.pageX - position.left;
            var top = e.pageY - position.top;
            if (currentTool == 'paint-bucket') {
                drawingCanvas.fillRect(0, 0, c.width, c.height);
                drawingCanvas.beginPath();
                drawingCanvas.rect(0, 0, c.width, c.height);
                drawingCanvas.fillStyle = currentColor;
                drawingCanvas.fill();
                background = currentColor;
                paintBucket = false;
                drag = [];
                mouseX = [];
                mouseY = [];
                pixColor = [];

            } else if (currentTool == 'eraser') {
                drawingCanvas.beginPath();
                drawingCanvas.globalCompositeOperation = "destination-out";
                drawingCanvas.arc(left,top, eraserSize, 0, Math.PI * 2, false);
                drawingCanvas.fill();
            } else if (currentTool == 'pencil') {
                clickIt(left,top, true)
                drawPencil();
            }
        }
    });

    fa.mousemove(function(e){

        var left = e.pageX - position.left;
        var top = e.pageY - position.top;
        if(currentTool=='line'){
            drawLineAnimation(left,top);
        }else if(currentTool=='cube'){
            drawCubeAnimation(left,top);
        }else if(currentTool=='rectangle'){
            drawRectangleAnimation(left,top);
        }
    });
    //mouseup
    dc.mouseup(function(e){


        mouseDown = false;
        mouseX = [];
        mouseY = [];
        pixColor =[];


    });
    //mouseleave
    dc.mouseleave(function(e){
        mouseDown = false;

    });
    fa.mouseup(function (e){
        var left = e.pageX - position.left;
        var top = e.pageY - position.top;
        $(this).hide();
        if(currentTool=='line'){
            drawLine(left,top);
        }else if(currentTool=='cube'){
            drawCube(left,top);
        }else if(currentTool=='rectangle'){
            drawRectangle(left,top);
        }

    });

    /**
     * ======================================================
     * *************** draw with pencil
     * =====================================================
     */
    function drawPencil(){

        for(i=0;i<mouseX.length;i++){
            drawingCanvas.beginPath();
            drawingCanvas.globalCompositeOperation="source-over";
            if(drag[i] && i){
                drawingCanvas.moveTo(mouseX[i-1],mouseY[i-1]);
            }
            else{
                drawingCanvas.moveTo(mouseX[i]-1,mouseY[i]);
            }

            drawingCanvas.lineTo(mouseX[i],mouseY[i])
            drawingCanvas.closePath();
            drawingCanvas.strokeStyle= pixColor[i];
            drawingCanvas.lineWidth=lineSize;
            drawingCanvas.fill();
            drawingCanvas.stroke();
        }
    }

    /**
     * ======================================================
     * *************** function for line animation
     * =====================================================
     */

    function drawLineAnimation(x,y){

        fakeCanvas.clearRect(0,0,fakeC.height,fakeC.width);
        fakeCanvas.beginPath();
        fakeCanvas.moveTo(lineStartPoint.x,lineStartPoint.y);
        fakeCanvas.lineTo(x,y);
        fakeCanvas.closePath();
        fakeCanvas.strokeStyle= currentColor;
        fakeCanvas.lineWidth=lineSize;
        fakeCanvas.fill();
        fakeCanvas.stroke();
    }

    /**
     * ======================================================
     * *************** function to draw line
     * =====================================================
     */
    function drawLine(x,y){
        drawingCanvas.beginPath();
        drawingCanvas.globalCompositeOperation="source-over";
        drawingCanvas.moveTo(lineStartPoint.x,lineStartPoint.y);
        drawingCanvas.lineTo(x,y);
        drawingCanvas.closePath();
        drawingCanvas.strokeStyle= currentColor;
        drawingCanvas.lineWidth=lineSize;
        drawingCanvas.fill();
        drawingCanvas.stroke();

    }


    /**
     * ======================================================
     * *************** function for cube animation
     * =====================================================
     */

    function drawCubeAnimation(x,y){
        var sizeX = Math.abs(x-lineStartPoint.x);
        var sizeY = Math.abs(y-lineStartPoint.y);
        var sizeZ = Math.abs(x-lineStartPoint.x);
        var z = y;
        var h = 50;
        fakeCanvas.beginPath();
        fakeCanvas.moveTo(x, y);
        fakeCanvas.lineTo(x - sizeX, y - sizeX * 0.5);
        fakeCanvas.lineTo(x - sizeX, y - h - sizeX * 0.5);
        fakeCanvas.lineTo(x, y - h * 1);
        fakeCanvas.closePath();
        fakeCanvas.strokeStyle = currentColor;
        fakeCanvas.stroke();
        fakeCanvas.fill();
        // right face
        fakeCanvas.beginPath();
        fakeCanvas.moveTo(x, y);
        fakeCanvas.lineTo(x + sizeY, y - sizeY * 0.5);
        fakeCanvas.lineTo(x + sizeY, y - h - sizeY * 0.5);
        fakeCanvas.lineTo(x, y - h * 1);
        fakeCanvas.closePath();

        fakeCanvas.strokeStyle = currentColor;
        fakeCanvas.stroke();
        fakeCanvas.fill();
        fakeCanvas.beginPath();
        fakeCanvas.moveTo(x, y - h);
        fakeCanvas.lineTo(x - sizeX, y - h - sizeX * 0.5);
        fakeCanvas.lineTo(x - sizeX + sizeY, y - h - (sizeX * 0.5 + sizeY * 0.5));
        fakeCanvas.lineTo(x + sizeY, y - h - sizeY * 0.5);
        fakeCanvas.closePath();
        fakeCanvas.strokeStyle = currentColor;
        fakeCanvas.stroke();
        fakeCanvas.fill();
    }

    /**
     * ======================================================
     * *************** function to draw cube
     * =====================================================
     */
    function drawCube(x,y){
        fakeCanvas.clearRect(0,0,fakeC.height,fakeC.width);
        var sizeX = Math.abs(x-lineStartPoint.x);
        var sizeY = Math.abs(y-lineStartPoint.y);
        var sizeZ = Math.abs(x-lineStartPoint.x);
        var z = 50;
        var h = 50;
        drawingCanvas.beginPath();
        drawingCanvas.moveTo(x, y);
        drawingCanvas.lineTo(x - sizeX, y - sizeX * 0.5);
        drawingCanvas.lineTo(x - sizeX, y - h - sizeX * 0.5);
        drawingCanvas.lineTo(x, y - h * 1);
        drawingCanvas.closePath();
        drawingCanvas.strokeStyle = currentColor;
        drawingCanvas.stroke();
        drawingCanvas.fill();
        // right face
        drawingCanvas.beginPath();
        drawingCanvas.moveTo(x, y);
        drawingCanvas.lineTo(x + sizeY, y - sizeY * 0.5);
        drawingCanvas.lineTo(x + sizeY, y - h - sizeY * 0.5);
        drawingCanvas.lineTo(x, y - h * 1);
        drawingCanvas.closePath();

        drawingCanvas.strokeStyle = currentColor;
        drawingCanvas.stroke();
        drawingCanvas.fill();
        drawingCanvas.beginPath();
        drawingCanvas.moveTo(x, y - h);
        drawingCanvas.lineTo(x - sizeX, y - h - sizeX * 0.5);
        drawingCanvas.lineTo(x - sizeX + sizeY, y - h - (sizeX * 0.5 + sizeY * 0.5));
        drawingCanvas.lineTo(x + sizeY, y - h - sizeY * 0.5);
        drawingCanvas.closePath();
        drawingCanvas.strokeStyle = currentColor;
        drawingCanvas.stroke();
        drawingCanvas.fill();

    }

    /**
     * ======================================================
     * *************** function for cube animation
     * =====================================================
     */

    function drawRectangleAnimation(x,y){
        fakeCanvas.clearRect(0,0,fakeC.height,fakeC.width);
        fakeCanvas.beginPath();
        fakeCanvas.lineWidth= lineSize;
        fakeCanvas.strokeStyle=currentColor;
        fakeCanvas.rect(lineStartPoint.x,lineStartPoint.y,Math.abs(x-lineStartPoint.x),(y-lineStartPoint.y));
        fakeCanvas.stroke();
        fakeCanvas.stroke();
    }

    /**
     * ======================================================
     * *************** function to draw cube
     * =====================================================
     */
    function drawRectangle (x,y){
        drawingCanvas.beginPath();
        drawingCanvas.lineWidth= lineSize;
        drawingCanvas.strokeStyle=currentColor;
        drawingCanvas.rect(lineStartPoint.x,lineStartPoint.y,Math.abs(x-lineStartPoint.x),(y-lineStartPoint.y));
        drawingCanvas.stroke();
        drawingCanvas.stroke();

    }
});

function getCoords(elem) {
    var box = elem.getBoundingClientRect();

    var body = document.body;
    var docEl = document.documentElement;

    var scrollTop = window.pageYOffset || docEl.scrollTop || body.scrollTop;
    var scrollLeft = window.pageXOffset || docEl.scrollLeft || body.scrollLeft;

    var clientTop = docEl.clientTop || body.clientTop || 0;
    var clientLeft = docEl.clientLeft || body.clientLeft || 0;

    var top  = box.top +  scrollTop - clientTop;
    var left = box.left + scrollLeft - clientLeft;

    return {top: Math.round(top), left:Math.round(left) };
}


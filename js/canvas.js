if (!HTMLCanvasElement.prototype.toBlob) {
    Object.defineProperty(HTMLCanvasElement.prototype, 'toBlob', {
        value: function (callback, type, quality) {
            var canvas = this;
            setTimeout(function() {
                var binStr = atob( canvas.toDataURL(type, quality).split(',')[1] ),
                    len = binStr.length,
                    arr = new Uint8Array(len);

                for (var i = 0; i < len; i++ ) {
                    arr[i] = binStr.charCodeAt(i);
                }

                callback( new Blob( [arr], {type: type || 'image/png'} ) );
            });
        }
    });
}
$.fn.superScript = function() {
    var chars = '+−=()0123456789AaÆᴂɐɑɒBbcɕDdðEeƎəɛɜɜfGgɡɣhHɦIiɪɨᵻɩjJʝɟKklLʟᶅɭMmɱNnɴɲɳŋOoɔᴖᴗɵȢPpɸrRɹɻʁsʂʃTtƫUuᴜᴝʉɥɯɰʊvVʋʌwWxyzʐʑʒꝯᴥβγδθφχнნʕⵡ',
        sup   = '⁺⁻⁼⁽⁾⁰¹²³⁴⁵⁶⁷⁸⁹ᴬᵃᴭᵆᵄᵅᶛᴮᵇᶜᶝᴰᵈᶞᴱᵉᴲᵊᵋᶟᵌᶠᴳᵍᶢˠʰᴴʱᴵⁱᶦᶤᶧᶥʲᴶᶨᶡᴷᵏˡᴸᶫᶪᶩᴹᵐᶬᴺⁿᶰᶮᶯᵑᴼᵒᵓᵔᵕᶱᴽᴾᵖᶲʳᴿʴʵʶˢᶳᶴᵀᵗᶵᵁᵘᶸᵙᶶᶣᵚᶭᶷᵛⱽᶹᶺʷᵂˣʸᶻᶼᶽᶾꝰᵜᵝᵞᵟᶿᵠᵡᵸჼˤⵯ';

    return this.each(function() {
        this.value = this.value.replace(/<sup[^>]*>(.*?)<\/sup>/g, function(x) {
            var str = '',
                txt = $.trim($(x).unwrap().text());

            for (var i=0; i<txt.length; i++) {
                var n = chars.indexOf(txt[i]);
                str += (n!=-1 ? sup[n] : txt[i]);
            }
            console.log(str);
            return str;
        });
    });
}

$.fn.subScript = function() {
    var chars = '0123456789+-()',
        sup   = '₀₁₂₃₄₅₆₇₈₉₊₋₌₍₎';

    return this.each(function() {
        this.value = this.value.replace(/<sub[^>]*>(.*?)<\/sub>/g, function(x) {
            var str = '',
                txt = $.trim($(x).unwrap().text());

            for (var i=0; i<txt.length; i++) {
                var n = chars.indexOf(txt[i]);
                str += (n!=-1 ? sup[n] : txt[i]);
            }
            return str;
        });
    });
};
$(document).ready(function(){

    $('[data-toggle="tooltip"]').tooltip();

    //code to insert custom science symbols
    $('.y-value-sub').subScript();
    $('.y-value-sup').superScript();

    //full screen


    /**
     * ======================================================
     * *************** variable declaration *****************
     * =====================================================
     */
    var drawingC=document.getElementById('drawing-board'),
        drawingCanvas=drawingC.getContext('2d'),
        fakeC = document.getElementById('fake-canvas'),
        fakeCanvas = fakeC.getContext('2d'),
        rC = document.getElementById('resize-canvas'),
        resizeCanvas = rC.getContext('2d'),
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
        parentDiv = dc.parent(),
        fa = $('#fake-canvas'),
        textLeftCord,
        currentMouse = {x:0,y:0},
        textTopCord,
        mouseX= [],
        mouseY= [],
        shiftPressed  = false,
        textAnimation,
        textCursor = true,
        pixColor =  [],
        drag= [],
        symbolEnabled = false,
        scienceEnabled = false,
        graphColor = '#ccc',
        fakeCanvasMaxLenght = 10000,
        mouseDown,
        lineStartPoint ={x:0,y:0},
        lineEndPoint = {x:0,y:0},
        j=0,
        background = '#fff',
        currentTool = 'pencil';
        dc.css({'cursor':cursor});
        var parentHeight = dc.parent().height();
        var parentWidth = dc.parent().width();
        dc.attr({'height':parentHeight,'width':parentWidth})
        fa.attr({'height':parentHeight,'width':parentWidth})
        dc.parent().scroll(function(){
            position = getCoords(drawingC);
        });
    /**
     * ======================================================
     * *************** script to change the value of variables
     * =====================================================
     */
    setTimeout(function (){
        $('.eqEdEquation').css({'font-size':fontSize});
    },100);
    //default font-indicator
    $('#demo-font-text').css({'font-family':font,'font-size':fontSize,'font-style':fontStyle});
    textInput.css({'font-family':font,'font-size':fontSize,'font-style':fontStyle});
    $('.js-enable-symbol').mouseover(function(){
        symbolEnabled = true;
    });

    $('.js-science-symbol').click(function(e){
        e.preventDefault();
        var symbol = $(this).data().symbol;
        var currentTextValue = textInput.val();
        setTimeout(function(){
            textInput.val(currentTextValue+symbol).change();
            textInput.focus();
        },100)

    });


    $('#x-value-sup,#x-value-sub').keydown(function(e){
        var $this = $(this);
        setTimeout(function (){
            var symbol = $this.val();

            var currentTextValue = textInput.val();
            textInput.val(currentTextValue+symbol).change();
            $this.blur();
            textInput.focus();
        },100);
    });
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
    $('.option-menu-wrapper').mouseover(function (){
        //show options if exists
        var optionMenu = $(this).find('.option-menu');
        if(optionMenu.length>0){
            optionMenu.show();
        }
    }).mouseleave(function(){
        var optionMenu = $(this).find('.option-menu');
        if(optionMenu.length>0){
            optionMenu.hide();
        }
    });
    $('.js-tools').click(function (e){
        e.preventDefault();

        currentTool = $(this).data().tool;
        var toolCursor = $(this).data().cursor;

        if(toolCursor){
            dc.css({'cursor':toolCursor});
        }
    });

    // code for eraser slider
    $('#eraser-slider').slider({
        create: function (){
            $('#eraser-slider .ui-slider-handle').text(2);
        },
        slide : function (event,ui){
            $('#eraser-slider .ui-slider-handle').text(ui.value)
            eraserSize = ui.value;
        },
        range: "max",
        min: 2,
        max: 20,
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
        $('.js-text-demo').css({'font-size':activeFontSize});
    });

    $('#change-font').click(function (e){
        e.preventDefault();
        font = $('.js-font.active').data().font;
        fontSize = $('.js-font-size.active').data().size;
        fontStyle = $('.js-font-style.active').data().style;
        $('.js-text-demo').css({'font-family':font,'font-size':fontSize,'font-style':fontStyle});
        dc.css({'cursor':cursor});
        currentTool = 'none';
        $('.option-menu').hide();
        $('.eqEdEquation').css({'font-size':fontSize});
    });

    $('#cancel-font').click(function (e){
        e.preventDefault();
        $('.option-menu').hide();
    });


    //insert symbols
    $('#toLatex').on('click', function() {
        var jsonObj = $('.eqEdEquation').data('eqObject').buildJsonObj();
        var latex = generateLatex(jsonObj.operands.topLevelContainer);
       // $('.eqEdEquation').find('.eqEdContainer').attr('')
        insertSymbols($('.eqEdContainer'),function(){
            $('.modal').modal('hide');
        })
    });

    //clear canvas
    $('.js-clear-canvas').click(function(){
        var ans = $(this).data().ans;
        if(ans=='yes'){
            this.href = drawingC.toDataURL();
            this.download = 'canvas.png';
        }
        $('.modal').modal('hide');
        drawingCanvas.clearRect(0,0,drawingC.width,drawingC.height);
        drag =[];
        mouseX = [];
        mouseY = [];
        pixColor =[];
    });

    //detect shit key pressed for straight lines and squares
    $('body').keydown(function(e){
       if(e.keyCode==16)
           shiftPressed = true;
    });
    $('body').keyup(function(e){

        if(currentTool=='p-line'){
            currentTool='pencil';
            drawLine(lineEndPoint.x,lineEndPoint.y);
            fa.hide();

        }
        shiftPressed = false;

    });

    //function for pushing the values in the arraysx
    function pushPencilPoints(x,y,tf){
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

    //click event for body
    $('body').click(function (e){
        if(!$(e.target).is('.js-science-symbol')){
            console.log('test');
            symbolEnabled = false;
        }
    })
    //mouseDown Event Handler
    dc.mousedown(function(e){

        mouseDown = true;
        var left = e.pageX-position.left,
            top = e.pageY-position.top;
        lineStartPoint.x = left;
        lineStartPoint.y = top;

        if(currentTool=='pencil'){
            pushPencilPoints(left,top)
            drawPencil();
        }else if( currentTool=='text' && !textEnabled  ){
             textEnabled = true;
             textInput.show().css({left:left,top:top});
             textLeftCord=left;
             textTopCord = top;

             setTimeout(function(){
                 textInput.focus();
             },100);

             setTimeout(function (){
                 fa.show();
                 textInput.click();
             },300);

         }else if(currentTool=='line' || currentTool=='cube' || currentTool=='rectangle' ||currentTool=='oval' || currentTool=='cone' || currentTool=='pyramid' || currentTool=='xgraph' || currentTool=='xygraph' || currentTool=='cylinder'){
            fa.show();
            lineStartPoint.x = left;
            lineStartPoint.y = top;
        }

    });
    //mousemove
    $('body').mousemove(function(e){

        var left = e.pageX - position.left;
        var top = e.pageY - position.top;
        currentMouse.x = left;
        currentMouse.y = top;
        if(mouseDown) {
            lineEndPoint.x = left;
            lineEndPoint.y = top;
            var canvasHeight = drawingC.height;
            var canvasWidth = drawingC.width;



           if(left>canvasWidth){
               parentDiv.scrollLeft(left);
               rC.width = canvasWidth;
               rC.height = canvasHeight;
               resizeCanvas.drawImage(drawingC, 0, 0);
               dc.attr('width',left);
               fa.attr('width',left);
               drawingCanvas.drawImage(rC,0,0);
           }
           if(top>canvasHeight){
               parentDiv.scrollLeft(top);
               rC.width = canvasWidth;
               rC.height = canvasHeight;
               resizeCanvas.drawImage(drawingC, 0, 0);
               dc.attr('height',top);
               fa.attr('height',top);
               drawingCanvas.drawImage(rC,0,0);
           }

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
               fa.show();
                showEraserAnimation(left,top,eraserSize);
                drawingCanvas.beginPath();
                drawingCanvas.globalCompositeOperation = "destination-out";
                drawingCanvas.arc(left,top, eraserSize, 0, Math.PI * 2, false);
                drawingCanvas.fill();
            } else if (currentTool == 'pencil') {

               //if shift is pressed draw straight line
                if(shiftPressed ){
                    fa.show();
                    if(mouseX.length>0){
                        lineStartPoint.x = mouseX[mouseX.length-1];
                        lineStartPoint.y = mouseY[mouseY.length-1];
                    }else{
                        lineStartPoint.x = left;
                        lineStartPoint.y = top;
                    }
                    mouseX = [];
                    mouseY  =[];
                    currentTool= 'p-line';
                }else{

                    pushPencilPoints(left,top, true)
                    drawPencil();
                }

            }
            if(currentTool=='line'|| currentTool=='p-line'){
                drawLineAnimation(left,top);
            }else if(currentTool=='cube'){
                drawCubeAnimation(left,top);
            }else if(currentTool=='rectangle'){
                drawRectangleAnimation(left,top);
            }else if(currentTool=='oval'){
                drawCircleAnimation(left,top);
            }else if(currentTool=='cylinder'){
                drawCylinderAnimation(left,top);
            }else if(currentTool=='cone'){
                drawConeAnimation(left,top);
            }else if(currentTool=='pyramid'){
                drawPyramidAnimation(left,top);
            }else if(currentTool=='xgraph'){
                drawXGraphAnimation(left,top);
            }else if(currentTool=='xygraph'){
                drawXYGraphAnimation(left,top);
            }
        }
    });

    //mouseup
    $('body').mouseup(function(e){

        var left = e.pageX - position.left;
        var top = e.pageY - position.top;
        fa.hide();
        if(mouseDown){
            if(currentTool=='line'){
                drawLine(left,top);
            }else if(currentTool=='cube'){
                drawCube(left,top);
            }else if(currentTool=='rectangle'){
                drawRectangle(left,top);
            }else if(currentTool=='oval'){
                drawCircleAnimation(left,top,true);
            }else if(currentTool=='cylinder'){
                drawCylinderAnimation(left,top,true);
            }else if(currentTool=='cone'){
                drawConeAnimation(left,top,true);
            }else if(currentTool=='pyramid'){
                drawPyramidAnimation(left,top,true);
            }else if(currentTool=='xgraph'){
                drawXGraphAnimation(left,top,true);
            }else if(currentTool=='xygraph'){
                drawXYGraphAnimation(left,top,true);
            }
        }
        fakeCanvas.clearRect(0,0,fakeC.height,fakeC.width);
        mouseDown = false;
        mouseX = [];
        mouseY = [];
        pixColor =[];
    });

    // fa.mouseup(function (e){
    //
    //
    // });

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

    function drawLineAnimation(x,y,noAnimation){
        var noAnimation = noAnimation ? noAnimation : false;
        var lineEndPointX = x,
            lineEndPointY = y;
        fakeCanvas.clearRect(0,0,fakeCanvasMaxLenght,fakeCanvasMaxLenght);
        //if shift is pressed detect to which way we have to draw line
        if(shiftPressed){
            var dx = Math.abs(x-lineStartPoint.x);
            var dy = Math.abs(y-lineStartPoint.y);
            if(dx>dy){
                lineEndPointY = lineStartPoint.y;
            }else{
                lineEndPointX = lineStartPoint.x;
            }
        }

        var ctx = noAnimation ? drawingCanvas : fakeCanvas;
        ctx.beginPath();
        ctx.globalCompositeOperation="source-over";
        ctx.moveTo(lineStartPoint.x,lineStartPoint.y);
        ctx.lineTo(lineEndPointX,lineEndPointY);
        ctx.closePath();
        ctx.strokeStyle= currentColor;
        ctx.lineWidth=lineSize;
        ctx.fill();
        ctx.stroke();
    }

    /**
     * ======================================================
     * *************** function to draw line
     * =====================================================
     */
    function drawLine(x,y){
       drawLineAnimation(x,y,true);
    }


    /**
     * ======================================================
     * *************** function for cube animation
     * =====================================================
     */

    function drawCubeAnimation(x,y,noAnimation){
        var noAnimation = noAnimation ? noAnimation : false;
        fakeCanvas.clearRect(0,0,fakeCanvasMaxLenght,fakeCanvasMaxLenght);
        var sizeX = Math.abs(x-lineStartPoint.x),
            sizeY = Math.abs(y-lineStartPoint.y),
            z = sizeX/2,
            h = sizeY,
            p0 = {x:x,y:y},
            p1 = {x:x - sizeX,y: y - sizeX * 0.5},
            p2 = {x:x - sizeX,y: y - h - sizeX * 0.5},
            p3 = {x:x,y: y - h },
            p4 = {x:x + sizeY,y: y - sizeY * 0.5},
            p5 = {x:x + sizeY,y: y - h - sizeY * 0.5},
            p6 = {x:x - sizeX + sizeY,y: y - h - (sizeX * 0.5 + sizeY * 0.5)},
            p7 = {x:p6.x,y:p2.y+((p1.y-p2.y)/2)};
        var ctx = noAnimation ? drawingCanvas : fakeCanvas;
        ctx.beginPath();
        ctx.globalCompositeOperation="source-over";
        ctx.moveTo(p0.x,p0.y);
        ctx.lineTo(p1.x,p1.y);
        ctx.lineTo(p2.x,p2.y);
        ctx.lineTo(p3.x,p3.y);
        ctx.closePath();
        ctx.lineWidth = lineSize;
        ctx.strokeStyle = currentColor;
        ctx.stroke();

        // right face
        ctx.beginPath();
        ctx.globalCompositeOperation="source-over";
        ctx.moveTo(p0.x,p0.y);
        ctx.lineTo(p4.x,p4.y);
        ctx.lineTo(p5.x,p5.y);
        ctx.lineTo(p3.x,p3.y);
        ctx.closePath();
        ctx.lineWidth = lineSize;
        ctx.strokeStyle = currentColor;
        ctx.stroke();


        ctx.beginPath();
        ctx.globalCompositeOperation="source-over";
        ctx.moveTo(p3.x,p3.y);
        ctx.lineTo(p2.x,p2.y);
        ctx.lineTo(p6.x,p6.y);
        ctx.lineTo(p5.x,p5.y);
        ctx.closePath();
        ctx.lineWidth = lineSize;
        ctx.strokeStyle = currentColor;
        ctx.stroke();

        ctx.beginPath();
        ctx.globalCompositeOperation="source-over";
        ctx.moveTo(p6.x,p6.y);
        ctx.lineTo(p7.x,p7.y);
        ctx.lineTo(p1.x,p1.y);
        ctx.lineTo(p0.x,p0.y);
        ctx.lineTo(p4.x,p4.y);
        ctx.lineTo(p7.x,p7.y);
        ctx.closePath();
        ctx.lineWidth = lineSize;
        ctx.strokeStyle = currentColor;
        ctx.stroke();

    }

    /**
     * ======================================================
     * *************** function to draw cube
     * =====================================================
     */
    function drawCube(x,y){
        drawCubeAnimation(x,y,true);
    }

    /**
     * ======================================================
     * *************** function for cube animation
     * =====================================================
     */

    function drawRectangleAnimation(x,y,noAnimation){
        fakeCanvas.clearRect(0,0,fakeCanvasMaxLenght,fakeCanvasMaxLenght);
        var noAnimation = noAnimation ? noAnimation : false;
        width= x-lineStartPoint.x;
        height = y-lineStartPoint.y;
        if(shiftPressed){
                height = ((x-lineStartPoint.x)/Math.abs(x-lineStartPoint.x))*width;
        }
        var ctx = noAnimation ? drawingCanvas : fakeCanvas;

        ctx.beginPath();
        ctx.globalCompositeOperation="source-over";
        ctx.lineWidth= lineSize;
        ctx.strokeStyle=currentColor;
        ctx.rect(lineStartPoint.x,lineStartPoint.y,width,height);
        ctx.stroke();

    }

    /**
     * ======================================================
     * *************** function to draw cube
     * =====================================================
     */
    function drawRectangle (x,y){
        drawRectangleAnimation(x,y,true);
    }


    /**
     * ======================================================
     * *************** function to draw eraser animation
     * =====================================================
     */
    function showEraserAnimation(left,top,eraserSize){
        fakeCanvas.clearRect(0,0,fakeCanvasMaxLenght,fakeCanvasMaxLenght);
        fakeCanvas.beginPath();
        fakeCanvas.arc(left,top, eraserSize, 0, Math.PI * 2, false);
        fakeCanvas.strokeStyle = '#000';
        fakeCanvas.fillStyle = '#fff';
        fakeCanvas.stroke();
        fakeCanvas.fill();
    }

    /**
     * ======================================================
     * *************** function for circle animation
     * =====================================================
     */
    function drawCircleAnimation(x,y,noAnimation){
        fakeCanvas.clearRect(0,0,fakeCanvasMaxLenght,fakeCanvasMaxLenght);
        var ctx = noAnimation ? drawingCanvas : fakeCanvas;
        var width = x-lineStartPoint.x ;
        var height = y-lineStartPoint.y;
        var centerX = lineStartPoint.x + (width/2);
        var centerY = lineStartPoint.y+(height/2);
        var radius = width>height ? width : height;
        ctx.beginPath();
        ctx.globalCompositeOperation="source-over";
        if(shiftPressed){
            ctx.arc(lineStartPoint.x,lineStartPoint.y,radius,0,Math.PI*2)
        }else{
            ctx.moveTo(centerX, centerY - height/2); // A1
            ctx.bezierCurveTo(
                centerX + width/2, centerY - height/2, // C1
                centerX + width/2, centerY + height/2, // C2
                centerX, centerY + height/2); // A2

            ctx.bezierCurveTo(
                centerX - width/2, centerY + height/2, // C3
                centerX - width/2, centerY - height/2, // C4
                centerX, centerY - height/2); // A1
        }

        ctx.lineWidth = lineSize;
        ctx.strokeStyle = currentColor;
        ctx.stroke();
        ctx.closePath();

    }

    /**
     * ======================================================
     * *************** function for cylinder  animation
     * =====================================================
     */
    function drawCylinderAnimation(x1, y1, noAnimation ) {
        var noAnimation = noAnimation ? noAnimation : false;
        var i, xPos, yPos, pi = Math.PI, twoPi = 2 * pi;
        var w = x1-lineStartPoint.x;
        var h = y1-lineStartPoint.y;
        var ctx = noAnimation ? drawingCanvas : fakeCanvas;
        fakeCanvas.clearRect(0,0,fakeCanvasMaxLenght,fakeCanvasMaxLenght);
        var x = lineStartPoint.x;
        var y = lineStartPoint.y;
        ctx.beginPath();
        ctx.globalCompositeOperation="source-over";
        for (i = 0; i < twoPi; i += 0.001) {
            xPos = (x + w / 2) - (w / 2 * Math.cos(i));
            yPos = (y + h / 8) + (h / 8 * Math.sin(i));

            if (i === 0) {
                ctx.moveTo(xPos, yPos);
            } else {
                ctx.lineTo(xPos, yPos);
            }
        }
        ctx.moveTo(x, y + h / 8);
        ctx.lineTo(x, y + h - h / 8);

        for (i = 0; i < twoPi; i += 0.001) {
            xPos = (x + w / 2) - (w / 2 * Math.cos(i));
            yPos = (y + h - h / 8) + (h / 8 * Math.sin(i));

            if (i === 0) {
                ctx.moveTo(xPos, yPos);
            } else {
                ctx.lineTo(xPos, yPos);
            }
        }
        ctx.moveTo(x + w, y + h / 8);
        ctx.lineTo(x + w, y + h - h / 8);
        ctx.lineWidth = lineSize;
        ctx.strokeStyle = currentColor;
        ctx.stroke();
        ctx.closePath();
    }

    /**
     * ======================================================
     * *************** function for cone animation
     * =====================================================
     */
    function drawConeAnimation(x1,y1,noAnimation){
        var noAnimation = noAnimation ? noAnimation : false;
        var i, xPos, yPos, pi = Math.PI, twoPi = 2 * pi;
        var w = x1-lineStartPoint.x;
        var h = y1-lineStartPoint.y;
        var ctx = noAnimation ? drawingCanvas : fakeCanvas;
        fakeCanvas.clearRect(0,0,fakeCanvasMaxLenght,fakeCanvasMaxLenght);
        var x = lineStartPoint.x;
        var y = lineStartPoint.y;
        ctx.beginPath();
        ctx.globalCompositeOperation="source-over";

        ctx.moveTo(x, y);
        ctx.lineTo(x-w, y + h - h / 8);

        for (i = 0; i < twoPi; i += 0.001) {
            xPos = (x1-w) -  (w  * Math.cos(i));
            yPos = (y + h - h / 8) + (h / 8 * Math.sin(i));
            if (i === 0) {
                ctx.moveTo(xPos, yPos);
            } else {
                ctx.lineTo(xPos, yPos);
            }
        }
        ctx.moveTo(x , y);
        ctx.lineTo(x + w, y + h - h / 8);
        ctx.lineWidth = lineSize;
        ctx.strokeStyle = currentColor;
        ctx.stroke();
        ctx.closePath();
    }

    /**
     * ======================================================
     * *************** function for pyramid animation
     * =====================================================
     */
    function drawPyramidAnimation(x,y,noAnimation){
        var noAnimation = noAnimation ? noAnimation : false;
        var w = x-lineStartPoint.x;
        var h = y-lineStartPoint.y;
        var ctx = noAnimation ? drawingCanvas : fakeCanvas;
        fakeCanvas.clearRect(0,0,fakeCanvasMaxLenght,fakeCanvasMaxLenght);
        var r = h/4;
        var p1 = {x:x-w-(r*Math.cos(Math.PI/4)),y:y+(r*Math.sin(Math.PI/4))},
            p2 = {x:x-w+(r*Math.cos(Math.PI/4)),y:y+(r*Math.sin(-Math.PI/4))},
            p3 = {x:x+w+(r*Math.cos(Math.PI/4)),y:y+(r*Math.sin(-Math.PI/4))},
            p4 = {x:x+w-(r*Math.cos(Math.PI/4)),y:y+(r*Math.sin(Math.PI/4))};
        var points = [p1,p2,p3,p4];
        ctx.beginPath();
        ctx.globalCompositeOperation="source-over";
        ctx.moveTo(p1.x,p1.y);
        ctx.lineTo(p2.x,p2.y);
        ctx.lineTo(p3.x,p3.y);
        ctx.lineTo(p4.x,p4.y);
        ctx.lineTo(p1.x,p1.y);
        for(var i in points){
            var point = points[i];
            ctx.moveTo(lineStartPoint.x,lineStartPoint.y);
            ctx.lineTo(point.x,point.y);
        }
        ctx.lineWidth = lineSize;
        ctx.strokeStyle = currentColor;
        ctx.stroke();
        ctx.closePath();
    }

    /**
     * ======================================================
     * *************** function for x-graph animation
     * =====================================================
     */
    function drawXGraphAnimation(x,y,noAnimation){
        var noAnimation = noAnimation ? noAnimation : false;
        var w = Math.ceil(Math.abs(x-lineStartPoint.x));
        var ctx = noAnimation ? drawingCanvas : fakeCanvas;
        fakeCanvas.clearRect(0,0,fakeCanvasMaxLenght,fakeCanvasMaxLenght);
        if(noAnimation){
            var pointsArray = [];
            var i = x>lineStartPoint.x?lineStartPoint.x:x,
                endP = ( x>lineStartPoint.x?x:lineStartPoint.x)+2;
            while(i<= endP){
                var factor = w/10;
                pointsArray.push({x:Math.floor(i),y:lineStartPoint.y});
                i+=factor;
            }

            for(var j in pointsArray){
                var point = pointsArray[j];
                ctx.beginPath();
                ctx.globalCompositeOperation="source-over";
                ctx.moveTo(point.x,point.y-5);
                ctx.lineTo(point.x,point.y+5);
                ctx.strokeStyle = currentColor;
                ctx.lineWidth = 3;
                ctx.stroke();
                ctx.closePath();
                ctx.font = 'normal 14px '+font;
                ctx.fillStyle = currentColor;
                ctx.fillText(j*10,point.x-3,point.y+14 );
            }
        }
        var startX = lineStartPoint.x+(x>lineStartPoint.x?-10 :10),
            endX = x+(x>lineStartPoint.x?10 :-10);
        drawArrow(startX,lineStartPoint.y,ctx,x-lineStartPoint.x>0?0:Math.PI);
        ctx.beginPath();
        ctx.globalCompositeOperation="source-over";
        ctx.moveTo(startX,lineStartPoint.y);
        ctx.lineTo(endX,lineStartPoint.y);
        ctx.strokeStyle = currentColor;
        ctx.lineWidth = 2;
        ctx.stroke();
        ctx.closePath();
        drawArrow(endX,lineStartPoint.y,ctx,x-lineStartPoint.x>0?Math.PI:0);
    }

    /**
     * ======================================================
     *
     * *************** function for xy-graph animation
     * =====================================================
     */
    function drawXYGraphAnimation(x,y,noAnimation){
        var noAnimation = noAnimation ? noAnimation : false;
        var w = Math.ceil(Math.abs(x-lineStartPoint.x));
        var h = Math.ceil(Math.abs(y-lineStartPoint.y));
        var ctx = noAnimation ? drawingCanvas : fakeCanvas;
        fakeCanvas.clearRect(0,0,fakeCanvasMaxLenght,fakeCanvasMaxLenght);



        var startX = lineStartPoint.x,
            endX = x;
        var startY = lineStartPoint.y,endY = y;

        var dx = Math.abs(startX-endX),
            dy = Math.abs(startY-endY);

        //draw rectainge
       drawRectangleAnimation(x,y,noAnimation);


        //find midpoints

        var mx = x>lineStartPoint.x ? (lineStartPoint.x+(dx/2)) : x+(dx/2),
            my = y>lineStartPoint.y ? (lineStartPoint.y+(dy/2)) : y+(dy/2);


        //draw horizontal line
        drawArrow(startX,my,ctx,(x-lineStartPoint.x)>0?0:Math.PI);
        ctx.beginPath();
        ctx.globalCompositeOperation="source-over";
        ctx.moveTo(startX,my);
        ctx.lineTo(endX,my);
        ctx.strokeStyle = currentColor;
        ctx.lineWidth = lineSize;
        ctx.stroke();
        ctx.closePath();
        drawArrow(endX,my,ctx,(x-lineStartPoint.x)>0?Math.PI:0);

        //draw vertical line

        //draw horizontal line
        drawArrow(mx,startY,ctx,(y-lineStartPoint.y>0)? Math.PI/2:2*Math.PI);
        ctx.beginPath();
        ctx.globalCompositeOperation="source-over";
        ctx.moveTo(mx,startY);
        ctx.lineTo(mx,endY);
        ctx.strokeStyle = currentColor;
        ctx.lineWidth = lineSize;
        ctx.stroke();
        ctx.closePath();
        drawArrow(mx,endY,ctx,(y-lineStartPoint.y>0)? 2*Math.PI : Math.PI/2);


        if(noAnimation){
            //draw vertical lines
            var pointsArrayX = [];
            var i = (x>lineStartPoint.x?lineStartPoint.x:x)+10,
                endPX = ( x>lineStartPoint.x?x:lineStartPoint.x);
            while(i<= endPX){
                var factor = (w/20)-1;
                pointsArrayX.push({x:Math.floor(i),y:my});
                i+=factor;
            }

            for(var j in pointsArrayX){
                var point = pointsArrayX[j];
                ctx.beginPath();
                ctx.globalCompositeOperation="source-over";
                ctx.moveTo(point.x,point.y-dy/2);
                ctx.lineTo(point.x,point.y+dy/2);
                ctx.lineWidth = 1;
                ctx.strokeStyle = graphColor;
                ctx.stroke();
                ctx.closePath();


                ctx.beginPath();
                ctx.globalCompositeOperation="source-over";
                if(j%2==0){

                    ctx.moveTo(point.x,point.y-5);
                    ctx.lineTo(point.x,point.y+5);
                    ctx.strokeStyle = currentColor;
                    ctx.lineWidth = 3;
                    ctx.stroke();
                    ctx.closePath();
                    ctx.font = 'normal 12px '+font;
                    ctx.fillStyle = currentColor;
                    ctx.fillText(j-10,point.x-3,point.y+20 );
                }else{
                    ctx.moveTo(point.x,point.y-2);
                    ctx.lineTo(point.x,point.y+2);
                    ctx.strokeStyle = currentColor;
                    ctx.lineWidth = 3;
                    ctx.stroke();
                    ctx.closePath();
                }


            }


            //draw horizontal lines
            var pointsArrayY = [];
            var k = (y>lineStartPoint.y?lineStartPoint.y:y)+10,
                endPY = ( y>lineStartPoint.y?y:lineStartPoint.y);
            while(k<= endPY){
                var factor = (h/20)-1;
                pointsArrayY.push({x:mx,y:Math.floor(k)});
                k+=factor;
            }

            for(var l in pointsArrayY){
                var point = pointsArrayY[l];
                ctx.beginPath();
                ctx.globalCompositeOperation="source-over";
                ctx.moveTo(point.x+w/2,point.y);
                ctx.lineTo(point.x-w/2,point.y);
                ctx.lineWidth = 1;
                ctx.strokeStyle = graphColor;
                ctx.stroke();
                ctx.closePath();


                ctx.beginPath();
                ctx.globalCompositeOperation="source-over";
                if(l%2==0){

                    ctx.moveTo(point.x-5,point.y);
                    ctx.lineTo(point.x+5,point.y);
                    ctx.strokeStyle = currentColor;
                    ctx.lineWidth = 3;
                    ctx.stroke();
                    ctx.closePath();
                    ctx.font = 'normal 12px '+font;
                    ctx.fillStyle = currentColor;
                    ctx.fillText(10-l,point.x-20,point.y+3 );
                }else{
                    ctx.moveTo(point.x-2,point.y);
                    ctx.lineTo(point.x+2,point.y);
                    ctx.strokeStyle = currentColor;
                    ctx.lineWidth = 3;
                    ctx.stroke();
                    ctx.closePath();
                }


            }

        }

    }


    function drawArrow(x,y,ctx,orientation){
        var factor = Math.ceil(Math.sin(orientation)/Math.abs(Math.sin(orientation)));
        var angleL = orientation+Math.PI/4;
        var angleR = orientation+2*Math.PI/3;
        var r = 8,
            x1= x+r*Math.cos(angleL),
            y1 = y+r*Math.sin(angleL),
            x2 = x-r*Math.cos(angleR),
            y2 = y-r*Math.sin(angleR);

            if(orientation>=(Math.PI*2)){
                x1 =  x - r*Math.cos(Math.PI/4);
                y1 = y - r*Math.sin(Math.PI/4);
            }
            ctx.beginPath();
            ctx.globalCompositeOperation="source-over";
            ctx.moveTo(x,y);
            ctx.lineTo(x1,y1);
            ctx.strokeStyle = currentColor;
            ctx.lineWidth = 2;
            ctx.stroke();
            ctx.moveTo(x,y);
            ctx.lineTo(x2,y2);
            ctx.strokeStyle = currentColor;
            ctx.stroke();
            ctx.lineWidth = 2;
            ctx.closePath();

    }


    textInput.on('focus change click keydown',function(e){
        fa.show();
         setTimeout(function(){
             var inputValue = (textInput.val() ? textInput.val() : '')+'|';
             var textValArray = inputValue.split('\n');
             var textLength = (inputValue.length+1) * (fontSize/2);
             if((textLength+textLeftCord)>drawingC.width){
                 rC.width = (textLength+textLeftCord);
                 rC.height = drawingC.height;
                 resizeCanvas.drawImage(drawingC, 0, 0);
                 dc.attr('width',textLength+textLeftCord);
                 fa.attr('width',textLength+textLeftCord);
                 drawingCanvas.drawImage(rC,0,0);
             }
             fakeCanvas.clearRect(0,0,fakeCanvasMaxLenght,fakeCanvasMaxLenght);
            fakeCanvas.font = fontStyle+' ' +fontSize+'px '+font;
            fakeCanvas.fillStyle = currentColor;
             fakeCanvas.font = fontStyle+' ' +fontSize+'px '+font;
             fakeCanvas.fillStyle = currentColor;
             for(var i in textValArray){
                 if(textValArray[i]){
                     fakeCanvas.fillText(textValArray[i],textLeftCord,textTopCord+15+(i*fontSize) );
                 }
             }

        },5);
         if(textAnimation)
            clearInterval(textAnimation);
        textAnimation = setInterval(function (){
            var textValue = (textInput.val() ? textInput.val() : '')+(textCursor ? '|' :'');
            var textValArray = textValue.split('\n');
            if(textCursor){
                textValue = textValue+'|';
                textCursor= false;
            }
            else{
                textCursor = true;
            }

            fakeCanvas.clearRect(0,0,fakeCanvasMaxLenght,fakeCanvasMaxLenght);

            fakeCanvas.font = fontStyle+' ' +fontSize+'px '+font;
            fakeCanvas.fillStyle = currentColor;
            for(var i in textValArray){
                    fakeCanvas.fillText(textValArray[i],textLeftCord,textTopCord+15+(i*fontSize) );
            }
        },500);
    });
    textInput.blur(function (e){
        if(symbolEnabled){
            return false;
        }
        $('.js-sup-sub').val('');
        clearInterval(textAnimation);
        $(this).hide();
        var textVal = $(this).val() ? $(this).val() : '';
        var textValArray = textVal.split('\n');
        var left = lineStartPoint.x,
            top = lineStartPoint.y;
        fa.hide();
        $('#mouse-cursor').click();
        if (textEnabled) {
            drawingCanvas.globalCompositeOperation = "source-over";
            drawingCanvas.font = fontStyle + ' ' + fontSize + 'px ' + font;
            drawingCanvas.fillStyle = currentColor;
            for (var i in textValArray) {
                drawingCanvas.fillText(textValArray[i], textLeftCord, textTopCord + 15 + (i * fontSize));
            }
            textInput.val('');
            textEnabled = false;
        }
    });

    //print canvas
    $('#print-canvas').click(function (e){
        e.preventDefault();
        var dataUrl = drawingC.toDataURL();

        var printContent = '<!Doctype html>' +
            '<html>' +
            '<head><title>Print</title></head>' +
            '<body>' +
            '<img src="'+dataUrl+'">' +
            '</body>' +
            '</html>';
        var printWindow = window.open('','',width=$('body').width(),height=$('body').height());
        printWindow.document.write(printContent);
        printWindow.document.addEventListener('load',function(){
            printWindow.focus();
            printWindow.print();
            printWindow.document.close();
            printWindow.close();
        },true)

    })

    $('#paste-tool').click(function (){
        document.execCommand("Paste");
    });
    // for paste option
    document.onpaste = function(event){
        var items = (event.clipboardData || event.originalEvent.clipboardData).items;
        var memeType = JSON.stringify(items);
        for (index in items) {
            var item = items[index];
            if (item.kind === 'file') {
                var blob = item.getAsFile();
                var reader = new FileReader();
                reader.onload = function(event) {

                    var img = new Image;
                    img.onload = function () {
                        var width = img.width;
                        var height = img.height;
                        var canvasHeight = drawingC.height;
                        var canvasWidth = drawingC.width;
                        var left = currentMouse.x+width;
                        var top = currentMouse.y+height;
                        if(left>canvasWidth){
                            parentDiv.scrollLeft(left);
                            rC.width = canvasWidth;
                            rC.height = canvasHeight;
                            resizeCanvas.drawImage(drawingC, 0, 0);
                            dc.attr('width',left);
                            fa.attr('width',left);
                            drawingCanvas.drawImage(rC,0,0);
                        }
                        if(top>canvasHeight){
                            parentDiv.scrollLeft(top);
                            rC.width = canvasWidth;
                            rC.height = canvasHeight;
                            resizeCanvas.drawImage(drawingC, 0, 0);
                            dc.attr('height',top);
                            fa.attr('height',top);
                            drawingCanvas.drawImage(rC,0,0);
                        }
                        drawingCanvas.drawImage(img, currentMouse.x,currentMouse.y);
                    };
                    img.src = event.target.result;


                };
                reader.readAsDataURL(blob);
            }
        }
    }


    function insertSymbols(dom,callback){

        domtoimage.toPng(dom[0])
            .then(function(dataUrl) {
                var img = new Image;
                img.onload = function () {
                    var width = img.width;
                    var height = img.height;
                    var canvasHeight = drawingC.height;
                    var canvasWidth = drawingC.width;
                    var left = lineStartPoint.x+width;
                    var top = lineStartPoint.y+height;
                    if(left>canvasWidth){
                        parentDiv.scrollLeft(left);
                        rC.width = canvasWidth;
                        rC.height = canvasHeight;
                        resizeCanvas.drawImage(drawingC, 0, 0);
                        dc.attr('width',left);
                        fa.attr('width',left);
                        drawingCanvas.drawImage(rC,0,0);
                    }
                    if(top>canvasHeight){
                        parentDiv.scrollLeft(top);
                        rC.width = canvasWidth;
                        rC.height = canvasHeight;
                        resizeCanvas.drawImage(drawingC, 0, 0);
                        dc.attr('height',top);
                        fa.attr('height',top);
                        drawingCanvas.drawImage(rC,0,0);
                    }
                    drawingCanvas.drawImage(img, lineStartPoint.x,lineStartPoint.y);
                    return callback();
                };
                img.src = dataUrl;

            })
            .catch(function(error) {
                return callback();
                console.error('oops, something went wrong!', error);
            });
    }
});

function getCoords(elem) {
    var box = elem.getBoundingClientRect();
    var scrollLeft = $(elem).parent().scrollLeft();
    var scrollTop = $(elem).parent().scrollTop();
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








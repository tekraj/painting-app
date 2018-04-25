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
Array.prototype.max = function() {
    return Math.max.apply(Math, this);
};

Array.prototype.min = function() {
    return Math.min.apply(Math, this);
};
//plugin to move cursor
$.fn.selectRange = function (start,end){
    if(end==undefined){
        end = start;
    }
    return this.each(function(){
        if('selectionStart' in this){
            this.selectionStart = start;
            this.selectionEnd = end;
        } else if(this.setSelectionRange){
            this.setSelectionRange(start,end);
        }else if(this.createTextRange){
            var range = this.createTextRange();
            range.collapse(true);
            range.moveEnd('character',end);
            range.moveStart('character',start);
            range.select();
        }
    });
}

$(document).ready(function(){

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
            sessionC = document.getElementById('session-canvas'),
            sessionCanvas = sessionC.getContext('2d'),
            sc = $('#session-canvas'),
            cursor = 'default',
            currentColor = '#000',
            font = $('.js-font.active').data().font,
            fontSize = $('.js-font-size.active').data().size,
            fontStyle = $('.js-font-style.active').data().style,
            lineSize = 1,
            position = getCoords(drawingC),
            textInput = $('#canvas-text-input'),
            textEnabled = false,
            canvasObjects = [],
            draggingShape ={},
            eraserSize = lineSize,
            dc=$('#drawing-board'),
            parentDiv = dc.parent(),
            fa = $('#fake-canvas'),
            imageHolder = $('#canvas-image-holder'),
            $enableTextTool = $('#enable-text-tool'),
            textLeftCord,
            currentMouse = {x:0,y:0},
            textTopCord,
            pencilPoints=[],
            shiftPressed  = false,
            textAnimation,
            textCursor = true,
            pixColor =  [],
            drag= [],
            symbolEnabled = false,
            scienceEnabled = false,
            graphColor = '#ccc',
            fakeCanvasMaxLenght = 10000,
            textHolder = $('#text-holder'),
            mouseDown,
            lineStartPoint ={x:0,y:0},
            lineEndPoint = {x:0,y:0},
            j=0,
            pdfEnabled=false,
            pdfReaderWrapper = $('#pdf-reader'),
            background = '#fff',
            currentTool = 'text';
        dc.css({'cursor':cursor});
        var parentHeight = dc.parent().height();
        var parentWidth = dc.parent().width();
        dc.attr({'height':parentHeight-8,'width':parentWidth-5});
        fa.attr({'height':parentHeight-8,'width':parentWidth-5});
        sc.attr({'height':parentHeight-8,'width':parentWidth-5});
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
        $('#demo-font-text,#text-holder').css({'font-family':font,'font-size':fontSize,'font-style':fontStyle});
        textInput.css({'font-family':font,'font-size':fontSize,'font-style':fontStyle});
        $('.js-enable-symbol').mouseover(function(){
            symbolEnabled = true;
        }).mouseleave(function(){
            symbolEnabled = false;
        });
        //enable subscript and superscript
        $('#enable-subscript').mouseover(function(){
            symbolEnabled = true;
        }).click(function (e){
            e.preventDefault();
            setTimeout(function(){
                var currentTextValue = textInput.val();
                symbolEnabled = false;
                textInput.val(currentTextValue+"~`").change();
                var textValue = textInput.val();
                textInput.focus();
                var subPosition = textValue.lastIndexOf('`');
                textInput.selectRange(subPosition);
                textInput.change();
            },100)

        }).mouseleave(function () {
            symbolEnabled = false;
        });
        //clear math editor
    $('#clear-math-editor').click(function (e) {
        e.preventDefault();
        $('.eqEdWrapper').remove();
    })
        $('#enable-superscript').mouseover(function(){
            symbolEnabled = true;
        }).click(function (e){
            setTimeout(function(){
                var currentTextValue = textInput.val();
                symbolEnabled = false;
                textInput.val(currentTextValue+"!^").change();
                var textValue = textInput.val();
                textInput.focus();
                var subPosition = textValue.lastIndexOf('^');
                textInput.selectRange(subPosition);
                textInput.change();
            },100)
        }).mouseleave(function(){
            symbolEnabled = false;
        });

        $('.js-science-symbol').click(function(e){
            e.preventDefault();
            symbolEnabled = true;
            var symbol = $(this).data().symbol;
            var currentTextValue = textInput.val();
            setTimeout(function(){
                symbolEnabled = false;
                textInput.val(currentTextValue+symbol).change();
                textInput.focus();
            },100)

        });
        var symbolModal = $('#symbol-modal');
        $('.js-enable-science').mouseover(function(){
            symbolEnabled = true;
        }).
        click(function (e) {
            e.preventDefault();

            symbolModal.attr('style','');
            symbolModal.modal('show');
            clearOnMouseDown();
            var container = $('.eqEdContainer').data("eqObject");
            addHighlight(container);
            var characterClickPos = container.domObj.value.offset().left;
            addCursor(container, characterClickPos);
        });

        //change default color
        $('.js-color-code').click(function(e){
            e.preventDefault();
            var color = $(this).data().color;
            currentColor = color;
            $('.js-color-code').removeClass('active');
            $(this).addClass('active');
            $('#color-indicator').css({'background':color});
            $('#canvas-text-input').css('color',color);
            textHolder.css('color',color);
            currentTool = 'none';
            dc.css({'cursor':cursor});
            setTimeout(function(){
                if($enableTextTool.hasClass('active')){
                    $enableTextTool.click();
                }

            },50);
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
            if(pdfEnabled){
                alert('Currently You are in Read Mode');
                return false;
            }

            $('.js-tools').removeClass('active');
            $(this).addClass('active');

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
            lineSize = $(this).data().line;
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
            $('.js-text-demo,#text-holder').css({'font-family':font,'font-size':fontSize});

            if(fontStyle=='italic' || fontStyle=='bold italic'){
                $('.js-text-demo,#text-holder').css({'font-style':'italic'});
            }else{
                $('.js-text-demo,#text-holder').css({'font-style':'normal'});
            }
            if(fontStyle=='bold' || fontStyle=='bold italic'){
                $('.js-text-demo,#text-holder').css({'font-weight':'bold'});
            }else{
                $('.js-text-demo,#text-holder').css({'font-weight':'normal'});
            }


            dc.css({'cursor':cursor});
            currentTool = 'none';
            $('.option-menu').hide();
            $('.eqEdEquation').css({'font-size':fontSize});
            setTimeout(function(){
                $enableTextTool.click();
            },50);

        });

        $('#cancel-font').click(function (e){
            e.preventDefault();
            $('.option-menu').hide();
        });

        //browse cloud
        $('#browse-cloud').click(function (e){
            e.preventDefault();
            $.ajax({
                type : 'get',
                url : 'js/file.json',
                success : function (response) {
                    $('#tree-holder').jstree({
                        'core': {
                            'data': response
                        }
                    });
                    $('#cloud-modal').modal('show');
                }
            })
        });

        //read file
        $(document).on('click','.js-read-cloud-file',function(){
            $('.canvas-wrapper').addClass('no-scroll');
           var file = $(this).attr('file');
           $('#cloud-modal').modal('hide');
            $('.js-tools').removeClass('.active');
            $('#enable-drawing').removeClass('active');
            $('.canvas-wrapper').find('canvas').hide();
            $('#reader-mode-indicator').addClass('active');
            pdfReaderWrapper.show();
            pdfEnabled = true;
            pdfReaderWrapper.html(' <object data="'+file+'" type="application/pdf" width="600" height="490"></object>');
        });

        //enable canvas
        $('#enable-drawing').click(function (e){
            $('.canvas-wrapper').removeClass('no-scroll');
            e.preventDefault();
            $('.js-tools').removeClass('.active');
            $(this).addClass('active');
            $('.canvas-wrapper').find('canvas').show();
            position = getCoords(drawingC)
            pdfReaderWrapper.hide();
            pdfEnabled = false;
            $('#reader-mode-indicator').removeClass('active');
        }) ;

        //insert symbols
        $('#toLatex').on('click', function() {
            // var jsonObj = $('.eqEdEquation').data('eqObject').buildJsonObj();
            // var latex = generateLatex(jsonObj.operands.topLevelContainer);
            // console.log(latex);
            // // $('.eqEdEquation').find('.eqEdContainer').attr('')

            insertSymbols($('.eqEdContainer'),function(){
                $('.modal').modal('hide');
                symbolEnabled = false;
                setTimeout(function () {
                    textInput.focus().blur();
                }, 100);
            });
        });

        //clear canvas
        $('.js-clear-canvas').click(function(){
            var ans = $(this).data().ans;
            if(ans=='yes'){
                var href = drawingC.toDataURL("image/png");
                $.ajax({
                    type: 'post',
                    url: 'home/saveCanvasImage',
                    data: { imageData: href.replace('data:image/png;base64,','') },
                    success: function (response) {
                        console.log(response);
                    }
                });
                dc.css('cursor','default');
            }
            $('.modal').modal('hide');
            drawingCanvas.clearRect(0,0,drawingC.width,drawingC.height);
            drag =[];
            pencilPoints=[];
        });

        //detect shit key pressed for straight lines and squares
        $('body').keydown(function(e){
            if(e.keyCode==16)
                shiftPressed = true;
        });
        $('body').keyup(function(e){

            if(currentTool=='p-line'){
                drawLine(lineStartPoint.x,lineStartPoint.y,lineEndPoint.x,lineEndPoint.y);
                currentTool='pencil';
                fa.hide();
            }
            shiftPressed = false;

        });

        //function for pushing the values in the arraysx
        function pushPencilPoints(x,y,tf){
           pencilPoints.push({x:x,y:y});
        }

        /**
         * ======================================================
         * *************** event handlers
         * =====================================================
         */

        //click event for body

        //mouseDown Event Handler
        dc.mousedown(function(e){

            mouseDown = true;
            var left = e.pageX-position.left,
                top = e.pageY-position.top;
            lineStartPoint.x = left;
            lineStartPoint.y = top;

            if(currentTool=='pencil'){
                pushPencilPoints(left,top)
                drawPencil(drawingCanvas);
            }else if( currentTool=='text' && !textEnabled){
                //check for text edit
                fa.show();
                textEnabled = true;
                $enableTextTool.addClass('border');
                textHolder.show();
                var isPrevTextField = checkTextEdit(left,top);
                if(isPrevTextField!==false){
                    textInput.show().css({left:isPrevTextField.left,top:isPrevTextField.top});
                    textInput.val(isPrevTextField.html);
                    textLeftCord=isPrevTextField.left;
                    textTopCord = isPrevTextField.top;
                }else{
                    textInput.show().css({left:left,top:top});
                    textLeftCord=left;
                    textTopCord = top;
                }
                setTimeout(function(){
                    textInput.focus();
                },10);


            }else if(currentTool=='line' || currentTool=='cube' || currentTool=='rectangle' ||currentTool=='oval' || currentTool=='cone' || currentTool=='pyramid' || currentTool=='xgraph' || currentTool=='xygraph' || currentTool=='cylinder' || currentTool=='rectangle-filled' || currentTool=='oval-filled' || currentTool=='line-sarrow' ||  currentTool=='line-darrow'){
                fa.show();
                lineStartPoint.x = left;
                lineStartPoint.y = top;
            }else if(currentTool=='drag'){
               var init =  initializeDrag(left,top);
               if(init){
                   redrawCanvas();
                   showDragUIAnimation(left,top);
               }
            }
            // else if(currentTool=='none'){
            //     $enableTextTool.click();
            // }

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
                if(currentTool=='drag'){
                    showDragUIAnimation(left,top)
                }else if (currentTool == 'paint-bucket') {
                    drawingCanvas.fillRect(0, 0, c.width, c.height);
                    drawingCanvas.beginPath();
                    drawingCanvas.rect(0, 0, c.width, c.height);
                    drawingCanvas.fillStyle = currentColor;
                    drawingCanvas.fill();
                    background = currentColor;
                    paintBucket = false;
                    drag = [];


                } else if (currentTool == 'eraser') {
                    fa.show();
                    showEraserAnimation(left,top,eraserSize);
                    drawingCanvas.beginPath();
                    drawingCanvas.globalCompositeOperation = "destination-out";
                    drawingCanvas.arc(left,top, eraserSize, 0, Math.PI * 2, false);
                    drawingCanvas.fill();
                    drawingCanvas.globalCompositeOperation = 'source-over';
                } else if (currentTool == 'pencil') {

                    //if shift is pressed draw straight line
                    if(shiftPressed ){
                        fa.show();
                        if(pencilPoints.length>0){
                            lineStartPoint.x = pencilPoints[pencilPoints.length-1].x;
                            lineStartPoint.y = pencilPoints[pencilPoints.length-1].y;
                        }else{
                            lineStartPoint.x = left;
                            lineStartPoint.y = top;
                        }
                        pencilPoints = [];
                        currentTool= 'p-line';
                    }else{
                        pushPencilPoints(left,top, true);
                        drawPencil(drawingCanvas);
                    }

                }else if( currentTool=='line'|| currentTool=='p-line'){
                    drawLineAnimation(lineStartPoint.x,lineStartPoint.y,left,top);
                }else if(currentTool=='cube'){
                    drawCubeAnimation(lineStartPoint.x,lineStartPoint.y,left,top);
                }else if(currentTool=='rectangle'){
                    drawRectangleAnimation(lineStartPoint.x,lineStartPoint.y,left,top);
                }else if(currentTool=='oval'){
                    drawCircleAnimation(lineStartPoint.x,lineStartPoint.y,left,top);
                }else if(currentTool=='cylinder'){
                    drawCylinderAnimation(lineStartPoint.x,lineStartPoint.y,left,top);
                }else if(currentTool=='cone'){
                    drawConeAnimation(lineStartPoint.x,lineStartPoint.y,left,top);
                }else if(currentTool=='pyramid'){
                    drawPyramidAnimation(lineStartPoint.x,lineStartPoint.y,left,top);
                }else if(currentTool=='xgraph'){
                    drawXGraphAnimation(lineStartPoint.x,lineStartPoint.y,left,top);
                }else if(currentTool=='xygraph'){
                    drawXYGraphAnimation(lineStartPoint.x,lineStartPoint.y,left,top);
                }else if(currentTool=='rectangle-filled'){
                    drawRectangleAnimation(lineStartPoint.x,lineStartPoint.y,left,top,false,true);
                }
                else if(currentTool=='oval-filled'){
                    drawCircleAnimation(lineStartPoint.x,lineStartPoint.y,left,top,false,true);
                }else if(currentTool=='line-sarrow'){
                    drawLineAnimation(lineStartPoint.x,lineStartPoint.y,left,top,false,'single');
                }else if(currentTool=='line-darrow'){
                    drawLineAnimation(lineStartPoint.x,lineStartPoint.y,left,top,false,'double');
                }
            }
        });

        //mouseup
        $('body').mouseup(function(e){

            var left = e.pageX - position.left;
            var top = e.pageY - position.top;
            if(mouseDown){
                fa.hide();
                if(currentTool=='drag'){
                    drawShapeAgain();
                }else if(currentTool=='pencil'){

                    saveCanvasObjects('pencil',{lineSize:lineSize,color:currentColor,pencilPoints : pencilPoints});
                }else if(currentTool=='line'){
                    drawLine(lineStartPoint.x,lineStartPoint.y,left,top);
                    saveCanvasObjects('line',{startX:lineStartPoint.x,startY:lineStartPoint.y,endX:left,endY:top,shift:shiftPressed,color:currentColor,lineSize:lineSize});
                }else if(currentTool=='cube'){
                    drawCube(lineStartPoint.x,lineStartPoint.y,left,top);
                    saveCanvasObjects('cube',{startX:lineStartPoint.x,startY:lineStartPoint.y,endX:left,endY:top,shift:shiftPressed,color:currentColor,lineSize:lineSize});
                }else if(currentTool=='rectangle'){
                    drawRectangle(lineStartPoint.x,lineStartPoint.y,left,top);
                    saveCanvasObjects('rectangle',{startX:lineStartPoint.x,startY:lineStartPoint.y,endX:left,endY:top,shift:shiftPressed,color:currentColor,lineSize:lineSize});
                }else if(currentTool=='oval'){
                    drawCircleAnimation(lineStartPoint.x,lineStartPoint.y,left,top,true);
                    saveCanvasObjects('oval',{startX:lineStartPoint.x,startY:lineStartPoint.y,endX:left,endY:top,shift:shiftPressed,color:currentColor,lineSize:lineSize});
                }else if(currentTool=='cylinder'){
                    drawCylinderAnimation(lineStartPoint.x,lineStartPoint.y,left,top,true);
                    saveCanvasObjects('cylinder',{startX:lineStartPoint.x,startY:lineStartPoint.y,endX:left,endY:top,shift:shiftPressed,color:currentColor,lineSize:lineSize});
                }else if(currentTool=='cone'){
                    drawConeAnimation(lineStartPoint.x,lineStartPoint.y,left,top,true);
                    saveCanvasObjects('cone',{startX:lineStartPoint.x,startY:lineStartPoint.y,endX:left,endY:top,shift:shiftPressed,color:currentColor,lineSize:lineSize});
                }else if(currentTool=='pyramid'){
                    drawPyramidAnimation(lineStartPoint.x,lineStartPoint.y,left,top,true);
                    saveCanvasObjects('pyramid',{startX:lineStartPoint.x,startY:lineStartPoint.y,endX:left,endY:top,shift:shiftPressed,color:currentColor,lineSize:lineSize});
                }else if(currentTool=='xgraph'){
                    drawXGraphAnimation(lineStartPoint.x,lineStartPoint.y,left,top,true);
                    saveCanvasObjects('xgraph',{startX:lineStartPoint.x,startY:lineStartPoint.y,endX:left,endY:top,shift:shiftPressed,color:currentColor,lineSize:lineSize});
                }else if(currentTool=='xygraph'){
                    drawXYGraphAnimation(lineStartPoint.x,lineStartPoint.y,left,top,true);
                    saveCanvasObjects('xygraph',{startX:lineStartPoint.x,startY:lineStartPoint.y,endX:left,endY:top,shift:shiftPressed,color:currentColor,lineSize:lineSize});
                }else if(currentTool=='rectangle-filled'){
                    drawRectangleAnimation(lineStartPoint.x,lineStartPoint.y,left,top,true,true);
                    saveCanvasObjects('rectangle-filled',{startX:lineStartPoint.x,startY:lineStartPoint.y,endX:left,endY:top,shift:shiftPressed,color:currentColor,lineSize:lineSize});
                }else if(currentTool=='oval-filled'){
                    drawCircleAnimation(lineStartPoint.x,lineStartPoint.y,left,top,true,true);
                    saveCanvasObjects('oval-filled',{startX:lineStartPoint.x,startY:lineStartPoint.y,endX:left,endY:top,shift:shiftPressed,color:currentColor,lineSize:lineSize});
                }else if(currentTool=='line-sarrow'){
                    drawLineAnimation(lineStartPoint.x,lineStartPoint.y,left,top,true,'single');
                    saveCanvasObjects('line-sarrow',{startX:lineStartPoint.x,startY:lineStartPoint.y,endX:left,endY:top,shift:shiftPressed,color:currentColor,lineSize:lineSize});
                }else if(currentTool=='line-darrow'){
                    drawLineAnimation(lineStartPoint.x,lineStartPoint.y,left,top,true,'double');
                    saveCanvasObjects('line-darrow',{startX:lineStartPoint.x,startY:lineStartPoint.y,endX:left,endY:top,shift:shiftPressed,color:currentColor,lineSize:lineSize});
                }
                saveCanvasState(drawingC);
            }
            fakeCanvas.clearRect(0,0,fakeC.height,fakeC.width);
            mouseDown = false;
            pencilPoints = [];
            lineEndPoint.x = left;
            lineEndPoint.y = top;
        });

        function midPointBtw(p1, p2) {
            return {
                x: p1.x + (p2.x - p1.x) / 2,
                y: p1.y + (p2.y - p1.y) / 2
            };
        }

        /**
         * ======================================================
         * *************** draw with pencil
         * =====================================================
         */

        function drawPencil(ctx){
            var p1 = pencilPoints[0];
            var p2 = pencilPoints[1];

            ctx.beginPath();
            ctx.globalCompositeOperation="source-over";
            ctx.moveTo(p1.x, p1.y);
            for (var i = 1, len = pencilPoints.length; i < len; i++) {
                var midPoint = midPointBtw(p1, p2);
                ctx.quadraticCurveTo(p1.x, p1.y, midPoint.x, midPoint.y);
                p1 = pencilPoints[i];
                p2 = pencilPoints[i+1];
            }

           // ctx.lineTo(p1.x, p1.y);
            ctx.lineJoin = ctx.lineCap = 'round';
            // ctx.shadowBlur = 0.001;
            // ctx.shadowColor = currentColor;
            ctx.strokeStyle= currentColor;
            ctx.lineWidth=lineSize;
            ctx.stroke();
            ctx.closePath();

        }

        /**
         * ======================================================
         * *************** function for line animation
         * =====================================================
         */
    /**
     *
     * @param x1
     * @param y1
     * @param x2
     * @param y2
     * @param noAnimation
     * @param type
     */
        function drawLineAnimation(x1,y1,x2,y2,noAnimation,type){
            var noAnimation = noAnimation ? noAnimation : false;
            var type = type ? type : 'simple';
            var lineEndPointX = x2,
                lineEndPointY = y2;
            var ctx = noAnimation ? drawingCanvas : fakeCanvas;
            fakeCanvas.clearRect(0,0,fakeCanvasMaxLenght,fakeCanvasMaxLenght);
            //if shift is pressed detect to which way we have to draw line
            if(shiftPressed){
                var dx = Math.abs(x2-x1);
                var dy = Math.abs(y2-y1);
                if(dx>dy){
                    lineEndPointY = y1;
                }else{
                    lineEndPointX = x1;
                }
            }
            if(type=='double' || type=='single'){
                drawArrow(ctx,x1,y1,lineEndPointX,lineEndPointY);
            }
            var ctx = noAnimation ? drawingCanvas : fakeCanvas;
            ctx.beginPath();
            ctx.globalCompositeOperation="source-over";
            ctx.moveTo(x1,y1);
            ctx.lineTo(lineEndPointX,lineEndPointY);
            ctx.closePath();
            ctx.strokeStyle= currentColor;
            ctx.lineWidth=lineSize;
            ctx.fill();
            ctx.stroke();
            ctx.closePath();
            if(type=='double'){
                drawArrow(ctx,lineEndPointX,lineEndPointY,x1,y1);

            }
        }

        /**
         * ======================================================
         * *************** function to draw line
         * =====================================================
         */
    /**
     *
     * @param x1
     * @param y1
     * @param x2
     * @param y2
     */
        function drawLine(x1,y1,x2,y2){
            drawLineAnimation(x1,y1,x2,y2,true);
        }


        /**
         * ======================================================
         * *************** function for cube animation
         * =====================================================
         */
    /**
     *
     * @param x1
     * @param y1
     * @param x2
     * @param y2
     * @param noAnimation
     * @param insertPoint
     */
        function drawCubeAnimation(x1,y1,x2,y2,noAnimation){
            var noAnimation = noAnimation ? noAnimation : false;
            fakeCanvas.clearRect(0,0,fakeCanvasMaxLenght,fakeCanvasMaxLenght);
            var sizeX = Math.abs(x2-x1),
                sizeY = Math.abs(y2-y1),
                z = sizeX/2,
                h = sizeY,
                p0 = {x:x2,y:y2},
                p1 = {x:x2 - sizeX,y: y2 - sizeX * 0.5},
                p2 = {x:x2 - sizeX,y: y2 - h - sizeX * 0.5},
                p3 = {x:x2,y: y2 - h },
                p4 = {x:x2 + sizeY,y: y2 - sizeY * 0.5},
                p5 = {x:x2 + sizeY,y: y2 - h - sizeY * 0.5},
                p6 = {x:x2 - sizeX + sizeY,y: y2 - h - (sizeX * 0.5 + sizeY * 0.5)},
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
            ctx.lineWidth = lineSize;
            ctx.strokeStyle = currentColor;
            ctx.stroke();
            ctx.closePath();

        }

        /**
         * ======================================================
         * *************** function to draw cube
         * =====================================================
         */
    /**
     *
     * @param x1
     * @param y1
     * @param x2
     * @param y2
     */
        function drawCube(x1,y1,x2,y2){
            drawCubeAnimation(x1,y1,x2,y2,true);
        }

        /**
         * ======================================================
         * *************** function for cube animation
         * =====================================================
         */
    /**
     *
     * @param x1
     * @param y1
     * @param x2
     * @param y2
     * @param noAnimation
     * @param filled
     */
        function drawRectangleAnimation(x1,y1,x2,y2,noAnimation,filled){
            fakeCanvas.clearRect(0,0,fakeCanvasMaxLenght,fakeCanvasMaxLenght);
            var noAnimation = noAnimation ? noAnimation : false;
            var filled = filled ? filled : false;
            width= x2-x1;
            height = y2-y1;
            if(shiftPressed){
                height = ((x2-x1)/Math.abs(x2-x1))*width;
            }
            var ctx = noAnimation ? drawingCanvas : fakeCanvas;
            ctx.beginPath();
            ctx.globalCompositeOperation="source-over";
            ctx.lineWidth= lineSize;
            ctx.strokeStyle=currentColor;
            ctx.rect(x1,y1,width,height);
            ctx.stroke();
            if(filled){
                ctx.fillStyle = currentColor;
                ctx.fill();
            }
            ctx.closePath();

        }

        /**
         * ======================================================
         * *************** function to draw cube
         * =====================================================
         */
    /**
     *
     * @param x1
     * @param y1
     * @param x2
     * @param y2
     */
        function drawRectangle (x1,y1,x2,y2){
            drawRectangleAnimation(x1,y1,x2,y2,true);
        }


        /**
         * ======================================================
         * *************** function to draw eraser animation
         * =====================================================
         */
        /**
         *
         * @param left
         * @param top
         * @param eraserSize
         */
        function showEraserAnimation(left,top,eraserSize){
            fakeCanvas.clearRect(0,0,fakeCanvasMaxLenght,fakeCanvasMaxLenght);
            fakeCanvas.beginPath();
            fakeCanvas.arc(left,top, eraserSize, 0, Math.PI * 2, false);
            fakeCanvas.strokeStyle = '#000';
            fakeCanvas.fillStyle = '#fff';
            fakeCanvas.stroke();
            fakeCanvas.fill();
            fakeCanvas.closePath();
        }

        /**
         * ======================================================
         * *************** function for circle animation
         * =====================================================
         */
    /**
     *
     * @param x1
     * @param y1
     * @param x2
     * @param y2
     * @param noAnimation
     * @param fill
     */
        function drawCircleAnimation(x1,y1,x2,y2,noAnimation,fill){
            fakeCanvas.clearRect(0,0,fakeCanvasMaxLenght,fakeCanvasMaxLenght);
            var noAnimation = noAnimation ? noAnimation : false;
            var ctx = noAnimation ? drawingCanvas : fakeCanvas;
            var fill = fill ? fill : false;
            var width = x2-x1 ;
            var height = y2-y1;
            var centerX = x1 + (width/2);
            var centerY =y1+(height/2);
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
            if(fill){
                ctx.fillStyle = currentColor;
                ctx.fill();
            }
            ctx.closePath();

        }

        /**
         * ======================================================
         * *************** function for cylinder  animation
         * =====================================================
         */
    /**
     * @param x1
     * @param y1
     * @param x2
     * @param y2
     * @param noAnimation
     */
        function drawCylinderAnimation(x1, y1,x2,y2, noAnimation ) {
            var noAnimation = noAnimation ? noAnimation : false;
            var i, xPos, yPos, pi = Math.PI, twoPi = 2 * pi;
            var w = x2-x1;
            var h = y2-y1;
            var ctx = noAnimation ? drawingCanvas : fakeCanvas;
            fakeCanvas.clearRect(0,0,fakeCanvasMaxLenght,fakeCanvasMaxLenght);
            var x = x1;
            var y = y1;
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

    /**
     * @param x1
     * @param y1
     * @param x2
     * @param y2
     * @param noAnimation
     */
    function drawConeAnimation(x1,y1,x2,y2,noAnimation){
        var noAnimation = noAnimation ? noAnimation : false;
        var i, xPos, yPos, pi = Math.PI, twoPi = 2 * pi;
        var w = x2-x1;
        var h = y2-y1;
        var ctx = noAnimation ? drawingCanvas : fakeCanvas;
        fakeCanvas.clearRect(0,0,fakeCanvasMaxLenght,fakeCanvasMaxLenght);
        var x = x1;
        var y = y1;
        ctx.beginPath();
        ctx.globalCompositeOperation="source-over";

        ctx.moveTo(x, y);
        ctx.lineTo(x-w, y + h - h / 8);

        for (i = 0; i < twoPi; i += 0.001) {
            xPos = (x2-w) -  (w  * Math.cos(i));
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
    /**
     * @param x1
     * @param y1
     * @param x2
     * @param y2
     * @param noAnimation
     */
        function drawPyramidAnimation(x1,y1,x2,y2,noAnimation){
            var noAnimation = noAnimation ? noAnimation : false;
            var w = x2-x1;
            var h = y2-y1;
            var ctx = noAnimation ? drawingCanvas : fakeCanvas;
            fakeCanvas.clearRect(0,0,fakeCanvasMaxLenght,fakeCanvasMaxLenght);
            var r = h/4;
            var p1 = {x:x2-(3*w/2)-(r*Math.cos(Math.PI/4)),y:y2+(r*Math.sin(Math.PI/4))},
                p2 = {x:x2-(3*w/2)+(r*Math.cos(Math.PI/4)),y:y2+(r*Math.sin(-Math.PI/4))},
                p3 = {x:x2+(3*w/4)+(r*Math.cos(Math.PI/4)),y:y2+(r*Math.sin(-Math.PI/4))},
                p4 = {x:x2+(3*w/4)-(r*Math.cos(Math.PI/4)),y:y2+(r*Math.sin(Math.PI/4))};
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
                ctx.moveTo(x1,y1);
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
    /**
     * @param x1
     * @param y1
     * @param x2
     * @param y2
     * @param noAnimation
     */
        function drawXGraphAnimation(x1,y1,x2,y2,noAnimation){
            var noAnimation = noAnimation ? noAnimation : false;
            var w = Math.ceil(Math.abs(x2-x1));
            var ctx = noAnimation ? drawingCanvas : fakeCanvas;
            fakeCanvas.clearRect(0,0,fakeCanvasMaxLenght,fakeCanvasMaxLenght);
            if(noAnimation){
                var pointsArray = [];
                var i = x2>x1?x1:x2,
                    endP = ( x2>x1?x2:x1)+2;
                var factor = w/10;
                while(i<= endP){

                    pointsArray.push({x:Math.floor(i),y:y1});
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
            var startX = x1+(x2>x1?-10 :10),
                endX = x2+(x2>x1?10 :-10);

            drawArrow(ctx,startX,y1,endX,y1);

            ctx.beginPath();
            ctx.globalCompositeOperation="source-over";
            ctx.moveTo(startX,y1);
            ctx.lineTo(endX,y1);
            ctx.strokeStyle = currentColor;
            ctx.lineWidth = lineSize;
            ctx.stroke();
            ctx.closePath();
            drawArrow(ctx,endX,y1,startX,y1);
        }

        /**
         * ======================================================
         *
         * *************** function for xy-graph animation
         * =====================================================
         */
    /**
     * @param x1
     * @param y1
     * @param x2
     * @param y2
     * @param noAnimation
     */
        function drawXYGraphAnimation(x1,y1,x2,y2,noAnimation){
            var noAnimation = noAnimation ? noAnimation : false;
            var w = Math.ceil(Math.abs(x2-x1));
            var h = Math.ceil(Math.abs(y2-y1));
            var ctx = noAnimation ? drawingCanvas : fakeCanvas;
            fakeCanvas.clearRect(0,0,fakeCanvasMaxLenght,fakeCanvasMaxLenght);



            var startX = x1,
                endX = x2;
            var startY = y1,endY = y2;

            var dx = Math.abs(startX-endX),
                dy = Math.abs(startY-endY);

            //draw rectainge
            drawRectangleAnimation(x1,y1,x2,y2,noAnimation);


            //find midpoints

            var mx = x2>x1 ? (x1+(dx/2)) : x2+(dx/2),
                my = y2>y1 ? (y1+(dy/2)) : y2+(dy/2);


            //draw horizontal line
            drawArrow(ctx,startX,my,ctx,endX,my);
            ctx.beginPath();
            ctx.globalCompositeOperation="source-over";
            ctx.moveTo(startX,my);
            ctx.lineTo(endX,my);
            ctx.strokeStyle = currentColor;
            ctx.lineWidth = lineSize;
            ctx.stroke();
            ctx.closePath();
            drawArrow(ctx,endX,my,startX,my);

            //draw vertical line

            //draw horizontal line
            drawArrow(ctx,  mx,startY,mx,endY);
            ctx.beginPath();
            ctx.globalCompositeOperation="source-over";
            ctx.moveTo(mx,startY);
            ctx.lineTo(mx,endY);
            ctx.strokeStyle = currentColor;
            ctx.lineWidth = lineSize;
            ctx.stroke();
            ctx.closePath();
            drawArrow(ctx, mx,endY, mx,startY);

            if(noAnimation){
                //draw vertical lines
                var pointsArrayX = [];
                var i = (x2>x1?x1:x2)+10,
                    endPX = ( x2>x1?x2:x1);
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
                var k = (y2>y1?y1:y2)+10,
                    endPY = ( y2>y1?y2:y1);
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


        /**
         * method to draw arrow
         * @param context
         * @param fromx
         * @param fromy
         * @param tox
         * @param toy
         */
        function drawArrow(context, fromx, fromy, tox, toy){
            var x_center = tox;
            var y_center = toy;

            var angle;
            var x;
            var y;
            var r = 4*lineSize;

            context.beginPath();
            context.globalCompositeOperation="source-over";
            angle = Math.atan2(toy-fromy,tox-fromx)
            context.moveTo(x_center, y_center);

            angle += (1/6)*(4*Math.PI);
            x = r*Math.cos(angle) + x_center;
            y = r*Math.sin(angle) + y_center;

            context.lineTo(x, y);
            context.strokeStyle = currentColor;
            context.lineWidth = lineSize;
            context.stroke();
            context.closePath();

            context.beginPath();
            context.globalCompositeOperation="source-over";
            context.moveTo(x_center, y_center);
            angle += (1/6)*(4*Math.PI);
            x = r*Math.cos(angle) + x_center;
            y = r*Math.sin(angle) + y_center;
            context.lineTo(x, y);
            context.strokeStyle = currentColor;
            context.lineWidth = lineSize;
            context.stroke();
            context.closePath();


        }


        textInput.on('focus change click keydown',function(e){
            textHolder.show();
            setTimeout(function(){
                var inputValue = (textInput.val() ? textInput.val() : '');
                //get cursor position
                var currentCursorPosition = textInput[0].selectionStart;
                var textLength = (inputValue.length+1) * (fontSize/2);
                inputValue = '<p style="margin:0;padding:0;">'+inputValue.substr(0,currentCursorPosition)+'|'+inputValue.substr(currentCursorPosition,inputValue.length-currentCursorPosition);
                inputValue = inputValue.replace(/\~/g,'<sub>');
                inputValue = inputValue.replace(/\`/g,'</sub>');
                inputValue = inputValue.replace(/\!/g,'<sup>');
                inputValue = inputValue.replace(/\^/g,'</sup>');
                inputValue = inputValue.replace(/(?:\r\n|\r|\n)/g, '</p><p  style="margin:0;padding:0;">');
                inputValue += '</p>';
                //
                // if((textLength+textLeftCord)>drawingC.width){
                //     rC.width = (textLength+textLeftCord);
                //     rC.height = drawingC.height;
                //     resizeCanvas.drawImage(drawingC, 0, 0);
                //     dc.attr('width',textLength+textLeftCord);
                //     fa.attr('width',textLength+textLeftCord);
                //     drawingCanvas.drawImage(rC,0,0);
                // }
                textHolder.css({ 'left': textLeftCord, 'top': textTopCord - 5 }).html(inputValue);
            },5);
        });
        textInput.blur(function (e){

            if(symbolEnabled){
                symbolEnabled = false;
                return;
            }

            //$('.js-sup-sub').val('');
            clearInterval(textAnimation);
            currentTool = 'none';
            var textVal = $(this).val() ? $(this).val() : '';

            var left = lineStartPoint.x,
                top = lineStartPoint.y;

            if (textEnabled) {
                writeTextDivToCanvas(textLeftCord,textTopCord,function (){
                    textHolder.hide();
                    textHolder.html('');
                    textInput.val('');
                    textInput.hide();
                    saveCanvasState(drawingC);
                    setTimeout(function(){
                        $enableTextTool.click();
                    },50);

                });
                textEnabled = false;
                $enableTextTool.removeClass('border');
            }
        });

        //print canvas
        $('#print-current-slide').click(function (e){
            e.preventDefault();
            $('#print-modal').modal('hide');
            var dataUrl = drawingC.toDataURL();

            var printContent = '<!Doctype html>' +
                '<html>' +
                '<head><title>Print</title></head>' +
                '<body>' +
                '<img src="'+dataUrl+'">' +
                '</body>' +
                '</html>';
            var printWindow = window.open('','',width=$('#drawing-board').width(),height=$('#drawing-board').height());
            printWindow.document.write(printContent);
            printWindow.document.addEventListener('load',function(){
                printWindow.focus();
                printWindow.print();
                printWindow.document.close();
                printWindow.close();
            },true)

        });
        $('#color-spectrum').spectrum({
            showPalette:true,
            color: 'blanchedalmond',
            preferredFormat: "hex3",
            showInput: true,
            palette: [
                ["#000","#444","#666","#999","#ccc","#eee","#f3f3f3","#fff"],
                ["#f00","#f90","#ff0","#0f0","#0ff","#00f","#90f","#f0f"],
                ["#f4cccc","#fce5cd","#fff2cc","#d9ead3","#d0e0e3","#cfe2f3","#d9d2e9","#ead1dc"],
                ["#ea9999","#f9cb9c","#ffe599","#b6d7a8","#a2c4c9","#9fc5e8","#b4a7d6","#d5a6bd"],
                ["#e06666","#f6b26b","#ffd966","#93c47d","#76a5af","#6fa8dc","#8e7cc3","#c27ba0"],
                ["#c00","#e69138","#f1c232","#6aa84f","#45818e","#3d85c6","#674ea7","#a64d79"],
                ["#900","#b45f06","#bf9000","#38761d","#134f5c","#0b5394","#351c75","#741b47"],
                ["#600","#783f04","#7f6000","#274e13","#0c343d","#073763","#20124d","#4c1130"]
            ],
            change: function(color) {
                currentColor = color.toHexString();
                $('#color-indicator').css('background',currentColor);
                textHolder.css('color',currentColor);
            }
        });

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
                            saveCanvasObjects('image',{startX: currentMouse.x,startY:currentMouse.y,endX:currentMouse.x+img.width,endY:currentMouse.y+img.height,image:event.target.result});
                        };

                        img.src = event.target.result;


                    };
                    reader.readAsDataURL(blob);
                }
            }
        }

    /**
     *
     * @param dom
     * @param callback
     */
    function insertSymbols(dom,callback){

            domtoimage.toPng(dom[0])
                .then(function (dataUrl) {
                    var img = new Image;
                    img.onload = function () {
                        var actualWidth = img.width;
                        var actualHeight = img.height;
                        var factor = fontSize/35;
                        var height =actualHeight * factor;
                        var width = actualWidth* height/actualHeight;
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
                        var  pointX = lineStartPoint.x + textHolder.width();
                        var pointY = lineStartPoint.y - height / 3;

                        drawingCanvas.drawImage(img,pointX ,pointY+5, width, height);
                        saveCanvasObjects('image',{startX:pointX-10,startY:pointY-10,endX:pointX+width+2,endY:pointY-2+height,image:dataUrl});
                        return callback();
                    };
                    img.src = dataUrl;

                })
                .catch(function(error) {
                    return callback();
                    console.error('oops, something went wrong!', error);
                });
        }

    /**
     * @param x
     * @param y
     * @param callback
     */

    function writeTextDivToCanvas(x,y,callback){
        var styles = textHolder.attr('style');
        var htmlString = textHolder.parent().html().replace('|', '');

        var height = parseInt(textHolder.height())+20;

        var data = '<svg xmlns="http://www.w3.org/2000/svg" width="' + textHolder.width() + '" height="'+height+'">' +
            '<foreignObject width="100%" height="100%">' +
            "<div xmlns='http://www.w3.org/1999/xhtml' style='"+styles+"'>" +
            htmlString
            +
            '</div>' +
            '</foreignObject>' +
            '</svg>';

        data = encodeURIComponent(data);

        var img = new Image();

        img.onload = function() {
            var width = img.width;
            var height = img.height;
            var canvasHeight = drawingC.height;
            var canvasWidth = drawingC.width;
            var left =x+width;
            var top = y+height;
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
            drawingCanvas.drawImage(img, x,y-5);
            saveCanvasObjects('image-text',{textLeftCord:textLeftCord,textTop:textTopCord,startX:x-10,startY:y-10,endX:x+img.width+2,endY:y-40+img.height,image:"data:image/svg+xml," + data,html:textInput.val()});
            return callback();
        };
        img.src = "data:image/svg+xml," + data
    }

    /**
     * method to save canvas states
     * @param canvas
     */
    function saveCanvasState(canvas){
            var image = new Image();
            image.onload = function() {
                var currentImages = imageHolder.find('img').length;
                if(currentImages>4){
                    imageHolder.find('img:first').remove();
                }
                imageHolder.append(this);
            };
            image.src = canvas.toDataURL();
        }
    //undo the canvas state

    $('#undo-tool').click(function (e) {
        e.preventDefault();

        drawingCanvas.clearRect(0, 0, drawingC.width, drawingC.height);
        var lastImage = imageHolder.find('img:last').remove();
        var nextLast = imageHolder.find('img:last');
        if (nextLast) {
            var src = nextLast.attr('src');
            var image = new Image();
            image.onload = function () {
                drawingCanvas.drawImage(image, 0, 0);
            };
            image.src = src;
            $('#mouse-cursor').click();
        }

    });
    $('#new-board').click(function () {
        drawingCanvas.clearRect(0, 0, drawingC.width, drawingC.height);
        canvasObjects = [];
        pencilPoints = [];
    });

    /**
     * method to save canvas states
     * @param shape
     * @param data
     */
    function saveCanvasObjects(shape,data){
        canvasObjects.push({shape:shape,data:data});
    }

    /**
     * @param x
     * @param y
     * @returns {boolean}
     */
    function initializeDrag(x,y){
        fa.show();
        for(var i=0;i<canvasObjects.length;i++){

            var canvasShape = canvasObjects[i];
            if(!canvasShape)
                continue;
            if(!canvasShape.data)
                continue;

            var shapeData = canvasShape.data;

            var x1,y1,x2,y2;
            if(canvasShape.shape=='pencil'){
                var pPoints = shapeData.pencilPoints;
                x1 =pPoints[0].x > pPoints[pPoints.length-1].x ? pPoints[pPoints.length-1].x :pPoints[0].x;
                x2 =pPoints[0].x > pPoints[pPoints.length-1].x ?pPoints[0].x :pPoints[pPoints.length-1].x;
                y1 =pPoints[0].y > pPoints[pPoints.length-1].y ? pPoints[pPoints.length-1] :pPoints[0].y;
                y2 =pPoints[0].y > pPoints[pPoints.length-1].y ?pPoints[0].y : pPoints[pPoints.length-1].y;

            }
            else {
                x1 = shapeData.startX > shapeData.endX ? shapeData.endX : shapeData.startX;
                x2 = shapeData.startX > shapeData.endX ? shapeData.startX : shapeData.endX;
                y1 = shapeData.startY > shapeData.endY ? shapeData.endY : shapeData.startY;
                y2 = shapeData.startY > shapeData.endY ? shapeData.Y : shapeData.endY;
                dx = x2-x1;
                dy = y2-y1;
                if(canvasShape.shape=='cube'  ){
                    x1 = x1- dx/2;
                    y1 = y1 - dy;
                    x2 = x2+ (2*dx);

                }else if( canvasShape.shape=='cone' || canvasShape.shape=='pyramid'){
                    x1 = x1-dx;
                }
            }



            if(x>=x1-10 && x<=x2+10 && y>=y1-10 && y<=y2+10){
                draggingShape = canvasShape;
                draggingShape.rectArea = {x1:x1,y1:y1,x2:x2,y2:y2};
                drawMultipleShapes(canvasShape,false);
                var dx = x2-x1,dy = y2-y1;
                if(canvasShape.shape!='image' || canvasShape!='image-text'){
                    draggingShape.img = fakeCanvas.getImageData(draggingShape.rectArea.x1,draggingShape.rectArea.y1,dx,dy);
                }
                canvasObjects.splice(i,1);//remove that objects from canvas;
                return true;
            }
        }
        return false;
    }

    //{startX:lineStartPoint.x,startY:lineStartPoint.y,endX:left,endY:top,shift:shiftPressed,color:currentColor,lineSize:lineSize});

    /**
     * function to redraw canvas
     */
    function redrawCanvas(){
        drawingCanvas.clearRect(0,0,drawingC.width,drawingC.height);
        for(var i=0;i<canvasObjects.length;i++){

            var canvasShape = canvasObjects[i];
            if(!canvasShape)
                continue;
            if(!canvasShape.data)
                continue;
            drawMultipleShapes(canvasShape,true);
        }

    }

    /**
     * function to show the drag effect
     */
    function showDragUIAnimation(x,y){

        if(!draggingShape || !draggingShape.rectArea)
            return false;
        var dragX = x-lineStartPoint.x;
        var dragY = y-lineStartPoint.y;
        var dx =  draggingShape.rectArea.x2-draggingShape.rectArea.x1;
        var dy =  draggingShape.rectArea.y2-draggingShape.rectArea.y1;

        //draw outer layer
        fakeCanvas.clearRect(0,0,fakeCanvasMaxLenght,fakeCanvasMaxLenght);

        if(draggingShape.shape==='image' || draggingShape.shape==='image-text'){
            var img = new Image();
            img.onload =function (){
                fakeCanvas.drawImage(img,draggingShape.rectArea.x1+dragX,draggingShape.rectArea.y1+dragY)
            };
            img.src = draggingShape.data.image;
        }else{
            fakeCanvas.putImageData(draggingShape.img,draggingShape.rectArea.x1+dragX,draggingShape.rectArea.y1+dragY)
        }
        fakeCanvas.beginPath();
        fakeCanvas.rect(draggingShape.rectArea.x1+dragX-10,draggingShape.rectArea.y1+dragY-10,dx+30,dy+30);
        fakeCanvas.lineWidth = 1;
        fakeCanvas.strokeStyle =  'blue';
        fakeCanvas.stroke();
        fakeCanvas.closePath();
        fakeCanvas.closePath();
        var dx =  draggingShape.rectArea.x2-draggingShape.rectArea.x1;
        var dy =  draggingShape.rectArea.y2-draggingShape.rectArea.y1;
    }

    /**
     *
     * @param canvasShape
     * @param noAnimation
     */
    function drawMultipleShapes(canvasShape,noAnimation){
        var shapeData = canvasShape.data;
        currentColor = shapeData.color;
        lineSize =  shapeData.lineSize;
        var shape = canvasShape.shape;
        if(shape=='pencil'){
            pencilPoints = shapeData.pencilPoints;
            drawPencil(noAnimation?drawingCanvas:fakeCanvas);
        }else if(shape=='line'){
            shiftPressed = shapeData.shift;
            drawLineAnimation(shapeData.startX,shapeData.startY,shapeData.endX,shapeData.endY,noAnimation);
        }else if(shape=='cube'){
            drawCubeAnimation(shapeData.startX,shapeData.startY,shapeData.endX,shapeData.endY,noAnimation);
        }else if(shape=='rectangle'){
            shiftPressed = shapeData.shift;
            drawRectangleAnimation(shapeData.startX,shapeData.startY,shapeData.endX,shapeData.endY,noAnimation);
        }else if(shape=='oval'){
            shiftPressed = shapeData.shift;
            drawCircleAnimation(shapeData.startX,shapeData.startY,shapeData.endX,shapeData.endY,top,noAnimation);
        }else if(shape=='cylinder'){
            drawCylinderAnimation(shapeData.startX,shapeData.startY,shapeData.endX,shapeData.endY,noAnimation);
        }else if(shape=='cone'){
            drawConeAnimation(shapeData.startX,shapeData.startY,shapeData.endX,shapeData.endY,noAnimation);
        }else if(shape=='pyramid'){
            drawPyramidAnimation(shapeData.startX,shapeData.startY,shapeData.endX,shapeData.endY,noAnimation);
        }else if(shape=='xgraph'){
            drawXGraphAnimation(shapeData.startX,shapeData.startY,shapeData.endX,shapeData.endY,noAnimation);
        }else if(shape=='xygraph'){
            drawXYGraphAnimation(shapeData.startX,shapeData.startY,shapeData.endX,shapeData.endY,noAnimation);
        }else if(shape=='rectangle-filled'){
            drawRectangleAnimation(shapeData.startX,shapeData.startY,shapeData.endX,shapeData.endY,noAnimation,true);
        }else if(shape=='oval-filled'){
            drawCircleAnimation(shapeData.startX,shapeData.startY,shapeData.endX,shapeData.endY,noAnimation,true);
        }else if(shape=='line-sarrow'){
            shiftPressed = shapeData.shift;
            drawLineAnimation(shapeData.startX,shapeData.startY,shapeData.endX,shapeData.endY,noAnimation,'single');
        }else if(shape=='line-darrow'){
            shiftPressed = shapeData.shift;
            drawLineAnimation(shapeData.startX,shapeData.startY,shapeData.endX,shapeData.endY,noAnimation,'double');
        }else if(shape=='image' || shape=='image-text'){
            var ctx = noAnimation ? drawingCanvas : fakeCanvas;
            var img = new Image();
            img.onload = function() {
                ctx.drawImage(img, shapeData.startX,shapeData.startY);
            };
            img.src = shapeData.image;
        }
    }

    function drawShapeAgain(){
        if(!draggingShape)
            return false;
        if(!draggingShape.data)
            return false;

        var dx = lineEndPoint.x - lineStartPoint.x;
        var dy = lineEndPoint.y - lineStartPoint.y;
        fakeCanvas.clearRect(0,0,fakeCanvasMaxLenght,fakeCanvasMaxLenght);
        var shapeData = draggingShape.data;
        currentColor = shapeData.color;
        lineSize =  shapeData.lineSize;
        var shape = draggingShape.shape;
        if(shape=='pencil'){

            var newMXY  = [];
            for(var i in shapeData.pencilPoints){
                var sdx = shapeData.pencilPoints[i].x+dx;
                var sdy = shapeData.pencilPoints[i].y+dy;
                if(sdx && sdy)
                    newMXY.push({x:sdx,y:sdy});
            }
            draggingShape.data.pencilPoints = newMXY;
            drawMultipleShapes(draggingShape,true);
        }else{
            draggingShape.data.startX =  draggingShape.data.startX+dx;
            draggingShape.data.startY =  draggingShape.data.startY+dy;
            draggingShape.data.endX =  draggingShape.data.endX+dx;
            draggingShape.data.endY =  draggingShape.data.endY+dy;
            drawMultipleShapes(draggingShape,true);

        }
        canvasObjects.push(draggingShape);
        draggingShape = {};
    }

    //check for text edit option
    function checkTextEdit(x,y){
        for(var i=0; i<canvasObjects.length;i++) {
            var canvasShape = canvasObjects[i];
            if (canvasShape.shape != 'image-text')
                continue;
            var shapeData = canvasShape.data;
            x1 = shapeData.startX > shapeData.endX ? shapeData.endX : shapeData.startX;
            x2 = shapeData.startX > shapeData.endX ? shapeData.startX : shapeData.endX;
            y1 = shapeData.startY > shapeData.endY ? shapeData.endY : shapeData.startY;
            y2 = shapeData.startY > shapeData.endY ? shapeData.Y : shapeData.endY;
            dx = x2-x1;
            dy = y2-y1;
            if(x>=x1-10 && x<=x2+10 && y>=y1-10 && y<=y2+10){

                canvasObjects.splice(i,1);
                redrawCanvas();
                return {left:shapeData.textLeftCord,top:shapeData.textTopCord,html:shapeData.html.replace('|')};
            }
        }
        return false;
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










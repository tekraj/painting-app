<?php
    $upload_dir = 'uploads/';
    if(isset($_POST) && isset($_POST['imageData']) ){
        $base64 = $_POST['imageData'];
        $image_base64 = base64_decode($base64);
        $file = $upload_dir . uniqid() . 'canvas_image.png';
        file_put_contents($file, $image_base64);
        echo $file;
        exit;
    }

function get_client_ip() {
    $ipaddress = '';
    if (isset($_SERVER['HTTP_CLIENT_IP']))
        $ipaddress = $_SERVER['HTTP_CLIENT_IP'];
    else if(isset($_SERVER['HTTP_X_FORWARDED_FOR']))
        $ipaddress = $_SERVER['HTTP_X_FORWARDED_FOR'];
    else if(isset($_SERVER['HTTP_X_FORWARDED']))
        $ipaddress = $_SERVER['HTTP_X_FORWARDED'];
    else if(isset($_SERVER['HTTP_FORWARDED_FOR']))
        $ipaddress = $_SERVER['HTTP_FORWARDED_FOR'];
    else if(isset($_SERVER['HTTP_FORWARDED']))
        $ipaddress = $_SERVER['HTTP_FORWARDED'];
    else if(isset($_SERVER['REMOTE_ADDR']))
        $ipaddress = $_SERVER['REMOTE_ADDR'];
    else
        $ipaddress = 'UNKNOWN';
    return preg_replace('/\./','',$ipaddress);
}

?>
<!Doctype html>
<html lang="en">
<head>
    <!-- Required meta tags -->
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <meta http-equiv="cache-control" content="no-cache">
    <meta http-equiv="expires" content="0">
    <meta http-equiv="pragma" content="no-cache">
    <!--<link href="https://fonts.googleapis.com/css?family=Roboto:400,700&subset=latin,cyrillic-ext" rel="stylesheet" type="text/css">-->
    <link rel="stylesheet" href="plugins/bootstrap/css/bootstrap.min.css">
    <link rel="stylesheet" href="font-awesome/css/fontawesome.css">


    <link rel="stylesheet" href="js-tree/themes/default/style.min.css">
    <link href="plugins/node-waves/waves.css" rel="stylesheet" />
    <!-- Animation Css -->
    <link href="plugins/animate-css/animate.css" rel="stylesheet" />
    <link rel="stylesheet" href="plugins/jquery-ui/jquery-ui.min.css">
    <link href="css/board-css.min.css" rel="stylesheet">
    <link href="css/themes/all-themes.css" rel="stylesheet" />
    <link rel="stylesheet" href="plugins/spectrum/spectrum.css">
    <link href="equation-editor/mathquill.css" rel="stylesheet">
    <link href="equation-editor/matheditor.css" rel="stylesheet">
    <link rel="stylesheet" type="text/css" href="css/style.css" >
    <title>White Board</title>

</head>
<body data-ip="<?php echo get_client_ip(); ?>" data-user="<?php echo 'whiteboard_'. time(); ?>">
<header>
    <nav class="navbar navbar-default">
        <div class="container-fluid">
            <!-- Brand and toggle get grouped for better mobile display -->
            <div class="navbar-header">
                <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                </button>
            </div>

            <!-- Collect the nav links, forms, and other content for toggling -->
            <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                <ul class="nav navbar-nav">
                    <li>
                        <a class="nav-link active" href="#">File</a>
                    </li>
                    <li>
                        <a class="nav-link" href="#">Edit</a>
                    </li>
                    <li>
                        <a class="nav-link" href="#">Sessions</a>
                    </li>
                    <li>
                        <a class="nav-link " href="#">Tools</a>
                    </li>
                    <li>
                        <a class="nav-link" href="#">Session Log</a>
                    </li>
                    <li>
                        <a class="nav-link" href="#">Favorites</a>
                    </li>
                </ul>

            </div><!-- /.navbar-collapse -->
        </div><!-- /.container-fluid -->
    </nav>
</header>

<div class="container-fluid top-functions">
    <div class="row">
        <div class="col-sm-6">
            <a href="#" class="btn btn-primary btn-square js-tools" id="mouse-cursor" data-tool="none" data-cursor="default">
                <img src="images/computer-mouse-cursor.png">
            </a>
            <button  class="btn btn-primary btn-square js-tools" data-tool="drag" data-toggle="tooltip" data-placement="top" title="Drag Shapes" data-cursor="url(images/drag.png), auto" style="background:url(images/drag.png) no-repeat center;width:35px;height:30px;position:relative;z-index: 999;">
                &nbsp;
            </button>
            <a href="#" class="btn btn-primary btn-square active" id="enable-drawing" data-toggle="tooltip" data-placement="bottom" title="Switch to Drawing">
                <span class="font">Wb</span>
            </a>
            <a href="#" class="btn btn-primary btn-square" id="reader-mode-indicator" data-toggle="tooltip" data-placement="bottom" title="Switch To Webshare">
                <img src="images/internet.png">
            </a>
            <!--<a href="#" class="btn btn-primary btn-square">-->
            <!--<span class=""><i class="fa fa-pie-chart" aria-hidden="true"></i></span>-->
            <!--</a>-->
            <a href="#" class="btn btn-primary btn-square" id="browse-cloud" data-toggle="tooltip" data-placement="bottom" title="WhiteBoard Cloud">
                <img src="images/cloud.png" style="width:20px;"  alt="">
            </a>
            <a href="#" class="btn btn-primary btn-square" title="Session Note" >
                <span class=""><img src="images/note.png" ></span>
            </a>
            <a href="#" class="btn btn-primary btn-square" data-toggle="tooltip" data-placement="bottom" title="Notifications">
                <img src="images/email.png">
            </a>
            <a href="#" class="btn btn-primary btn-square" data-toggle="modal" data-target="#print-modal"  title="Print This drawing">
                <img src="images/printer-.png">
            </a>
            <a href="#" class="btn btn-primary btn-square" data-toggle="tooltip" data-placement="bottom" title="Share drawing">
                <img src="images/share-connection-sing.png">
            </a>
            <a href="#" class="btn btn-primary btn-square" data-toggle="tooltip" data-placement="bottom" title="Send to mail">
                <img src="images/black-back-closed-envelope-shape.png">
            </a>
            <a href="#" class="btn btn-primary btn-square" data-toggle="tooltip" data-placement="bottom" title="Slide View Mode">
                <img src="images/monitor.png">
            </a>
            <span style="font-size:12px;"><b>Slide 1/1</b></span>
        </div>
        <div class="col-sm-6 text-right">
            <a class="btn btn-primary btn-sm" id="new-board" data-toggle="tooltip" data-placement="bottom" title="Clear this board and draw on new board">New Board</a>
            <button class="btn btn-default btn-sm" data-toggle="tooltip" data-placement="bottom" title="Back to previous board"><img src="images/icons/ic_keyboard_arrow_left_black_24dp_1x.png"> Back</button>
            <button class="btn btn-default btn-sm" data-toggle="tooltip" data-placement="bottom" title="Next Board">Next <img src="images/icons/ic_keyboard_arrow_right_black_24dp_1x.png"></button>
        </div>
    </div>
</div>

<div class="container-fluid can">
    <div class="row">
        <div class="col-md-1 tools-list">
            <div class="text-center my-1 option-menu-wrapper">
                <a href="#" class="btn btn-default js-tools" id="pencil-tool" data-tool="pencil" data-toggle="tooltip" data-placement="top" title="Pencil" data-cursor="url(images/pencil.png), auto">
                    <span class=""><img src="images/pencil-w.png"></span>
                </a>
                <ul class="option-menu" style="display: none;">
                    <li>
                        <a href="#" class="line-width js-line-width active" data-line="1">
                            <span style="border-width: 1px;"></span>
                        </a>
                    </li>
                    <li>
                        <a href="#" class="line-width js-line-width" data-line="2">
                            <span style="border-width: 4px;"></span>
                        </a>
                    </li>
                    <li>
                        <a href="#" class="line-width js-line-width" data-line="3">
                            <span style="border-width: 6px;"></span>
                        </a>
                    </li>
                    <li>
                        <a href="#" class="line-width js-line-width" data-line="4">
                            <span style="border-width: 8px;"></span>
                        </a>
                    </li>
                </ul>
            </div>
            <div class="text-center my-1 option-menu-wrapper">
                <a href="#" class="btn btn-default js-tools" data-tool="eraser" data-toggle="tooltip" data-placement="top" title="Eraser" data-cursor="crosshair">
                    <img src="images/eraser-w.png">
                </a>
                <div class="option-menu eraser-slider" style="display: none;">
                    <div id="eraser-slider"></div>
                </div>

            </div>
            <div class="text-center my-1 ">
                <a href="#" class="btn btn-default js-tools" id="enable-text-tool" data-tool="text" data-cursor="url(images/text.png), auto" data-toggle="tooltip" data-placement="top" title="Text">
                    <img src="images/text-w.png" style="width:42px">
                </a>
            </div>
            <div class="text-center my-1 font-menu-wrapper  option-menu-wrapper">
                <a href="#" class="btn btn-default btn-square mx-auto js-fonts js-tools">
                    <img src="images/1.png" style="width:42px">
                </a>
                <div class="option-menu font-menu" style="display: none;">
                    <h4>Font Properties</h4>
                    <div class="row font-wrapper">
                        <div class="col-sm-5">
                            <h5>Font</h5>
                            <ul>
                                <li><a href="#" class="js-font active" data-font="sefif">Times New Roman</a></li>
                                <li><a href="#" class="js-font " data-font="arial">Arial</a></li>
                                <li><a href="#" class="js-font " data-font="monospace">Courier New</a></li>
                            </ul>
                        </div>
                        <div class="col-sm-5">
                            <h5>Font Style</h5>
                            <ul>


                                <li><a href="#" class="js-font-style active" data-style="normal">Normal</a></li>


                                <li><a href="#" class="js-font-style " data-style="bold">Bold</a></li>


                                <li><a href="#" class="js-font-style " data-style="italic">Italic</a></li>


                                <li><a href="#" class="js-font-style " data-style="bold italic">Bold italic</a></li>


                            </ul>
                        </div>
                        <div class="col-sm-2">
                            <h5>Size</h5>
                            <ul>
                                <li><a href="#" class="js-font-size " data-size="8">8</a></li>

                                <li><a href="#" class="js-font-size " data-size="9">9</a></li>

                                <li><a href="#" class="js-font-size " data-size="10">10</a></li>

                                <li><a href="#" class="js-font-size " data-size="11">11</a></li>

                                <li><a href="#" class="js-font-size " data-size="12">12</a></li>

                                <li><a href="#" class="js-font-size " data-size="13">13</a></li>

                                <li><a href="#" class="js-font-size " data-size="14">14</a></li>

                                <li><a href="#" class="js-font-size " data-size="16">16</a></li>

                                <li><a href="#" class="js-font-size active" data-size="18">18</a></li>

                                <li><a href="#" class="js-font-size " data-size="20">20</a></li>

                                <li><a href="#" class="js-font-size " data-size="24">24</a></li>

                                <li><a href="#" class="js-font-size " data-size="30">30</a></li>

                                <li><a href="#" class="js-font-size " data-size="36">36</a></li>

                                <li><a href="#" class="js-font-size " data-size="42">42</a></li>

                                <li><a href="#" class="js-font-size " data-size="48">48</a></li>


                            </ul>
                        </div>
                        <div class="col-sm-12">
                            <div class="demo-font-text js-text-demo">
                                -- Hello World --
                            </div>
                        </div>
                        <div class="col-sm-12 text-center">
                            <button class="btn btn-default" id="change-font">OK</button>
                            <button class="btn btn-default" id="cancel-font" style="width:50px !important;">Cancel</button>
                        </div>
                    </div>
                </div>
            </div>
            <div class="text-center my-1 option-menu-wrapper">
                <a href="#" style="background:#000;" class="btn js-tools" data-toggle="tooltip" data-placement="top" title="Colors" id="color-indicator">
                    <img src="images/color-w.png">
                </a>
                <div class="option-menu color-menu" style="display: none;">
                    <ul class="color-pallet row">
                        <li class="col-sm-2"><a href="#" data-color="#e6194b" style="background:#e6194b" class="color-span js-color-code"></a></li>
                        <li class="col-sm-2"><a href="#" data-color="#3cb44b" style="background:#3cb44b" class="color-span js-color-code"></a></li>
                        <li class="col-sm-2"><a href="#" data-color="#ffe119" style="background:#ffe119" class="color-span js-color-code"></a></li>
                        <li class="col-sm-2"><a href="#" data-color="#0082c8" style="background:#0082c8" class="color-span js-color-code"></a></li>
                        <li class="col-sm-2"><a href="#" data-color="#f58231" style="background:#f58231" class="color-span js-color-code"></a></li>
                        <li class="col-sm-2"><a href="#" data-color="#911eb4" style="background:#911eb4" class="color-span js-color-code"></a></li>
                        <li class="col-sm-2"><a href="#" data-color="#46f0f0" style="background:#46f0f0" class="color-span js-color-code"></a></li>
                        <li class="col-sm-2"><a href="#" data-color="#f032e6" style="background:#f032e6" class="color-span js-color-code"></a></li>
                        <li class="col-sm-2"><a href="#" data-color="#d2f53c" style="background:#d2f53c" class="color-span js-color-code"></a></li>
                        <li class="col-sm-2"><a href="#" data-color="#fabebe" style="background:#fabebe" class="color-span js-color-code"></a></li>
                        <li class="col-sm-2"><a href="#" data-color="#008080" style="background:#008080" class="color-span js-color-code"></a></li>
                        <li class="col-sm-2"><a href="#" data-color="#e6beff" style="background:#e6beff" class="color-span js-color-code"></a></li>
                        <li class="col-sm-2"><a href="#" data-color="#aa6e28" style="background:#aa6e28" class="color-span js-color-code"></a></li>
                        <li class="col-sm-2"><a href="#" data-color="#fffac8" style="background:#fffac8" class="color-span js-color-code"></a></li>
                        <li class="col-sm-2"><a href="#" data-color="#800000" style="background:#800000" class="color-span js-color-code"></a></li>
                        <li class="col-sm-2"><a href="#" data-color="#aaffc3" style="background:#aaffc3" class="color-span js-color-code"></a></li>
                        <li class="col-sm-2"><a href="#" data-color="#808000" style="background:#808000" class="color-span js-color-code"></a></li>
                        <li class="col-sm-2"><a href="#" data-color="#ffd8b1" style="background:#ffd8b1" class="color-span js-color-code"></a></li>
                        <li class="col-sm-2"><a href="#" data-color="#000080" style="background:#000080" class="color-span js-color-code"></a></li>
                        <li class="col-sm-2"><a href="#" data-color="#808080" style="background:#808080" class="color-span js-color-code"></a></li>
                        <li class="col-sm-2"><a href="#" data-color="#FFFFFF" style="background:#FFFFFF" class="color-span js-color-code"></a></li>
                        <li class="col-sm-2"><a href="#" data-color="#000000" style="background:#000000" class="color-span js-color-code"></a></li>
                    </ul>
                    <div>
                        <a href="#" id="color-spectrum" class="color-spectrum">More Colors</a>
                    </div>
                </div>
            </div>
            <div class="text-center my-1">
                <a href="#" class="btn btn-default btn-square mx-auto" data-toggle="tooltip" data-placement="top" title="Just point the mouse where you want to paste the image and Press Ctrl+V">
                    <img src="images/paste.png">
                </a>
            </div>
            <div class="text-center my-1">
                <a href="#" class="btn btn-default js-tools text-center" style="line-height: 30px;" data-tool="line" data-cursor="url(images/line-icon.png), auto" data-toggle="tooltip" data-placement="top" title="Draw Line">
                    <img src="images/line-icon.png" style="width:20px;height:20px;">
                </a>
            </div>

            <div class="text-center my-1 option-menu-wrapper">
                <a href="#" style="background:#000;" class="btn btn-default js-tools" data-toggle="tooltip" data-placement="top" title="Graphs" id="color-indicator">
                    <img src="images/graph-w.png" alt="">
                </a>

                <ul class="option-menu graph-menu" style="display: none;">
                    <li>
                        <a href="" class="js-tools" data-tool="xgraph" data-cursor="crosshair">
                            <img src="images/graph-x.png" alt="">
                        </a>
                    </li>
                    <li>
                        <a href="" class="js-tools" data-tool="xygraph"  data-cursor="crosshair">
                            <img src="images/graph-xy.png" alt="">
                        </a>
                    </li>
                </ul>

            </div>
            <div class="text-center my-1 option-menu-wrapper">
                <a href="#" class="btn btn-default js-tools" data-toggle="tooltip" data-placement="top" title="Shapes">
                    <img src="images/shapes-w.png">
                </a>
                <ul class="option-menu shape-menu" style="display: none">
                    <li>
                        <a href="" class="js-tools" data-tool="line-sarrow" data-cursor="url(images/line-icon.png), auto">
                            <img src="images/line-single-arrow.png" alt="">
                        </a>
                    </li>
                    <li>
                        <a href="" class="js-tools" data-tool="line-darrow" data-cursor="url(images/line-icon.png), auto">
                            <img src="images/line-double-arrow.png" alt="">
                        </a>
                    </li>
                    <li>
                        <a href="" class="js-tools" data-tool="rectangle" data-cursor="url(images/line-icon.png), auto">
                            <img src="images/square.png" alt="">
                        </a>
                    </li>
                    <li>
                        <a href="" class="js-tools" data-tool="rectangle-filled" data-cursor="url(images/line-icon.png), auto">
                            <img src="images/square-filled.png" alt="">
                        </a>
                    </li>

                    <li>
                        <a href="" class="js-tools" data-tool="oval" data-cursor="crosshair">
                            <img src="images/circle.png" alt="">
                        </a>
                    </li>

                    <li>
                        <a href="" class="js-tools" data-tool="oval-filled" data-cursor="crosshair">
                            <img src="images/circle-filled.png" alt="">
                        </a>
                    </li>
                    <li>
                        <a href="" class="js-tools" data-tool="cylinder" data-cursor="crosshair">
                            <img src="images/cylinder.png" alt="">
                        </a>
                    </li>
                    <li>
                        <a href="" class="js-tools" data-tool="cone" data-cursor="crosshair">
                            <img src="images/cone.png" alt="">
                        </a>
                    </li>
                    <li>
                        <a href="" class="js-tools" data-tool="cube" data-cursor="crosshair">
                            <img src="images/cube.png" alt="">
                        </a>
                    </li>
                    <li>
                        <a href="" class="js-tools" data-tool="pyramid" data-cursor="crosshair">
                            <img src="images/prism.png" alt="">
                        </a>
                    </li>
                </ul>
            </div>
            <div class="text-center my-1">
                <a href="#" class="btn btn-default js-tools" data-toggle="tooltip" data-placement="top" title="Undo" id="undo-tool">
                    <img src="images/undo-w.png" style="width: 42px;">
                </a>
            </div>
            <div class="text-center my-1">
                <a href="#" class="btn btn-default btn-square mx-auto js-show-equation-modal">
                    <span data-toggle="tooltip" data-placement="top" title="Click here to open equation editor"> <img src="images/math-w.png"></span>
                </a>
            </div>
            <div class="text-center my-1 option-menu-wrapper  js-enable-symbol">
                <a href="#" class="btn btn-default btn-square mx-auto">
                    <img src="images/science-w.png" style="width: 42px;">
                </a>
                <ul class="option-menu symbol-dropdown" style="display:none;">
                    <li> <span class="js-science-symbol" data-symbol=":">:</span></li>
                    <li> <span class="js-science-symbol" data-symbol="≤">≤</span></li>
                    <li> <span class="js-science-symbol" data-symbol="≥">≥</span></li>
                    <li> <span class="js-science-symbol" data-symbol="◦">◦</span></li>
                    <li> <span class="js-science-symbol" data-symbol="≈">≈</span></li>
                    <li> <span class="js-science-symbol" data-symbol="∈">∈</span></li>
                    <li> <span class="js-science-symbol" data-symbol="×">×</span></li>
                    <li> <span class="js-science-symbol" data-symbol="±">±</span></li>
                    <li> <span class="js-science-symbol" data-symbol="∧">∧</span></li>
                    <li> <span class="js-science-symbol" data-symbol="∨">∨</span></li>
                    <li> <span class="js-science-symbol" data-symbol="≡">≡</span></li>
                    <li> <span class="js-science-symbol" data-symbol="≅">≅</span></li>
                    <li> <span class="js-science-symbol" data-symbol="≠">≠</span></li>
                    <li> <span class="js-science-symbol" data-symbol="∼">∼</span></li>
                    <li> <span class="js-science-symbol" data-symbol="∝">∝</span></li>
                    <li> <span class="js-science-symbol" data-symbol="≺">≺</span></li>
                    <li> <span class="js-science-symbol" data-symbol="⪯">⪯</span></li>
                    <li> <span class="js-science-symbol" data-symbol="⊂">⊂</span></li>
                    <li> <span class="js-science-symbol" data-symbol="⊆">⊆</span></li>
                    <li> <span class="js-science-symbol" data-symbol="≻">≻</span></li>
                    <li> <span class="js-science-symbol" data-symbol="⪰">⪰</span></li>
                    <li> <span class="js-science-symbol" data-symbol="⊥">⊥</span></li>
                    <li> <span class="js-science-symbol" data-symbol="∣">∣</span></li>
                    <li> <span class="js-science-symbol" data-symbol="∥">∥</span></li>
                    <li> <span class="js-science-symbol" data-symbol="∂">∂</span></li>
                    <li> <span class="js-science-symbol" data-symbol="∞">∞</span></li>
                    <li><span class="js-science-symbol" data-symbol="Γ">Γ</span></li>
                    <li><span class="js-science-symbol" data-symbol="Δ">Δ</span></li>
                    <li><span class="js-science-symbol" data-symbol="Θ">Θ</span></li>
                    <li><span class="js-science-symbol" data-symbol="Λ">Λ</span></li>
                    <li><span class="js-science-symbol" data-symbol="Ξ">Ξ</span></li>
                    <li><span class="js-science-symbol" data-symbol="Π">Π</span></li>
                    <li><span class="js-science-symbol" data-symbol="Σ">Σ</span></li>
                    <li><span class="js-science-symbol" data-symbol="Υ">Υ</span></li>
                    <li><span class="js-science-symbol" data-symbol="Φ">Φ</span></li>
                    <li><span class="js-science-symbol" data-symbol="Ψ">Ψ</span></li>
                    <li><span class="js-science-symbol" data-symbol="Ω">Ω</span></li>

                    <li><span class="js-science-symbol" data-symbol="α">α</span></li>
                    <li><span class="js-science-symbol" data-symbol="β">β</span></li>
                    <li><span class="js-science-symbol" data-symbol="γ">γ</span></li>
                    <li><span class="js-science-symbol" data-symbol="δ">δ</span></li>
                    <li><span class="js-science-symbol" data-symbol=">">ε</span></li>
                    <li><span class="js-science-symbol" data-symbol="ϵ">ϵ</span></li>
                    <li><span class="js-science-symbol" data-symbol="ζ">ζ</span></li>
                    <li><span class="js-science-symbol" data-symbol="η">η</span></li>
                    <li><span class="js-science-symbol" data-symbol="θ">θ</span></li>
                    <li><span class="js-science-symbol" data-symbol="ϑ">ϑ</span></li>
                    <li><span class="js-science-symbol" data-symbol="ι">ι</span></li>
                    <li><span class="js-science-symbol" data-symbol="κ">κ</span></li>
                    <li><span class="js-science-symbol" data-symbol="λ">λ</span></li>
                    <li><span class="js-science-symbol" data-symbol="μ">μ</span></li>
                    <li><span class="js-science-symbol" data-symbol="ν">ν</span></li>
                    <li><span class="js-science-symbol" data-symbol="ξ">ξ</span></li>
                    <li><span class="js-science-symbol" data-symbol="π">π</span></li>
                    <li><span class="js-science-symbol" data-symbol="ϖ">ϖ</span></li>
                    <li><span class="js-science-symbol" data-symbol="ρ">ρ</span></li>
                    <li><span class="js-science-symbol" data-symbol="ϱ">ϱ</span></li>
                    <li><span class="js-science-symbol" data-symbol="σ">σ</span></li>
                    <li><span class="js-science-symbol" data-symbol="ς">ς</span></li>
                    <li><span class="js-science-symbol" data-symbol="τ">τ</span></li>
                    <li><span class="js-science-symbol" data-symbol="υ">υ</span></li>
                    <li><span class="js-science-symbol" data-symbol="φ">φ</span></li>
                    <li><span class="js-science-symbol" data-symbol="ϕ">ϕ</span></li>
                    <li><span class="js-science-symbol" data-symbol="χ">χ</span></li>
                    <li><span class="js-science-symbol" data-symbol=">">ψ</span></li>
                    <li><span class="js-science-symbol" data-symbol="ω">ω</span></li>
                </ul>
            </div>

            <div class="text-center my-1">
                <a href="#" class="btn btn-default btn-square mx-auto" id="enable-subscript" data-toggle="tooltip" data-placement="top" title="Click here to type subscript">
                    <img src="images/asub-w.png" alt="">
                </a>

            </div>

            <div class="text-center my-1">
                <a href="#" class="btn btn-default btn-square mx-auto" id="enable-superscript" data-toggle="tooltip" data-placement="top" title="Click here to type superscript">
                    <img src="images/a2-w.png" alt="">
                </a>
            </div>

            <div class="text-center my-1">
                <a href="#" class="btn btn-default js-tools" id="clear-canvas" data-toggle="modal" data-target="#save-modal">
                    <span class="" data-toggle="tooltip" data-placement="top" title="Click here to clear the board"><img src="images/clear.png"></span>
                </a>
            </div>

        </div>

        <div class="col-md-11 border px-0 canvas-list">

            <div class="row">
                <div class="col-md-6 px-0 canvas-writing writing">
                    <div class="canvas-wrapper">
                        <canvas class="drawing-board" id="drawing-board"></canvas>
                        <canvas id="fake-canvas" class="fake-canvas"></canvas>
                        <canvas id="resize-canvas" style="display: none;"></canvas>
                        <div>
                            <div id="text-holder" contenteditable>

                            </div>
                        </div>
                        <div id="pdf-reader" style="display: none;"></div>
                        <div id="drag-div"></div>
                    </div>
                </div>

                <div class="col-md-6 px-0">
                    <div class="session-canvas-wrapper">
                        <canvas  class="session-canvas" id="session-canvas"></canvas>
                    </div>
                </div>

            </div>
            <br>
            <div class="card chat-card">
                <div class="header">
                    <div class="row ">
                        <div class="col-sm-4">
                            <a  class="nav-link active" id="participants-tab" data-toggle="tab" href="#participants" role="tab"  style="background-color:lightgrey; border:2px solid grey; "aria-controls="home" aria-selected="true"><img src="images/multiple-users-silhouette.png"> <b style="color:black;">Participants</b></a>

                        </div>
                        <div class="col-sm-8">
                            <a class="nav-link active" id="participant-tab" data-toggle="tab" href="#chat" role="tab" style="border:2px solidgrey;"aria-controls="home" aria-selected="true"><img src="images/comments.png"><b style="color:black;"> Chat</b></a>
                        </div>
                    </div>
                </div>
                <div class="body">
                    <div class="row">
                        <div class="col-sm-3">
                            <div class="participant-list">
                                <ul id="online-users">

                                </ul>
                            </div>
                        </div>
                        <div class="col-sm-9">

                            <div  class="chat-room">
                               <ul id="chat-board">

                               </ul>
                            </div>
                            <form id="chat-input-area" class="chat-input">
                                <div class="input-group">
                                    <input type="text" class="form-control" name="chat-input" id="chat-input">
                                    <ul class="input-group-addon list-inline">
                                        <li class="dropdown">
                                            <a herf="#" class=" dropdown-toggle" data-toggle="dropdown" role="button" aria-expanded="false"><img
                                                    src="images/icons/ic_tag_faces_black_24dp_1x.png" alt=""></a>
                                            <ul class="dropdown-menu dropdown-menu-left">

                                                <li class="body">
                                                    <div class="slimScrollDiv" style="position: relative; overflow: hidden; width: auto; height: 254px;">
                                                        <ul class="menu" style="overflow: hidden; width: auto; height: 254px;">
                                                            <li>
                                                                <a href="javascript:void(0);" class=" waves-effect waves-block">
                                                                    <div class="icon-circle bg-cyan"><i class="fa fa-smile-o" aria-hidden="true"></i>
                                                                    </div>
                                                                    <div class="menu-info">
                                                                        <h4>Great Job</h4>

                                                                    </div>
                                                                </a>
                                                            </li>
                                                            <li>
                                                                <a href="javascript:void(0);" class=" waves-effect waves-block">
                                                                    <div class="icon-circle bg-cyan"><i class="fa fa-smile-o" aria-hidden="true"></i>
                                                                    </div>
                                                                    <div class="menu-info">
                                                                        <h4>can I help you?</h4>

                                                                    </div>
                                                                </a>
                                                            </li>
                                                            <li>
                                                                <a href="javascript:void(0);" class=" waves-effect waves-block">
                                                                    <div class="icon-circle bg-cyan">
                                                                        <i class="fa fa-smile-o" aria-hidden="true"></i>
                                                                    </div>
                                                                    <div class="menu-info">
                                                                        <h4>I have an idea!</h4>

                                                                    </div>
                                                                </a>
                                                            </li>
                                                            <li>
                                                                <a href="javascript:void(0);" class=" waves-effect waves-block">
                                                                    <div class="icon-circle bg-cyan">
                                                                        <i class="fa fa-smile-o" aria-hidden="true"></i>
                                                                    </div>
                                                                    <div class="menu-info">
                                                                        <h4>Try Again!</h4>

                                                                    </div>
                                                                </a>
                                                            </li>
                                                            <li>
                                                                <a href="javascript:void(0);" class=" waves-effect waves-block">
                                                                    <div class="icon-circle bg-cyan">
                                                                        <i class="fa fa-smile-o" aria-hidden="true"></i>
                                                                    </div>
                                                                    <div class="menu-info">
                                                                        <h4>yes!</h4>

                                                                    </div>
                                                                </a>
                                                            </li>
                                                            <li>
                                                                <a href="javascript:void(0);" class=" waves-effect waves-block">
                                                                    <div class="icon-circle bg-cyan"><i class="fa fa-smile-o" aria-hidden="true"></i>
                                                                    </div>
                                                                    <div class="menu-info">
                                                                        <h4>hello!</h4>

                                                                    </div>
                                                                </a>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </li>
                                            </ul>
                                        </li>
                                        <li>
                                            <button type="submit" class="input-group-addon">Send</button>
                                        </li>
                                        <li>
                                            <input type="file" id="attach-file" style="display: none;">
                                            <a href="#" class="js-attach-file" ><img src="images/icons/ic_add_a_photo_black_24dp_1x.png" alt=""></a>
                                        </li>
                                    </ul>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>


        </div>

    </div>

</div>


<div style="display: none;" id="canvas-image-holder">
</div>
<div class="modal" id="symbol-modal" >
    <div class="modal-dialog">
        <div class="modal-container">
            <div class="modal-content">
                <div class="modal-header">
                    <h4 class="text-left">Math Editor</h4>
                    <button class="btn btn-close btn-sm" data-dismiss="modal">&times;</button>
                </div>
                <div class="modal-body">
                   <div id="equation-editor-wrapper">
                </div>
                <div class="modal-footer">
                    <!--<button class="btn btn-default btn-sm">Copy To Editor</button>-->
                    <button class="btn btn-default btn-sm" id="clear-math-editor">Clear</button>
                    <button class="btn btn-default btn-sm" id="toLatex">Insert</button>
                </div>
            </div>
        </div>
    </div>
</div>
</div>
<div class="modal" id="save-modal">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h5>Do you want to save this painting?</h5>
                <button class="btn btn-close" data-dismiss="modal">&times;</button>
            </div>
            <div class="modal-footer">
                <button class="btn btn-default js-clear-canvas" data-ans="no">Cancel</button>
                <a href="#" class="btn btn-default js-clear-canvas" data-ans="yes">Save</a>
            </div>
        </div>
    </div>
</div>

<div class="modal" id="cloud-modal">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h5>CloudPack Explorer</h5>
                <button class="btn btn-close" data-dismiss="modal">&times;</button>
            </div>
            <div class="modal-body">
                <div id="tree-holder">

                </div>
            </div>
        </div>
    </div>
</div>
<div class="modal" id="print-modal">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h5>Print Options</h5>
                <button class="btn btn-close" data-dismiss="modal">&times;</button>
            </div>
            <div class="modal-body">
                <button class="btn btn-primary" id="print-current-slide">Print Current Slide</button>
                <button class="btn btn-primary" id="print-all-slides">Print All Slides</button>
                <button class="btn btn-primary" id="print-chat">Print Chat</button>
            </div>
            <div class="modal-footer">
                <button class="btn" data-dismiss="modal">Cancel</button>
            </div>
        </div>
    </div>
</div>
<div class="modal fade" id="file-download-modal">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button class="btn btn-close" data-dismiss="modal">&times;</button>
            </div>
            <div class="modal-body text-center">

            </div>
            <div class="modal-footer">
                <button class="btn" data-dismiss="modal">Close</button>
            </div>
        </div>
    </div>
</div>
<!-- Optional JavaScript -->
<!-- jQuery first, then Popper.js, then Bootstrap JS -->
<script src="js/jquery.min.js"></script>
<script src="chatjs/socket.io.js"></script>
<script src="js/proper.min.js"></script>
<script src="plugins/jquery-ui/jquery-ui.min.js"></script>
<script src="plugins/bootstrap/js/bootstrap.min.js"></script>
<script src="plugins/node-waves/waves.js"></script>

 <script src="equation-editor/mathquill.min.js"></script>
<script src="equation-editor/matheditor.js"></script>
<script src="js/dom-to-image.js"></script>
<script src="js-tree/jstree.js"></script>
<script src="plugins/spectrum/spectrum.js"></script>
<script src="js/canvas.js"></script>

</body>
</html>





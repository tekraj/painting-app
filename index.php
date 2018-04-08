<?php
    $colors =  ['#e6194b','#3cb44b','#ffe119','#0082c8','#f58231','#911eb4','#46f0f0','#f032e6','#d2f53c','#fabebe','#008080','#e6beff','#aa6e28','#fffac8','#800000','#aaffc3','#808000','#ffd8b1','#000080','#808080','#FFFFFF','#000000'];
    $fonts = [['name'=>'Times New Roman','value'=>'"Times New Roman", Times, serif'],['name'=>'Arial','value'=>'Arial, Helvetica, sans-serif'],['name'=>'Courier New','value'=>'"Courier New", Courier, monospace']];
    $fontSizes = [8,9,10,11,12,13,14,16,18,20,24,30,36,42,48];
    $fontStyle = ['normal','bold','italic','bold italic'];
 ?>

<!doctype html>
<html lang="en">
  <head>
    <!-- Required meta tags -->
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <!-- Bootstrap CSS -->
      <link rel="stylesheet" href="bootstrap/css/bootstrap.min.css">
      <link rel="stylesheet" href="font-awesome/css/fontawesome.css">
      <link rel="stylesheet" href="jquery-ui/jquery-ui.min.css">
      <link rel="stylesheet" type="text/css" href="css/style.css" >
      <link href="equation-editor/Fonts/TeX/font.css" rel="stylesheet" type="text/css" charset="utf-8" />
      <link href="equation-editor/css/equationEditor.css" rel="stylesheet" type="text/css" charset="utf-8" />
    <title>White Board</title>
  </head>
  <body>
    <header class="container-fluid">
        <ul class="nav">
  <li class="nav-item">
    <a class="nav-link active" href="#">File</a>
  </li>
  <li class="nav-item">
    <a class="nav-link" href="#">Edit</a>
  </li>
  <li class="nav-item">
    <a class="nav-link" href="#">Sessions</a>
  </li>
  <li class="nav-item">
    <a class="nav-link " href="#">Tools</a>
  </li>
  <li class="nav-item">
    <a class="nav-link" href="#">Session Log</a>
  </li>
  <li class="nav-item">
    <a class="nav-link" href="#">Favorites</a>
  </li>
</ul>
          
    </header>
      <hr class="mt-0 mb-2 clearfix">
      <div class="first_section container-fluid">
          <a href="#" class="btn btn-primary btn-square js-tools" id="mouse-cursor" data-tool="none" data-cursor="default">
            <span class=""><img src="images/computer-mouse-cursor.png"></span>
          </a>
          <a href="#" class="btn btn-secondary btn-square">
            <span class=""><i class="fa fa-arrows"></i></span>
          </a>
          <a href="#" class="btn btn-secondary btn-square">
            <span class="font">Wb</span>
          </a>
          <a href="#" class="btn btn-secondary btn-square">
            <span class=""><img src="images/internet.png"></span>
          </a>
          <a href="#" class="btn btn-secondary btn-square">
          <span class=""><i class="fa fa-pie-chart" aria-hidden="true"></i></span>
          </a>
          <a href="#" class="btn btn-secondary btn-square">
          <span class=""><i class="fa fa-cloud" aria-hidden="true"></i></span>
          </a>
          <a href="#" class="btn btn-secondary btn-square">
          <span class=""><img src="images/note.png"></span>
          </a>
          <a href="#" class="btn btn-secondary btn-square">
          <span class=""><img src="images/email.png"></span>
          </a>
          <a href="#" class="btn btn-secondary btn-square" id="print-canvas">
            <span class=""><img src="images/printer-.png" width="16px;"></span>
          </a>
          <a href="#" class="btn btn-secondary btn-square">
          <span class=""><img src="images/share-connection-sing.png"></span>
          </a>
          <a href="#" class="btn btn-secondary btn-square">
          <span class=""><img src="images/black-back-closed-envelope-shape.png"></span>
          </a>
          <a href="#" class="btn btn-secondary btn-square">
          <span class=""><img src="images/monitor.png"></span>
          </a>
          <span style="font-size:12px;"><b>Slide 1/1</b></span>
          <div class="float-right">
        <a class="btn btn-secondary btn-sm" id="new-paint" >New Board</a>
<input class="btn btn-secondary btn-sm" type="button" value="Back">
<input class="btn btn-secondary btn-sm" type="submit" value="Next">
      </div>
          
      </div>
      
      <div class="second-section container-fluid mt-3">
        <div class="row">
            <div class="col-md-1">
                <div class="text-center my-1 option-menu-wrapper">
                 <a  href="#" class="btn btn-primary btn-square mx-auto js-tools" id="pencil-tool" data-tool="pencil" data-toggle="tooltip" data-placement="top" title="Pencil" data-cursor="url(images/pencil.png), auto">
                    <span class=""><img src="images/pencil.png" width="16px;"></span>
                 </a>
                    <ul class="option-menu" style="display: none;">
                        <li><a href="#" class="line-width js-line-width active" data-line="1">
                                <span style="border-width: 2px;"></span>
                            </a></li>
                        <li><a href="#" class="line-width js-line-width" data-line="2">
                                <span style="border-width: 4px;"></span>
                            </a></li>
                        <li><a href="#" class="line-width js-line-width" data-line="3">
                                <span style="border-width: 6px;"></span>
                            </a></li>
                        <li><a href="#" class="line-width js-line-width" data-line="4">
                                <span style="border-width: 8px;"></span>
                            </a></li>
                    </ul>
                 </div>  
                <div class="text-center my-1 option-menu-wrapper">
                     <a href="#" class="btn btn-secondary btn-square mx-auto js-tools" data-tool="eraser" data-toggle="tooltip" data-placement="top" title="Eraser" data-cursor="crosshair">
                        <span class=""><img src="images/eraser.png" width="16px;"></span>
                     </a>
                    <div class="option-menu eraser-slider" style="display: none;">
                        <div id="eraser-slider"></div>
                    </div>

                 </div>
                <div class="text-center my-1 ">
                 <a href="#" class="btn btn-secondary btn-square mx-auto js-tools" data-tool="text" data-cursor="url(images/text.png), auto" data-toggle="tooltip" data-placement="top" title="Text">
                    <span class=""><img src="images/text.png"></span>
                 </a>
                 </div>
                <div class="text-center my-1  option-menu-wrapper">
                     <a href="#" class="btn btn-secondary btn-square mx-auto js-tools">
                        <span class="font">font</span>
                     </a>
                    <div class="option-menu font-menu" style="display: none;">
                        <h4>Font Properties</h4>

                            <div class="row font-wrapper">
                                <div class="col-sm-5">
                                    <h5>Font</h5>
                                    <ul>
                                        <?php
                                        $fc = 0;
                                        foreach($fonts as $font):?>
                                            <li><a href="#" class="js-font <?php echo $fc==0 ? 'active': '' ?>" data-font='<?php echo $font['value'] ?>'><?php echo $font['name'];?></a></li>
                                        <?php
                                        $fc++;
                                        endforeach;
                                        ?>
                                    </ul>
                                </div>
                                <div class="col-sm-5">
                                    <h5>Font Style</h5>
                                    <ul>
                                        <?php foreach($fontStyle as $key=>$style):?>
                                            <li><a href="#" class="js-font-style <?php echo $key==0 ? 'active' : '';?>" data-style="<?php echo $style ?>"><?php echo ucfirst($style);?></a></li>
                                        <?php endforeach; ?>
                                    </ul>
                                </div>
                                <div class="col-sm-2">
                                    <h5>Size</h5>
                                    <ul>
                                        <?php foreach($fontSizes as $size):?>
                                            <li><a href="#" class="js-font-size <?php echo $size==18 ? 'active' : ''; ?>" data-size="<?php echo $size ?>"><?php echo $size;?></a></li>
                                        <?php endforeach; ?>
                                    </ul>
                                </div>
                                <div class="col-sm-12">
                                    <div class="demo-font-text js-text-demo">
                                        -- Hello World --
                                    </div>
                                </div>
                                <div class="col-sm-12 text-center">
                                    <button class="btn btn-default" id="change-font">OK</button>
                                    <button class="btn btn-default" id="cancel-font">Cancel</button>
                                </div>
                            </div>
                        </div>
                 </div>
                <div class="text-center my-1 option-menu-wrapper">
                     <a href="#" style="background:#000;" class="btn btn-secondary btn-square mx-auto js-tools" data-toggle="tooltip" data-placement="top" title="Colors" id="color-indicator">
                        <span class=""><img src="images/palette.png"></span>
                     </a>
                    <div class="option-menu color-menu" style="display: none;">
                            <ul class="color-pallet row">
                                <?php foreach($colors as $color): ?>
                                    <li class="col-sm-2"><a href="#"  data-color="<?php echo $color; ?>" style="background:<?php echo $color;?>" class="color-span js-color-code"></a></li>
                                <?php endforeach;?>
                            </ul>
                            <div>
                                <a href="#" id="color-spectrum" class="color-spectrum">More Colors</a>
                            </div>

                    </div>

                 </div>
                <div class="text-center my-1">
                 <a href="#" class="btn btn-secondary btn-square mx-auto" data-toggle="tooltip" data-placement="top" title="Just point the mouse where you want to paste the image and Press Ctrl+V">
                    <span class=""><img src="images/paste.png" width="16px;"></span>
                 </a>
                 </div>
                <div class="text-center my-1">
                 <a href="#" class="btn btn-secondary btn-square mx-auto js-tools" data-tool="line" data-cursor="url(images/line-icon.png), auto" data-toggle="tooltip" data-placement="top" title="Draw Line">
                    <span class=""><img src="images/line-icon.png" width="16px;"></span>
                 </a>
                 </div>
                <div class="text-center my-1">
                 <a href="#" class="btn btn-secondary btn-square mx-auto" id="full-screen">
                    <span class=""><img src="images/full-screen-selector.png"></span>
                 </a>
                 </div>
                <div class="text-center my-1 option-menu-wrapper">
                    <a href="#" style="background:#000;" class="btn btn-secondary btn-square mx-auto js-tools" data-toggle="tooltip" data-placement="top" title="Graphs" id="color-indicator">
                        <img src="images/icons/ic_list_white_18dp_1x.png" alt="">
                    </a>

                    <ul class="option-menu color-menu" style="display: none;">
                        <li>
                            <a href="" class="js-tools" data-tool="xgraph">Uni-directiona</a>
                        </li>
                        <li>
                            <a href="" class="js-tools" data-tool="xygraph">XY Graph Graph</a>
                        </li>
                    </ul>

                </div>
                <div class="text-center my-1 option-menu-wrapper">
                 <a href="#" class="btn btn-secondary btn-square mx-auto js-tools"  data-toggle="tooltip" data-placement="top" title="Shapes">
                    <span class=""><img src="images/shapes_basic_3d_shares_yellow-512.png" width="16px;"></span>
                 </a>
                    <ul class="option-menu" style="display: none">
                        <li>
                            <a href="" class="js-tools" data-tool="rectangle" data-cursor="url(images/line-icon.png), auto">Rectangle</a>
                        </li>
                        <li>
                            <a href="" class="js-tools" data-tool="cube" data-cursor="corss-hair">Cube</a>
                        </li>
                        <li>
                            <a href="" class="js-tools" data-tool="oval" data-cursor="cross-hair">Oval</a>
                        </li>
                        <li>
                            <a href="" class="js-tools" data-tool="cylinder" data-cursor="cross-hair">Cylinder</a>
                        </li>
                        <li>
                            <a href="" class="js-tools" data-tool="cone" data-cursor="cross-hair">Cone</a>
                        </li>
                        <li>
                            <a href="" class="js-tools" data-tool="cone" data-cursor="cross-hair">Cone</a>
                        </li>
                        <li>
                            <a href="" class="js-tools" data-tool="pyramid" data-cursor="cross-hair">Pyramid</a>
                        </li>
                    </ul>
                 </div>
                <div class="text-center my-1">
                 <a href="#" class="btn btn-secondary btn-square mx-auto js-tools">
                    <span class=""><img src="images/refresh-arrow.png"></span>
                 </a>
                 </div>
                <div class="text-center my-1">
                 <a href="#" class="btn btn-secondary btn-square mx-auto" data-toggle="modal" data-target="#symbol-modal">
                    <span class=""><img src="images/calculator.png"></span>
                 </a>
                 </div>
                <div class="text-center my-1">
                 <a href="#" class="btn btn-secondary btn-square mx-auto js-tools">
                    <span class=""><img src="images/venus.png"></span>
                 </a>
                 </div>
                <div class="text-center my-1">
                 <a href="#" class="btn btn-secondary btn-square mx-auto js-tools">
                    <span style="font-size:18px;" class="px-1">	a&#769;</span>
                 </a>
                 </div>
                <div class="text-center my-1">
                 <a href="#" class="btn btn-secondary btn-square mx-auto js-tools">
                    <span>a2</span>
                 </a>
                 </div>
                <div class="text-center my-1">
                 <a href="#" class="btn btn-secondary btn-square mx-auto js-tools">
                    <span class=""><img src="images/cross.png"></span>
                 </a>
                 </div>
            
            </div>
            <div class="col-md-11 border px-0">
                <div class="container-fluid">
                <div class="row">
                <div class="col-md-6 px-0 canvas-writing writing">
                    <div class="canvas-wrapper">
                        <canvas  class="drawing-board"  id="drawing-board"></canvas>
                        <textarea class="canvas-text-input js-text-demo" style="display: none;" id="canvas-text-input"></textarea>
                        <canvas id="fake-canvas"   class="fake-canvas"></canvas>
                        <canvas id="resize-canvas" style="display: none;"></canvas>
                    </div>
                </div>
                <div class="col-md-6 px-0">
                     <form class="">
                        <div class="form-group">
                            <textarea class="form-control" id="exampleFormControlTextarea2" rows="17"></textarea>
                        </div>
                    </form>
                </div>
                <div class="col-md-3 pl-0 border-right">
                    <ul class="nav nav-tabs" id="myTab" role="tablist">
                      <li class="nav-item">
                        <a class="nav-link active" id="Participants-tab" data-toggle="tab" href="#Participants" role="tab" aria-controls="home" aria-selected="true"><img src="images/multiple-users-silhouette.png"> Participants</a>
                      </li>
                    </ul>
                    <div class="tab-content hei-1" id="myTabContent">
                      <div class="tab-pane fade show active px-4" id="Participants" role="tabpanel" aria-labelledby="Participants-tab">
                        <img src="images/user.png"> | <img src="images/phone-receiver.png"> | Sasirekha 
                      </div>
                      
                    </div>
            
                </div>
                    <div class="col-md-9 pr-0">
                    <ul class="nav nav-tabs" id="myTab" role="tablist">
                      <li class="nav-item">
                        <a class="nav-link active" id="participant-tab" data-toggle="tab" href="#chat" role="tab" aria-controls="home" aria-selected="true"><img src="images/comments.png"> chat</a>
                      </li>   
                    </ul>
                    <div class="tab-content border  hei-2" id="myTabContent">
                      <div class="tab-pane fade show active" id="chat" role="tabpanel" aria-labelledby="home-tab"></div>
                    </div>
                        <div class="container-fluid">
                            <div class="row">
                                <div class="col-md-9 px-0 my-2">
                                    <input type="text" class="form-control" id="text-input" placeholder="Type your Text">
                                </div>
                                <div class="col-md-3 py-2">
                                    <a href="#" class="mx-3"><img src="images/happy.png"></a>
                                    
                                    <a href="#" class="mx-3"><img src="images/instagram-logo.png"></a>
                                    <a class="btn btn-success mx-3 btn-sm" href="#" role="button">Send</a>
                                </div>
                                
                            </div>
                </div>
                </div>
            </div>
            </div>
            </div>
            
           
        </div>
      </div>
    <div class="modal" id="symbol-modal">
        <div class="modal-dialog">
            <div class="modal-container">
                <div class="modal-content">
                    <div class="modal-header">
                        <h4 class="text-left">Math Editor</h4>
                        <button class="btn btn-close btn-sm" data-dismiss="modal">&times;</button>
                    </div>
                    <div class="modal-body">
                        <?php /**
                        <div class="row">
                            <div class="col-sm-3">
                                <div class="form-group row">
                                    <label for="symbol-size" class="col-sm-2 col-form-label" style="margin-top:-6px;">Size</label>
                                    <div class="col-sm-10">
                                        <select name="symbol-size" id="symbol-size" class="form-control form-control-sm">
                                            <?php $symbolSize = [20,24,26,28,36,46,48,72]; ?>
                                            <?php foreach($symbolSize as $size):?>
                                                <option value="<?php echo $size;?>"><?php echo $size;?></option>
                                            <?php endforeach; ?>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div class="col-sm-2 dropdown">
                                <button class="btn btn-default btn-sm dropdown-toggle" type="button" id="function-button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    Functions
                                </button>
                                <ul class="dropdown-menu function-menu symbol-menu" aria-labelledby="function-button">
                                    <li><a href="#" class="js-symbols" data-value="">a<sub>b</sub></a></li>
                                    <li><a href="#" class="js-symbols" data-value="">a<sup>b</sup></a></li>
                                    <li><a href="#" class="js-symbols" data-value=""><u>ab</u><br>cd</a></li>
                                    <li><a href="#" class="js-symbols" data-value="">√ab</li>
                                    <li><a href="#" class="js-symbols" data-value=""><sup>a</sup>√ab</li>
                                    <li><a href="#" class="js-symbols" data-value=""><small>n</small><span class="f-50">&#8721;</span>i=1</li>
                                    <li><a href="#" class="js-symbols" data-value=""><small>n</small><span class="f-50">&#8719;</span>i=1</li>
                                    <li><a href="#" class="js-symbols" data-value=""><span class="f-50">&#8747;</span></a></li>
                                    <li><a href="#" class="js-symbols" data-value="">b<span class="f-50">&#8747;</span>a</a></li>
                                    <li><a href="#" class="js-symbols" data-value="">lim<br><small>a->b</small></a></li>
                                    <li><a href="#" class="js-symbols f-32" data-value="">&#402;()</a></li>
                                    <li><a href="#" class="js-symbols f-32" data-value="">ln</a></li>
                                    <li><a href="#" class="js-symbols f-32" data-value="">log<sub>n</sub></a></li>
                                    <li><a href="#" class="js-symbols f-32" data-value="">log</a></li>
                                    <li><a href="#" class="js-symbols f-32" data-value="">e<sup>x</sup></a></li>
                                </ul>
                            </div>

                            <div class="col-sm-2 dropdown">
                                <button class="btn btn-default btn-sm dropdown-toggle" type="button" id="trignometry-button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    Trigonometry
                                </button>
                                <ul class="dropdown-menu function-menu symbol-menu" aria-labelledby="trignometry-button">
                                   <?php
                                        $trignometry = ['sin','arcsin','sinh','cos','arccos','cosh','tan','arctan','tanh','csc','arccsc','csch','sec','arcsec','sech','cot','arccot','coth'];
                                   ?>
                                    <?php foreach($trignometry as $t) : ?>
                                    <li><a href="#" class="js-symbols" data-value="<?php echo $t ?>"><?php echo $t; ?></a></li>
                                    <?php endforeach; ?>
                                </ul>
                            </div>
                            <div class="col-sm-2 dropdown">
                                <button class="btn btn-default btn-sm dropdown-toggle" type="button" id="miscellaneous-button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    Miscellaneous
                                </button>
                                <ul class="dropdown-menu misscelleneous-menu symbol-menu" aria-labelledby="miscellaneous-button">
                                    <?php
                                    $miscell = ['corrcoef','cov','median','mean','std','var','cov','mod','floor','ceil','sign','gcd','lcm','rand','random','eye','transpose','inverse','det','min','max','rows','columns','plot','meshgrid','mesh'];
                                    ?>
                                    <?php foreach($miscell as $t) : ?>
                                        <li><a href="#" class="js-symbols" data-value="<?php echo $t ?>"><?php echo $t; ?></a></li>
                                    <?php endforeach; ?>
                                </ul>
                            </div>
                            <div class="col-sm-3">
                                <button class="btn btn-default btn-sm dropdown-toggle" type="button" id="gree-alphabet-button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    Greek Alphabets
                                </button>
                                <ul class="dropdown-menu function-menu symbol-menu" aria-labelledby="gree-alphabet-button">
                                    <?php
                                    $greeks = [
                                            ['unicode'=>'']
                                    ]
                                    ?>
                                    <?php foreach($trignometry as $t) : ?>
                                        <li><a href="#" class="js-symbols" data-value="<?php echo $t ?>"><?php echo $t; ?></a></li>
                                    <?php endforeach; ?>
                                </ul>
                            </div>
                        </div>
                        */?>
                        <div class="tabs">
                            <ul class="outer-tab-links tab-links">
                                <li class="outerTab active"><a href="#common">Common</a></li>
                                <li class="outerTab"><a href="#brackets">Brackets</a></li>
                                <li class="outerTab"><a href="#symbols">Symbols</a></li>
                                <li class="outerTab"><a href="#functions">Functions</a></li>
                                <li class="outerTab"><a href="#largeOperators">Large Operators</a></li>
                                <li class="outerTab"><a href="#integrals">Integrals</a></li>
                                <li class="outerTab"><a href="#misc">Misc</a></li>
                            </ul>

                            <div class="tab-content" id="tab-content-top">
                                <div id="common" class="tab outer active">
                                    <img class="menuItem" id="stackedFractionButton" src="equation-editor/MenuImages/png/stackedFraction.png">
                                    <img class="menuItem" id="superscriptButton" src="equation-editor/MenuImages/png/superscript.png">
                                    <img class="menuItem" id="subscriptButton" src="equation-editor/MenuImages/png/subscript.png">
                                    <img class="menuItem" id="superscriptAndSubscriptButton" src="equation-editor/MenuImages/png/superscriptAndSubscript.png">
                                    <img class="menuItem" id="squareRootButton" src="equation-editor/MenuImages/png/squareRoot.png">
                                    <img class="menuItem" id="nthRootButton" height="60" src="equation-editor/MenuImages/png/nthRoot.png">
                                    <img class="menuItem" id="limitButton" src="equation-editor/MenuImages/png/limit.png">
                                    <img class="menuItem" id="logLowerButton" height="55" src="equation-editor/MenuImages/png/log_n.png">
                                    <span class="menuItem MathJax_Main" id="logButton" style="font-size: 45px;">log</span>
                                    <span class="menuItem MathJax_Main" id="lnButton" style="font-size: 45px;">ln</span>
                                </div>

                                <div id="brackets" class="tab outer">
                                    <ul class="inner-tab-links tab-links">
                                        <li class="innerTab active"><a href="#bracketsSingle">Single</a></li>
                                        <li class="innerTab"><a href="#bracketsPair">Pair</a></li>
                                    </ul>
                                    <div class="tab-content tab-content-nested">
                                        <div id="bracketsSingle" class="tab inner active">
                                            <span class="menuItem MathJax_Main" id="leftAngleBracketButton" style="font-size: 65px;">&#10216;</span>
                                            <span class="menuItem MathJax_Main" id="rightAngleBracketButton" style="font-size: 65px;">&#10217;</span>
                                            <span class="menuItem MathJax_Main" id="leftFloorBracketButton" style="font-size: 65px;">&#8970;</span>
                                            <span class="menuItem MathJax_Main" id="rightFloorBracketButton" style="font-size: 65px;">&#8971;</span>
                                            <span class="menuItem MathJax_Main" id="leftCeilBracketButton" style="font-size: 65px;">&#8968;</span>
                                            <span class="menuItem MathJax_Main" id="rightCeilBracketButton" style="font-size: 65px;">&#8969;</span>
                                        </div>
                                        <div id="bracketsPair" class="tab inner">
                                            <img class="menuItem" id="parenthesesBracketPairButton" src="equation-editor/MenuImages/png/parenthesesBracketPair.png">
                                            <img class="menuItem" id="squareBracketPairButton" src="equation-editor/MenuImages/png/squareBracketPair.png">
                                            <img class="menuItem" id="curlyBracketPairButton" src="equation-editor/MenuImages/png/curlyBracketPair.png">
                                            <img class="menuItem" id="angleBracketPairButton" src="equation-editor/MenuImages/png/angleBracketPair.png">
                                            <img class="menuItem" id="floorBracketPairButton" src="equation-editor/MenuImages/png/floorBracketPair.png">
                                            <img class="menuItem" id="ceilBracketPairButton" src="equation-editor/MenuImages/png/ceilBracketPair.png">
                                            <img class="menuItem" id="absValBracketPairButton" src="equation-editor/MenuImages/png/absBracketPair.png">
                                            <img class="menuItem" id="normBracketPairButton" src="equation-editor/MenuImages/png/normBracketPair.png">
                                        </div>
                                    </div>
                                </div>

                                <div id="symbols" class="tab outer">
                                    <ul class="inner-tab-links tab-links">
                                        <li class="innerTab active"><a href="#symbolsOperators">Operators</a></li>
                                        <li class="innerTab"><a href="#symbolsGreek">Greek</a></li>
                                        <li class="innerTab"><a href="#symbolsMisc">Misc</a></li>
                                    </ul>
                                    <div class="tab-content tab-content-nested">
                                        <div id="symbolsOperators" class="tab inner active">
                                            <span class="menuItem MathJax_Main" id="colonButton" style="font-size: 45px;">:</span>
                                            <span class="menuItem MathJax_Main" id="lessThanOrEqualToButton" style="font-size: 45px;">&#x2264;</span>
                                            <span class="menuItem MathJax_Main" id="greaterThanOrEqualToButton" style="font-size: 45px;">&#x2265;</span>
                                            <span class="menuItem MathJax_Main" id="circleOperatorButton" style="font-size: 45px;">&#9702;</span>
                                            <span class="menuItem MathJax_Main" id="approxEqualToButton" style="font-size: 45px;">&#x2248;</span>
                                            <span class="menuItem MathJax_Main" id="belongsToButton" style="font-size: 45px;">&#8712;</span>
                                            <span class="menuItem MathJax_Main" id="timesButton" style="font-size: 45px;">&#215;</span>
                                            <span class="menuItem MathJax_Main" id="pmButton" style="font-size: 45px;">&#177;</span>
                                            <span class="menuItem MathJax_Main" id="wedgeButton" style="font-size: 45px;">&#8743;</span>
                                            <span class="menuItem MathJax_Main" id="veeButton" style="font-size: 45px;">&#8744;</span>
                                            <span class="menuItem MathJax_Main" id="equivButton" style="font-size: 45px;">&#8801;</span>
                                            <span class="menuItem MathJax_Main" id="congButton" style="font-size: 45px;">&#8773;</span>
                                            <span class="menuItem MathJax_Main" id="neqButton" style="font-size: 45px;">&#8800;</span>
                                            <span class="menuItem MathJax_Main" id="simButton" style="font-size: 45px;">&#8764;</span>
                                            <span class="menuItem MathJax_Main" id="proptoButton" style="font-size: 45px;">&#8733;</span>
                                            <span class="menuItem MathJax_Main" id="precButton" style="font-size: 45px;">&#8826;</span>
                                            <span class="menuItem MathJax_Main" id="precEqButton" style="font-size: 45px;">&#10927;</span>
                                            <span class="menuItem MathJax_Main" id="subsetButton" style="font-size: 45px;">&#8834;</span>
                                            <span class="menuItem MathJax_Main" id="subsetEqButton" style="font-size: 45px;">&#8838;</span>
                                            <span class="menuItem MathJax_Main" id="succButton" style="font-size: 45px;">&#8827;</span>
                                            <span class="menuItem MathJax_Main" id="succEqButton" style="font-size: 45px;">&#10928;</span>
                                            <span class="menuItem MathJax_Main" id="perpButton" style="font-size: 45px;">&#8869;</span>
                                            <span class="menuItem MathJax_Main" id="midButton" style="font-size: 45px;">&#8739;</span>
                                            <span class="menuItem MathJax_Main" id="parallelButton" style="font-size: 45px;">&#8741;</span>
                                        </div>
                                        <div id="symbolsGreek" class="tab inner">
                                            <span class="menuItem MathJax_Main" id="gammaUpperButton" style="font-size: 45px;">&#915;</span>
                                            <span class="menuItem MathJax_Main" id="deltaUpperButton" style="font-size: 45px;">&#916;</span>
                                            <span class="menuItem MathJax_Main" id="thetaUpperButton" style="font-size: 45px;">&#920;</span>
                                            <span class="menuItem MathJax_Main" id="lambdaUpperButton" style="font-size: 45px;">&#923;</span>
                                            <span class="menuItem MathJax_Main" id="xiUpperButton" style="font-size: 45px;">&#926;</span>
                                            <span class="menuItem MathJax_Main" id="piUpperButton" style="font-size: 45px;">&#928;</span>
                                            <span class="menuItem MathJax_Main" id="sigmaUpperButton" style="font-size: 45px;">&#931;</span>
                                            <span class="menuItem MathJax_Main" id="upsilonUpperButton" style="font-size: 45px;">&#933;</span>
                                            <span class="menuItem MathJax_Main" id="phiUpperButton" style="font-size: 45px;">&#934;</span>
                                            <span class="menuItem MathJax_Main" id="psiUpperButton" style="font-size: 45px;">&#936;</span>
                                            <span class="menuItem MathJax_Main" id="omegaUpperButton" style="font-size: 45px;">&#937;</span>

                                            <span class="menuItem MathJax_MathItalic" id="alphaButton" style="font-size: 45px;">&#945;</span>
                                            <span class="menuItem MathJax_MathItalic" id="betaButton" style="font-size: 45px;">&#946;</span>
                                            <span class="menuItem MathJax_MathItalic" id="gammaButton" style="font-size: 45px;">&#947;</span>
                                            <span class="menuItem MathJax_MathItalic" id="deltaButton" style="font-size: 45px;">&#948;</span>
                                            <span class="menuItem MathJax_MathItalic" id="varEpsilonButton" style="font-size: 45px;">&#949;</span>
                                            <span class="menuItem MathJax_MathItalic" id="epsilonButton" style="font-size: 45px;">&#1013;</span>
                                            <span class="menuItem MathJax_MathItalic" id="zetaButton" style="font-size: 45px;">&#950;</span>
                                            <span class="menuItem MathJax_MathItalic" id="etaButton" style="font-size: 45px;">&#951;</span>
                                            <span class="menuItem MathJax_MathItalic" id="thetaButton" style="font-size: 45px;">&#952;</span>
                                            <span class="menuItem MathJax_MathItalic" id="varThetaButton" style="font-size: 45px;">&#977;</span>
                                            <span class="menuItem MathJax_MathItalic" id="iotaButton" style="font-size: 45px;">&#953;</span>
                                            <span class="menuItem MathJax_MathItalic" id="kappaButton" style="font-size: 45px;">&#954;</span>
                                            <span class="menuItem MathJax_MathItalic" id="lambdaButton" style="font-size: 45px;">&#955;</span>
                                            <span class="menuItem MathJax_MathItalic" id="muButton" style="font-size: 45px;">&#956;</span>
                                            <span class="menuItem MathJax_MathItalic" id="nuButton" style="font-size: 45px;">&#957;</span>
                                            <span class="menuItem MathJax_MathItalic" id="xiButton" style="font-size: 45px;">&#958;</span>
                                            <span class="menuItem MathJax_MathItalic" id="piButton" style="font-size: 45px;">&#960;</span>
                                            <span class="menuItem MathJax_MathItalic" id="varPiButton" style="font-size: 45px;">&#982;</span>
                                            <span class="menuItem MathJax_MathItalic" id="rhoButton" style="font-size: 45px;">&#961;</span>
                                            <span class="menuItem MathJax_MathItalic" id="varRhoButton" style="font-size: 45px;">&#1009;</span>
                                            <span class="menuItem MathJax_MathItalic" id="sigmaButton" style="font-size: 45px;">&#963;</span>
                                            <span class="menuItem MathJax_MathItalic" id="varSigmaButton" style="font-size: 45px;">&#962;</span>
                                            <span class="menuItem MathJax_MathItalic" id="tauButton" style="font-size: 45px;">&#964;</span>
                                            <span class="menuItem MathJax_MathItalic" id="upsilonButton" style="font-size: 45px;">&#965;</span>
                                            <span class="menuItem MathJax_MathItalic" id="varPhiButton" style="font-size: 45px;">&#966;</span>
                                            <span class="menuItem MathJax_MathItalic" id="phiButton" style="font-size: 45px;">&#981;</span>
                                            <span class="menuItem MathJax_MathItalic" id="chiButton" style="font-size: 45px;">&#967;</span>
                                            <span class="menuItem MathJax_MathItalic" id="psiButton" style="font-size: 45px;">&#968;</span>
                                            <span class="menuItem MathJax_MathItalic" id="omegaButton" style="font-size: 45px;">&#969;</span>
                                        </div>
                                        <div id="symbolsMisc" class="tab inner">
                                            <span class="menuItem MathJax_Main" id="partialButton" style="font-size: 45px;">&#8706;</span>
                                            <span class="menuItem MathJax_Main" id="infinityButton" style="font-size: 45px;">&#8734;</span>
                                        </div>
                                    </div>
                                </div>

                                <div id="functions" class="tab outer">
                                    <ul class="inner-tab-links tab-links">
                                        <li class="innerTab active"><a href="#functionsTrig">Trig</a></li>
                                        <li class="innerTab"><a href="#functionsMisc">Misc</a></li>
                                    </ul>
                                    <div class="tab-content tab-content-nested">
                                        <div id="functionsTrig" class="tab inner active">
                                            <span class="menuItem MathJax_Main" id="sinButton" style="font-size: 45px;">sin</span>
                                            <span class="menuItem MathJax_Main" id="cosButton" style="font-size: 45px;">cos</span>
                                            <span class="menuItem MathJax_Main" id="tanButton" style="font-size: 45px;">tan</span>
                                            <span class="menuItem MathJax_Main" id="cotButton" style="font-size: 45px;">cot</span>
                                            <span class="menuItem MathJax_Main" id="secButton" style="font-size: 45px;">sec</span>
                                            <span class="menuItem MathJax_Main" id="cscButton" style="font-size: 45px;">csc</span>
                                            <span class="menuItem MathJax_Main" id="sinhButton" style="font-size: 45px;">sinh</span>
                                            <span class="menuItem MathJax_Main" id="coshButton" style="font-size: 45px;">cosh</span>
                                            <span class="menuItem MathJax_Main" id="tanhButton" style="font-size: 45px;">tanh</span>
                                            <span class="menuItem MathJax_Main" id="cothButton" style="font-size: 45px;">coth</span>
                                            <span class="menuItem MathJax_Main" id="sechButton" style="font-size: 45px;">sech</span>
                                            <span class="menuItem MathJax_Main" id="cschButton" style="font-size: 45px;">csch</span>
                                        </div>
                                        <div id="functionsMisc" class="tab inner">
                                            <span class="menuItem MathJax_Main" id="limButton" style="font-size: 45px;">lim</span>
                                            <span class="menuItem MathJax_Main" id="maxButton" style="font-size: 45px;">max</span>
                                            <span class="menuItem MathJax_Main" id="minButton" style="font-size: 45px;">min</span>
                                            <span class="menuItem MathJax_Main" id="supButton" style="font-size: 45px;">sup</span>
                                            <span class="menuItem MathJax_Main" id="infButton" style="font-size: 45px;">inf</span>
                                            <img class="menuItem" id="maxLowerButton" src="equation-editor/MenuImages/png/maxLower.png">
                                            <img class="menuItem" id="minLowerButton" src="equation-editor/MenuImages/png/minLower.png">
                                        </div>
                                    </div>
                                </div>

                                <div id="largeOperators" class="tab outer">
                                    <ul class="inner-tab-links tab-links">
                                        <li class="innerTab active"><a href="#largeOperatorsSum"><img class="innerTabImg" src="equation-editor/MenuImages/png/sumSymbol.png"></a></li>
                                        <li class="innerTab"><a href="#largeOperatorsBigCap"><img class="innerTabImg" src="equation-editor/MenuImages/png/bigCapSymbol.png"></a></li>
                                        <li class="innerTab"><a href="#largeOperatorsBigCup"><img class="innerTabImg" src="equation-editor/MenuImages/png/bigCupSymbol.png"></a></li>
                                        <li class="innerTab"><a href="#largeOperatorsBigSqCap"><img class="innerTabImg" src="equation-editor/MenuImages/png/bigSqCapSymbol.png"></a></li>
                                        <li class="innerTab"><a href="#largeOperatorsBigSqCup"><img class="innerTabImg" src="equation-editor/MenuImages/png/bigSqCupSymbol.png"></a></li>
                                        <li class="innerTab"><a href="#largeOperatorsProd"><img class="innerTabImg" src="equation-editor/MenuImages/png/prodSymbol.png"></a></li>
                                        <li class="innerTab"><a href="#largeOperatorsCoProd"><img class="innerTabImg" src="equation-editor/MenuImages/png/coProdSymbol.png"></a></li>
                                        <li class="innerTab"><a href="#largeOperatorsBigVee"><img class="innerTabImg" src="equation-editor/MenuImages/png/bigVeeSymbol.png"></a></li>
                                        <li class="innerTab"><a href="#largeOperatorsBigWedge"><img class="innerTabImg" src="equation-editor/MenuImages/png/bigWedgeSymbol.png"></a></li>
                                    </ul>
                                    <div class="tab-content tab-content-nested">
                                        <div id="largeOperatorsSum" class="tab inner active">
                                            <img class="menuItem" id="sumBigOperatorButton" src="equation-editor/MenuImages/png/sum.png">
                                            <img class="menuItem" id="sumBigOperatorNoUpperButton" src="equation-editor/MenuImages/png/sumNoUpper.png">
                                            <img class="menuItem" id="sumBigOperatorNoUpperNoLowerButton" src="equation-editor/MenuImages/png/sumNoUpperNoLower.png">
                                            <img class="menuItem" id="inlineSumBigOperatorButton" src="equation-editor/MenuImages/png/sumInline.png">
                                            <img class="menuItem" id="inlineSumBigOperatorNoUpperButton" src="equation-editor/MenuImages/png/sumNoUpperInline.png">
                                        </div>
                                        <div id="largeOperatorsBigCap" class="tab inner">
                                            <img class="menuItem" id="bigCapBigOperatorButton" src="equation-editor/MenuImages/png/bigCap.png">
                                            <img class="menuItem" id="bigCapBigOperatorNoUpperButton" src="equation-editor/MenuImages/png/bigCapNoUpper.png">
                                            <img class="menuItem" id="bigCapBigOperatorNoUpperNoLowerButton" src="equation-editor/MenuImages/png/bigCapNoUpperNoLower.png">
                                            <img class="menuItem" id="inlineBigCapBigOperatorButton" src="equation-editor/MenuImages/png/bigCapInline.png">
                                            <img class="menuItem" id="inlineBigCapBigOperatorNoUpperButton" src="equation-editor/MenuImages/png/bigCapNoUpperInline.png">
                                        </div>
                                        <div id="largeOperatorsBigCup" class="tab inner">
                                            <img class="menuItem" id="bigCupBigOperatorButton" src="equation-editor/MenuImages/png/bigCup.png">
                                            <img class="menuItem" id="bigCupBigOperatorNoUpperButton" src="equation-editor/MenuImages/png/bigCupNoUpper.png">
                                            <img class="menuItem" id="bigCupBigOperatorNoUpperNoLowerButton" src="equation-editor/MenuImages/png/bigCupNoUpperNoLower.png">
                                            <img class="menuItem" id="inlineBigCupBigOperatorButton" src="equation-editor/MenuImages/png/bigCupInline.png">
                                            <img class="menuItem" id="inlineBigCupBigOperatorNoUpperButton" src="equation-editor/MenuImages/png/bigCupNoUpperInline.png">
                                        </div>
                                        <div id="largeOperatorsBigSqCap" class="tab inner">
                                            <img class="menuItem" id="bigSqCapBigOperatorButton" src="equation-editor/MenuImages/png/bigSqCap.png">
                                            <img class="menuItem" id="bigSqCapBigOperatorNoUpperButton" src="equation-editor/MenuImages/png/bigSqCapNoUpper.png">
                                            <img class="menuItem" id="bigSqCapBigOperatorNoUpperNoLowerButton" src="equation-editor/MenuImages/png/bigSqCapNoUpperNoLower.png">
                                            <img class="menuItem" id="inlineBigSqCapBigOperatorButton" src="equation-editor/MenuImages/png/bigSqCapInline.png">
                                            <img class="menuItem" id="inlineBigSqCapBigOperatorNoUpperButton" src="equation-editor/MenuImages/png/bigSqCapNoUpperInline.png">
                                        </div>
                                        <div id="largeOperatorsBigSqCup" class="tab inner">
                                            <img class="menuItem" id="bigSqCupBigOperatorButton" src="equation-editor/MenuImages/png/bigSqCup.png">
                                            <img class="menuItem" id="bigSqCupBigOperatorNoUpperButton" src="equation-editor/MenuImages/png/bigSqCupNoUpper.png">
                                            <img class="menuItem" id="bigSqCupBigOperatorNoUpperNoLowerButton" src="equation-editor/MenuImages/png/bigSqCupNoUpperNoLower.png">
                                            <img class="menuItem" id="inlineBigSqCupBigOperatorButton" src="equation-editor/MenuImages/png/bigSqCupInline.png">
                                            <img class="menuItem" id="inlineBigSqCupBigOperatorNoUpperButton" src="equation-editor/MenuImages/png/bigSqCupNoUpperInline.png">
                                        </div>
                                        <div id="largeOperatorsProd" class="tab inner">
                                            <img class="menuItem" id="prodBigOperatorButton" src="equation-editor/MenuImages/png/prod.png">
                                            <img class="menuItem" id="prodBigOperatorNoUpperButton" src="equation-editor/MenuImages/png/prodNoUpper.png">
                                            <img class="menuItem" id="prodBigOperatorNoUpperNoLowerButton" src="equation-editor/MenuImages/png/prodNoUpperNoLower.png">
                                            <img class="menuItem" id="inlineProdBigOperatorButton" src="equation-editor/MenuImages/png/prodInline.png">
                                            <img class="menuItem" id="inlineProdBigOperatorNoUpperButton" src="equation-editor/MenuImages/png/prodNoUpperInline.png">
                                        </div>
                                        <div id="largeOperatorsCoProd" class="tab inner">
                                            <img class="menuItem" id="coProdBigOperatorButton" src="equation-editor/MenuImages/png/coProd.png">
                                            <img class="menuItem" id="coProdBigOperatorNoUpperButton" src="equation-editor/MenuImages/png/coProdNoUpper.png">
                                            <img class="menuItem" id="coProdBigOperatorNoUpperNoLowerButton" src="equation-editor/MenuImages/png/coProdNoUpperNoLower.png">
                                            <img class="menuItem" id="inlineCoProdBigOperatorButton" src="equation-editor/MenuImages/png/coProdInline.png">
                                            <img class="menuItem" id="inlineCoProdBigOperatorNoUpperButton" src="equation-editor/MenuImages/png/coProdNoUpperInline.png">
                                        </div>
                                        <div id="largeOperatorsBigVee" class="tab inner">
                                            <img class="menuItem" id="bigVeeBigOperatorButton" src="equation-editor/MenuImages/png/bigVee.png">
                                            <img class="menuItem" id="bigVeeBigOperatorNoUpperButton" src="equation-editor/MenuImages/png/bigVeeNoUpper.png">
                                            <img class="menuItem" id="bigVeeBigOperatorNoUpperNoLowerButton" src="equation-editor/MenuImages/png/bigVeeNoUpperNoLower.png">
                                            <img class="menuItem" id="inlineBigVeeBigOperatorButton" src="equation-editor/MenuImages/png/bigVeeInline.png">
                                            <img class="menuItem" id="inlineBigVeeBigOperatorNoUpperButton" src="equation-editor/MenuImages/png/bigVeeNoUpperInline.png">
                                        </div>
                                        <div id="largeOperatorsBigWedge" class="tab inner">
                                            <img class="menuItem" id="bigWedgeBigOperatorButton" src="equation-editor/MenuImages/png/bigWedge.png">
                                            <img class="menuItem" id="bigWedgeBigOperatorNoUpperButton" src="equation-editor/MenuImages/png/bigWedgeNoUpper.png">
                                            <img class="menuItem" id="bigWedgeBigOperatorNoUpperNoLowerButton" src="equation-editor/MenuImages/png/bigWedgeNoUpperNoLower.png">
                                            <img class="menuItem" id="inlineBigWedgeBigOperatorButton" src="equation-editor/MenuImages/png/bigWedgeInline.png">
                                            <img class="menuItem" id="inlineBigWedgeBigOperatorNoUpperButton" src="equation-editor/MenuImages/png/bigWedgeNoUpperInline.png">
                                        </div>
                                    </div>
                                </div>

                                <div id="integrals" class="tab outer">
                                    <ul class="inner-tab-links tab-links">
                                        <li class="innerTab active"><a href="#integralsIntegral"><img class="innerTabImg" src="equation-editor/MenuImages/png/integralSymbol.png"></a></li>
                                        <li class="innerTab"><a href="#integralsDoubleIntegral"><img class="innerTabImg" src="equation-editor/MenuImages/png/doubleIntegralSymbol.png"></a></li>
                                        <li class="innerTab"><a href="#integralsTripleIntegral"><img class="innerTabImg" src="equation-editor/MenuImages/png/tripleIntegralSymbol.png"></a></li>
                                        <li class="innerTab"><a href="#integralsContourIntegral"><img class="innerTabImg" src="equation-editor/MenuImages/png/contourIntegralSymbol.png"></a></li>
                                        <li class="innerTab"><a href="#integralsContourDoubleIntegral"><img class="innerTabImg" src="equation-editor/MenuImages/png/doubleContourIntegralSymbol.png"></a></li>
                                        <li class="innerTab"><a href="#integralsContourTripleIntegral"><img class="innerTabImg" src="equation-editor/MenuImages/png/tripleContourIntegralSymbol.png"></a></li>
                                    </ul>
                                    <div class="tab-content tab-content-nested">
                                        <div id="integralsIntegral" class="tab inner active">
                                            <img class="menuItem" id="integralButton" src="equation-editor/MenuImages/png/integral.png">
                                            <img class="menuItem" id="integralNoUpperButton" src="equation-editor/MenuImages/png/integralNoUpper.png">
                                            <img class="menuItem" id="integralNoUpperNoLowerButton" src="equation-editor/MenuImages/png/integralNoUpperNoLower.png">
                                            <img class="menuItem" id="inlineIntegralButton" src="equation-editor/MenuImages/png/integralInline.png">
                                            <img class="menuItem" id="inlineIntegralNoUpperButton" src="equation-editor/MenuImages/png/integralNoUpperInline.png">
                                        </div>
                                        <div id="integralsDoubleIntegral" class="tab inner">
                                            <img class="menuItem" id="doubleIntegralButton" src="equation-editor/MenuImages/png/doubleIntegral.png">
                                            <img class="menuItem" id="doubleIntegralNoUpperButton" src="equation-editor/MenuImages/png/doubleIntegralNoUpper.png">
                                            <img class="menuItem" id="doubleIntegralNoUpperNoLowerButton" src="equation-editor/MenuImages/png/doubleIntegralNoUpperNoLower.png">
                                            <img class="menuItem" id="inlineDoubleIntegralButton" src="equation-editor/MenuImages/png/doubleIntegralInline.png">
                                            <img class="menuItem" id="inlineDoubleIntegralNoUpperButton" src="equation-editor/MenuImages/png/doubleIntegralNoUpperInline.png">
                                        </div>
                                        <div id="integralsTripleIntegral" class="tab inner">
                                            <img class="menuItem" id="tripleIntegralButton" src="equation-editor/MenuImages/png/tripleIntegral.png">
                                            <img class="menuItem" id="tripleIntegralNoUpperButton" src="equation-editor/MenuImages/png/tripleIntegralNoUpper.png">
                                            <img class="menuItem" id="tripleIntegralNoUpperNoLowerButton" src="equation-editor/MenuImages/png/tripleIntegralNoUpperNoLower.png">
                                            <img class="menuItem" id="inlineTripleIntegralButton" src="equation-editor/MenuImages/png/tripleIntegralInline.png">
                                            <img class="menuItem" id="inlineTripleIntegralNoUpperButton" src="equation-editor/MenuImages/png/tripleIntegralNoUpperInline.png">
                                        </div>
                                        <div id="integralsContourIntegral" class="tab inner">
                                            <img class="menuItem" id="contourIntegralButton" src="equation-editor/MenuImages/png/contourIntegral.png">
                                            <img class="menuItem" id="contourIntegralNoUpperButton" src="equation-editor/MenuImages/png/contourIntegralNoUpper.png">
                                            <img class="menuItem" id="contourIntegralNoUpperNoLowerButton" src="equation-editor/MenuImages/png/contourIntegralNoUpperNoLower.png">
                                            <img class="menuItem" id="inlineContourIntegralButton" src="equation-editor/MenuImages/png/contourIntegralInline.png">
                                            <img class="menuItem" id="inlineContourIntegralNoUpperButton" src="equation-editor/MenuImages/png/contourIntegralNoUpperInline.png">
                                        </div>
                                        <div id="integralsContourDoubleIntegral" class="tab inner">
                                            <img class="menuItem" id="contourDoubleIntegralButton" src="equation-editor/MenuImages/png/doubleContourIntegral.png">
                                            <img class="menuItem" id="contourDoubleIntegralNoUpperButton" src="equation-editor/MenuImages/png/doubleContourIntegralNoUpper.png">
                                            <img class="menuItem" id="contourDoubleIntegralNoUpperNoLowerButton" src="equation-editor/MenuImages/png/doubleContourIntegralNoUpperNoLower.png">
                                            <img class="menuItem" id="inlineContourDoubleIntegralButton" src="equation-editor/MenuImages/png/doubleContourIntegralInline.png">
                                            <img class="menuItem" id="inlineContourDoubleIntegralNoUpperButton" src="equation-editor/MenuImages/png/doubleContourIntegralNoUpperInline.png">
                                        </div>
                                        <div id="integralsContourTripleIntegral" class="tab inner">
                                            <img class="menuItem" id="contourTripleIntegralButton" src="equation-editor/MenuImages/png/tripleContourIntegral.png">
                                            <img class="menuItem" id="contourTripleIntegralNoUpperButton" src="equation-editor/MenuImages/png/tripleContourIntegralNoUpper.png">
                                            <img class="menuItem" id="contourTripleIntegralNoUpperNoLowerButton" src="equation-editor/MenuImages/png/tripleContourIntegralNoUpperNoLower.png">
                                            <img class="menuItem" id="inlineContourTripleIntegralButton" src="equation-editor/MenuImages/png/tripleContourIntegralInline.png">
                                            <img class="menuItem" id="inlineContourTripleIntegralNoUpperButton" src="equation-editor/MenuImages/png/tripleContourIntegralNoUpperInline.png">
                                        </div>
                                    </div>
                                </div>
                                <div id="misc" class="tab outer">
                                    <img class="menuItem" id="dotAccentButton" src="equation-editor/MenuImages/png/dotAccent.png">
                                    <img class="menuItem" id="hatAccentButton" src="equation-editor/MenuImages/png/hatAccent.png">
                                    <img class="menuItem" id="vectorAccentButton" src="equation-editor/MenuImages/png/vectorAccent.png">
                                    <img class="menuItem" id="barAccentButton" src="equation-editor/MenuImages/png/barAccent.png">
                                    <div style="display: inline-block">rows: <input type="text" id="rows" /><br> cols: <input type="text" id="cols" /></div>
                                    <div class="menuItem" id="matrixButton" style="font-size: 35px; padding: 5px 5px; display: inline-block">Matrix</div>
                                </div>
                            </div>
                        </div>
                        <input id="hiddenFocusInput" style="width: 0; height: 0; opacity: 0; position: absolute; top: 0; left: 0;" type="text" autocapitalize="off" />
                        <div class="equation-editor"></div>
                    </div>
                    <div class="modal-footer">
                        <button class="btn btn-default btn-sm">Copy To Editor</button>
                        <button class="btn btn-default btn-sm">Clear</button>
                        <button class="btn btn-default btn-sm">Insert</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- Optional JavaScript -->
    <!-- jQuery first, then Popper.js, then Bootstrap JS -->
    <script src="equation-editor/lib/jquery-2.0.0.js"></script>
    <script src="js/proper.min.js"></script>
    <script src="jquery-ui/jquery-ui.min.js"></script>
    <script src="bootstrap/js/bootstrap.min.js"></script>
    <script src="js/canvas.js"></script>
<!--    scripts for equation editor -->


    <script src="equation-editor/lib/underscore-1.6.0.js"></script>
    <script src="equation-editor/lib/mousetrap-1.4.6.js"></script>
    <script src="equation-editor/lib/spin.min.js"></script>
    <script src="http://ajax.googleapis.com/ajax/libs/webfont/1.4.7/webfont.js"></script>
    <script src="equation-editor/js/property.js"></script>
    <script src="equation-editor/js/init.js"></script>
    <script src="equation-editor/js/fontMetrics.js"></script>
    <script src="equation-editor/js/equation-components/misc/equationComponent.js"></script>
    <script src="equation-editor/js/equation-components/misc/boundEquationComponent.js"></script>
    <script src="equation-editor/js/equation.js"></script>
    <script src="equation-editor/js/equation-components/dom/equationDom.js"></script>
    <script src="equation-editor/js/equation-components/containers/container.js"></script>
    <script src="equation-editor/js/equation-components/dom/containerDom.js"></script>
    <script src="equation-editor/js/equation-components/wrappers/wrapper.js"></script>
    <script src="equation-editor/js/equation-components/dom/wrapperDom.js"></script>
    <script src="equation-editor/js/equation-components/misc/symbol.js"></script>
    <script src="equation-editor/js/equation-components/wrappers/symbolWrapper.js"></script>
    <script src="equation-editor/js/equation-components/wrappers/operatorWrapper.js"></script>
    <script src="equation-editor/js/equation-components/wrappers/emptyContainerWrapper.js"></script>
    <script src="equation-editor/js/equation-components/wrappers/topLevelEmptyContainerWrapper.js"></script>
    <script src="equation-editor/js/equation-components/misc/topLevelEmptyContainerMessage.js"></script>
    <script src="equation-editor/js/equation-components/wrappers/squareEmptyContainerWrapper.js"></script>
    <script src="equation-editor/js/equation-components/containers/squareEmptyContainer.js"></script>
    <script src="equation-editor/js/equation-components/wrappers/squareEmptyContainerFillerWrapper.js"></script>
    <script src="equation-editor/js/equation-components/wrappers/stackedFractionWrapper.js"></script>
    <script src="equation-editor/js/equation-components/containers/stackedFractionNumeratorContainer.js"></script>
    <script src="equation-editor/js/equation-components/containers/stackedFractionDenominatorContainer.js"></script>
    <script src="equation-editor/js/equation-components/misc/stackedFractionHorizontalBar.js"></script>
    <script src="equation-editor/js/equation-components/wrappers/superscriptWrapper.js"></script>
    <script src="equation-editor/js/equation-components/containers/superscriptContainer.js"></script>
    <script src="equation-editor/js/equation-components/wrappers/subscriptWrapper.js"></script>
    <script src="equation-editor/js/equation-components/containers/subscriptContainer.js"></script>
    <script src="equation-editor/js/equation-components/wrappers/superscriptAndSubscriptWrapper.js"></script>
    <script src="equation-editor/js/equation-components/wrappers/squareRootWrapper.js"></script>
    <script src="equation-editor/js/equation-components/misc/squareRootOverBar.js"></script>
    <script src="equation-editor/js/equation-components/misc/squareRootRadical.js"></script>
    <script src="equation-editor/js/equation-components/misc/squareRootDiagonal.js"></script>
    <script src="equation-editor/js/equation-components/containers/squareRootRadicandContainer.js"></script>
    <script src="equation-editor/js/equation-components/wrappers/nthRootWrapper.js"></script>
    <script src="equation-editor/js/equation-components/misc/nthRootOverBar.js"></script>
    <script src="equation-editor/js/equation-components/misc/nthRootRadical.js"></script>
    <script src="equation-editor/js/equation-components/misc/nthRootDiagonal.js"></script>
    <script src="equation-editor/js/equation-components/containers/nthRootRadicandContainer.js"></script>
    <script src="equation-editor/js/equation-components/containers/nthRootDegreeContainer.js"></script>
    <script src="equation-editor/js/equation-components/wrappers/bracketWrapper.js"></script>
    <script src="equation-editor/js/equation-components/misc/bracket.js"></script>
    <script src="equation-editor/js/equation-components/misc/wholeBracket.js"></script>
    <script src="equation-editor/js/equation-components/misc/topBracket.js"></script>
    <script src="equation-editor/js/equation-components/misc/middleBracket.js"></script>
    <script src="equation-editor/js/equation-components/misc/bottomBracket.js"></script>
    <script src="equation-editor/js/equation-components/misc/leftBracket.js"></script>
    <script src="equation-editor/js/equation-components/misc/rightBracket.js"></script>
    <script src="equation-editor/js/equation-components/misc/leftParenthesisBracket.js"></script>
    <script src="equation-editor/js/equation-components/misc/rightParenthesisBracket.js"></script>
    <script src="equation-editor/js/equation-components/misc/leftParenthesisWholeBracket.js"></script>
    <script src="equation-editor/js/equation-components/misc/leftParenthesisTopBracket.js"></script>
    <script src="equation-editor/js/equation-components/misc/leftParenthesisMiddleBracket.js"></script>
    <script src="equation-editor/js/equation-components/misc/leftParenthesisBottomBracket.js"></script>
    <script src="equation-editor/js/equation-components/misc/rightParenthesisWholeBracket.js"></script>
    <script src="equation-editor/js/equation-components/misc/rightParenthesisTopBracket.js"></script>
    <script src="equation-editor/js/equation-components/misc/rightParenthesisMiddleBracket.js"></script>
    <script src="equation-editor/js/equation-components/misc/rightParenthesisBottomBracket.js"></script>
    <script src="equation-editor/js/equation-components/misc/leftSquareBracket.js"></script>
    <script src="equation-editor/js/equation-components/misc/leftSquareWholeBracket.js"></script>
    <script src="equation-editor/js/equation-components/misc/leftSquareTopBracket.js"></script>
    <script src="equation-editor/js/equation-components/misc/leftSquareMiddleBracket.js"></script>
    <script src="equation-editor/js/equation-components/misc/leftSquareBottomBracket.js"></script>
    <script src="equation-editor/js/equation-components/misc/rightSquareBracket.js"></script>
    <script src="equation-editor/js/equation-components/misc/rightSquareWholeBracket.js"></script>
    <script src="equation-editor/js/equation-components/misc/rightSquareTopBracket.js"></script>
    <script src="equation-editor/js/equation-components/misc/rightSquareMiddleBracket.js"></script>
    <script src="equation-editor/js/equation-components/misc/rightSquareBottomBracket.js"></script>
    <script src="equation-editor/js/equation-components/misc/leftCurlyBracket.js"></script>
    <script src="equation-editor/js/equation-components/misc/leftCurlyWholeBracket.js"></script>
    <script src="equation-editor/js/equation-components/misc/leftCurlyTopBracket.js"></script>
    <script src="equation-editor/js/equation-components/misc/leftCurlyMiddleBracket.js"></script>
    <script src="equation-editor/js/equation-components/misc/leftCurlyBottomBracket.js"></script>
    <script src="equation-editor/js/equation-components/misc/rightCurlyBracket.js"></script>
    <script src="equation-editor/js/equation-components/misc/rightCurlyWholeBracket.js"></script>
    <script src="equation-editor/js/equation-components/misc/rightCurlyTopBracket.js"></script>
    <script src="equation-editor/js/equation-components/misc/rightCurlyMiddleBracket.js"></script>
    <script src="equation-editor/js/equation-components/misc/rightCurlyBottomBracket.js"></script>
    <script src="equation-editor/js/equation-components/misc/leftAngleBracket.js"></script>
    <script src="equation-editor/js/equation-components/misc/leftAngleWholeBracket.js"></script>
    <script src="equation-editor/js/equation-components/misc/rightAngleBracket.js"></script>
    <script src="equation-editor/js/equation-components/misc/rightAngleWholeBracket.js"></script>
    <script src="equation-editor/js/equation-components/misc/leftFloorBracket.js"></script>
    <script src="equation-editor/js/equation-components/misc/leftFloorWholeBracket.js"></script>
    <script src="equation-editor/js/equation-components/misc/leftFloorMiddleBracket.js"></script>
    <script src="equation-editor/js/equation-components/misc/leftFloorBottomBracket.js"></script>
    <script src="equation-editor/js/equation-components/misc/rightFloorBracket.js"></script>
    <script src="equation-editor/js/equation-components/misc/rightFloorWholeBracket.js"></script>
    <script src="equation-editor/js/equation-components/misc/rightFloorMiddleBracket.js"></script>
    <script src="equation-editor/js/equation-components/misc/rightFloorBottomBracket.js"></script>
    <script src="equation-editor/js/equation-components/misc/leftCeilBracket.js"></script>
    <script src="equation-editor/js/equation-components/misc/leftCeilWholeBracket.js"></script>
    <script src="equation-editor/js/equation-components/misc/leftCeilTopBracket.js"></script>
    <script src="equation-editor/js/equation-components/misc/leftCeilMiddleBracket.js"></script>
    <script src="equation-editor/js/equation-components/misc/rightCeilBracket.js"></script>
    <script src="equation-editor/js/equation-components/misc/rightCeilWholeBracket.js"></script>
    <script src="equation-editor/js/equation-components/misc/rightCeilTopBracket.js"></script>
    <script src="equation-editor/js/equation-components/misc/rightCeilMiddleBracket.js"></script>
    <script src="equation-editor/js/equation-components/misc/leftAbsValBracket.js"></script>
    <script src="equation-editor/js/equation-components/misc/rightAbsValBracket.js"></script>
    <script src="equation-editor/js/equation-components/misc/leftAbsValWholeBracket.js"></script>
    <script src="equation-editor/js/equation-components/misc/leftAbsValMiddleBracket.js"></script>
    <script src="equation-editor/js/equation-components/misc/rightAbsValWholeBracket.js"></script>
    <script src="equation-editor/js/equation-components/misc/rightAbsValMiddleBracket.js"></script>
    <script src="equation-editor/js/equation-components/misc/leftNormBracket.js"></script>
    <script src="equation-editor/js/equation-components/misc/rightNormBracket.js"></script>
    <script src="equation-editor/js/equation-components/misc/leftNormWholeBracket.js"></script>
    <script src="equation-editor/js/equation-components/misc/leftNormMiddleBracket.js"></script>
    <script src="equation-editor/js/equation-components/misc/rightNormWholeBracket.js"></script>
    <script src="equation-editor/js/equation-components/misc/rightNormMiddleBracket.js"></script>
    <script src="equation-editor/js/equation-components/wrappers/bracketPairWrapper.js"></script>
    <script src="equation-editor/js/equation-components/containers/bracketContainer.js"></script>
    <script src="equation-editor/js/equation-components/wrappers/bigOperatorWrapper.js"></script>
    <script src="equation-editor/js/equation-components/containers/bigOperatorUpperLimitContainer.js"></script>
    <script src="equation-editor/js/equation-components/containers/bigOperatorLowerLimitContainer.js"></script>
    <script src="equation-editor/js/equation-components/containers/bigOperatorOperandContainer.js"></script>
    <script src="equation-editor/js/equation-components/misc/bigOperatorSymbol.js"></script>
    <script src="equation-editor/js/equation-components/misc/sumBigOperatorSymbol.js"></script>
    <script src="equation-editor/js/equation-components/misc/bigCapBigOperatorSymbol.js"></script>
    <script src="equation-editor/js/equation-components/misc/bigCupBigOperatorSymbol.js"></script>
    <script src="equation-editor/js/equation-components/misc/bigSqCapBigOperatorSymbol.js"></script>
    <script src="equation-editor/js/equation-components/misc/bigSqCupBigOperatorSymbol.js"></script>
    <script src="equation-editor/js/equation-components/misc/bigSqCupBigOperatorSymbol.js"></script>
    <script src="equation-editor/js/equation-components/misc/prodBigOperatorSymbol.js"></script>
    <script src="equation-editor/js/equation-components/misc/coProdBigOperatorSymbol.js"></script>
    <script src="equation-editor/js/equation-components/misc/bigVeeBigOperatorSymbol.js"></script>
    <script src="equation-editor/js/equation-components/misc/bigWedgeBigOperatorSymbol.js"></script>
    <script src="equation-editor/js/equation-components/wrappers/integralWrapper.js"></script>
    <script src="equation-editor/js/equation-components/misc/integralSymbol.js"></script>
    <script src="equation-editor/js/equation-components/misc/doubleIntegralSymbol.js"></script>
    <script src="equation-editor/js/equation-components/misc/tripleIntegralSymbol.js"></script>
    <script src="equation-editor/js/equation-components/misc/contourIntegralSymbol.js"></script>
    <script src="equation-editor/js/equation-components/misc/contourDoubleIntegralSymbol.js"></script>
    <script src="equation-editor/js/equation-components/misc/contourTripleIntegralSymbol.js"></script>
    <script src="equation-editor/js/equation-components/containers/integralUpperLimitContainer.js"></script>
    <script src="equation-editor/js/equation-components/containers/integralLowerLimitContainer.js"></script>
    <script src="equation-editor/js/equation-components/misc/word.js"></script>
    <script src="equation-editor/js/equation-components/misc/functionWord.js"></script>
    <script src="equation-editor/js/equation-components/wrappers/functionWrapper.js"></script>
    <script src="equation-editor/js/equation-components/wrappers/functionLowerWrapper.js"></script>
    <script src="equation-editor/js/equation-components/misc/functionLowerWord.js"></script>
    <script src="equation-editor/js/equation-components/containers/functionLowerContainer.js"></script>
    <script src="equation-editor/js/equation-components/wrappers/logLowerWrapper.js"></script>
    <script src="equation-editor/js/equation-components/misc/logLowerWord.js"></script>
    <script src="equation-editor/js/equation-components/containers/logLowerContainer.js"></script>
    <script src="equation-editor/js/equation-components/wrappers/limitWrapper.js"></script>
    <script src="equation-editor/js/equation-components/containers/limitLeftContainer.js"></script>
    <script src="equation-editor/js/equation-components/containers/limitRightContainer.js"></script>
    <script src="equation-editor/js/equation-components/misc/limitWord.js"></script>
    <script src="equation-editor/js/equation-components/misc/limitSymbol.js"></script>
    <script src="equation-editor/js/equation-components/wrappers/matrixWrapper.js"></script>
    <script src="equation-editor/js/equation-components/containers/matrixContainer.js"></script>
    <script src="equation-editor/js/equation-components/wrappers/accentWrapper.js"></script>
    <script src="equation-editor/js/equation-components/misc/accentSymbol.js"></script>
    <script src="equation-editor/js/equation-components/containers/accentContainer.js"></script>
    <script src="equation-editor/js/equation-components/containers/topLevelContainer.js"></script>
    <script src="equation-editor/js/blinkingCursor.js"></script>
    <script src="equation-editor/js/mouseInteraction.js"></script>
    <script src="equation-editor/js/addWrapperUtil.js"></script>
    <script src="equation-editor/js/keyboardInteraction.js"></script>
    <script src="equation-editor/js/menuInteraction.js"></script>
    <script src="equation-editor/js/equationEditor.js"></script>
    <script src="equation-editor/js/latexGenerator.js"></script>

  </body>
</html>

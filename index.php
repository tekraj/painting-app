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
                 <a href="#" class="btn btn-secondary btn-square mx-auto js-tools">
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
                 <a href="#" class="btn btn-secondary btn-square mx-auto js-tools"  data-toggle="tooltip" data-placement="top" title="Draw Line">
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
                 <a href="#" class="btn btn-secondary btn-square mx-auto" data-toggle="modal" data-target="equation-modal">
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
                <div class="col-md-6 px-0 writing">
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

    <!-- Optional JavaScript -->
    <!-- jQuery first, then Popper.js, then Bootstrap JS -->
    <script src="js/jquery.min.js"></script>
    <script src="js/proper.min.js"></script>
    <script src="jquery-ui/jquery-ui.min.js"></script>
    <script src="bootstrap/js/bootstrap.min.js"></script>
    <script src="js/canvas.js"></script>
  </body>
</html>

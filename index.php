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
      <link href="equation-editor/Fonts/TeX/font.css" rel="stylesheet" type="text/css" charset="utf-8" />
      <link href="equation-editor/css/equationEditor.css" rel="stylesheet" type="text/css" charset="utf-8" />
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
            <a class="btn btn-secondary btn-sm" data-toggle="modal" data-target="#save-modal" >New Board</a>
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
                         <a href="#" class="btn btn-secondary btn-square mx-auto js-enable-science" data-toggle="modal" data-target="#symbol-modal">
                            <span class=""><img src="images/calculator.png"></span>
                         </a>
                     </div>
                    <div class="text-center my-1 option-menu-wrapper  js-enable-symbol">
                         <a href="#" class="btn btn-secondary btn-square mx-auto" >
                            <span class=""><img src="images/venus.png"></span>
                         </a>
                            <ul class="option-menu symbol-dropdown" style="display:none;" >
                                <li> <span class="menuItem MathJax_Main js-science-symbol" data-symbol=":" >:</span></li>
                                <li> <span class="menuItem MathJax_Main js-science-symbol" data-symbol="≤">≤</span></li>
                                <li> <span class="menuItem MathJax_Main js-science-symbol" data-symbol="≥" >≥</span></li>
                                <li> <span class="menuItem MathJax_Main js-science-symbol" data-symbol="◦" >◦</span></li>
                                <li> <span class="menuItem MathJax_Main js-science-symbol" data-symbol="≈" >≈</span></li>
                                <li> <span class="menuItem MathJax_Main js-science-symbol" data-symbol="∈" >∈</span></li>
                                <li> <span class="menuItem MathJax_Main js-science-symbol" data-symbol="×" >×</span></li>
                                <li> <span class="menuItem MathJax_Main js-science-symbol" data-symbol="±" >±</span></li>
                                <li> <span class="menuItem MathJax_Main js-science-symbol" data-symbol="∧" >∧</span></li>
                                <li> <span class="menuItem MathJax_Main js-science-symbol" data-symbol="∨" >∨</span></li>
                                <li> <span class="menuItem MathJax_Main js-science-symbol" data-symbol="≡" >≡</span></li>
                                <li> <span class="menuItem MathJax_Main js-science-symbol" data-symbol="≅" >≅</span></li>
                                <li> <span class="menuItem MathJax_Main js-science-symbol" data-symbol="≠" >≠</span></li>
                                <li> <span class="menuItem MathJax_Main js-science-symbol" data-symbol="∼" >∼</span></li>
                                <li> <span class="menuItem MathJax_Main js-science-symbol" data-symbol="∝">∝</span></li>
                                <li> <span class="menuItem MathJax_Main js-science-symbol" data-symbol="≺" >≺</span></li>
                                <li> <span class="menuItem MathJax_Main js-science-symbol" data-symbol="⪯" >⪯</span></li>
                                <li> <span class="menuItem MathJax_Main js-science-symbol" data-symbol="⊂">⊂</span></li>
                                <li> <span class="menuItem MathJax_Main js-science-symbol" data-symbol="⊆" >⊆</span></li>
                                <li> <span class="menuItem MathJax_Main js-science-symbol" data-symbol="≻" >≻</span></li>
                                <li> <span class="menuItem MathJax_Main js-science-symbol" data-symbol="⪰" >⪰</span></li>
                                <li> <span class="menuItem MathJax_Main js-science-symbol" data-symbol="⊥">⊥</span></li>
                                <li> <span class="menuItem MathJax_Main js-science-symbol" data-symbol="∣" >∣</span></li>
                                <li> <span class="menuItem MathJax_Main js-science-symbol" data-symbol="∥">∥</span></li>
                                <li> <span class="menuItem MathJax_Main js-science-symbol" data-symbol="∂">∂</span></li>
                                <li> <span class="menuItem MathJax_Main js-science-symbol" data-symbol="∞" >∞</span></li>
                                <li><span class="menuItem MathJax_Main js-science-symbol" data-symbol="Γ" >Γ</span></li>
                                <li><span class="menuItem MathJax_Main js-science-symbol" data-symbol="Δ" >Δ</span></li>
                                <li><span class="menuItem MathJax_Main js-science-symbol" data-symbol="Θ" >Θ</span></li>
                                <li><span class="menuItem MathJax_Main js-science-symbol" data-symbol="Λ" >Λ</span></li>
                                <li><span class="menuItem MathJax_Main js-science-symbol" data-symbol="Ξ" >Ξ</span></li>
                                <li><span class="menuItem MathJax_Main js-science-symbol" data-symbol="Π" >Π</span></li>
                                <li><span class="menuItem MathJax_Main js-science-symbol" data-symbol="Σ" >Σ</span></li>
                                <li><span class="menuItem MathJax_Main js-science-symbol" data-symbol="Υ" >Υ</span></li>
                                <li><span class="menuItem MathJax_Main js-science-symbol" data-symbol="Φ" >Φ</span></li>
                                <li><span class="menuItem MathJax_Main js-science-symbol" data-symbol="Ψ" >Ψ</span></li>
                                <li><span class="menuItem MathJax_Main js-science-symbol" data-symbol="Ω">Ω</span></li>

                                <li><span class="menuItem MathJax_MathItalic js-science-symbol" data-symbol="α">α</span></li>
                                <li><span class="menuItem MathJax_MathItalic js-science-symbol" data-symbol="β">β</span></li>
                                <li><span class="menuItem MathJax_MathItalic js-science-symbol" data-symbol="γ">γ</span></li>
                                <li><span class="menuItem MathJax_MathItalic js-science-symbol" data-symbol="δ">δ</span></li>
                                <li><span class="menuItem MathJax_MathItalic js-science-symbol" data-symbol=">" >ε</span></li>
                                <li><span class="menuItem MathJax_MathItalic js-science-symbol" data-symbol="ϵ">ϵ</span></li>
                                <li><span class="menuItem MathJax_MathItalic js-science-symbol" data-symbol="ζ">ζ</span></li>
                                <li><span class="menuItem MathJax_MathItalic js-science-symbol" data-symbol="η">η</span></li>
                                <li><span class="menuItem MathJax_MathItalic js-science-symbol" data-symbol="θ">θ</span></li>
                                <li><span class="menuItem MathJax_MathItalic js-science-symbol" data-symbol="ϑ">ϑ</span></li>
                                <li><span class="menuItem MathJax_MathItalic js-science-symbol" data-symbol="ι">ι</span></li>
                                <li><span class="menuItem MathJax_MathItalic js-science-symbol" data-symbol="κ">κ</span></li>
                                <li><span class="menuItem MathJax_MathItalic js-science-symbol" data-symbol="λ">λ</span></li>
                                <li><span class="menuItem MathJax_MathItalic js-science-symbol" data-symbol="μ">μ</span></li>
                                <li><span class="menuItem MathJax_MathItalic js-science-symbol" data-symbol="ν">ν</span></li>
                                <li><span class="menuItem MathJax_MathItalic js-science-symbol" data-symbol="ξ">ξ</span></li>
                                <li><span class="menuItem MathJax_MathItalic js-science-symbol" data-symbol="π">π</span></li>
                                <li><span class="menuItem MathJax_MathItalic js-science-symbol" data-symbol="ϖ">ϖ</span></li>
                                <li><span class="menuItem MathJax_MathItalic js-science-symbol" data-symbol="ρ">ρ</span></li>
                                <li><span class="menuItem MathJax_MathItalic js-science-symbol" data-symbol="ϱ">ϱ</span></li>
                                <li><span class="menuItem MathJax_MathItalic js-science-symbol" data-symbol="σ">σ</span></li>
                                <li><span class="menuItem MathJax_MathItalic js-science-symbol" data-symbol="ς">ς</span></li>
                                <li><span class="menuItem MathJax_MathItalic js-science-symbol" data-symbol="τ">τ</span></li>
                                <li><span class="menuItem MathJax_MathItalic js-science-symbol" data-symbol="υ">υ</span></li>
                                <li><span class="menuItem MathJax_MathItalic js-science-symbol" data-symbol="φ">φ</span></li>
                                <li><span class="menuItem MathJax_MathItalic js-science-symbol" data-symbol="ϕ">ϕ</span></li>
                                <li><span class="menuItem MathJax_MathItalic js-science-symbol" data-symbol="χ">χ</span></li>
                                <li><span class="menuItem MathJax_MathItalic js-science-symbol" data-symbol=">" >ψ</span></li>
                                <li><span class="menuItem MathJax_MathItalic js-science-symbol" data-symbol="ω">ω</span></li>
                            </ul>
                     </div>

                    <div class="text-center my-1 option-menu-wrapper js-enable-symbol">
                         <a href="#" class="btn btn-secondary btn-square mx-auto js-tools">
                            <span style="font-size:18px;" class="px-1">a<sub>2</sub></span>
                         </a>
                        <div class="option-menu power-dropdown" style="display:none;">
                            <span class="x-value-sub">a</span><input type="text" class="y-value-sub js-sup-sub" id="x-value-sub">
                        </div>
                     </div>

                    <div class="text-center my-1 option-menu-wrapper js-enable-symbol">
                         <a href="#" class="btn btn-secondary btn-square mx-auto js-tools">
                            <span>a <sup>2</sup></span>
                         </a>
                        <div class="option-menu power-dropdown" style="display:none;">
                            <span class="x-value-sup">a</span><input type="text" class="y-value-sup js-sup-sub" id="x-value-sup">
                        </div>
                     </div>

                    <div class="text-center my-1">
                         <a href="#" class="btn btn-secondary btn-square mx-auto js-tools" id="clear-canvas" data-toggle="modal" data-target="#save-modal">
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
                            <div id="text-holder"></div>
                        </div>
                    </div>

                    <div class="col-md-6 px-0">
                         <form class="">
                            <div class="form-group">
                                <textarea class="form-control" id="exampleFormControlTextarea2" rows="17"></textarea>
                                </textarea>
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

                            <div class="tabs">
                                <ul class="outer-tab-links tab-links">
                                    <li class="outerTab" style="width:140px;">
                                        <div class="form-group row" style="margin-bottom: 0;">
                                            <label for="symbol-size" class="col-sm-3 col-form-label" style="margin-top:-3px;font-size:13px;">Size</label>
                                            <div class="col-sm-9">
                                                <select name="symbol-size" id="symbol-size" class="form-control form-control-sm" >
                                                    <?php $symbolSize = [20,24,26,28,36,46,48,72]; ?>
                                                    <?php foreach($symbolSize as $size):?>
                                                        <option value="<?php echo $size;?>"><?php echo $size;?></option>
                                                    <?php endforeach; ?>
                                                </select>
                                            </div>
                                        </div>
                                    </li>
                                    <li class="outerTab active"><a href="#symbol-functions">Symbols</a></li>
                                    <li class="outerTab"><a href="#simple-functions">Functions</a></li>
                                    <li class="outerTab"><a href="#trignometry-functions">Trignometry</a></li>
                                    <li class="outerTab"><a href="#misc-functions">Miscellaneous</a></li>
                                    <li class="outerTab"><a href="#greek-alphabets">Greek Alphabets</a></li>
                                </ul>
                                <div class="tab-content" id="tab-content-top">
                                    <div id="symbol-functions" class="tab outer active">
                                        <span class="menuItem MathJax_Main"  id="colonButton" style="font-size: 45px;">:</span>
                                        <span class="menuItem MathJax_Main" id="lessThanOrEqualToButton" style="font-size: 45px;">≤</span>
                                        <span class="menuItem MathJax_Main" id="greaterThanOrEqualToButton" style="font-size: 45px;">≥</span>
                                        <span class="menuItem MathJax_Main" id="circleOperatorButton" style="font-size: 45px;">◦</span>
                                        <span class="menuItem MathJax_Main" id="approxEqualToButton" style="font-size: 45px;">≈</span>
                                        <span class="menuItem MathJax_Main" id="belongsToButton" style="font-size: 45px;">∈</span>
                                        <span class="menuItem MathJax_Main" id="timesButton" style="font-size: 45px;">×</span>
                                        <span class="menuItem MathJax_Main" id="pmButton" style="font-size: 45px;">±</span>
                                        <span class="menuItem MathJax_Main" id="wedgeButton" style="font-size: 45px;">∧</span>
                                        <span class="menuItem MathJax_Main" id="veeButton" style="font-size: 45px;">∨</span>
                                        <span class="menuItem MathJax_Main" id="equivButton" style="font-size: 45px;">≡</span>
                                        <span class="menuItem MathJax_Main" id="congButton" style="font-size: 45px;">≅</span>
                                        <span class="menuItem MathJax_Main" id="neqButton" style="font-size: 45px;">≠</span>
                                        <span class="menuItem MathJax_Main" id="simButton" style="font-size: 45px;">∼</span>
                                        <span class="menuItem MathJax_Main" id="proptoButton" style="font-size: 45px;">∝</span>
                                        <span class="menuItem MathJax_Main" id="precButton" style="font-size: 45px;">≺</span>
                                        <span class="menuItem MathJax_Main" id="precEqButton" style="font-size: 45px;">⪯</span>
                                        <span class="menuItem MathJax_Main" id="subsetButton" style="font-size: 45px;">⊂</span>
                                        <span class="menuItem MathJax_Main" id="subsetEqButton" style="font-size: 45px;">⊆</span>
                                        <span class="menuItem MathJax_Main" id="succButton" style="font-size: 45px;">≻</span>
                                        <span class="menuItem MathJax_Main" id="succEqButton" style="font-size: 45px;">⪰</span>
                                        <span class="menuItem MathJax_Main" id="perpButton" style="font-size: 45px;">⊥</span>
                                        <span class="menuItem MathJax_Main" id="midButton" style="font-size: 45px;">∣</span>
                                        <span class="menuItem MathJax_Main" id="parallelButton" style="font-size: 45px;">∥</span>
                                        <span class="menuItem MathJax_Main" id="partialButton" style="font-size: 45px;">∂</span>
                                        <span class="menuItem MathJax_Main" id="infinityButton" style="font-size: 45px;">∞</span>
                                    </div>
                                    <div id="simple-functions" class="tab outer">
                                        <img class="menuItem" id="subscriptButton" src="equation-editor/MenuImages/png/subscript.png">
                                        <img class="menuItem" id="superscriptButton" src="equation-editor/MenuImages/png/superscript.png">
                                        <img class="menuItem" id="stackedFractionButton" src="equation-editor/MenuImages/png/stackedFraction.png">
                                        <img class="menuItem" id="sumBigOperatorButton" src="equation-editor/MenuImages/png/sum.png">
                                        <img class="menuItem" id="bigSqCapBigOperatorButton" src="equation-editor/MenuImages/png/bigSqCap.png">
                                        <img class="menuItem" id="integralNoUpperNoLowerButton" src="equation-editor/MenuImages/png/integralNoUpperNoLower.png">
                                        <img class="menuItem" id="integralButton" src="equation-editor/MenuImages/png/integral.png">
                                        <img class="menuItem" id="limitButton" src="equation-editor/MenuImages/png/limit.png">
                                        <span class="menuItem MathJax_Main" style="font-size:32px;" id="function">f(x)</span>
                                        <span class="menuItem MathJax_Main" id="lnButton" style="font-size:32px">ln</span>
                                        <img class="menuItem" id="logLowerButton" height="55" src="equation-editor/MenuImages/png/log_n.png">
                                        <span class="menuItem MathJax_Main" id="logButton" style="font-size:32px">log</span>
                                        <span class="menuItem MathJax_Main" id="logButton" style="font-size:32px">e<sup>x</sup></span>
                                    </div>
                                    <div id="trignometry-functions" class="tab outer">
                                        <span class="menuItem MathJax_Main" id="sinButton" style="font-size: 24px;">sin</span>
                                        <span class="menuItem MathJax_Main" id="arcsinButton" style="font-size: 24px;">arcsin</span>
                                        <span class="menuItem MathJax_Main" id="sinhButton" style="font-size: 24px;">sinh</span>

                                        <span class="menuItem MathJax_Main" id="cosButton" style="font-size: 24px;">cos</span>
                                        <span class="menuItem MathJax_Main" id="arccosButton" style="font-size: 24px;">arccos</span>
                                        <span class="menuItem MathJax_Main" id="coshButton" style="font-size: 24px;">cosh</span>

                                        <span class="menuItem MathJax_Main" id="arctanButton" style="font-size: 24px;">tan</span>
                                        <span class="menuItem MathJax_Main" id="tanhButton" style="font-size: 24px;">arctan</span>
                                        <span class="menuItem MathJax_Main" id="tanhButton" style="font-size: 24px;">tanh</span>

                                        <span class="menuItem MathJax_Main" id="cscButton" style="font-size: 24px;">csc</span>
                                        <span class="menuItem MathJax_Main" id="arccscButton" style="font-size: 24px;">arccsc</span>
                                        <span class="menuItem MathJax_Main" id="cschButton" style="font-size: 24px;">csch</span>

                                        <span class="menuItem MathJax_Main" id="secButton" style="font-size: 24px;">sec</span>
                                        <span class="menuItem MathJax_Main" id="arcsecButton" style="font-size: 24px;">arcsec</span>
                                        <span class="menuItem MathJax_Main" id="sechButton" style="font-size: 24px;">sech</span>

                                        <span class="menuItem MathJax_Main" id="cotButton" style="font-size: 24px;">cot</span>
                                        <span class="menuItem MathJax_Main" id="arccothButton" style="font-size: 24px;">arccot</span>
                                        <span class="menuItem MathJax_Main" id="cothButton" style="font-size: 24px;">coth</span>
                                    </div>
                                    <div id="misc-functions" class="tab outer">
                                        <span class="menuItem MathJax_Main" id="corrcoefButton" style="font-size: 24px;">corrcoef</span>
                                        <span class="menuItem MathJax_Main" id="covButton" style="font-size: 24px;">cov</span>
                                        <span class="menuItem MathJax_Main" id="medianButton" style="font-size: 24px;">median</span>
                                        <span class="menuItem MathJax_Main" id="meanButton" style="font-size: 24px;">mean</span>
                                        <span class="menuItem MathJax_Main" id="stdButton" style="font-size: 24px;">std</span>
                                        <span class="menuItem MathJax_Main" id="modButton" style="font-size: 24px;">mod</span>
                                        <span class="menuItem MathJax_Main" id="floorButton" style="font-size: 24px;">floor</span>
                                        <span class="menuItem MathJax_Main" id="ceilButton" style="font-size: 24px;">ceil</span>
                                        <span class="menuItem MathJax_Main" id="signButton" style="font-size: 24px;">sign</span>
                                        <span class="menuItem MathJax_Main" id="gcdButton" style="font-size: 24px;">gcd</span>
                                        <span class="menuItem MathJax_Main" id="lcmButton" style="font-size: 24px;">lcm</span>
                                        <span class="menuItem MathJax_Main" id="randomButton" style="font-size: 24px;">random</span>
                                        <span class="menuItem MathJax_Main" id="eyeButton" style="font-size: 24px;">eye</span>
                                        <span class="menuItem MathJax_Main" id="transposeButton" style="font-size: 24px;">transpose</span>
                                        <span class="menuItem MathJax_Main" id="inverseButton" style="font-size: 24px;">inverse</span>
                                        <span class="menuItem MathJax_Main" id="detButton" style="font-size: 24px;">det</span>
                                        <span class="menuItem MathJax_Main" id="minButton" style="font-size: 24px;">min</span>
                                        <span class="menuItem MathJax_Main" id="maxButton" style="font-size: 24px;">max</span>
                                        <span class="menuItem MathJax_Main" id="rowsButton" style="font-size: 24px;">rows</span>
                                        <span class="menuItem MathJax_Main" id="inverseButton" style="font-size: 24px;">columns</span>
                                        <span class="menuItem MathJax_Main" id="plotButton" style="font-size: 24px;">plot</span>
                                        <span class="menuItem MathJax_Main" id="meshgridButton" style="font-size: 24px;">meshgrid</span>
                                        <span class="menuItem MathJax_Main" id="meshButton" style="font-size: 24px;">mesh</span>

                                    </div>
                                    <div id="greek-alphabets" class="tab outer">
                                        <span class="menuItem MathJax_Main" id="gammaUpperButton" style="font-size: 24px;">Γ</span>
                                        <span class="menuItem MathJax_Main" id="deltaUpperButton" style="font-size: 24px;">Δ</span>
                                        <span class="menuItem MathJax_Main" id="thetaUpperButton" style="font-size: 24px;">Θ</span>
                                        <span class="menuItem MathJax_Main" id="lambdaUpperButton" style="font-size: 24px;">Λ</span>
                                        <span class="menuItem MathJax_Main" id="xiUpperButton" style="font-size: 24px;">Ξ</span>
                                        <span class="menuItem MathJax_Main" id="piUpperButton" style="font-size: 24px;">Π</span>
                                        <span class="menuItem MathJax_Main" id="sigmaUpperButton" style="font-size: 24px;">Σ</span>
                                        <span class="menuItem MathJax_Main" id="upsilonUpperButton" style="font-size: 24px;">Υ</span>
                                        <span class="menuItem MathJax_Main" id="phiUpperButton" style="font-size: 24px;">Φ</span>
                                        <span class="menuItem MathJax_Main" id="psiUpperButton" style="font-size: 24px;">Ψ</span>
                                        <span class="menuItem MathJax_Main" id="omegaUpperButton" style="font-size: 24px;">Ω</span>

                                        <span class="menuItem MathJax_MathItalic" id="alphaButton" style="font-size: 24px;">α</span>
                                        <span class="menuItem MathJax_MathItalic" id="betaButton" style="font-size: 24px;">β</span>
                                        <span class="menuItem MathJax_MathItalic" id="gammaButton" style="font-size: 24px;">γ</span>
                                        <span class="menuItem MathJax_MathItalic" id="deltaButton" style="font-size: 24px;">δ</span>
                                        <span class="menuItem MathJax_MathItalic" id="varEpsilonButton" style="font-size: 24px;">ε</span>
                                        <span class="menuItem MathJax_MathItalic" id="epsilonButton" style="font-size: 24px;">ϵ</span>
                                        <span class="menuItem MathJax_MathItalic" id="zetaButton" style="font-size: 24px;">ζ</span>
                                        <span class="menuItem MathJax_MathItalic" id="etaButton" style="font-size: 24px;">η</span>
                                        <span class="menuItem MathJax_MathItalic" id="thetaButton" style="font-size: 24px;">θ</span>
                                        <span class="menuItem MathJax_MathItalic" id="varThetaButton" style="font-size: 24px;">ϑ</span>
                                        <span class="menuItem MathJax_MathItalic" id="iotaButton" style="font-size: 24px;">ι</span>
                                        <span class="menuItem MathJax_MathItalic" id="kappaButton" style="font-size: 24px;">κ</span>
                                        <span class="menuItem MathJax_MathItalic" id="lambdaButton" style="font-size: 24px;">λ</span>
                                        <span class="menuItem MathJax_MathItalic" id="muButton" style="font-size: 24px;">μ</span>
                                        <span class="menuItem MathJax_MathItalic" id="nuButton" style="font-size: 24px;">ν</span>
                                        <span class="menuItem MathJax_MathItalic" id="xiButton" style="font-size: 24px;">ξ</span>
                                        <span class="menuItem MathJax_MathItalic" id="piButton" style="font-size: 24px;">π</span>
                                        <span class="menuItem MathJax_MathItalic" id="varPiButton" style="font-size: 24px;">ϖ</span>
                                        <span class="menuItem MathJax_MathItalic" id="rhoButton" style="font-size: 24px;">ρ</span>
                                        <span class="menuItem MathJax_MathItalic" id="varRhoButton" style="font-size: 24px;">ϱ</span>
                                        <span class="menuItem MathJax_MathItalic" id="sigmaButton" style="font-size: 24px;">σ</span>
                                        <span class="menuItem MathJax_MathItalic" id="varSigmaButton" style="font-size: 24px;">ς</span>
                                        <span class="menuItem MathJax_MathItalic" id="tauButton" style="font-size: 24px;">τ</span>
                                        <span class="menuItem MathJax_MathItalic" id="upsilonButton" style="font-size: 24px;">υ</span>
                                        <span class="menuItem MathJax_MathItalic" id="varPhiButton" style="font-size: 24px;">φ</span>
                                        <span class="menuItem MathJax_MathItalic" id="phiButton" style="font-size: 24px;">ϕ</span>
                                        <span class="menuItem MathJax_MathItalic" id="chiButton" style="font-size: 24px;">χ</span>
                                        <span class="menuItem MathJax_MathItalic" id="psiButton" style="font-size: 24px;">ψ</span>
                                        <span class="menuItem MathJax_MathItalic" id="omegaButton" style="font-size: 24px;">ω</span>
                                    </div>
                                </div>
                            </div>
                            <input id="hiddenFocusInput" style="width: 0; height: 0; opacity: 0; position: absolute; top: 0; left: 0;" type="text" autocapitalize="off" />
                            <div class="equation-editor"></div>
                        </div>
                        <div class="modal-footer">
                            <button class="btn btn-default btn-sm">Copy To Editor</button>
                            <button class="btn btn-default btn-sm">Clear</button>
                            <button class="btn btn-default btn-sm" id="toLatex">Insert</button>
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
                    </div>
                    <div class="modal-footer">
                        <button class="btn btn-default js-clear-canvas" data-ans="no">Cancel</button>
                        <a href="#" class="btn btn-default js-clear-canvas" data-ans="yes">Save</a>
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
        <script src="js/dom-to-image.js"></script>
        <script src="js/canvas.js"></script>
      </body>
</html>

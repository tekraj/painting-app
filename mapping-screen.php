<!Doctype html>
<html lang="en">
    <head>
        <!-- Required meta tags -->
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
        <meta http-equiv="cache-control" content="no-cache">
        <meta http-equiv="expires" content="0">
        <meta http-equiv="pragma" content="no-cache">
        <meta name="user" content="37BEC3B3-483C-4229-9953-2268EE525A6B">
        <meta name="type" content="student">
        <link rel="stylesheet" href="plugins/bootstrap/css/bootstrap.min.css">
        <link rel="stylesheet" href="font-awesome/css/fontawesome.css">
        <link rel="stylesheet" href="js-tree/themes/default/style.min.css">
        <link href="plugins/node-waves/waves.css" rel="stylesheet"/>
        <!-- Animation Css -->
        <link href="plugins/animate-css/animate.css" rel="stylesheet"/>
        <link rel="stylesheet" href="plugins/jquery-ui/jquery-ui.min.css">
        <link href="css/board-css.min.css" rel="stylesheet">
        <link href="css/themes/all-themes.css" rel="stylesheet"/>
        <link rel="stylesheet" href="izitoast/css/iziToast.min.css">
        <link rel="stylesheet" href="ripple-css/ripple.min.css">
        <link rel="stylesheet" type="text/css" href="css/maping-screen.css">
        <title>White Board</title>

    </head>
    <body ng-app="mappingApp" ng-controller="MappingController">

        <div class="container">
            <div class="row">
                <div class="col-sm-6">
                    <div class="card">
                        <div class="header bg-deep-orange">
                            <h2>
                               Unmapped Students <small class="pull-right">Map them with tutors.</small>
                            </h2>
                        </div>
                        <div class="body">
                            <div class="list-group">
                                <a class="list-group-item unmapped-std row" href="#" ng-repeat="student in students track by student.ObjectID" ng-if="!student.tutor">
                                    <div class="col-sm-7">
                                        <span ng-bind="student.Name" class="pull-left text-capitalize"></span>
                                        <span ng-bind="student.subject" class="pull-right text-capitalize"></span>

                                    </div>
                                    <div class="col-sm-5">
                                        <select class="form-control js-map-student" data-student="{{student.socket}}">
                                            <option>Select tutor to map</option>
                                            <option ng-repeat="tutor in tutors" ng-if="tutor.subject==student.subject" value="{{tutor.socket}}">{{tutor.Name}}</option>
                                        </select>
                                    </div>

                                </a>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-sm-6">
                    <div class="card">
                        <div class="header bg-blue">
                            <h2>
                               Tutors and Students
                            </h2>
                        </div>
                        <div class="body">

                            <div class="card js-tutor-card" ng-repeat="tutor in tutors track by tutor.ObjectID">
                                <div class="header bg-green"><h2 ng-bind="tutor.Name"></h2><small ng-bind="tutor.subject" class="pull-right"></small></div>
                                <div class="body">
                                    <div class="list-group">
                                        <a href="#" class="list-group-item " ng-repeat="student in tutor.subscribedStudents track by student.ObjectID">
                                            <span ng-bind="student.Name" class="text-capitalize"></span>
                                        </a>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="modal" id="auth-modal">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header bg-blue"><h4 class="text-center">Sub-admin Login</h4></div>
                    <form ng-submit="authAdmin()">
                        <div class="modal-body">
                            <div class="form-group row">
                                <label for="email" class="col-sm-4 text-right">Email</label>
                                <div class="col-sm-8">
                                    <input type="text" id="email" class="form-control" ng-model="admin.email">
                                </div>
                            </div>
                            <div class="form-group row">
                                <label for="password" class="col-sm-4 text-right">Password</label>
                                <div class="col-sm-8">
                                    <input type="password" id="password" class="form-control" ng-model="admin.password">
                                </div>
                            </div>
                            <div class="form-group row">
                                <div class="col-sm-6"></div>
                                <div class="col-sm-6 text-right">
                                    <button class="btn btn-success" type="submit">Submit</button>
                                </div>

                            </div>
                        </div>

                    </form>
                </div>
            </div>
        </div>
    <script src="js/jquery.min.js"></script>
    <script src="chatjs/socket.io.js"></script>
    <script src="js/proper.min.js"></script>
    <script src="plugins/jquery-ui/jquery-ui.min.js"></script>
    <script src="plugins/bootstrap/js/bootstrap.min.js"></script>
    <script src="plugins/node-waves/waves.js"></script>
    <script src="js/angular.min.js"></script>
        <script src="js/mapping.js"></script>
        <script>
            $(document).ready(function(){
                $('#auth-modal').modal({show:true,backdrop:'static',keyboard:false});
            })
        </script>
    </body>
</html>
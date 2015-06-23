var app = angular.module('myApp', ['lokijs']);
app.controller("StudentController",
    ['$scope','Loki', function($scope,Loki){
        $scope.studentCollection=[];
        function loadHandler(){
            $scope.$apply(function(){
                studentCollection = db.getCollection('students');
                console.log("1",studentCollection)
                if (studentCollection === null) {
                    db.addCollection('students');
                    studentCollection  = db.getCollection('students');
                    console.log("2",studentCollection)
                }
                db.saveDatabase();
                $scope.studentCollection= studentCollection.data;
            })
        }
        var studentCollection=null,
            db = new Loki('db.json',
            {   persistenceMethod:'fs',
                autoload: true,
                autosave:true,
                autoloadCallback: loadHandler
            });
        var Student = function(name,country){
            this.name=name;
            this.country = country;
        }
        $scope.add = function(instudent){
            console.log(instudent)
            var student= new Student(instudent.name,instudent.country)
            studentCollection.insert(student);
            db.saveDatabase();
            $scope.studentCollection=studentCollection.data;
            console.log($scope.studentCollection)
        }
    }]);
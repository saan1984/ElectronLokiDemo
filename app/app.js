var app = angular.module('myApp', ['lokijs']);
app.controller("StudentController",
    ['$scope','Loki', function($scope,Loki){

        function loadHandler(){
            studentCollection = db.getCollection('students');
            console.log("1",studentCollection)
            if (studentCollection === null) {
                db.addCollection('students');
                studentCollection  = db.getCollection('students');
                console.log("2",studentCollection)
            }
            db.saveDatabase();
        }
        var studentCollection=null,
            db = new Loki('app/db.json',
            {   persistenceMethod:'fs',
                autoload: true,
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
            console.log(studentCollection)
        }
    }]);

app.controller('Auth', function($routeParams,$rootScope,$scope,Admin,$location,Authorize,toastr, $rootScope , $timeout ,$localStorage) {
    
    $rootScope.login=function(data){
    $rootScope.show_loader=true; 
    Authorize.login(data).then(function(Data){
        $rootScope.show_loader=false; 
        var payload=Data.data;
        console.log("logging....."); 
        console.log(payload);
        if (Data.data.status==true) {                   
            $rootScope.admin=payload.data;
            $localStorage.admin=payload.data;
            $timeout(function(){
                $location.path("/dashboard");
            },2000);
        }else{
            toastr.error("failed!",payload.message);
        }
    });

}


        if ($localStorage.admin) {      
            $location.path("/dashboard");
        }


    if($routeParams.token){
        Admin.token($routeParams.token).then(function(Data){
            var payload=Data.data;
            console.log(Data);
            if (Data.status==200) {               
            $scope.reset_user=payload.data;
                    }else{
                        $scope.error=payload.message;
                        toastr.error(payload.message,"Oops!");
                    }
        });
    }
    





    });
    
    
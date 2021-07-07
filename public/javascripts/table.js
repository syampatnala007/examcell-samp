var app=angular.module('myApp',[])
  app.controller("myController",function($scope,postdata,getdata,update,del,postdata1) {
    $scope.users=[]
    $scope.user={}
    $scope.titile={}
    $scope.member={}
    $scope.get=function()
    {
        // body...
      getdata.gettingdata().then(function(data) {
        // body...
        if (data) {
          $scope.users=data;
          console.log($scope.users);  
        }
        else{
          $scope.users=[];
        }
      })
    }   

    $scope.update=function(val) {
      console.log(val)
      update.upditing(val)
      
    }
    $scope.remove=function(val) {
      console.log(val)
      del.deleting(val)
      //$scope.users.splice(val,1);
      location.reload();  
    }
    $scope.getREL=function(val){
    // $scope.member=val;
    // console.log("areyyyyyyyyyyyyyyyyyyyyyy---------------"+val);
    $scope.titile=val;
    postdata1.postingRL(val);
  }
  $scope.getRM=function(vall){
    $scope.member=vall;
    console.log("areyyyyyyyyyyyyyyyyyyyyyy---------------"+$scope.member);
    // $scope.titile=val;
    postdata.postingRM(vall);
  }

  })
  app.service('postdata1',function($http) {
    return{
      postingRL:function(val) {
        console.log(val)
        $http({method:'post',url:'/an_rel',data:val}).then(function(success) {
          console.log(success)
          // alert("successfully inserted ")
          // window.location.href='/arel';
          window.open('/arel',"_blank");
          // window.location.target='new';
        },function(error) {
          console.log(error)
          //alert(error,data)
        })
      }
    }
  });

  app.service('postdata',function($http) {
    return{
      postingRM:function(val) {
        console.log("haiiii\n"+val.name)
        $http({method:'post',url:'/an_rem',data:val}).then(function(success) {
          console.log("Remmmm")
          console.log(success)
          // alert("successfully inserted ")
          // window.open('/arel',"_blank");
          window.open('/arem',"_blank");
          // window.location.href='/remuneration';
          // window.location.target='new';
        },function(error) {
          console.log(error)
          //alert(error,data)
        })
      }
    }
  });

  app.factory('getdata',function($http) {
    // body...
    return{
      gettingdata:function() {
        // body...
        console.log("getting data invlked");
        datas=$http({
          method:'get',
          url:'/getdata'
        }).then(function(response) {
          // body...
          console.log("hiii response"+response.data)
          return response.data;
        });
        return datas;
      }
    }
  });

  app.service('update',function($http) {
    return{
      upditing:function(val) {
        val.ta=val.ta*val.totaldays;
        console.log(val)
        $http({method:'post',url:'/editdata',data:val}).then(function(success) {
          console.log(success)
          alert("successfully updated ")
        },function(error) {
          console.log(error)
          //alert(error,data)
        })
      }
    }
  });
  app.service('del',function($http) {
    return{
      deleting:function(val) {
        console.log(val)
        $http({method:'post',url:'/delete',data:val}).then(function(success) {
          console.log(success)
          alert("successfully deleted ")
        },function(error) {
          console.log(error)
          //alert(error,data)
        })
      }
    }

	

});
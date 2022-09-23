
app.run(function($rootScope,Admin,Config,Transactions,Logs,Peers,Backup,Agents,Users,Affliates,Coin,Assets,Banks,$localStorage,$filter,$timeout,$window){
 
    $rootScope.year="2021";
    $rootScope.token=Config.token;
  
  $rootScope.show_loader=false;

    $rootScope.total_naira_wallet=function(group){
        var total=0;
        if(group){
        for(var i=0;i < group.length;i++){
            var customer=group[i];
          var naira_wallet=customer.naira_wallet;
          if(naira_wallet){
            total=total+naira_wallet.balance;
          }
        }
    }
        return total;
    }
    


    
    if ($localStorage.admin) {     
        Admin.info($localStorage.admin.o_id).then(function(Data){
            if (Data.data.status==true) {                   
                $rootScope.admin=Data.data.data;
            }
        });
    }
    
   

    $rootScope.greaterThan = function(prop, val){
        return function(item){
          return item[prop] > val;
        }
    }



    $rootScope.customerFilter= function(id) {
            return function(t) {
                return t.o_id === id || t.pool_id === id;
            }
        }


    $rootScope.get_products=function(){
        Banks.all().then(function(Data){
            if(Data.data.status==true){
                $rootScope.banks=Data.data.data;
            }
        });
        Assets.all().then(function(Data){
            if(Data.data.status==true){
                $rootScope.assets=Data.data.data;
            }
        });
    };



      

      $rootScope.get_crypto=function(){
        Admin.coins().then(function(Data){
            if(Data.data.status==true){
            $rootScope.coins=Data.data.data; 
            }
            });
      }

      $rootScope.get_users=function(){
        Users.all().then(function(Data){
        if(Data.data.status==true){
            console.log("Users:");
            console.log(Data.data.data);
                $rootScope.customers=Data.data.data;
                $rootScope.total_naira_wallet();
            }
        }); 
        Affliates.all().then(function(Data){
                if(Data.data.status==true){
                    $rootScope.affiliates=Data.data.data;
                }
        });  
        Agents.all().then(function(Data){
                if(Data.data.status==true){
                    $rootScope.agents=Data.data.data;
                }
        }); 
        Agents.get_reward().then(function(Data){
                if(Data.data.status==true){
                    $rootScope.reward_percent=Data.data.data;
                }
        });  
        Admin.all().then(function(Data){
            if(Data.data.status==true){
                $rootScope.admins=Data.data.data;
            }
        });
        Users.notifications().then(function(Data){
            if(Data.data.status==true){
                $rootScope.notes=Data.data.data;
            }
        });
    }






    $rootScope.load_records=function(){
        Peers.all().then(function(Data){
            if(Data.data.status==true){
                $rootScope.peers=Data.data.data;
                $rootScope.peers.map(function (transaction) {
                    var date = transaction.date_created.split('-');
                    transaction.day = date[0];
                    transaction.month = date[1];
                    transaction.year = date[2];
                    return transaction;
                });
                $rootScope.declined_peers=$filter('filter')($rootScope.transactions,{status:0});
                $rootScope.pending_peers=$filter('filter')($rootScope.transactions,{status:1});
                $rootScope.successful_peers=$filter('filter')($rootScope.transactions,{status:2});
            }
        });  
        Backup.all().then(function(Data){
            if(Data.data.status==true){
                $rootScope.backups=Data.data.data;
            }
        });
    Logs.all().then(function(Data){
        if(Data.data.status==true){
            $rootScope.logs=Data.data.data;
        }
    });
    }


    $rootScope.MonthSales=function(month,year){
        var total=0;
        if($rootScope.transactions){
        for(var i=0;i < $rootScope.transactions.length;i++){
          var date = new Date($rootScope.transactions[i].date_created);
              let m= date.getUTCMonth() + 1;
              let y= date.getUTCFullYear();
                if (m == month && y == year) {
                  var total=total+1;
                }
        }
        }
        return total;
        }
    



      $rootScope.get_transactions=function(){
        console.log("tranny!!!");
        console.log("year:");
        console.log($rootScope.year);
          $rootScope.data1=[
            $rootScope.MonthSales(1,parseInt($rootScope.year)),  
            $rootScope.MonthSales(2,parseInt($rootScope.year)),  
            $rootScope.MonthSales(3,parseInt($rootScope.year)),  
            $rootScope.MonthSales(4,parseInt($rootScope.year)),  
            $rootScope.MonthSales(5,parseInt($rootScope.year)),  
            $rootScope.MonthSales(6,parseInt($rootScope.year)),  
            $rootScope.MonthSales(7,parseInt($rootScope.year)),  
            $rootScope.MonthSales(8,parseInt($rootScope.year)),  
            $rootScope.MonthSales(9,parseInt($rootScope.year)),  
            $rootScope.MonthSales(10,parseInt($rootScope.year)),  
            $rootScope.MonthSales(11,parseInt($rootScope.year)),  
            $rootScope.MonthSales(12,parseInt($rootScope.year))
        ];
        $rootScope.data2=[
            $rootScope.MonthSales(1,parseInt($rootScope.year-1)),  
            $rootScope.MonthSales(2,parseInt($rootScope.year-1)),  
            $rootScope.MonthSales(3,parseInt($rootScope.year-1)),  
            $rootScope.MonthSales(4,parseInt($rootScope.year-1)),  
            $rootScope.MonthSales(5,parseInt($rootScope.year-1)),  
            $rootScope.MonthSales(6,parseInt($rootScope.year-1)),  
            $rootScope.MonthSales(7,parseInt($rootScope.year-1)),  
            $rootScope.MonthSales(8,parseInt($rootScope.year-1)),  
            $rootScope.MonthSales(9,parseInt($rootScope.year-1)),  
            $rootScope.MonthSales(10,parseInt($rootScope.year-1)),  
            $rootScope.MonthSales(11,parseInt($rootScope.year-1)),  
            $rootScope.MonthSales(12,parseInt($rootScope.year-1))
        ]

      $rootScope.chart ={
        type: 'bubble',
      labels: ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],
      series: [$rootScope.year+" sales",($rootScope.year-1)+" sales"],
      colors: ["#FFA500","#808080"],
      data: [
        $rootScope.data1,
        $rootScope.data2
      ]
    }

   

        Transactions.all().then(function(Data){
            if(Data.data.status==true){
                $rootScope.transactions=Data.data.data;
                var chart_data=[];
                var labels=[];
                for(var i=0;i < $rootScope.coins.length;i++){
                    var coin=$rootScope.coins[i];
                    chart_data.push(($filter('filter')($rootScope.transactions,{symbol:coin.symbol})).length);
                    labels.push(coin.symbol);
                }
                $rootScope.chart2 ={
                    labels :labels,
                    data:chart_data,
                    colors:['#FFA500','#808080','#006400']
                }
                $rootScope.transactions.map(function (transaction) {
                    var date = transaction.date_created.split('-');
                    transaction.day = date[0];
                    transaction.month = date[1];
                    transaction.year = date[2];
                    return transaction;
                });
                $rootScope.declined_transactions=$filter('filter')($rootScope.transactions,{status:0});
                $rootScope.pending_transactions=$filter('filter')($rootScope.transactions,{status:1});
                $rootScope.successful_transactions=$filter('filter')($rootScope.transactions,{status:2});

            }
        });
    
      }


      $rootScope.change_year=function(year){
        $rootScope.year=year;
        $rootScope.get_transactions();
      }






    $rootScope.form={
        peer:"no",
        role:"2"
    }


    $rootScope.logout= function (){
        localStorage.removeItem('admin');
        $rootScope.admin="";
        $localStorage.admin="";
        $localStorage.admin="";
        $window.localStorage.clear();
        $timeout(function () {
        $location.path("/");
        },2000);
      }
  

$rootScope.refresh_data=function(){
    $rootScope.get_products();
    $rootScope.get_users();
    $rootScope.get_crypto();
    $rootScope.get_transactions();
    $rootScope.load_records();
}


     


      $rootScope.tradeFilter = function (id) { 
        return function(item) {
            return item.o_id === id || item.pool_id === id; 
        }
    };
    




});
      
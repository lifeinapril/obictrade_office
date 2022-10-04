app.controller("admin", function($rootScope,Backup,$scope,Coin,Config,Affliates,Admin,Transactions,Peers,Assets,Agents,Upload,Orders,$localStorage,Users,$timeout,toastr) {
    $scope.media=Config.media;
    $scope.media_secure=Config.media;
    $scope.asset={
        type:"gift card",
        currencies:[],
        card_types:[]
    };

    

    if ($localStorage.admin) {     
        Admin.info($localStorage.admin.o_id).then(function(Data){
            if (Data.data.status==true) {                   
                $rootScope.admin=Data.data.data;
            }
        });
    }
      
    $rootScope.refresh_data();

  $rootScope.year="2021";
    $rootScope.card_types=["Physical Card","Large Card","E-Code","Cash Reciept","Debit Card Reciept"];
    


    
$rootScope.download_asset=async function(transaction){
    console.log("downloading asset....");
    $rootScope.downloading=true;
    var mm=Config.media;
  const a = document.createElement('a');
    if(transaction){
        if(transaction.photos){
            console.log("photos");
            console.log(transaction.photos);
            if(transaction.photos.length > 0){
            for(var i=0;i < transaction.photos.length;i++){
                let x = await fetch(mm+transaction.photos[i],{method:'GET'});
                var url=await x.blob();
                    a.href =URL.createObjectURL(url);
                a.download ='Obic-asset';
                a.click();
            }
       }else{
        console.log("!!less photos");
        toastr.error("No content was delivered","Empty!");
        $scope.error="There's no asset to download";
       }
    }else{
        console.log("!!no photos");
        toastr.error("No content was delivered","Empty!");
        $scope.error="There's no asset to download";
       }
    }else{
        console.log("!!no transaction");
        toastr.error("Please refresh","Internal Error!");
        $scope.error="Please refresh";
    }
    $timeout(function(){
    $rootScope.downloading=false;
    transaction.downloaded=true;
    this.selected_transaction.downloaded=true;
    $rootScope.selected_transaction.downloaded=true;
    },2000);
}

// $rootScope.flutterwave_balance=0;

// Admin.balance().then(function(Data){
//     if(Data.data.status==true){
//         console.log("ngn bal:");
//         console.log(Data);
//         $rootScope.flutterwave_balance=Data.data.data;
//     }else{
//         console.log("ngn balance failed:");
//         console.log(Data.data.message);
//     }
// });









    
$rootScope.download_doc=async function(doc){
    console.log("downloading doc....");
    var mm=Config.media;
  const a = document.createElement('a');
    if(doc){
            if(doc.length > 0){
            for(var i=0;i < doc.length;i++){
                let x = await fetch(mm+doc[i],{method:'GET'});
                var url=await x.blob();
                    a.href =URL.createObjectURL(url);
                a.download ='Obic-doc';
                a.click();
            }
       }else{
        toastr.error("No content was delivered","Empty!");
        $scope.error="There's no asset to download";
       }
    }else{
        toastr.error("No content was delivered","Empty!");
        $scope.error="There's no asset to download";
       }
}

$rootScope.recycle_peer=function(){  
    $rootScope.show_loader=true;
Admin.recycle().then(function(Data){
    $rootScope.show_loader=false;
    if(Data.status==true){
        toastr.success("Peer Recycled","Success!");
        $rootScope.refresh_data();
    }else{
        $rootScope.show_loader=false;
        toastr.error(Data.message,"Error!");
    }
});
}


    
$rootScope.download_backup=async function(backup){
    console.log("downloading backup....");
    var mm=Config.media;
  const a = document.createElement('a');
    if(backup){
        var spot=mm+backup;
                let x = await fetch(spot,{method:'GET'});
                var url=await x.blob();
                    a.href =URL.createObjectURL(url);
                a.download ='Obic-backup';
                a.click();
    }else{
        toastr.error("No content was delivered","Empty!");
        $scope.error="There's no backup to download";
       }
}



$rootScope.show_coin_input=function(){
    $rootScope.show_coin=true;
    $rootScope.show_usd=false;
}

$rootScope.show_naira_input=function(){
  $rootScope.show_coin=false;
    $rootScope.show_usd=false;
}

$rootScope.show_usd_input=function(){
  $rootScope.show_usd=true;
  $rootScope.show_coin=false;
}

$rootScope.show_coin_input();








$rootScope.selling_converter=function(currency,amt){
    if(currency=="usd"){
      $rootScope.usd_value=amt;
      $rootScope.coin_value=amt/$rootScope.coin.selling.usd;
     $rootScope.naira_value=amt*$rootScope.coin.sell_rates;
    }else 
    if(currency=="ngn"){
      $rootScope.naira_value=amt;
      $rootScope.usd_value=(amt/$rootScope.coin.sell_rates);
      $rootScope.coin_value=$rootScope.usd_value/$rootScope.coin.selling.usd;
    }else{
      $rootScope.coin_value=amt;
      $rootScope.usd_value=amt*$rootScope.coin.selling.usd;
      $rootScope.naira_value=$rootScope.usd_value*$rootScope.coin.sell_rates;
    }
}






$rootScope.max_coin=function(){
    $rootScope.selling_converter('',$rootScope.coin.balance);
  }
  


  
  


  $rootScope.customerFilter=function(id){
    return function(t) {
        if(t.o_id == id || t.pool_id == id){
            return t;
        }
    }
}

        


       $rootScope.open_wallet=function(coin) {
        if(coin){
            $rootScope.coin=coin;
                $rootScope.coin.customers=[];
                if($rootScope.customers.length > 0){
        if(coin.coin=="BTC"){          
            for(var i=0;i < $rootScope.customers.length;i++){
            var customer=$rootScope.customers[i];
            customer.balance=customer.bitcoin_wallet.balance || 0;
            customer.address=customer.bitcoin_wallet.address;
                    $rootScope.coin.customers.push(customer);
            }
        }
        if(coin.coin=="ETH"){     
            for(var i=0;i < $rootScope.customers.length;i++){
                var customer=$rootScope.customers[i];
                        customer.balance=customer.ethereum_wallet.balance || 0;
                        customer.address=customer.ethereum_wallet.address;
                        $rootScope.coin.customers.push(customer);
                }
            }
        if(coin.coin=="USDT"){     
                for(var i=0;i < $rootScope.customers.length;i++){
                    var customer=$rootScope.customers[i];
                            customer.balance=customer.usdt_wallet.balance || 0;
                            customer.address=customer.usdt_wallet.address;
                            $rootScope.coin.customers.push(customer);
                    }
                }
    }
}
       }


    $rootScope.update_coin=function(data){
        $rootScope.show_loader=true;
            data.admin_id=$rootScope.admin.o_id;
            Coin.update(data).then(function(Data){
                 $rootScope.show_loader=false;
                if(Data.data.status==true){
                toastr.success(Data.data.message,"Success!");
                $timeout(function () {
                   window.location.reload();
                }, 2000);
                }else{
                toastr.error(Data.data.message,"Oops!");
                }
                });  
    }





    $rootScope.start_sell=function(){
        $rootScope.show_loader=true;
        $rootScope.coin.allow_sell=true;
        $rootScope.update_coin($rootScope.coin);
    }



    
    
    $rootScope.start_buy=function(){
        $rootScope.show_loader=true;
        $rootScope.coin.allow_buy=true;
        $rootScope.update_coin($rootScope.coin);
    }




    
    $rootScope.stop_sell=function(){
        $rootScope.show_loader=true;
        $rootScope.coin.allow_sell=false;
        $rootScope.update_coin($rootScope.coin);
    }



    $rootScope.stop_buy=function(){
        $rootScope.show_loader=true;
        $rootScope.coin.allow_buy=false;
        $rootScope.update_coin($rootScope.coin);
    }




 

    $rootScope.combined_transactions=function(user){
        var total=0;
        if(user){
        var ngn=user.naira_wallet.transactions;
        var btc=user.bitcoin_wallet.transactions;
        var eth=user.ethereum_wallet.transactions;
        var usdt=user.usdt_wallet.transactions;
        total=ngn.concat(btc.concat(eth.concat(usdt)));
        }
        return total;
    };
  


    $rootScope.add_currency=function(name,symbol){
        var currency={
            name:name,
            symbol:symbol,
            buy:0,
            sell:0
        };
        $scope.asset.currencies.push(currency);  
        if($rootScope.selected_asset){
            $rootScope.selected_asset.currencies.push(currency);  
        }
        };
  

        $rootScope.add_card_type=function(card){
            if(card){
                $scope.asset.card_types.push(card);
                if($rootScope.selected_asset){
                    $rootScope.selected_asset.card_types.push(card);
                }
                var index=$rootScope.card_types.indexOf(card);
                $rootScope.card_types.splice(index,1);
                $rootScope.card_type=$rootScope.card_types[0];
            }
            };
      

          
                $rootScope.remove_card_type=function(card){
                    var index=$scope.asset.card_types.indexOf(card); 
                    $scope.asset.card_types.splice(index,1);    
                    if($rootScope.selected_asset){
                       index=$rootScope.selected_asset.card_types.indexOf(card); 
                        $rootScope.selected_asset.card_types.splice(index,1);
                    }
                    $rootScope.card_types.push(card);
                    };
              

          
                    $rootScope.remove_currency=function(currency){
                        var index=$scope.asset.currencies.indexOf(currency);  
                        $scope.asset.currencies.splice(index,1);  
                        if($rootScope.selected_asset){
                            $rootScope.selected_asset.currencies.indexOf(currency); 
                            $rootScope.selected_asset.currencies.splice(index,1);
                        }
                        };
                  
    
                    
    $rootScope.add_currency("USD","$");
    $rootScope.add_card_type($rootScope.card_types[0]);


var chart1=document.getElementById('myChart');
if(chart1){
    var ctx = chart1.getContext('2d');
    var myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
            datasets: [{
                label: '# of Votes',
                data: [12, 19, 3, 5, 2, 3],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        }
    });
}




$rootScope.verify_bank=function(bank){
    $rootScope.checking=true;
    $rootScope.verified_name=null;
    Admin.verify_bank(bank).then(function(Data){
        $rootScope.checking=false;      
        if(Data.data.status==true){
            if($rootScope.form){
                if($rootScope.form.bank){
                    $rootScope.form.bank.account_name=Data.data.data.data.data.accountname;
                }
             }else
            if($rootScope.selected_admin){           
         if(!$rootScope.selected_admin.bank){
            $rootScope.selected_admin.bank={};
            }
                $rootScope.selected_admin.bank.account_name=Data.data.data.data.data.accountname;
            }
            $rootScope.verified_name=Data.data.data.data.data.accountname;
        }
    });
  }
  



$scope.gains=function(coin){
    var g=0;
    if(coin){
    var b=coin.buy_rates;
    var s=coin.sell_rates;
    g=((b-s)/b)*100;
    }
    return g;
    };




    $rootScope.select_request=function(customer){
        $rootScope.selected_request=customer;
        };



        $rootScope.select_customer=function(customer){
            console.log("selected customer:");
            console.log(customer);
            $rootScope.selected_customer=customer;
            };
    
    
        $rootScope.select_peer=function(peer){
            $rootScope.selected_peer=peer;
            };
            

$rootScope.select_admin=function(admin){
    $rootScope.selected_admin=admin;
    };

    $rootScope.select_asset=function(asset){
        $rootScope.selected_asset=asset;
        if($rootScope.selected_asset.currencies.length < 1){
            var currency={
                name:"USD",
                symbol:"$",
                buy:0,
                sell:$rootScope.selected_asset.rates
            };
            $scope.selected_asset.currencies.push(currency);  
        }
        $rootScope.card_types=["Physical Card","Large Card","E-Code","Cash Reciept","Debit Card Reciept"];
        var card_types=["Physical Card","Large Card","E-Code","Cash Reciept","Debit Card Reciept"];
        if($rootScope.selected_asset.card_types.length < 1){
        for(var i=0;i < card_types.length;i++){
            $rootScope.add_card_type(card_types[i]);
        }
        }
        for(var i=0;i < $rootScope.selected_asset.card_types.length;i++){
            if($rootScope.card_types.indexOf($rootScope.selected_asset.card_types[i]) > -1){
                var index=$rootScope.card_types.indexOf($rootScope.selected_asset.card_types[i]);
                $rootScope.card_types.splice(index,1);
            }
        }
        };
    


    $rootScope.select_transaction=function(transaction){
        $rootScope.selected_transaction=transaction;
    };
            

$scope.update_asset=function(asset){
    $rootScope.show_loader=true;
   Assets.update(asset).then(function(Data){
        $rootScope.show_loader=false;
        if(Data.data.status==true){
        toastr.success(Data.data.message,"Success!"); 
        $timeout(function () {
           window.location.reload();
        }, 2000);
        }else{
        toastr.error(Data.data.message,"Oops!");
        }
        });
};



$scope.create_admin=function(admin){
    $rootScope.show_loader=true;
    admin.admin_id=$rootScope.admin.o_id;
   Admin.create(admin).then(function(Data){
        $rootScope.show_loader=false;
        if(Data.data.status==true){
        toastr.success(Data.data.message,"Success!"); 
        $timeout(function () {
           window.location.reload();
        }, 2000);
        }else{
        toastr.error(Data.data.message,"Oops!");
        }
        });
};




$scope.create_agent=function(agent){
    $rootScope.show_loader=true;
    agent.admin_id=$rootScope.admin.o_id;
   Agents.create(agent).then(function(Data){
        $rootScope.show_loader=false;
        if(Data.data.status==true){
        toastr.success(Data.data.message,"Success!"); 
        $timeout(function () {
           window.location.reload();
        }, 2000);
        }else{
        toastr.error(Data.data.message,"Oops!");
        }
        });
};










$scope.verify_user=function(user){
    $rootScope.show_loader=true;
    user.admin_id=$rootScope.admin.o_id;
   Affliates.verify(user).then(function(Data){
        $rootScope.show_loader=false;
        if(Data.data.status==true){
        toastr.success(Data.data.message,"Success!"); 
        $timeout(function () {
           window.location.reload();
        }, 2000);
        }else{
        toastr.error(Data.data.message,"Oops!");
        }
        });
};





$scope.delete_asset=function(asset){
    $rootScope.show_loader=true;
    asset.admin_id=$rootScope.admin.o_id;
   Assets.delete(asset).then(function(Data){
        $rootScope.show_loader=false;
        if(Data.data.status==true){
        toastr.success(Data.data.message,"Success!"); 
        $timeout(function () {
           window.location.reload();
        }, 2000);
        }else{
        toastr.error(Data.data.message,"Oops!");
        }
        });
};










$scope.backup=function(){
    $rootScope.show_loader=true;
   Backup.start().then(function(Data){
        $rootScope.show_loader=false;
        if(Data.data.status==true){
        toastr.success(Data.data.message,"Success!"); 
        $timeout(function () {
           window.location.reload();
        }, 2000);
        }else{
        toastr.error(Data.data.message,"Oops!");
        }
        });
};

function sameDay(d1, d2) {
    return d1.getFullYear() === d2.getFullYear() &&
      d1.getMonth() === d2.getMonth() &&
      d1.getDate() === d2.getDate();
  }

$rootScope.TodayCustomers=function(customer){
    var today=new Date();
    var d2=new Date(customer.login_date);
    if(sameDay(d2, today)){
        return customer;
    }
}

$rootScope.TodaySales=function(sale){
    var today=new Date();
    var d2=new Date(sale.date_created);
    if(sameDay(d2, today)){
        return sale;
    }
}

$rootScope.CryptoSales=function(sale){
    if(sale.type=="cryptocurrency"){
        return sale;
    }
}





$scope.restore=function(data){
    $rootScope.show_loader=true;
    // formData.data.append('files',$scope.files);
    Upload.upload({
      url: API+"restore",
      headers: {'Content-Type' : 'multipart/form-data'},
      data: data
    }).then(function(resp) {
        $rootScope.show_loader=false;
        if(resp.data.status==true){
            $timeout(function () {
               window.location.reload();
            }, 2000);
        toastr.success(resp.data.message,"Success!"); 
      
        }else{
        toastr.error(resp.data.message,"Oops!");
        }
});
};









    
$rootScope.total_earnings=function(agents){
    var total=0;
    if(agents){
        for(var i=0;i < agents.length;i++){
            var customer=agents[i];
                var e_wallet=customer.earnings_wallet;
                total=parseFloat(total)+parseFloat(e_wallet.balance);
        }
    }
    return total;
}






    
$rootScope.set_reward=function(data){
    $rootScope.show_loader=true;
   data.admin_id=$rootScope.admin.o_id;
    Agents.set_reward(data).then(function(Data){
        $rootScope.show_loader=false;
        if(Data.data.status==true){
        toastr.success(Data.data.message,"Success!"); 
        $timeout(function () {
            window.location.reload();
        }, 2000);
        }else{
        toastr.error(Data.data.message,"Oops!");
        }
        });
    
}





    
    $rootScope.total_coin_pool=function(coin){
        var total=0;
        if($rootScope.affiliates){
            console.log("All affiliate");
            if(coin){
            if(coin.coin=="BTC"){
            for(var i=0;i < $rootScope.affiliates.length;i++){
                var customer=$rootScope.affiliates[i];
                if(customer.bitcoin_wallet && customer.bitcoin_wallet.affiliate.allow_buy){
                    var bitcoin_wallet=customer.bitcoin_wallet;
                    total=parseFloat(total)+parseFloat(bitcoin_wallet.balance);
                }
            }
        }
        if(coin.coin=="ETH"){  
            for(var i=0;i < $rootScope.affiliates.length;i++){
                var customer=$rootScope.affiliates[i];
                if(customer.ethereum_wallet && customer.ethereum_wallet.affiliate.allow_buy){
                    var ethereum_wallet=customer.ethereum_wallet;
                    total=parseFloat(total)+parseFloat(ethereum_wallet.balance);
                }
            }
        } 
        if(coin.coin=="USDT"){  
            for(var i=0;i < $rootScope.affiliates.length;i++){
                var customer=$rootScope.affiliates[i];
                if(customer.usdt_wallet && customer.usdt_wallet.affiliate.allow_buy){
                    var usdt_wallet=customer.usdt_wallet;
                    total=parseFloat(total)+parseFloat(usdt_wallet.balance);
                }
            }
        }
    }
    }
        return total;
    }



    $rootScope.open_rates=function(coin) {
        if(coin){
            $rootScope.selected_coin=coin;
            $rootScope.selected_coin.rates=[];
                if(coin.coin=="BTC"){          
                for(var i=0;i < $rootScope.affiliates.length;i++){
                var customer=$rootScope.affiliates[i];
                    if(customer.bitcoin_wallet && customer.bitcoin_wallet.affiliate.allow_buy){
                        customer.sell_rate=customer.bitcoin_wallet.affiliate.sell_rate;
                        customer.buy_rate=customer.bitcoin_wallet.affiliate.buy_rate;
                        customer.balance=customer.bitcoin_wallet.balance;
                        $rootScope.selected_coin.rates.push(customer);
                    }
                }
            }
            if(coin.coin=="ETH"){     
                for(var i=0;i < $rootScope.affiliates.length;i++){
                    var customer=$rootScope.affiliates[i];
                        if(customer.ethereum_wallet && customer.ethereum_wallet.affiliate.allow_buy){
                            customer.sell_rate=customer.ethereum_wallet.affiliate.sell_rate;
                            customer.buy_rate=customer.ethereum_wallet.affiliate.buy_rate;
                            customer.balance=customer.ethereum_wallet.balance;
                            $rootScope.selected_coin.rates.push(customer);
                  }
                    }
                } 
                  if(coin.coin=="USDT"){     
                    for(var i=0;i < $rootScope.affiliates.length;i++){
                        var customer=$rootScope.affiliates[i];
                            if(customer.usdt_wallet && customer.usdt_wallet.affiliate.allow_buy){
                                customer.sell_rate=customer.usdt_wallet.affiliate.sell_rate;
                                customer.buy_rate=customer.usdt_wallet.affiliate.buy_rate;
                                customer.balance=customer.usdt_wallet.balance;
                                $rootScope.selected_coin.rates.push(customer);
                      }
                        }
                    }
        }
       }





    $scope.photo_up=function(f){
        $scope.files=f;
    };



    $scope.select_data=function(f){
        $scope.files=f;
    };





    
    
    $scope.update_profile=function(a){
        $rootScope.show_loader=true;
        a.o_id=$rootScope.admin.o_id;
        Admin.update(a).then(function(Data){
            $rootScope.show_loader=false;
            if(Data.data.status==true){
            toastr.success(Data.data.message,"Success!"); 
            $timeout(function () {
                window.location.reload();
            }, 2000);
            }else{
            toastr.error(Data.data.message,"Oops!");
            }
            });
    };




    $scope.update_admin=function(a){
        $rootScope.show_loader=true;
        Admin.update(a).then(function(Data){
            $rootScope.show_loader=false;
            if(Data.data.status==true){
            toastr.success(Data.data.message,"Success!"); 
            $timeout(function () {
                window.location.reload();
            }, 2000);
            }else{
            toastr.error(Data.data.message,"Oops!");
            }
            });
    };



    $rootScope.remove_admin=function(a){
        $rootScope.show_loader=true;
        Admin.remove(a._id).then(function(Data){
            $rootScope.show_loader=false;
            if(Data.data.status==true){
            toastr.success(Data.data.message,"Success!"); 
            $timeout(function () {
                window.location.reload();
            }, 2000);
            }else{
            toastr.error(Data.data.message,"Oops!");
            }
            });
    };


            



    $rootScope.change_password=function(a){
        $rootScope.show_loader=true;
        a.o_id=$rootScope.admin.o_id;
        a.password=a.new_password;
        Admin.change_password(a).then(function(Data){
            $rootScope.show_loader=false;
            if(Data.data.status==true){
            toastr.success(Data.data.message,"Success!"); 
            $timeout(function () {
                window.location.reload();
            }, 2000);
            }else{
            toastr.error(Data.data.message,"Oops!");
            }
            });
    };







    
    $rootScope.deposit=function(transaction){
        $rootScope.show_loader=true;
        transaction.admin_id=$rootScope.admin.peer_id;
        Peers.deposit(transaction).then(function(Data){
            $rootScope.show_loader=false;
            if(Data.data.status==true){
            toastr.success(Data.data.message,"Success!"); 
                $timeout(function () {
                window.location.reload();
                }, 2000);
            }else{
            toastr.error(Data.data.message,"Oops!");
            }
            });
    };





    
    
    $rootScope.withdraw=function(transaction){
        $rootScope.show_loader=true;
        transaction.admin_id=$rootScope.admin.peer_id;
        Peers.withdraw(transaction).then(function(Data){
            $rootScope.show_loader=false;
            if(Data.data.status==true){
            toastr.success(Data.data.message,"Success!"); 
                $timeout(function () {
                window.location.reload();
                }, 2000);
            }else{
            toastr.error(Data.data.message,"Oops!");
            }
            });
    };



    

    $rootScope.approve_transaction=function(transaction){
        $rootScope.show_loader=true;
        if(transaction.type=='cryptocurrency'){
            transaction.payout=transaction.rates * transaction.amount;
        }else{
            transaction.payout=$scope.total_card(transaction.cards);
        }
        transaction.admin_id=$rootScope.admin.o_id;
        Transactions.approve(transaction).then(function(Data){
            $rootScope.show_loader=false;
            if(Data.data.status==true){
            toastr.success(Data.data.message,"Success!"); 
                $timeout(function () {
                window.location.reload();
                }, 2000);
            }else{
            toastr.error(Data.data.message,"Oops!");
            }
            });
    };


    

    $rootScope.decline_transaction=function(transaction){
        $rootScope.show_loader=true;
        transaction.admin_id=$rootScope.admin.o_id;
        Transactions.decline(transaction).then(function(Data){
            $rootScope.show_loader=false;
            if(Data.data.status==true){
            toastr.success(Data.data.message,"Success!"); 
            $timeout(function () {
               window.location.reload();
            }, 2000);
            }else{
            toastr.error(Data.data.message,"Oops!");
            }
            });
    };


    $rootScope.terminate_account=function(customer){
        $rootScope.show_loader=true;
        customer.admin_id=$rootScope.admin.o_id;
        Users.remove(customer.o_id).then(function(Data){
            $rootScope.show_loader=false;
            if(Data.data.status==true){
            toastr.success(Data.data.message,"Success!"); 
            $timeout(function () {
                window.location.reload();
            }, 2000);
            }else{
            toastr.error(Data.data.message,"Oops!");
            }
            });
    }


    
    $rootScope.create_asset=function(asset){
        $rootScope.show_loader=true;
        formData.data.append('files',$scope.files);
        asset.admin_id=$rootScope.admin.o_id;
        Upload.upload({
          url: API+"create_asset",
          headers: {'Content-Type' : 'multipart/form-data'},
          data: asset
        }).then(function(resp) {
            $rootScope.show_loader=false;
            if(resp.data.status==true){
        //         asset.photo=asset.file.name;
        // Assets.create(asset).then(function(Data){
        //     $rootScope.show_loader=false;
            if(Data.data.status==true){
            toastr.success(Data.data.message,"Success!"); 
            $rootScope.card_types=["Physical Card","Large Card","E-Code","Cash Reciept","Debit Card Reciept"];
            $timeout(function () {
                window.location.reload();
            }, 2000);
            }else{
            toastr.error(Data.data.message,"Oops!");
            } 
            }else{
            toastr.error(resp.data.message,"Oops!");
            }
  });
    };




    $rootScope.create_asset2=function(asset){
            var formData = new FormData();
            $rootScope.show_loader=true;
           
    };

    


    $rootScope.coin_tots=function(){
        var z=0;
        if($rootScope.coin){
            var y=$rootScope.coin.fee || 0;
            var x=$rootScope.coin_value || 0;
              z=parseFloat(y) + parseFloat(x);
        }
        return parseFloat(z);
    }

    

    $rootScope.suspend_account=function(customer){
        $rootScope.show_loader=true;
        customer.suspended=true;
        customer.admin_id=$rootScope.admin.o_id;
        Users.update(customer).then(function(Data){
            $rootScope.show_loader=false;
            if(Data.data.status==true){
            toastr.success(Data.data.message,"Success!"); 
            $timeout(function () {
                window.location.reload();
            }, 2000);
            }else{
            toastr.error(Data.data.message,"Oops!");
            }
            });
    }



    $rootScope.activate_account=function(customer){
        $rootScope.show_loader=true;
        customer.suspended=false;
        customer.admin_id=$rootScope.admin.o_id;
        Users.update(customer).then(function(Data){
            $rootScope.show_loader=false;
            if(Data.data.status==true){
            toastr.success(Data.data.message,"Success!"); 
            $timeout(function () {
                window.location.reload();
            }, 2000);
            }else{
            toastr.error(Data.data.message,"Oops!");
            }
            });
    }







    $rootScope.total_card=function(cards){
        var total=0;
        var rate=$rootScope.selected_transaction.rates;
        if(cards){
            for(var i=0;i < cards.length;i++){
                var card=cards[i];
               if(card.total > 0){
                var sub=card.total;
                total=total + sub;
               }else{
                var sub=(rate * card.amount) * card.quantity;
                total=total + sub;
               }
            }
        }
        return total;
    }








    

    $rootScope.approve_affiliate=function(af){
        $rootScope.show_loader=true;
        af.admin_id=$rootScope.admin.o_id;
        Affliates.approve(af).then(function(Data){
            $rootScope.show_loader=false;
            if(Data.data.status==true){
            toastr.success(Data.data.message,"Success!"); 
                $timeout(function () {
                window.location.reload();
                }, 2000);
            }else{
            toastr.error(Data.data.message,"Oops!");
            }
            });
    };


    

    

    $rootScope.decline_affiliate=function(af){
        $rootScope.show_loader=true;
        af.admin_id=$rootScope.admin.o_id;
        Affliates.decline(af).then(function(Data){
            $rootScope.show_loader=false;
            if(Data.data.status==true){
            toastr.success(Data.data.message,"Success!"); 
            $timeout(function () {
               window.location.reload();
            }, 2000);
            }else{
            toastr.error(Data.data.message,"Oops!");
            }
            });
    };








    

    $rootScope.approve_peer=function(transaction){
        $rootScope.show_loader=true;
        transaction.admin_id=$rootScope.admin.o_id;
        transaction.peer_id=$rootScope.admin.administrator.peer_id;
        Peers.approve(transaction).then(function(Data){
            $rootScope.show_loader=false;
            if(Data.data.status==true){
            toastr.success(Data.data.message,"Success!"); 
                $timeout(function () {
                window.location.reload();
                }, 2000);
            }else{
            toastr.error(Data.data.message,"Oops!");
            }
            });
    };


    

    $rootScope.decline_peer=function(transaction){
        $rootScope.show_loader=true;
        transaction.admin_id=$rootScope.admin.o_id;
        transaction.peer_id=$rootScope.admin.administrator.peer_id;
        Peers.decline(transaction).then(function(Data){
            $rootScope.show_loader=false;
            if(Data.data.status==true){
            toastr.success(Data.data.message,"Success!"); 
            $timeout(function () {
               window.location.reload();
            }, 2000);
            }else{
            toastr.error(Data.data.message,"Oops!");
            }
            });
    };


    




    $rootScope.approve_order=function(transaction) {
        $rootScope.show_loader=true;
        transaction.admin_id=$rootScope.admin.o_id;
        Orders.approve(transaction).success(function(Data){
            $rootScope.show_loader=false;
            if(Data.data.status==true){
            toastr.success(Data.data.message,"Success!"); 
            $timeout(function () {
               window.location.reload();
            }, 2000);
            }else{
            toastr.error(Data.data.message,"Oops!");
            }
          }).error(function () {
            $rootScope.show_loader=false;
            toastr.success("error in connection, check your internet connection","Oops!");
          });
      };
      

    

      

    $rootScope.destroy_order=function(transaction) {
        $rootScope.show_loader=true;
        transaction.admin_id=$rootScope.admin.o_id;
        Orders.cancel(transaction).success(function(Data){
            $rootScope.show_loader=false;
            if(Data.data.status==true){
            toastr.success(Data.data.message,"Success!"); 
            $timeout(function () {
               window.location.reload();
            }, 2000);
            }else{
            toastr.error(Data.data.message,"Oops!");
            }
          }).error(function () {
            $rootScope.show_loader=false;
            toastr.success("error in connection, check your internet connection","Oops!");
          });
      };
      

    


      

    $rootScope.confirm_order=function(transaction) {
        $rootScope.show_loader=true;
        transaction.admin_id=$rootScope.admin.o_id;
        Orders.confirm(transaction).success(function(Data){
            $rootScope.show_loader=false;
            if(Data.data.status==true){
            toastr.success(Data.data.message,"Success!"); 
            $timeout(function () {
               window.location.reload();
            }, 2000);
            }else{
            toastr.error(Data.data.message,"Oops!");
            }
          }).error(function () {
            $rootScope.show_loader=false;
            toastr.success("error in connection, check your internet connection","Oops!");
          });
      };
      

    


         });
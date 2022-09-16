app.factory('Authorize',function($http,Config){
  return  {
          login: function(data){
          return $http.post(Config.API + "login",data);
          },
          register: function(data){
          return $http.post(Config.API + "register",data);
          },
          reset: function(data){
          return $http.get(Config.API + "reset/"+data);
          }
  }
});


app.factory('Orders',function($http,Config){
  return  { 
   confirm: function(t){
     return $http.post(Config.API+"orders/confirm",t);
   },
  approve: function(t){
     return $http.post(Config.API+"orders/approve",t);
   },
   destroy: function(t){
     return $http.post(Config.API+"orders/destroy",t);
   }
  }          
  });


app.factory('Admin',function($http,Config){
return  { 
  all: function(){
  return $http.get(Config.API+ "all_admins");
 },
 create: function(data){
data.token=Config.token;
 return $http.post(Config.API + "register",data);
 },
 change_password: function(data){
 return $http.post(Config.API + "change_password",data);
 },
 info: function(id){
   return $http.get(Config.API+"info/"+ id);
 },
 balance: function(){
   return $http.get(Config.API+"ngn/balance");
 },
 update_password: function(data){
 return $http.post(Config.API + "update_password",data);
 },
 token: function(data){
   return $http.get(Config.API + "tokener/"+data);
 },
 update: function(data){
 return $http.post(Config.API + "update_admin",data);
 },
 remove: function(data){
 return $http.get(Config.API + "remove_admin/"+data);
 },
 verify_bank: function(data){
 return $http.post(Config.API + "verify_bank",data);
  },
  coins: function(){
  return $http.get(Config.API + "coins");
  },
  recycle: function(){
   return $http.get(Config.API + "recycle");
  }
  }
});



app.factory('Logs',function($http,Config){
  return  { 
    all: function(){
      return $http.get(Config.API+ "all_logs");
   }
  }
});


   app.factory('Assets',function($http,Config){
     return  { 
       all: function(){
         return $http.get(Config.API+ "all_assets");
      },
   search: function(q){
     return $http.get(Config.API+ "search_assets/"+q);
  },
  single: function(id){
    return $http.get(Config.API+"single_asset/"+ id);
  },
  update: function(data){
    return $http.post(Config.API+"update_asset",data);
  },
  delete: function(data){
    return $http.post(Config.API+"delete_asset",data);
  },
  create: function(data){
    return $http.post(Config.API+"create_asset",data);
  }
}          
});



app.factory('Jobs',function($http,Config){
  return  { 
    all: function(){
      return $http.get(Config.API+ "all_jobs");
  },
  }
});

app.factory('Backup',function($http,Config){
  return  { 
    all: function(){
      return $http.get(Config.API+ "backups");
  },
  start: function(){
    return $http.get(Config.API+ "backup");
}
  }
});

app.factory('Coin',function($http,Config){
  return  { 
wallet: function(){
  return $http.get(Config.API+ "coin/wallet");
},
  update: function(data){
    return $http.post(Config.API+ "coin/update",data);
}
  }
});




app.factory('Affliates',function($http,Config){
  return  { 
    all: function(){
    return $http.get(Config.API + "affiliate/all");
    },
    verify: function(data){
      return $http.post(Config.API+ "verify",data);
  },
  approve: function(data){
    return $http.post(Config.API+ "approve_affiliate",data);
},
  decline: function(data){
    return $http.post(Config.API+ "decline_affiliate",data);
  }
  }
})








app.factory('Agents',function($http,Config){
  return  { 
    all: function(){
    return $http.get(Config.API + "agents/all");
    },
    create: function(data){
      return $http.post(Config.API+ "create_agent",data);
  },
  set_reward: function(data){
    return $http.post(Config.API+ "set_reward",data);
},
get_reward: function(){
  return $http.get(Config.API+ "reward");
}
  }
})





    
app.factory('Banks',function($http,Config){
  return  {
  all:function(){
    return $http.get(Config.API + "all_banks");
  }
}
  })




app.factory('Peers',function($http,Config){
  return  { 
    all: function(){
      return $http.get(Config.API+ "peers");
    },
    approve: function(data){
    return $http.post(Config.API+ "approve_peer",data);
    },
    deposit: function(data){
      return $http.post(Config.API+ "deposit",data);
    },
    withdraw: function(data){
      return $http.post(Config.API+ "withdraw",data);
    },
    decline: function(data){
      return $http.post(Config.API+ "decline_peer",data);
    }
}
});



  app.factory('Transactions',function($http,Config){
    return  { 
      all: function(){
        return $http.get(Config.API+ "all_transactions");
      },
      single: function(id){
        return $http.get(Config.API+"single_transactions/"+ id);
      },
      update: function(data){
        return $http.post(Config.API+"update_asset",data);
      },
      validate: function(data){
        return $http.post(Config.API+"validate_asset",data);
      },
      approve: function(data){
        return $http.post(Config.API+"approve_transaction",data);
      },
      decline: function(data){
        return $http.post(Config.API+"decline_transaction",data);
      }
}          
});









app.factory('Users',function($http,Config){
      return  {
    all:function(){
    return $http.get(Config.API + "all_users");
      },
    info: function(id){
      return $http.get(Config.API + "user_info/"+id);
    },
    update: function(data){
      return $http.post(Config.API + "update_user",data);
    },
    remove: function(data){
      return $http.get(Config.API + "remove_user/"+data);
    },
    notifications:function(){
      return $http.get(Config.API + "notifications");
    }
		}
});





  
  

app.factory('support',function($http,Config){
      return  {
		info:function(){
			 return $http.get(Config.API+"support");
		}
	}
	          
});





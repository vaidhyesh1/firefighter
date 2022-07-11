function listSubscriptionMethod(token) {
    var subscriptions = listSubscriptions(token);
    console.log('Subscriptions: '+subscriptions);
    writeSubscriptionToUI(subscriptions);
    
    
  }
  
  function listSubscriptions(token) {
    const headers = new Headers();
    const endpoint = 'https://management.azure.com/subscriptions?api-version=2020-01-01';
    const bearer = `Bearer ${token}`;
  
    headers.append("Authorization", bearer);
  
    const options = {
        method: "GET",
        headers: headers
    };
  
    console.log('request made to Graph API at: ' + new Date().toString());
    
    fetch(endpoint, options)
      .then(response => response.json())
      .catch(error => console.log(error))
  }
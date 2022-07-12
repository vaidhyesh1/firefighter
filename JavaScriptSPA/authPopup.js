// Create the main myMSALObj instance
// configuration parameters are located at authConfig.js
const myMSALObj = new Msal.UserAgentApplication(msalConfig);

function signIn() {
  myMSALObj.loginPopup(loginRequest)
    .then(loginResponse => {
      console.log("id_token acquired at: " + new Date().toString());
      console.log(loginResponse);
      console.log(loginResponse.idToken.rawIdToken);
      if (myMSALObj.getAccount()) {
        showWelcomeMessage(myMSALObj.getAccount());
        authPopUpSilent(writeSubscriptionToUI, listSubscriptions );
      }
    }).catch(error => {
      console.log(error);
    });
}

function signOut() {
  myMSALObj.logout();
}

function getTokenPopup(request) {
  return myMSALObj.acquireTokenSilent(request)
    .catch(error => {
      console.log(error);
      console.log("silent token acquisition fails. acquiring token using popup");
          
      // fallback to interaction when silent call fails
        return myMSALObj.acquireTokenPopup(request)
          .then(tokenResponse => {
            return tokenResponse;
          }).catch(error => {
            console.log(error);
          });
    });
}

function seeProfile() {
  if (myMSALObj.getAccount()) {
    getTokenPopup(loginRequest)
      .then(response => {
        callMSGraph(graphConfig.graphMeEndpoint, response.accessToken, updateUI);
      }).catch(error => {
        console.log(error);
      });
  }
}



function readMail() {
  if (myMSALObj.getAccount()) {
    getTokenPopup(tokenRequest)
      .then(response => {
        callMSGraph(graphConfig.graphMailEndpoint, response.accessToken, updateUI);
      }).catch(error => {
        console.log(error);
      });
  }
}
function getResourceGroups(callback,token) {
  const headers = new Headers();
  var e = document.getElementById("subscription");
  var subscriptionId = e.options[e.selectedIndex].value;
  console.log(`Subscription ID: ${subscriptionId}`)
  const endpoint = `https://management.azure.com/subscriptions/${subscriptionId}/resourcegroups?api-version=2021-04-01`;
  const bearer = `Bearer ${token}`;

  headers.append("Authorization", bearer);

  const options = {
      method: "GET",
      headers: headers
  };

  console.log('request made to Graph API at: ' + new Date().toString());
  fetch(endpoint, options)
    .then(response => response.json())
    .then(response => callback(response))
    .catch(error => console.log(error))
}

function getAutoScalingSetting(callback,token){
  const headers = new Headers();
  var e = document.getElementById("subscription");
  var subscriptionId = e.options[e.selectedIndex].value;

  var e1 = document.getElementById("resources");
  var resourceGroupName = e1.options[e1.selectedIndex].value;

  var e2 = document.getElementById("autoscaling");
  var autoScaleSetting = e2.options[e2.selectedIndex].value;

  const endpoint = `https://management.azure.com/subscriptions/${subscriptionId}/resourcegroups/${resourceGroupName}/providers/Microsoft.Insights/autoscalesettings/${autoScaleSetting}?api-version=2015-04-01`;
  const bearer = `Bearer ${token}`;

  headers.append("Authorization", bearer);

  const options = {
      method: "GET",
      headers: headers
  };

  console.log('request made to Graph API at: ' + new Date().toString());
  fetch(endpoint, options)
    .then(response => response.json())
    .then(response => callback(response))
    .catch(error => console.log(error))
}

function listSubscriptions(callback,token) {
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
    .then(response => callback(response))
    .catch(error => console.log(error))
}

function updateAutoScaleSetting(callback,token) {
  const headers = new Headers();
  var e = document.getElementById("subscription");
  var subscriptionId = e.options[e.selectedIndex].value;

  var e1 = document.getElementById("resources");
  var resourceGroupName = e1.options[e1.selectedIndex].value;

  var e2 = document.getElementById("autoscaling");
  var autoScaleSetting = e2.options[e2.selectedIndex].value;

  const endpoint = `https://management.azure.com/subscriptions/${subscriptionId}/resourcegroups/${resourceGroupName}/providers/Microsoft.Insights/autoscalesettings/${autoScaleSetting}?api-version=2015-04-01`;
  const bearer = `Bearer ${token}`;

  azureLocation = document.getElementById("location").value;
  scaleName = document.getElementById("scaleName").value;
  isEnabled = document.getElementById("autoenabled").checked; 
  capacity = document.getElementById("profile").value;
  minimum = parseInt(capacity.split(' ')[0]);
  maximum = parseInt(capacity.split(' ')[1]);
  defaultCapacity = parseInt(capacity.split(' ')[2]);

  var e4 = document.getElementById("profile");
  var profileName = e4.options[e4.selectedIndex].text;
  var targetResourceUri = `/subscriptions/${subscriptionId}/resourceGroups/${resourceGroupName}/providers/Microsoft.ApiManagement/service/apiServiceInnovationHack`;
  putData = {
    "location":azureLocation,
    "properties":{
      "enabled":isEnabled,
      "targetResourceUri":targetResourceUri,
      "name":scaleName,
      "profiles": [
        {
          "name": profileName,
          "capacity": {
            "minimum": minimum,
            "maximum": maximum,
            "default": defaultCapacity
          },
          "rules": [],
        }
      ]
  }
}

  headers.append("Authorization", bearer);
  headers.append('Content-Type', 'application/json')

  const options = {
      method: "PUT",
      headers: headers,
      body: JSON.stringify(putData)
  };

  console.log('request made to Graph API at: ' + new Date().toString());
  fetch(endpoint, options)
    .then(response => response.json())
    .then(response => callback(response))
    .catch(error => console.log(error))
}

function getAutoScalingGroups(callback,token) {
  const headers = new Headers();
  var e = document.getElementById("subscription");
  var subscriptionId = e.options[e.selectedIndex].value;
  var e1 = document.getElementById("resources");
  var resourceGroupName = e1.options[e1.selectedIndex].value;
  const endpoint = `https://management.azure.com/subscriptions/${subscriptionId}/resourcegroups/${resourceGroupName}/providers/Microsoft.Insights/autoscalesettings?api-version=2015-04-01`;
  const bearer = `Bearer ${token}`;

  headers.append("Authorization", bearer);

  const options = {
      method: "GET",
      headers: headers
  };

  console.log('request made to Graph API at: ' + new Date().toString());
  fetch(endpoint, options)
    .then(response => response.json())
    .then(response => callback(response))
    .catch(error => console.log(error))
}

function authPopUpSilent(callback,calledMethod){
if (myMSALObj.getAccount()) {
  getTokenPopup(tokenRequest)
  .then(response => {
    console.log(response);
    calledMethod(callback,response.accessToken);
  }).catch(error => {
    console.log(error);
  });
}
}

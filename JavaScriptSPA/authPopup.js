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

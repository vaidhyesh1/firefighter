// Select DOM elements to work with
const welcomeDiv = document.getElementById("welcomeMessage");
const signInButton = document.getElementById("signIn");
const signOutButton = document.getElementById('signOut');
const cardDiv = document.getElementById("card-div");
const mailButton = document.getElementById("readMail");
const profileButton = document.getElementById("seeProfile");
const profileDiv = document.getElementById("profile-div");
const subscriptionUI = document.getElementById("list-subscriptions");
const resourceGroupUI = document.getElementById("get-resources");
const autoScalingGroupUI = document.getElementById("list-autoscaling-groups");
const autoScalingSettingUI = document.getElementById("list-autoscaling-setting");
const getProfileUI = document.getElementById("get-profiles");
function showWelcomeMessage(account) {

    // Reconfiguring DOM elements
    cardDiv.classList.remove('d-none');
    welcomeDiv.innerHTML = `Welcome ${account.name}`;
    signInButton.classList.add('d-none');
    signOutButton.classList.remove('d-none');
}

function writeSubscriptionToUI(subscriptions) {
  htmlString = '<select name="subscription" id="subscription">';
  if(subscriptions.value) {
    subscriptions.value.forEach(sub => {
      htmlString += '<option value="'+sub.subscriptionId+'">'+sub.displayName+'</option>'
    });
  }
  htmlString += '</select>';
  subscriptionUI.innerHTML = htmlString;
  document.getElementById("getresources").classList.remove('d-none');
}

function writeResourceGroupToUI(resources) {
  htmlString = '<select name="resources" id="resources">';
  if(resources.value) {
    resources.value.forEach(resource => {
      htmlString += '<option value="'+resource.name+'">'+resource.name+'</option>'
    });
  }
  htmlString += '</select>';
  resourceGroupUI.innerHTML = htmlString;
  document.getElementById("getautoscalinggroups").classList.remove('d-none');
}

function writeAutoscalingGroupToUI(autoScaleSetting) {
  htmlString = '<select name="autoscaling" id="autoscaling">';
  if(autoScaleSetting.value) {
    autoScaleSetting.value.forEach(setting => {
      htmlString += '<option value="'+setting.name+'">'+setting.name+'</option>'
    });
  }
  htmlString += '</select>';
  autoScalingGroupUI.innerHTML = htmlString;
  document.getElementById("getScaleSettings").classList.remove('d-none');

}

function writeAutoScaleToUI(singleAutoScaleSetting) {
  console.log(singleAutoScaleSetting);
  document.getElementById("autoScaleSetting").classList.remove('d-none');
  console.log(singleAutoScaleSetting.properties.enabled);
  if(singleAutoScaleSetting.properties.enabled) {
    document.getElementById("autoenabled").checked= true;
  }
  document.getElementById("location").value = singleAutoScaleSetting.location;
  document.getElementById("scaleName").value = singleAutoScaleSetting.properties.name;

  htmlString = '<select name="profile" id="profile">';
  if(singleAutoScaleSetting.properties.profiles) {
    profiles = singleAutoScaleSetting.properties.profiles;
    profiles.forEach(profile => {
      htmlString += `<option value="${profile.capacity.minimum} ${profile.capacity.maximum} ${profile.capacity.default}">${profile.name}</option>`
    });
  }
  htmlString += '</select>';
  getProfileUI.innerHTML = htmlString;
}

function updateAutoScaleSettingToUI(message) {
  alert(`Autoscale setting ${message.properties.name} successfully updated!`);
  }

function updateUI(data, endpoint) {
  console.log('Graph API responded at: ' + new Date().toString());

  if (endpoint === graphConfig.graphMeEndpoint) {
    profileDiv.innerHTML = '';
    const title = document.createElement('p');
    title.innerHTML = "<strong>Title: </strong>" + data.jobTitle;
    const email = document.createElement('p');
    email.innerHTML = "<strong>Mail: </strong>" + data.mail;
    const phone = document.createElement('p');
    phone.innerHTML = "<strong>Phone: </strong>" + data.businessPhones[0];
    const address = document.createElement('p');
    address.innerHTML = "<strong>Location: </strong>" + data.officeLocation;
    profileDiv.appendChild(title);
    profileDiv.appendChild(email);
    profileDiv.appendChild(phone);
    profileDiv.appendChild(address);
    
  } else if (endpoint === graphConfig.graphMailEndpoint) {
      if (data.value.length < 1) {
        alert("Your mailbox is empty!")
      } else {
        const tabList = document.getElementById("list-tab");
        tabList.innerHTML = ''; // clear tabList at each readMail call
        const tabContent = document.getElementById("nav-tabContent");

        data.value.map((d, i) => {
          // Keeping it simple
          if (i < 10) {
            const listItem = document.createElement("a");
            listItem.setAttribute("class", "list-group-item list-group-item-action")
            listItem.setAttribute("id", "list" + i + "list")
            listItem.setAttribute("data-toggle", "list")
            listItem.setAttribute("href", "#list" + i)
            listItem.setAttribute("role", "tab")
            listItem.setAttribute("aria-controls", i)
            listItem.innerHTML = d.subject;
            tabList.appendChild(listItem)
    
            const contentItem = document.createElement("div");
            contentItem.setAttribute("class", "tab-pane fade")
            contentItem.setAttribute("id", "list" + i)
            contentItem.setAttribute("role", "tabpanel")
            contentItem.setAttribute("aria-labelledby", "list" + i + "list")
            contentItem.innerHTML = "<strong> from: " + d.from.emailAddress.address + "</strong><br><br>" + d.bodyPreview + "...";
            tabContent.appendChild(contentItem);
          }
        });
      }
  }
}
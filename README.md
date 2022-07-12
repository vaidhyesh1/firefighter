# Microsoft Azure Innovation Challenge

## Firefighter
### An open source web application that can help DevOps Engineers manage their Azure API Management Services

## Challenge Statement

### Microsoft Azure Innovation Challenge #1: Deploy and Manage APIs, operations, policies and other artifacts at scale in Azure API Management

APIs and microservices are designed to support the development of integrated digital experience. However, when introducing a large number of APIs, operations, policies, and other artifacts the impact on DevOps engineers is often forgotten.
How can solutions with large numbers of APIs exposed in the back end avoid failure? How can DevOps successfully deploy and manage APIs at scale across environments (Dev -> QA -> Production)?
Tackle this challenge and build an open source project that uses Azure services and workloads to address API Management with Azure at scale.

## Project description 

Firefighter is an open source web application that can help businesses manage their Azure API Management. It can help DevOps Engineers to automatically scale their API Management gateway instance. Firefighter authenticates the user using the Microsoft Azure credentials and lets them choose their autoscaling group settings to choose the API Management service. The users can enable or disable the auto scaling groups for the chosen API Management service. The users can also change the name and location of the auto scaling. 
 
## Features & Functionality

Firefighter UI: Firefighter is a single page web application hosted with HTML, CSS and VanillaJS as the frontend and NodeJS as the backend due to its extensive asynchronous support and low API response latency. The microservice is deployed using the Azure App Service.

Authentication - The authentication module is implemented using Microsoft Graph API to access the Azure graph and management RESTful API endpoints. The graph endpoints are authenticated on the backend using the Microsoft Authentication Library (MSAL)

Choice of API Management to be scaled - Firefighter lets the user choose the subscription ID, resource groups, and auto scaling settings. This will allow the user to choose the API management service that they wish to protect. Options to change the name, region at which the autoscaling group is provisioned and set the auto scaling flag. 

CICD deployment - Full CI-CD deployment with github actions was linked to the Azure App service instance. which minimizes developer intervention during code deployment 


### Request flow to manage API Management system

## Azure tools used

- Graph API for Azure Authentication for user sign in
- Azure API Management service - Firefighter lets the user choose the subscription ID, resource groups, and auto scaling settings. This will allow the user to choose the API management service that they wish to protect. Options to change the name, location and enable autoscaling is also displayed. 
- Azure active directory for authentication into Azure cloud services
- Azure logic apps for creating APIs inside API Management services
- CICD with github actions to Azure App service - Used github actions to implement CICD Deployment 
- Azure App service - The Single Page Application (SPA) frontend and the NodeJS backend is deployed using the Azure App Service. 

## Azure Reference Architecture outlining a high-level overview of the tools and devices used within the application


## Project Links

Project URL - https://mftinnovation.azurewebsites.net/

GitHub repository URL - https://github.com/vaidhyesh1/firefighter/tree/master

Video link of the Project demo - 

## System Requirements & Installation

STEP 1: Clone the repository from the given URL 

GitHub repository URL - https://github.com/vaidhyesh1/firefighter/tree/master

STEP 2: Run the following commands 
npm install
npm start



## References

- https://docs.microsoft.com/en-us/azure/active-directory/develop/tutorial-v2-javascript-spa
- https://docs.microsoft.com/en-us/rest/api/resources/subscriptions/list
- https://docs.microsoft.com/en-us/rest/api/resources/resource-groups/list
- https://docs.microsoft.com/en-us/rest/api/monitor/autoscale-settings/list-by-resource-group
- https://docs.microsoft.com/en-us/rest/api/monitor/autoscale-settings/create-or-update#code-try-0










   



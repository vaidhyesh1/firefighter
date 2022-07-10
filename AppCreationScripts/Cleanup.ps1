[CmdletBinding()]
param(    
    [PSCredential] $Credential,
    [Parameter(Mandatory=$False, HelpMessage='Tenant ID (This is a GUID which represents the "Directory ID" of the AzureAD tenant into which you want to create the apps')]
    [string] $tenantId
)

if ($null -eq (Get-Module -ListAvailable -Name "AzureAD")) { 
    Install-Module "AzureAD" -Scope CurrentUser 
} 
Import-Module AzureAD
$ErrorActionPreference = "Stop"

Function Cleanup
{
<<<<<<< HEAD
    if (!$azureEnvironmentName)
    {
        $azureEnvironmentName = "AzureCloud"
    }

    <#
    .Description
    This function removes the Azure AD applications for the sample. These applications were created by the Configure.ps1 script
    #>
=======
<#
.Description
This function removes the Azure AD applications for the sample. These applications were created by the Configure.ps1 script
#>
>>>>>>> 8c8bbef46e61f5674efb05666e5b2069afcc416c

    # $tenantId is the Active Directory Tenant. This is a GUID which represents the "Directory ID" of the AzureAD tenant 
    # into which you want to create the apps. Look it up in the Azure portal in the "Properties" of the Azure AD. 

    # Login to Azure PowerShell (interactive if credentials are not already provided:
    # you'll need to sign-in with creds enabling your to create apps in the tenant)
    if (!$Credential -and $TenantId)
    {
<<<<<<< HEAD
        $creds = Connect-AzureAD -TenantId $tenantId -AzureEnvironmentName $azureEnvironmentName
=======
        $creds = Connect-AzureAD -TenantId $tenantId
>>>>>>> 8c8bbef46e61f5674efb05666e5b2069afcc416c
    }
    else
    {
        if (!$TenantId)
        {
<<<<<<< HEAD
            $creds = Connect-AzureAD -Credential $Credential -AzureEnvironmentName $azureEnvironmentName
        }
        else
        {
            $creds = Connect-AzureAD -TenantId $tenantId -Credential $Credential -AzureEnvironmentName $azureEnvironmentName
=======
            $creds = Connect-AzureAD -Credential $Credential
        }
        else
        {
            $creds = Connect-AzureAD -TenantId $tenantId -Credential $Credential
>>>>>>> 8c8bbef46e61f5674efb05666e5b2069afcc416c
        }
    }

    if (!$tenantId)
    {
        $tenantId = $creds.Tenant.Id
    }
    $tenant = Get-AzureADTenantDetail
    $tenantName =  ($tenant.VerifiedDomains | Where-Object { $_._Default -eq $True }).Name
    
    # Removes the applications
    Write-Host "Cleaning-up applications from tenant '$tenantName'"

<<<<<<< HEAD
    Write-Host "Removing 'spa' (active-directory-javascript-graphapi-v2) if needed"
    Get-AzureADApplication -Filter "DisplayName eq 'active-directory-javascript-graphapi-v2'"  | ForEach-Object {Remove-AzureADApplication -ObjectId $_.ObjectId }
    $apps = Get-AzureADApplication -Filter "DisplayName eq 'active-directory-javascript-graphapi-v2'"
=======
    Write-Host "Removing 'pythonwebapp' (python-webapp) if needed"
    Get-AzureADApplication -Filter "DisplayName eq 'python-webapp'"  | ForEach-Object {Remove-AzureADApplication -ObjectId $_.ObjectId }
    $apps = Get-AzureADApplication -Filter "DisplayName eq 'python-webapp'"
>>>>>>> 8c8bbef46e61f5674efb05666e5b2069afcc416c
    if ($apps)
    {
        Remove-AzureADApplication -ObjectId $apps.ObjectId
    }

    foreach ($app in $apps) 
    {
        Remove-AzureADApplication -ObjectId $app.ObjectId
<<<<<<< HEAD
        Write-Host "Removed active-directory-javascript-graphapi-v2.."
    }
    # also remove service principals of this app
    Get-AzureADServicePrincipal -filter "DisplayName eq 'active-directory-javascript-graphapi-v2'" | ForEach-Object {Remove-AzureADServicePrincipal -ObjectId $_.Id -Confirm:$false}
=======
        Write-Host "Removed python-webapp.."
    }
    # also remove service principals of this app
    Get-AzureADServicePrincipal -filter "DisplayName eq 'python-webapp'" | ForEach-Object {Remove-AzureADServicePrincipal -ObjectId $_.Id -Confirm:$false}
>>>>>>> 8c8bbef46e61f5674efb05666e5b2069afcc416c
    
}

Cleanup -Credential $Credential -tenantId $TenantId
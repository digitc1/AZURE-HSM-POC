# Azure CosmosDB with CMK encryption at rest

First, we develop a simple function with encrypted storage and encrypted Azure CosmosDB.
It contains 3 ARM templates : one for creating the keyvault, one for creating the CosmosDB, one for the function. 

To deploy the ressources, you can run the following commands or you can deploy it via the portal
```
$ New-AzResourceGroupDeployment -TemplateFile ./keyvault.json -vaultName <name> -ResourceGroupName <resource-group>
$ New-AzResourceGroupDeployment -TemplateFile ./cosmos-with-encryption.json -cosmosDbName <name> -ResourceGroupName <resource-group> -vaultName <vault>
$ New-AzResourceGroupDeployment -TemplateFile ./function-with-encryption.json -ResourceGroupName <resource-group> -appName <name> -
```

## Observations
- When looking at the data encryption in the CosmosDB service in the portal, we see that data encryption is set to "customer-managed key" with a reference to the key used.
- When looking at the encryption in the Azure storage service in the portal, we see that data encryption is set to "customer-managed keys" with a reference to the key used.
- The exact same node js application can read and write data to CosmosDB. There is absolutely no change needed as the data is only encrypted at rest without any impact on "encryption in use" and "encryption in transit".

## Additional notes
In the keyvault template files, we can notice that 4 new resources are added to the resource group:
- The keyvault itself. This keyvault is software defined key store, backed up with HSM owned and managed by Microsoft providing a FIPS 140-2 Level 2 security.
- 2 keys (storagekey and cosmoskey) which are used to encrypt respectively storage service and CosmosDB service
- a user identity which is attached to a storage service to authenticate against the keyvault.

The CosmosDB and storage account work in a complete different way in the sense that CosmosDB use a System managed identity which has a static object id, no matter which tenant we are in while storage account uses a custom identity created within the tenant and provided an object id at creation time.

In the other scripts, we can notice that CosmosDB template differs by a single "keyVaultURI" property while the storage account differs by an entire "encryption" property which allows to fine-tune the settings, encrypting some services only (queue only, blob only, ...) and use Account key or Service Key for each individual property.

## ManagedHSM
Microsoft also propose a new service called managedHSM which provides a FIPS 140-2 Level 3 validated HSMs. Unfortunatelly, this service is not fully integrated yet with ARM templates (the only supported operation at this time is creation of the managed HSM, the creation of access policies and keys is not supported).
However, while dealing with managedHSM in a different way (using Azure cli or Azure Shell) to create the keys, they can be referenced in the same way in templates using "keyVaultURI" property.

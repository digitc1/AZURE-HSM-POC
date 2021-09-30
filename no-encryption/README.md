# Azure CosmosDB without CMK encryption at rest

First, we deploy a simple function with a Azure CosmosDB and queue storage account.
It contains 2 ARM templates : one for creating the CosmosDB and one for the function. 

To deploy the ressources, you can run the following commands or you can deploy it via the portal
```
$ New-AzResourceGroupDeployment -TemplateFile ./cosmos-without-encryption.json -cosmosDbName <name> -ResourceGroupName <resource-group>
$ New-AzResourceGroupDeployment -TemplateFile ./function-without-encryption.json -ResourceGroupName <resource-group> -appName <name>
```

#### Observations
- When looking at the data encryption in the CosmosDB service in the portal, we see that encryption is set to "service-managed key", therefore key owned by Microsoft. This is default data encryption model for Azure CosmosDB.
- When looking at the encryption in the storage account service in the portal, we see that encryption is set to "Microsoft-managed keys", therefore key is owned by Microsoft. This is default data encryption model for Azure storage account
- Using the application and simple provided code, we can get data from CosmosDB and push data to CosmosDB easily.

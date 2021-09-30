# AZURE-HMS-POC - Proof of Concept on HSM and keyvault

The purpose of this exercise is to develop a quick implementation of a function reading data from a Azure storage queue in a encrypted CosmosDB with a Customer Managed Key (in Azure managed HSM)

## Before you begin

There are typically three use-cases for data encryption:
- Encryption at rest is designed to prevent the attacker from accessing the unencrypted data by ensuring the data is encrypted when on disk
- Encryption in transit protects your data if communications are intercepted while data moves between your site and the cloud provider or between two services.
- Encryption in use protects your data currently being updated, processed, erased, accessed or read by a system. This type of encryption requires specific hardware

In this document, we will only discuss the case of encryption at rest.

User data that's stored in Cosmos DB in non-volatile storage (solid-state drives) is encrypted by default. There are no controls to turn it on or off. Encryption at rest is implemented by using a number of security technologies, including secure key storage systems, encrypted networks, and cryptographic APIs. Encryption keys are managed by Microsoft and are rotated per Microsoft internal guidelines.

In addition to Microsoft's default encryption at rest, Azure users can add an additional level of security by encrypting the Microsoft key with a custom key.

This feature adds very little complexity as only the Microsoft service key is encrypted by the key provided by the user and data remains encrypted with Microsoft service keys.

When you access your data, CosmosDB decrypts the data transparently. You do not need to change your applications to use or manage encrypted data.

![encryption layers available in Azure](https://miro.medium.com/max/500/0*nivvJtBmK38UFX-t.jpeg)

https://docs.microsoft.com/en-us/azure/security/fundamentals/encryption-overview

https://docs.microsoft.com/en-us/azure/security/fundamentals/double-encryption

https://docs.microsoft.com/en-us/azure/security/fundamentals/encryption-models

https://docs.microsoft.com/en-us/azure/security/fundamentals/encryption-models#supporting-services

## Approach

First, we will implement a solution without our own encryption (there is an Azure encryption by default), then we will implement the same solution with Customer Managed Key (CMK) encryption on CosmosDB and Azure storage.

All deployment will be performed using "Infrastructure as code" for sake of reusability and consistency. See each folder's markdown file for specific information about the changes and deployment procedure. 

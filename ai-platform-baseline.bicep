// ai-platform-baseline.bicep
// Minimal, deployable Azure baseline for website-project

param location string = resourceGroup().location
param swaProdName string = 'litlab-swa-prod'
param funcApiName string = 'litlab-func-api'
param backendAppName string = 'litlab-app-backend'
param copilotAppName string = 'litlab-app-copilot'
param signalrName string = 'litlab-signalr'
param cosmosName string = 'litlab-cosmos'
param storageName string = 'litlabstorage'
param keyVaultName string = 'litlab-kv'
param appInsightsName string = 'litlab-insights'

resource swaProd 'Microsoft.Web/staticSites@2023-01-01' = {
  name: swaProdName
  location: location
  sku: {
    name: 'Standard'
  }
}

resource funcApi 'Microsoft.Web/sites@2023-01-01' = {
  name: funcApiName
  location: location
  kind: 'functionapp,linux'
  identity: {
    type: 'SystemAssigned'
  }
  properties: {
    siteConfig: {
      linuxFxVersion: 'Node|20'
    }
    httpsOnly: true
  }
}

resource backendApp 'Microsoft.Web/sites@2023-01-01' = {
  name: backendAppName
  location: location
  kind: 'app,linux'
  identity: {
    type: 'SystemAssigned'
  }
  properties: {
    siteConfig: {
      linuxFxVersion: 'Node|20'
    }
    httpsOnly: true
  }
}

resource copilotApp 'Microsoft.Web/sites@2023-01-01' = {
  name: copilotAppName
  location: location
  kind: 'app,linux'
  identity: {
    type: 'SystemAssigned'
  }
  properties: {
    siteConfig: {
      linuxFxVersion: 'Node|20'
    }
    httpsOnly: true
  }
}

resource signalr 'Microsoft.SignalRService/SignalR@2023-08-01-preview' = {
  name: signalrName
  location: location
  sku: {
    name: 'Standard_S1'
    capacity: 1
  }
  properties: {
    features: [
      {
        flag: 'ServiceMode'
        value: 'Default'
      }
    ]
  }
}

resource cosmos 'Microsoft.DocumentDB/databaseAccounts@2023-04-15' = {
  name: cosmosName
  location: location
  kind: 'GlobalDocumentDB'
  properties: {
    databaseAccountOfferType: 'Standard'
    locations: [
      {
        locationName: location
        failoverPriority: 0
        isZoneRedundant: false
      }
    ]
    consistencyPolicy: {
      defaultConsistencyLevel: 'Session'
    }
    capabilities: [
      {
        name: 'EnableServerless'
      }
    ]
  }
}

resource storage 'Microsoft.Storage/storageAccounts@2023-01-01' = {
  name: storageName
  location: location
  sku: {
    name: 'Standard_LRS'
  }
  kind: 'StorageV2'
  properties: {
    accessTier: 'Hot'
  }
}

resource appInsights 'Microsoft.Insights/components@2020-02-02' = {
  name: appInsightsName
  location: location
  kind: 'web'
  properties: {
    Application_Type: 'web'
  }
}

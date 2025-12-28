@description('Location for all resources.')
param location string = resourceGroup().location

@description('A short, globally-unique-ish prefix for resource names (lowercase letters/numbers only, 3-12 chars recommended).')
param namePrefix string

@description('Environment name (dev|staging|prod).')
@allowed([
  'dev'
  'staging'
  'prod'
])
param env string = 'prod'

@description('Optional: Existing Static Web Apps resource IDs are typically created outside Bicep because SWA has special GitHub binding flow. Set to empty to skip SWA resources here.')
param createStaticWebApps bool = false

@description('Frontend prod SWA name (if createStaticWebApps=true).')
param swaProdName string = '${namePrefix}-${env}-swa-prod'

@description('Frontend preview/staging SWA name (if createStaticWebApps=true).')
param swaPreviewName string = '${namePrefix}-${env}-swa-preview'

@description('Function App name for api/.')
param functionAppName string = '${namePrefix}-${env}-func-api'

@description('App Service name for backend/.')
param backendAppName string = '${namePrefix}-${env}-app-backend'

@description('App Service name for services/copilot-engine/.')
param copilotAppName string = '${namePrefix}-${env}-app-copilot'

@description('SignalR Service name.')
param signalrName string = '${namePrefix}-${env}-signalr'

@description('Cosmos DB account name (must be globally unique, lowercase, 3-44 chars).')
param cosmosAccountName string = '${namePrefix}${env}cosmos'

@description('Cosmos DB database name.')
param cosmosDbName string = 'litlab'

@description('Storage account name (globally unique, lowercase, 3-24 chars).')
param storageAccountName string = '${namePrefix}${env}sa'

@description('Key Vault name (globally unique, 3-24 chars, alphanum and hyphen).')
param keyVaultName string = '${namePrefix}-${env}-kv'

@description('Log Analytics workspace name.')
param logWorkspaceName string = '${namePrefix}-${env}-law'

@description('App Insights name.')
param appInsightsName string = '${namePrefix}-${env}-appi'

@description('App Service plan name (Linux).')
param appServicePlanName string = '${namePrefix}-${env}-asp'

@description('Function storage account name (globally unique, 3-24 chars).')
param functionStorageName string = '${namePrefix}${env}funcsa'

@description('SKU for App Service plan (B1 for dev, P1v3+ for prod recommended).')
param appServiceSkuName string = 'P1v3'

@description('SignalR SKU (Free_F1 for dev, Standard_S1+ for prod).')
param signalrSkuName string = 'Standard_S1'

@description('Cosmos DB consistency level.')
@allowed([
  'Session'
  'Strong'
  'BoundedStaleness'
  'Eventual'
  'ConsistentPrefix'
])
param cosmosConsistency string = 'Session'

@description('Node runtime version for App Service.')
param nodeLinuxFxVersion string = 'NODE|20-lts'

// ... (see previous message for full resource definitions and appSettings best practices) ...

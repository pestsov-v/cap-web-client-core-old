export const CoreSymbols = {
  // Initiator
  Initiator: Symbol('Initiator'),

  // Connectors
  ServiceConnector: Symbol('ServiceConnector'),
  IntegrationConnector: Symbol('IntegrationConnector'),

  // Services
  DiscoveryService: Symbol('DiscoveryService'),
  GetawayService: Symbol('GetawayService'),
  LoggerService: Symbol('LoggerService'),
  LocalizationService: Symbol('LocalizationService'),
  SchemaService: Symbol('SchemaService'),
  StoreService: Symbol('StoreService'),

  // Integration
  MapboxIntegration: Symbol('MapboxIntegration'),

  // Agents
  FunctionalityAgent: Symbol('FunctionalityAgent'),

  // Loaders
  SchemaLoader: Symbol('SchemaLoader')
} as const;

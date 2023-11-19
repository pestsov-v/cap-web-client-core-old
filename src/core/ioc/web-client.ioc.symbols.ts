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

  // Integration
  MapboxIntegration: Symbol('MapboxIntegration'),
} as const;

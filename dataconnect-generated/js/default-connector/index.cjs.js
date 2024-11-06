const { getDataConnect, validateArgs } = require('firebase/data-connect');

const connectorConfig = {
  connector: 'default',
  service: 'kel17-mod6',
  location: 'us-central1'
};
exports.connectorConfig = connectorConfig;


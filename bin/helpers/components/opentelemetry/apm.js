const { NodeSDK } = require('@opentelemetry/sdk-node');
const { Resource } = require('@opentelemetry/resources');
const { SemanticResourceAttributes } = require('@opentelemetry/semantic-conventions');
const { BatchSpanProcessor } = require('@opentelemetry/sdk-trace-base');
const { OTLPTraceExporter } = require('@opentelemetry/exporter-trace-otlp-proto');
// const { getNodeAutoInstrumentations } = require('@opentelemetry/auto-instrumentations-node');
const { RestifyInstrumentation } = require('@opentelemetry/instrumentation-restify');
const { HttpInstrumentation } = require('@opentelemetry/instrumentation-http');
const { MongoDBInstrumentation } = require('@opentelemetry/instrumentation-mongodb');
const logger = require('../../utils/logger');
const config = require('../../../infra/configs/global_config');

const traceExporter = new OTLPTraceExporter({ url: config.get('/opentelemetry/host') + '/v1/traces' });

const init = () => {
  const sdk = new NodeSDK({
    resource: new Resource({
      [SemanticResourceAttributes.SERVICE_NAME]: 'codebase',
      [SemanticResourceAttributes.DEPLOYMENT_ENVIRONMENT]: config.get('/env'),
    }),
    // instrumentations: [getNodeAutoInstrumentations()],
    instrumentations: [
      new RestifyInstrumentation(),
      new HttpInstrumentation(),
      new MongoDBInstrumentation(),
    ],
    spanProcessor: new BatchSpanProcessor(traceExporter),
  });
  try {
    sdk.start();
    logger.info('opentelemetry', 'connected', 'dial');
  } catch (err) {
    logger.error('opentelemetry', 'connection error', 'dial', err);
  }
  process.on('SIGTERM', () => {
    try {
      sdk.shutdown();
      logger.info('opentelemetry', 'terminated', 'dial');
    } catch (err) {
      logger.error('opentelemetry', 'failed terminate', 'dial', err);
    }
  });
};

module.exports = {
  init,
};

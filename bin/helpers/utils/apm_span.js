const { Resource } = require('@opentelemetry/resources');
const { SemanticResourceAttributes } = require('@opentelemetry/semantic-conventions');
const { BatchSpanProcessor } = require('@opentelemetry/sdk-trace-base');
const { NodeTracerProvider } = require('@opentelemetry/sdk-trace-node');
const { OTLPTraceExporter } = require('@opentelemetry/exporter-trace-otlp-proto');
const config = require('../../infra/configs/global_config');

const init = () => {
  const resource = new Resource({
    [SemanticResourceAttributes.SERVICE_NAME]: 'codebase-span',
    [SemanticResourceAttributes.DEPLOYMENT_ENVIRONMENT]: config.get('/env'),
  });
  const provider = new NodeTracerProvider({resource});
  const exporter = new OTLPTraceExporter({ url: 'http://localhost:4318/v1/traces' });
  provider.addSpanProcessor(new BatchSpanProcessor(exporter));
  provider.register();
};

module.exports = {
  init,
};

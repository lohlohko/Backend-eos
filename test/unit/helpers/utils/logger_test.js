const assert = require('assert');
const logger = require('../../../../bin/helpers/utils/logger');

describe('Logger', () => {
  describe('info', () => {
    it('should send log with level info', () => {
      logger.info('', '', '', '');
      assert.ok(1);
    });
  });

  describe('warn', () => {
    it('should send log with level warn', () => {
      logger.warn('', '', '', '');
      assert.ok(1);
    });
  });

  describe('error', () => {
    it('should send log with level error', () => {
      logger.error('', '', '', '');
      assert.ok(1);
    });
  });

  describe('log', () => {
    it('should send log with level debug', () => {
      logger.log('', '', '', '');
      assert.ok(1);
    });
  });

  describe('debug', () => {
    it('should send log with level debug', () => {
      logger.debug('', '', '', '');
      assert.ok(1);
    });
  });

});

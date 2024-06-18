
const assert = require('assert');
const sinon = require('sinon');

const Query = require('../../../../../../bin/modules/company/repositories/queries/query');

describe('Company Query', () => {

  let parameter = {
    'companyId': '7bbdc172-d638-48e1-96b1-7abaaada3dd4',
  };
  let okResponse = {
    data: {
      'companyId': '7bbdc172-d638-48e1-96b1-7abaaada3dd4',
      'name': 'PT. Truck Andra'
    },
    err: null
  };

  const db = {
    setCollection: sinon.stub(),
    findOneProject: sinon.stub().resolves(okResponse),
    aggregate: sinon.stub().resolves(okResponse),
    distinct: sinon.stub().resolves(okResponse)
  };

  it('should success return one Company', async() => {
    const query = new Query(db);
    const result = await query.findOneProject(parameter, {});
    assert.equal(result.data.companyId, '7bbdc172-d638-48e1-96b1-7abaaada3dd4');
  });

  it('should success return distinct Company', async() => {
    const query = new Query(db);
    const result = await query.distinct('companyId', parameter);
    assert.equal(result.data.companyId, '7bbdc172-d638-48e1-96b1-7abaaada3dd4');
  });

  it('should success return aggregated Company', async() => {
    const query = new Query(db);
    const result = await query.aggregate(parameter);
    assert.equal(result.data.companyId, '7bbdc172-d638-48e1-96b1-7abaaada3dd4');
  });

});

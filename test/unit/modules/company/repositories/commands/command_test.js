const assert = require('assert');
const sinon = require('sinon');

const Command = require('../../../../../../bin/modules/company/repositories/commands/command');

describe('Cargo Command', () => {
  let db, payload, companyData;
  beforeEach(() => {
    companyData = {
      data:{
        'name': 'PT. Sumber Makmur Sejati',
        'type': 'PT',
        'address': 'Jl. Tendean No. 24',
        'cityId': '200',
        'provinceId': '1235',
        'phone': '02185767721',
        'email': 'cs.sumakmur@yopmail.com',
        'latitude': '106.8029923',
        'longitude': '-6.2318907',
        'website': '',
        'npwpNum': '829374017584921',
        'npwpFile': 'http://localhost/company-npwp/c082aac9-d638-4277-b0e7-76b749fe4416.png',
        'siupNum': '1231231231231748234234',
        'siupFile': 'http://localhost/company-siup/c082aac9-d638-4277-b0e7-76b749fe4416.png',
        'siupExpiryDate': '2025-01-02',
        'directorKtpNum': '147123410921',
        'directorName': 'Suhendar Ahmad',
        'directorKtpFile': 'http://localhost/company-ktp/c082aac9-d638-4277-b0e7-76b749fe4416.png',
        'bankAccountName': 'BNI',
        'bankAccountNum': '1231231231',
        'useCreditLimit': true,
        'creditLimit': 70000000,
        'partnershipType': 'cargoOwner',
        'partnerIds': [],
        'companyId': 'acf52c67-cabf-d048-85f0-9e645e5963e1',
        'isActive': true,
        'createdBy': 'fe061327-e875-473f-b881-4a76ce1f5d90',
        'createdAt': '2020-02-27T02:25:28.507Z',
        'modifiedAt': '',
        'modifiedBy': ''
      },
      err: null
    };
  });

  it('Should success insert document', async () =>{
    db = {
      setCollection: () => true,
      insertOne: sinon.stub().resolves(companyData),
    };
    const command = new Command(db);
    const result = await command.insertOne({});
    assert.equal(result, companyData);
  });
  it('Should success upsert document', async () =>{
    payload = { isActive: false };
    companyData.data.isActive = false;
    db = {
      setCollection: () => true,
      upsertOne: sinon.stub().resolves(companyData)
    };
    const command = new Command(db);
    const result = await command.upsertOne({ companyId: 'acf52c67-cabf-d048-85f0-9e645e5963e1' }, payload);
    assert.equal(result.data.isActive, false);
  });
});

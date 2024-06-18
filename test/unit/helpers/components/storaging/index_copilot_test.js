// const assert = require('chai').assert;
// const sinon = require('sinon');
// const Storaging = require('../../../../../bin/helpers/components/storaging/index');

// describe('Storaging', () => {
//     let storaging;
//     let payload;

//     beforeEach(() => {
//         storaging = new Storaging();
//         payload = {
//             bucket: 'testBucket',
//             rawFile: 'testFile',
//             name: 'testName',
//             folder: 'testFolder'
//         };
//     });

//     afterEach(() => {
//         sinon.restore();
//     });

//     describe('#uploadDocument', () => {
//         it('should throw an error if file size is too large', async () => {
//             payload.rawFile = new Buffer.alloc(2097153); // size > limitSize
//             try {
//                 await storaging.uploadDocument(payload);
//             } catch (err) {
//                 assert.equal(err.message, 'Ukuran file terlalu besar.');
//             }
//         });

//         it('should throw an error if file format is not acceptable', async () => {
//             payload.rawFile = 'testFile'; // not in allowedExt
//             try {
//                 await storaging.uploadDocument(payload);
//             } catch (err) {
//                 assert.equal(err.message, 'Format file tidak dapat diterima.');
//             }
//         });

//         // Add more tests as needed
//     });
// });
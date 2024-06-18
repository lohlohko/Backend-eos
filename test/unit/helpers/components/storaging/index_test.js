// const assert = require('assert');
// const sinon = require('sinon');
// const fs = require('fs');
// const fileType = require('file-type');
// const Storaging = require('../../../../../bin/helpers/components/storaging/index');

// const file = {
//     _eventsCount: 0,
//     _maxListeners: undefined,
//     size: 7798,
//     path: '/var/folders/8k/c7h9cwq57x728c956jbmglq00000gn/T/upload_59d88bcd6693c1e621e8c7751126dddf',
//     name: 'test_smile.webp',
//     type: 'image/webp',
//     hash: null,
//     lastModifiedDate: '2023-12-08T00:56:40.346Z',
//     _writeStream: { 
//         WriteStream :  {
//       path: '/var/folders/8k/c7h9cwq57x728c956jbmglq00000gn/T/upload_59d88bcd6693c1e621e8c7751126dddf',
//       flags: 'w',
//       mode: 438,
//       start: undefined,
//       pos: undefined,
//       bytesWritten: 7798,
//     }
//   }
// }

// describe('Storaging', () => {
//     const imageFile = { size: 3000000, path: '/var/folder/upload' }
//     beforeEach(() => {
//     });

//     afterEach(() => {
//     });
//     const storaging = new Storaging();

//     describe('#uploadDocument', () => {
//         const payload = {
//             bucket: 'testBucket',
//             rawFile: 'testFile',
//             name: 'testName',
//             folder: 'testFolder'
//         }
//         it('should throw an error if file size is too large', async () => {
//             payload.rawFile = imageFile; 
//             sinon.stub(fs, 'createReadStream').returns('test');
//             const result = await storaging.uploadDocument(payload);
//             assert.equal(result.error.message, 'Ukuran file terlalu besar.');
//             fs.createReadStream.restore();
//         });

//         // Add more tests as needed
//     });
// });
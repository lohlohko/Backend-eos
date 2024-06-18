const mudikhandler= require('../modules/mudik/handlers/api_handler')

module.exports = (server) => {
  server.get('/codebase/v1/mudik', mudikhandler.listMudik)
  server.get('/codebase/v1/mudik/:mudikId', mudikhandler.getMudikById)
  server.get('/codebase/v1/mudik/objek/:id', mudikhandler.getDataMudikById)
  server.post('/codebase/v1/mudik/:mudikId', mudikhandler.postMudik)
  server.put('/codebase/v1/mudik/:mudikId', mudikhandler.updateMudik)
  server.del('/codebase/v1/mudik/:mudikId', mudikhandler.deleteMudik)
};
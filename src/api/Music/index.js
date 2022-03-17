const routes = require("./routes")
const MusicsHandler = require("./handler")

module.exports = {
    name: 'musics',
    version: '1.0.0',
    register: async (server, { service, validator }) => {
        const musicsHandler = new MusicsHandler(service, validator)
        server.route(routes(musicsHandler))
    }
}
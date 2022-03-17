require('dotenv').config()
const Hapi = require('@hapi/hapi')

const Albums = require('./api/Album')
const AlbumService = require('./service/postgres/albumsService')
const AlbumsValidator = require('./validator/Album')

const Musics = require('./api/Music')
const MusicService = require('./service/postgres/musicsService')
const MusicsValidator = require('./validator/Music')

const init = async () => {
    const albumsService = new AlbumService()
    const musicsService = new MusicService()

    const server = Hapi.server({
        port: process.env.PORT,
        host: process.env.HOST,
        routes: {
            cors: {
                origin: ['*']
            }
        }
    })

    await server.register({
        plugin: Albums,
        options: {
            service: albumsService,
            validator: AlbumsValidator
        }
    })

    await server.register({
        plugin: Musics,
        options: {
            service: musicsService,
            validator: MusicsValidator
        }
    })

    await server.start()
    console.log(`Server berjalan pada ${server.info.uri}`)
}

init()
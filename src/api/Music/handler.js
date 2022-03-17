/* eslint-disable eqeqeq */
/* eslint-disable array-callback-return */
/* eslint-disable no-unused-vars */
/* eslint-disable no-shadow */
/* eslint-disable no-underscore-dangle */
const ClientError = require('../../exceptions/ClientError');

class MusicsHandler {
  constructor(service, validator) {
    this._service = service;
    this._validator = validator;

    this.postMusicHandler = this.postMusicHandler.bind(this);
    this.getMusicByIdHandler = this.getMusicByIdHandler.bind(this);
    this.getMusicsHandler = this.getMusicsHandler.bind(this);
    this.putMusicByIdHandler = this.putMusicByIdHandler.bind(this);
    this.deleteMusicByIdHandler = this.deleteMusicByIdHandler.bind(this);
  }

  async postMusicHandler(req, h) {
    try {
      this._validator.validateMusicPayload(req.payload);
      const {
        title, year, genre, performer, duration, albumId,
      } = req.payload;
      const musicId = await this._service.addMusic({
        title, year, genre, performer, duration, albumId,
      });

      const response = h.response({
        status: 'success',
        message: 'Music berhasil ditambahkan',
        data: {
          songId: musicId,
        },
      });

      response.code(201);
      return response;
    } catch (error) {
      if (error instanceof ClientError) {
        const response = h.response({
          status: 'fail',
          message: error.message,
        });
        response.code(error.statusCode);
        return response;
      }

      // server Error !
      const response = h.response({
        status: 'error',
        message: 'Maaf, terjadi kegagalan pada server kami',
      });
      response.code(500);
      return response;
    }
  }

  async getMusicsHandler(req) {
    const musics = await this._service.getMusics();
    const result = musics.map(({ id, title, performer }) => ({ id, title, performer }));

    const { title, performer } = req.query;

    if (title || performer) {
      if (title && !performer) {
        let currentTitle;
        let result = [];
        musics.map((currentMusic, index, allMusics) => {
          currentTitle = currentMusic.title;
          currentTitle = currentTitle.toLowerCase();

          if (currentTitle.search(title) == 0) {
            result.push(musics[index]);
          }
        });
        result = result.map(({ id, title, performer }) => ({ id, title, performer }));

        return {
          status: 'success',
          data: {
            songs: result,
          },
        };
      }

      if (!title && performer) {
        let currentPerformer;
        let result = [];
        musics.map((currentMusic, index, allMusics) => {
          currentPerformer = currentMusic.performer;
          currentPerformer = currentPerformer.toLowerCase();

          if (currentPerformer.search(performer) == 0) {
            result.push(musics[index]);
          }
        });
        result = result.map(({ id, title, performer }) => ({ id, title, performer }));

        return {
          status: 'success',
          data: {
            songs: result,
          },
        };
      }

      if (title && performer) {
        let currentTitle;
        let currentPerformer;
        let result = [];
        musics.map((currentMusic, index, allMusics) => {
          currentTitle = currentMusic.title;
          currentTitle = currentTitle.toLowerCase();
          currentPerformer = currentMusic.performer;
          currentPerformer = currentPerformer.toLowerCase();

          if (currentTitle.search(title) == 0 && currentPerformer.search(performer) == 0) {
            result.push(musics[index]);
          }
        });
        result = result.map(({ id, title, performer }) => ({ id, title, performer }));

        return {
          status: 'success',
          data: {
            songs: result,
          },
        };
      }
    }

    return {
      status: 'success',
      data: {
        songs: result,
      },
    };
  }

  async getMusicByIdHandler(req, h) {
    try {
      const { id } = req.params;
      const music = await this._service.getMusicById(id);

      return {
        status: 'success',
        data: {
          song: music,
        },
      };
    } catch (error) {
      if (error instanceof ClientError) {
        const response = h.response({
          status: 'fail',
          message: error.message,
        });
        response.code(error.statusCode);
        return response;
      }

      // server Error !
      const response = h.response({
        status: 'error',
        message: 'Maaf, terjadi kegagalan pada server kami',
      });
      response.code(500);
      return response;
    }
  }

  async putMusicByIdHandler(req, h) {
    try {
      this._validator.validateMusicPayload(req.payload);
      const { id } = req.params;

      await this._service.editMusicById(id, req.payload);

      return {
        status: 'success',
        message: 'Music berhasil diperbarui',
      };
    } catch (error) {
      if (error instanceof ClientError) {
        const response = h.response({
          status: 'fail',
          message: error.message,
        });
        response.code(error.statusCode);
        return response;
      }

      // server Error !
      const response = h.response({
        status: 'error',
        message: 'Maaf, terjadi kegagalan pada server kami',
      });
      response.code(500);
      return response;
    }
  }

  async deleteMusicByIdHandler(req, h) {
    try {
      const { id } = req.params;
      await this._service.deleteMusicById(id);

      return {
        status: 'success',
        message: 'Music berhasil dihapus',
      };
    } catch (error) {
      if (error instanceof ClientError) {
        const response = h.response({
          status: 'fail',
          message: error.message,
        });
        response.code(error.statusCode);
        return response;
      }

      // server Error !
      const response = h.response({
        status: 'error',
        message: 'Maaf, terjadi kegagalan pada server kami',
      });
      response.code(500);
      return response;
    }
  }
}

module.exports = MusicsHandler;

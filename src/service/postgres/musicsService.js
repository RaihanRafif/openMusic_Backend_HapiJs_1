/* eslint-disable no-underscore-dangle */
const { nanoid } = require('nanoid');
const { Pool } = require('pg');
const InvariantError = require('../../exceptions/InvariantError');
const NotFoundError = require('../../exceptions/NotFoundError');
const { mapDBMusicToModel } = require('../../utils');

class musicsService {
  constructor() {
    this._pool = new Pool();
  }

  async addMusic({
    title, year, genre, performer, duration, albumId,
  }) {
    const id = nanoid(16);
    const createdAt = new Date().toISOString();
    const updatedAt = createdAt;

    const query = {
      text: 'INSERT INTO musics VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9) RETURNING id',
      values: [id, title, year, genre, performer, duration, albumId, createdAt, updatedAt],
    };

    const result = await this._pool.query(query);

    if (!result.rows[0].id) {
      throw new InvariantError('Music gagal ditambahkan');
    }

    return result.rows[0].id;
  }

  async getMusics() {
    const result = await this._pool.query('SELECT * FROM musics');

    return result.rows.map(mapDBMusicToModel);
  }

  async getMusicById(id) {
    const query = {
      text: 'SELECT * FROM musics WHERE id = $1',
      values: [id],
    };

    const result = await this._pool.query(query);

    if (!result.rows.length) {
      throw new NotFoundError('Music tidak ditemukan');
    }

    return result.rows.map(mapDBMusicToModel)[0];
  }

  async editMusicById(id, {
    title, year, genre, performer, duration, albumId,
  }) {
    const updatedAt = new Date().toISOString();

    const query = {
      text: 'UPDATE musics SET title = $1, year = $2, genre = $3, performer = $4, duration = $5, album_id = $6, updated_at = $7 WHERE id = $8 RETURNING id ',
      values: [title, year, genre, performer, duration, albumId, updatedAt, id],
    };
    const result = await this._pool.query(query);

    if (!result.rows.length) {
      throw new NotFoundError('Gagal memperbarui music. Id tidak ditemukan');
    }
  }

  async deleteMusicById(id) {
    const query = {
      text: ' DELETE FROM musics WHERE id = $1 RETURNING id',
      values: [id],
    };

    const result = await this._pool.query(query);

    if (!result.rows.length) {
      throw new NotFoundError('Music gagal digapus. Id tidak ditemukan');
    }
  }
}

module.exports = musicsService;

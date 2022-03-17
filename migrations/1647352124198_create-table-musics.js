/* eslint-disable camelcase */

exports.up = pgm => {
    pgm.createTable('musics', {
        id: {
            type: 'VARCHAR(50)',
            primaryKey: true
        },
        title: {
            type: 'VARCHAR(50)',
            notNull: true
        },
        year: {
            type: 'INTEGER',
            notNull: true
        },
        genre: {
            type: 'VARCHAR(50)',
            notNull: true
        },
        performer: {
            type: 'VARCHAR(50)',
            notNull: true
        },
        duration: {
            type: 'INTEGER',
            notNull: false
        },
        album_id: {
            type: 'VARCHAR(50)',
        },
        created_at: {
            type: 'TEXT',
            notNull: true
        },
        updated_at: {
            type: 'TEXT',
            notNull: true
        }
    })
};

exports.down = pgm => {
    pgm.dropTable('musics')
};

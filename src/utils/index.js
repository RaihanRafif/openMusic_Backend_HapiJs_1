const mapDBToModel = ({
    id,
    year,
    name,
    created_at,
    updated_at
}) => ({
    id,
    year,
    name,
    createdAt: created_at,
    updated_at: updated_at
})

const mapDBMusicToModel = ({
    id,
    title,
    year,
    genre,
    performer,
    duration,
    albumId,
    created_at,
    updated_at
}) => ({
    id,
    title,
    year,
    genre,
    performer,
    duration,
    albumId,
    createdAt: created_at,
    updated_at: updated_at
})


module.exports = { mapDBToModel, mapDBMusicToModel }
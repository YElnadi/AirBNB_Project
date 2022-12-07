
if (process.env.NODE_ENV === 'production') {
    LITERAL_SCHEMA_PREFIX = `"${process.env.SCHEMA}".`
} else {
    LITERAL_SCHEMA_PREFIX = ""
}

module.exports = { LITERAL_SCHEMA_PREFIX };

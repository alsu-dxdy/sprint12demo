module.exports = {
    PORT: parseInt(process.env.PORT) || 3000,
    JWT_SECRET: process.env.JWT_SECRET || 'JWT_SECRET',
}

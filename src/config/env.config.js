export default{
    baseurl: process.env.BASE_URL,
    port: process.env.PORT,
    jwt: {
        issuer: process.env.ISSUER,
        secret: process.env.ACCESS_TOKEN_SECRET,
        ttl: {
            accessInMs: process.env.ACCESS_TOKEN_SECRET_TTL * 5_000,
            accessInSec: process.env.ACCESS_TOKEN_SECRET_TTL,
          },
    },
}
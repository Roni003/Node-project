module.exports = {
    admins: [], // The list of user ID's that have admin privileges.
    mongodb: {
        username: '', // your username for accessing the mongodb database (DONT SHOW THIS TO ANYONE)
        password: '', // your password for accessing the mongodb database (DONT SHOW THIS TO ANYONE)
        key: '', // The key used for password hashing, can be anything. (DONT SHOW THIS TO ANYONE)
    },
    jwt: {
        sessionLength: 60 * 60 * 24, // How long the JWT's stay valid, default value is 1 day.
        key: '' // The key used for JWT encryption, can be anything. (DONT SHOW THIS TO ANYONE)
    }
}

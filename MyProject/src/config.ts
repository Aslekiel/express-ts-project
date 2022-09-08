// const config = {
//   host: process.env.DB_HOST,
//   port: process.env.PORT,
//   db: {
//     port: process.env.DB_PORT,
//     username: process.env.DB_USER,
//     password: process.env.DB_PASSWORD,
//     database: process.env.DB_TITLE,
//   },
//   passwordSalt: process.env.SALT,
//   token: {
//     expiration: process.env.TOKEN_TIME,
//     secret: process.env.TOKEN_SECRET,
//   },
//   errors: {
//     registration: "This email is already registered!",
//   },
// };



const config = {
  host: "localhost",
  port: 5000,
  db: {
    port: 5432,
    username: "postgres",
    password: "a9965211421149965A",
    database: "users",
  },
  passwordSalt: "",
  token: {
    expiration: "",
    salt: "",
  },
  errors: {
    registration: "This email is already registered!"
  }
};

export default config;
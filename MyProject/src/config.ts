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

import { dotenv, PORT } from "./config/constants";
import { AppDataSource } from "./DataSource";
import { User } from "./entity/User";

const express = require("express");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
const urlencodedParser = bodyParser.urlencoded({ extended: false });

dotenv.config();

function generateAccessToken({ email, password }) {
  return jwt.sign({ email, password }, process.env.TOKEN_SECRET, {
    expiresIn: "1800s",
  });
}

const authenticateJWT = (req: any, res: any, next: any) => {
  const authHeader = req.headers.authorization;
  console.log(authHeader);
  if (!authHeader) return res.sendStatus(401);

  const token = authHeader.split(" ")[1];

  jwt.verify(token, process.env.TOKEN_SECRET, (err: any, user: any) => {
    if (err) return res.sendStatus(403);

    req.user = user;
    next();
  });
};

AppDataSource.initialize()
  .then(async () => {
    const app = express();
    const userRepository = AppDataSource.getRepository(User);

    app.post(
      "/registration",
      urlencodedParser,
      async function (req: any, res: any) {
        const user = new User();
        user.name = req.body.name;
        user.surname = req.body.surname;
        user.email = req.body.email;
        user.password = req.body.password;
        user.dob = req.body.dob;
        res.send(await userRepository.save(user));
      }
    );

    app.post("/login", urlencodedParser, async function (req: any, res: any) {
      const email = req.body.email;
      const password = req.body.password;

      const currentUser = await userRepository.findOneBy({
        email: email,
        password: password,
      });
      if (!currentUser) return res.sendStatus(403);

      const accessToken = generateAccessToken({
        email: email,
        password: password,
      });

      res.json({
        accessToken,
      });
    });

    app.get("/all", authenticateJWT, async function (req: any, res: any) {
      const findUsers = await userRepository.find();
      res.send(findUsers);
    });

    app.post(
      "/information",
      urlencodedParser,
      authenticateJWT,
      async function (req: any, res: any) {
        const findUser = await userRepository.findOneBy({ id: req.body.id });
        res.send(findUser);
      }
    );

    app.post(
      "/edit",
      urlencodedParser,
      authenticateJWT,
      async function (req: any, res: any) {
        const editUser = await userRepository.findOneBy({ id: req.body.id });
        editUser.name = req.body.name;
        editUser.surname = req.body.surname;
        editUser.email = req.body.email;
        editUser.password = req.body.password;
        editUser.dob = req.body.dob;
        res.send(await userRepository.save(editUser));
      }
    );

    app.post(
      "/delete",
      urlencodedParser,
      authenticateJWT,
      async function (req: any, res: any) {
        const removeUser = await userRepository.findOneBy({ id: req.body.id });
        res.send(await userRepository.remove(removeUser));
      }
    );

    app.listen(PORT, () => {
      console.log("Server start");
    });
  })
  .catch((error) => console.log(error));

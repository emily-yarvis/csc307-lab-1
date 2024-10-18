// backend.js
import express from "express";
import cors from "cors";
import userservices from "./users-service.js";

const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());

const users = {
  users_list: [
    {
      id: "xyz789",
      name: "Charlie",
      job: "Janitor",
    },
    {
      id: "abc123",
      name: "Mac",
      job: "Bouncer",
    },
    {
      id: "ppp222",
      name: "Mac",
      job: "Professor",
    },
    {
      id: "yat999",
      name: "Dee",
      job: "Aspring actress",
    },
    {
      id: "zap555",
      name: "Dennis",
      job: "Bartender",
    },
  ],
};

const idMaker = () => {
  return Math.round(Math.random() * 100000);
};

app.get("/users/:id", (req, res) => {
  const id = req.params["id"]; //or req.params.id
  userservices
    .findUserById(id)
    .then((result) => res.send(result))
    .catch(() => {
      console.log(error);
    });
});

app.post("/users", (req, res) => {
  const userToAdd = req.body;
  userToAdd.id = idMaker();
  userservices
    .addUser(userToAdd)
    .then(res.status(201).send(userToAdd))
    .catch((error) => {
      console.log(error);
    });
});

const findUserInList = (user) => {
  for (let i = 0; i < users["users_list"].length; i++) {
    if (JSON.stringify(user) == JSON.stringify(users["users_list"][i])) {
      return i;
    }
  }
  return -1;
};

app.delete("/users", (req, res) => {
  const userToDelete = req.body._id;
  const deletedUser = userservices
    .deleteUserById(userToDelete)
    .then((result) =>
      res.status(204).send({ message: "User was deleted", user: deletedUser })
    )
    .catch(() => res.status(404).send({ message: "User was not found" }));
});

app.get("/users", (req, res) => {
  const name = req.query.name;

  const job = req.query.job;

  if (name != undefined && job != undefined) {
    userservices
      .findUserByNameAndJob(name, job)
      .then((result) => res.send(result))
      .catch(() => {
        console.log(error);
      });
  } else if (name != undefined) {
    userservices
      .findUserByName(name)
      .then((result) => res.send(result))
      .catch(() => {
        console.log(error);
      });
  } else {
    userservices
      .getUsers()
      .then((userlist) => res.send(userlist))
      .catch((error) => res.status(404).send("Not Found"));
  }
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

import { Router } from "express";
import getUser from "../services/users/getUser.js";
import createUser from "../services/users/createUsers.js";
import getUserById from "../services/users/getUserById.js";
import deleteUserById from "../services/users/deleteUserById.js";
import updateUserById from "../services/users/updateUserByID.js";
import auth from "../middleware/auth.js";

const router = Router();

router.get("/", async (req, res, next) => {
  try {
    const { username, email } = req.query; 
    const users = await getUser(username, email);

    res.json(users);
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await getUserById(id);

    if (!user) {
      res.status(404).json({ message: `User with id ${id} not found` });
    } else {
      res.status(200).json(user);
    }
  } catch (error) {
    next(error);
  }
});

// router.post("/", auth, async (req, res, next) => {
//   try {
//     const { username, password, name, email, phoneNumber, profilePicture } =
//       req.body;
//     const newUser = await createUser(
//       username,
//       password,
//       name,
//       email,
//       phoneNumber,
//       profilePicture
//     );
//     res.status(201).json(newUser);
//   } catch (error) {
//     res.status(400).json({
//       message: `Failed to create User. Please check your request.`,
//     });
//     // next(error);
//   }
// });

router.post("/", auth, async (req, res, next) => {
  try {
    // Attempt to create a new user
    // If successful, send a 201 response
    // If an error occurs, jump to the catch block
    const { username, password, name, email, phoneNumber, profilePicture } =
      req.body;
    const newUser = await createUser(
      username,
      password,
      name,
      email,
      phoneNumber,
      profilePicture
    );
    // Send a 201 response if user creation is successful
    res.status(201).json(newUser);
  } catch (error) {
    // Handle the error by sending a 400 response
    res.status(400).json({
      message: `Failed to create User. Please check your request.`,
    });
  }
});

router.delete("/:id", auth, async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await deleteUserById(id);

    if (user) {
      res.status(200).send({
        message: `User with id ${id} successfully deleted`,
        user,
      });
    } else {
      res.status(404).json({
        message: `User with id ${id} not found`,
      });
    }
  } catch (error) {
    next(error);
  }
});

router.put("/:id", auth, async (req, res, next) => {
  try {
    const { id } = req.params;
    const { username, password, name, email, phoneNumber, profilePicture } =
      req.body;
    const user = await updateUserById(id, {
      username,
      password,
      name,
      email,
      phoneNumber,
      profilePicture,
    });

    if (user) {
      res.status(200).send({
        message: `User with id ${id} successfully updated`,
      });
    } else {
      res.status(404).json({
        message: `User with id ${id} not found`,
      });
    }
  } catch (error) {
    next(error);
  }
});

export default router;

const express = require("express");
const User = require("../models/users");
const router = new express.Router();

//  endpoints for getting user(s)
router.get("/users/:id", async (req, res) => {
  const _id = req.params.id;
  try {
    const user = await User.findById(_id); // actually the code below this line will be executed if user with a given id exist in db otherwise catch block will be executed.
    if (user) {
      return res.send(user);
    }
    res.status(400).send("User with such id does not exist");
  } catch (error) {
    res.status(500).send();
  }
});

router.get("/users", async (req, res) => {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (error) {
    res.status(500).send();
  }
});
// endpoint for creating new user.
router.post("/users", async (req, res) => {
  const user = await new User(req.body);

  try {
    await user.save();
    res.status(201).send(user);
  } catch (error) {
    res.status(404).send(error.message);
  }
});

router.post("/users/login", async (req, res) => {
  try {
    const user = await User.findByCredentials(
      req.body.email,
      req.body.password
    );
    res.send(user);
  } catch (error) {
    res.status(400).send();
  }
});

router.patch("/users/:id", async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ["name", "email", "password", "age"];
  const isValidProperty = updates.every(update =>
    allowedUpdates.includes(update)
  );
  if (!isValidProperty) {
    return res.status(404).send({
      error: "invalid upates"
    });
  }

  try {
    const user = await User.findById(req.params.id);
    updates.forEach(update => {
      user[update] = req.body[update];
    });
    await user.save();
    // const user = await User.findByIdAndUpdate(req.params.id, req.body, {
    //     new: true,
    //     runValidators: true
    // })
    if (user) {
      res.send(user);
    } else res.status(404).send();
  } catch (error) {
    const err = error.message;
    if (err.includes("ObjectId")) {
      return res.status(400).send("You provided an invalid id..");
    }
    res.status(400).send(error.message);
  }
});

router.delete("/user/:id", async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).send("User does not exist");
    }
    res.send(user);
  } catch (error) {
    res.status(500).send();
  }
});

module.exports = router;

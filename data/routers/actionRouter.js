const express = require("express");

const action = require("../helpers/actionModel");

const router = express.Router();

router.use(express.json());

router.get("/", (req, res) => {
  action
    .get()
    .then((action) => {
      res.status(200).json(action);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        message: `could not retrieve action data`,
      });
    });
});

router.get("/:id", validateActionId, (req, res) => {
  action
    .get(req.actions)
    .then((action) => {
      res.status(200).json(action);
    })
    .catch((error) => {
      console.log(error);
      res
        .status(404)
        .json({ message: `there was an error getting the proper id` });
    });
});

router.post("/", (req, res) => {
  // console.log(req.body);
  action
    .insert(req.body)
    .then((action) => {
      res.status(201).json(action);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        message: `There was an issue with saving the action to the database.`,
      });
    });
});

router.put("/:id", validateActionId, validateAction, (req, res) => {
  action
    .update(req.params.id, req.body)
    .then((action) => {
      res.status(200).json(action);
    })
    .catch((error) => {
      console.log(error);
      res
        .status(500)
        .json({ message: "The action information could not be updated." });
    });
});

router.delete("/:id", validateActionId, (req, res) => {
  action
    .remove(req.params.id)
    .then((action) => {
      if (action > 0) {
        res.status(200).json(`Successfully removed action`);
      }
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ message: `The action could not be removed.` });
    });
});
//custom middleware
function validateActionId(req, res, next) {
  // console.log(req.params.id)
  action.get(req.params.id).then((action) => {
    if (!action) {
      res.status(404).json({ message: `Invalid ID.` });
    } else {
      req.actions = req.params.id;
      next();
    }
  });
}

function validateAction(req, res, next) {
  if (Object.keys(req.body).length === 0) {
    res.status(400).json({ message: "Missing Data." });
  } else if (!req.body.description || !req.body.notes) {
    res.status(400).json({ message: "text field required" });
  } else {
    return next();
  }
}

module.exports = router;

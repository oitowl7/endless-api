const express = require("express");
const router = express.Router();
const mysql = require("mysql");
const db = require("../db.js");
const util = require("util");
const {
  stepPostValidator,
  stepPutValidator,
  stepDeleteValidator,
  stepVersionPostValidator,
} = require("../utils/validator.js");

const conn = mysql.createConnection(db.connectionData);
const query = util.promisify(conn.query).bind(conn);

router.get('/test', async (req, res, next) => {
  let steps = await query("SELECT * FROM steps order by stepWeight");
  
  res.json({test: "message"});
});


/* GET all steps. */
router.get("/", async (req, res, next) => {
  try {
    let steps = await query("SELECT * FROM steps order by stepWeight");
    const versions = await query("SELECT * FROM versions");

    for (let i = 0; i < steps.length; i++) {
      steps[i].versions = versions.filter(
        (version) => version.fkStepId === steps[i].id
      );
      steps[i].stepNumber = i + 1;
    }

    res.json(steps);
  } catch (error) {
    console.log(error);
    res.status(error.code || 500).json({ error: error.message });
  }
});

// get one step by id
router.get("/:id", async function (req, res, next) {
  try {
    let step = await query(`SELECT * FROM steps where id = ${req.params.id}`);
    const versions = await query(
      `SELECT * FROM versions where fkStepId = ${req.params.id}`
    );

    res.json({ ...step, versions: versions });
  } catch (error) {
    console.log(error);
    res.status(error.code || 500).json({ error: error.message });
  }
});

// post new step
router.post("/", async (req, res, next) => {
  try {
    const validation = await stepPostValidator(req.body, query);

    if (!validation.valid) {
      const error = new Error(validation.error);
      error.code = validation.code || 500;

      throw error;
    }

    await query(
      `INSERT INTO steps (stepWeight, initialTitle) VALUES (${req.body.stepWeight}, "${req.body.initialVersion.title}")`
    );

    createdStep = await query(
      `SELECT * FROM steps where stepWeight = ${req.body.stepWeight}`
    );

    await query(
      `INSERT INTO versions (fkStepId, title, body) VALUES(${createdStep[0].id}, "${req.body.initialVersion.title}", "${req.body.initialVersion.body}")`
    );

    res
      .status(201)
      .json({ message: "New step and version successfully created." });
  } catch (error) {
    console.log(error);
    res.status(error.code || 500).json({ error: error.message });
  }
});

// post new version to existing step by id
router.post("/:id/version", async (req, res, next) => {
  try {
    const validation = await stepVersionPostValidator(req.body, query, req.params.id);

    if (!validation.valid) {
      const error = new Error(validation.error);
      error.code = validation.code || 500;

      throw error;
    }

    await query(
      `INSERT INTO versions (fkStepId, title, body) VALUES(${req.params.id}, "${req.body.title}", "${req.body.body}")`
    );
    
    res
      .status(201)
      .json({ message: "New version successfully created." });
  } catch (error) {
    console.log(error);
    res.status(error.code || 500).json({ error: error.message });
  }
});

// edit step. only editable field is stepWeight
router.put("/:id", async (req, res, next) => {
  try {
    const validation = await stepPutValidator(req.body, query, req.params.id);

    if (!validation.valid) {
      const error = new Error(validation.error);
      error.code = validation.code || 500;

      throw error;
    }

    await query(`UPDATE steps SET stepWeight = ${req.body.stepWeight}`);

    res.status(200).json({ message: "Step weight successfully updated." });
  } catch (error) {
    console.log(error);
    res.status(error.code || 500).json({ error: error.message });
  }
});

//delete step
router.delete("/:id", async (req, res, next) => {
  try {
    const validation = await stepDeleteValidator(
      req.body,
      query,
      req.params.id
    );

    if (!validation.valid) {
      const error = new Error(validation.error);
      error.code = validation.code || 500;

      throw error;
    }

    await query(`DELETE FROM versions WHERE fkStepId = ${req.params.id}`);
    await query(`DELETE FROM steps WHERE id = ${req.params.id}`);

    res.status(200).json({ message: "Step successfully deleted." });
  } catch (error) {
    console.log(error);
    res.status(error.code || 500).json({ error: error.message });
  }
});

module.exports = router;

const express = require("express");
const pool = require("../modules/pool");
const router = express.Router();

/**
 * GET all sites
 */
router.get("/", (req, res) => {
  pool
    .query("SELECT * FROM sites;")
    .then((result) => res.send(result.rows))
    .catch((error) => {
      console.log(error);
      res.sendStatus(500);
    });
});
/**
 * GET filtered sites
 */
// req.body should be an array with objects containing field, and input value
// const sampleBody = [
//   { field: "architect", input: "williaM purvy" },
//   { field: "street", input: "penn" },
// ];
router.get("/filtered", (req, res) => {
  const queryText = `
  SELECT * FROM sites
  WHERE $1;`;
  const whereStatement = req.body
    .map(
      (filter) =>
        `${filter.input
          .split(" ")
          .map((input) => `${filter.field} ILIKE '%${input}%'`)
          .join(" AND ")} `
    )
    .join("AND ");
  const queryArgs = [whereStatement];
  pool
    .query(queryText, queryArgs)
    .then((result) => res.send(result.rows))
    .catch((error) => {
      console.log(error);
      res.sendStatus(500);
    });
});

/**
 * POST route template
 */
router.post("/", (req, res) => {
  // POST route code here
});

module.exports = router;
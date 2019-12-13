const express = require("express");

const router = express.Router();
// router.get("/:plateId");
// router.put("/:plateId");
// router.delete("/:plateId");
// router.post("/");
router.get("/", async (req, res) => {
  return res.send("cars");
});

module.exports = router;

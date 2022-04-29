const starShips = require('../controllers/ships.controller');
const router = require("express").Router();
// Retrieve all starShips
router.get("/", starShips.findAll);
// Update starShip
router.put("/", starShips.updateStarShip);

module.exports = router;
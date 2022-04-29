const {createFighter, fetchAllFighters} = require('../services/shipsService')

const updateStarShip = (req, res) => {
    if (Object.keys(req.body).length === 0) {
        return res.status(400).send({
            message: "Data to update can not be empty!"
        });
    }
    createFighter({starshipName: req.body.starship, clicks: req.body.timesClicked})
        .then(data => {
            if (data.n === 0) {
                res.status(400).send({
                    message: `Cannot update StarShipModel with name ${req.body.starship}`
                });
            } else res.send({message: `Clicks for StarShipModel with name ${req.body.starship} were updated successfully.`});
        })
        .catch(err => {
            res.status(500).send({
                message: `Error updating StarShip with name ${req.body.starship}`
            });
        });
}

const findAll = (req, res) => {
    fetchAllFighters().then(data => {
        res.status(200).json({data});
    })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving starships."
            });
        });
};

module.exports = {updateStarShip, findAll};


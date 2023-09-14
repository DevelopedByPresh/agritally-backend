const pigService = require("../services/pig.service");
const handleError = require("../middleware/errorHandler.middleware");

class PigController {
  addPigItem = async (req, res) => {
    try {
    const newPigItem = req.body;
    const pigItem = await pigService.addPigItem(newPigItem);

    res.json(pigItem)
  } catch (error) {
    console.log(error);
    return handleError(error, res);
  }
  };
}

module.exports = new PigController();

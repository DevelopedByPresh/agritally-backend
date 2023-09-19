const pigService = require("../services/pigService");
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
  
  getOne = async (req, res) => {
    try {
    const pigItem = await pigService.getOne();

    res.json(pigItem)
  } catch (error) {
    console.log(error);
    return handleError(error, res);
  }
  };
}

module.exports = new PigController();

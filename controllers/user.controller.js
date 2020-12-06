exports.allAccess = (req, res) => {
    res.status(200).send("Всё.");
  };
  
exports.userBoard = (req, res) => {
    res.status(200).send("Только юзер.");
  };
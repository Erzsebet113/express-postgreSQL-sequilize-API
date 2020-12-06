const db = require("../models");
const Note = db.notes;
const Op = db.Sequelize.Op;

//note creation title and description by req.body
exports.create = (req, res) => {
  if (!req.body.title) {
    res.status(400).send({
      message: "Пустой запрос чек"
    });
    return;
  }

  const note = {
    title: req.body.title,
    description: req.body.description
  };

  Note.create(note)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Ошибка на создании."
      });
    });
};

//find all notes with titile in req.query
exports.findAll = (req, res) => {
    const title = req.query.title;
    var condition = title ? { title: { [Op.iLike]: `%${title}%` } } : null;
  
    Note.findAll({ where: condition })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Не нашлось."
        });
      });
  };

//find by Pk which is id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Note.findByPk(id)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message: "заметка с ид:" + id
        });
      });
};

//http put 
exports.update = (req, res) => {
    const id = req.params.id;

    Note.update(req.body, {
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Обновилось."
          });
        } else {
          res.send({
            message: `Не обновилось, не нашел ид`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "не обновил заметку с ид:" + id
        });
      });
};

//delete note
exports.delete = (req, res) => {
    const id = req.params.id;

    Note.destroy({
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Удалил"
          });
        } else {
          res.send({
            message: `не удалил`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "не удалил заметку с ид:" + id
        });
      });
};

//delete all notes should include this only for Admin role, which i didnt create ;)
exports.deleteAll = (req, res) => {
    Note.destroy({
        where: {},
        truncate: false
      })
        .then(nums => {
          res.send({ message: `${nums} Столько удалил` });
        })
        .catch(err => {
          res.status(500).send({
            message:
              err.message || "Не удалил все"
          });
        });
};
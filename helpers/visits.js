const { ObjectID } = require("mongodb");

// models
const RecentVisit = require("../models/RecentVisit");

// @route   GET api/visits/
// @desc    Retrieves all of the visits.
// @access  Private
exports.getVisits = (req, res) => {
  let errors = {};

  RecentVisit.find({})
    .populate("itemId")
    .then(visits => {
      if (!visits) {
        errors.visits = "There were no visits's found.";
        return res.status(400).json(errors);
      }

      res.json(visits);
    })
    .catch(e => res.status(404).json(e));
};

// @route   POST api/visits/
// @desc    Creates a new RecentVisit.
// @access  Private
exports.postVisit = (req, res) => {
  var body = {
    item: "",
    type: req.body.type,
    itemId: new ObjectID(req.body.itemId),
    dateTime: new Date()
  };

  RecentVisit.findOne({ itemId: body.itemId }).then(item => {
    if (item.type == body.type) {
      RecentVisit.findByIdAndDelete(item._id).then(() => {
        let visit = new RecentVisit(body);

        visit
          .save()
          .then(visit => res.json(visit))
          .catch(e => res.status(404).json(e));
      });
    } else {
      const visit = new RecentVisit(body);

      visit
        .save()
        .then(visit => res.json(visit))
        .catch(e => res.status(404).json(e));
    }
  });
};

// @route   DELETE api/visits/:id
// @desc    Deletes a visit.
// @access  Private
exports.deleteVisit = (req, res) => {
  let errors = {};

  // Check to see if error is a valid ObjectID
  if (!ObjectID.isValid(req.params.id)) {
    errors.visit = "There was no visit found";
    return res.status(400).json(errors);
  }

  RecentVisit.findOneAndRemove({
    _id: req.params.id
  })
    .then(visit => {
      if (!visit) {
        errors.visit = "Could not find the visit";
        return res.status(401).json(errors);
      }

      res.json(visit);
    })
    .catch(e => {
      errors.visit = "Unable to delete this visit";
      console.log(e);
      res.status(400).json(errors);
    });
};

const { ObjectID } = require("mongodb");
const _ = require("lodash");
const isEmpty = require("./../validation/is-empty");

// model
const Customer = require("./../models/Customer");
const Notification = require("../models/Notification");

// validation files
const validateCustomerInput = require("../validation/customer");

// @route   GET api/customers/
// @desc    Retrieves all of the customers
// @access  Private
exports.getCustomers = (req, res) => {
  Customer.find({})
    .then(customers => {
      if (!customers) {
        return res.status(400).json({ error: "No customers found" });
      }
      res.json(customers);
    })
    .catch(e => res.status(404).json(e));
};

// @route   POST api/customers/
// @desc    Creates a new customer.
// @access  Private
exports.postCustomer = (req, res) => {
  // check for validation errors
  const { errors, isValid } = validateCustomerInput(req.body);

  // send 400 error with validation errors if not valid.
  if (!isValid) return res.status(400).json(errors);

  // Set the properties for the new customer
  var body = _.pick(req.body, [
    "name",
    "address1",
    "address2",
    "city",
    "zipcode",
    "state",
    "phone",
    "ext",
    "fax",
    "email",
    "rdp",
    "notes",
    "isFlagged",
    "flagReason"
  ]);

  // save the customer
  var newCustomer = new Customer(body);
  newCustomer.lastViewed = new Date();

  Customer.findOne({ name: body.name }).then(cust => {
    if (cust) {
      errors.customer = "This customer has already been created";
      return res.status(400).json(errors);
    }

    newCustomer
      .save()
      .then(customer => {
        if (!customer) {
          errors.customers = "Unable to create the new customer";
          return res.status(400).json(errors);
        }

        var newNote = new Notification({
          notification: "A new customer has been created.",
          type: "Customer",
          itemId: customer._id,
          dateTime: new Date()
        });

        newNote.save().then(note => {
          res.json(customer);
        });
      })
      .catch(e => console.log(e));
  });
};

// @route   GET api/customers/:id
// @desc    Retrieves a single customer.
// @access  Private
exports.getCustomer = (req, res) => {
  let errors = {};

  // check to see if the ID passed in is a valid ObjectID
  if (!ObjectID.isValid(req.params.id)) {
    errors.customer = "There was no customer found";
    return res.status(400).json(errors);
  }

  // find the customer and return results
  Customer.findByIdAndUpdate(
    req.params.id,
    { $set: { lastViewed: new Date() } },
    { new: true }
  )
    .then(customer => {
      if (!customer) {
        errors.customer = "There was no customer found";
        return res.status(400).json(errors);
      }

      res.json(customer);
    })
    .catch(e => console.log(e));
};

// @route   PATCH api/customers/:id
// @desc    Updates all or part of a single customer.
// @access  Private
exports.patchCustomer = (req, res) => {
  const { errors, isValid } = validateCustomerInput(req.body);

  // send 400 error with validation errors if not valid.
  if (!isValid || !ObjectID.isValid(req.params.id)) {
    if (!ObjectID.isValid(req.params.id)) {
      errors.customer = "There was no customer found";
    }
    return res.status(400).json(errors);
  }

  var body = _.pick(req.body, [
    "name",
    "address1",
    "address2",
    "city",
    "zipcode",
    "state",
    "phone",
    "ext",
    "fax",
    "email",
    "rdp",
    "notes",
    "isFlagged",
    "flagReason"
  ]);

  // finally, update the customer
  Customer.findByIdAndUpdate(req.params.id, { $set: body }, { new: true })
    .then(customer => {
      if (!customer) {
        errors.customer = "Unable to update the customer";
        return res.status(400).json(errors);
      }

      res.json(customer);
    })
    .catch(e => console.log(e));
};

// @route   DELETE api/customers/:id
// @desc    Deletes a single customer from the database.
// @access  Private
exports.deleteCustomer = (req, res) => {
  let errors = {};

  // Check to see if id is a valid ObjectID
  if (!ObjectID.isValid(req.params.id)) {
    errors.customer = "There was no customer found";
    return res.status(400).json(errors);
  }

  // Find the customer by ID and remove it.
  Customer.findByIdAndRemove(req.params.id)
    .then(customer => {
      // customer was not found!
      if (!customer) {
        errors.customer = "Unable to find and remove the customer";
        res.status(404).json(errors);
      }
      // Return the customer that was just removed.
      res.json(customer);
    })
    .catch(e => res.status(400).send());
};

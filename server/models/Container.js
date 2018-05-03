const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ContainerSchema = new Schema({
    
    "_id": {
        "type": "Schema.Types.ObjectId"
    },
    "gbrNumber": {
        "type": "String"
    },
    "releaseNumber": {
        "type": "String"
    },
    "size": {
        "type": "Schema.Types.ObjectId",
        "required": true
    },
    "serialNumber": {
        "type": "String",
        "required": true
    },
    "hasShelves": {
        "type": "Boolean",
        "default": false
    },
    "isPainted": {
        "type": "Boolean",
        "default": false
    },
    "hasOnboxNumbers": {
        "type": "Boolean",
        "default": false
    },
    "hasSigns": {
        "type": "Boolean",
        "default": false
    },
    "rentalResale": {
        "type": "String",
        "minlength": 6,
        "maxlength": 6,
        "required": true
    },
    "isFlagged": {
        "type": "Boolean",
        "default": false
    },
    "flagReason": {
        "type": "String"
    },
    "shortName": {
        "type": "Schema.Types.ObjectId",
        "required": true
    },
    "stats": {
        "type": "Schema.Types.ObjectId",
        "required": true
    }
});
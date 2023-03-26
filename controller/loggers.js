"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.delUsr = exports.updateUsr = exports.getSingle = exports.getAll = void 0;
const connect_1 = require("../db/connect");
const getAll = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const dbo = connect_1.mongoclient.db('LDSForum');
        const collection = dbo.collection('users');
        const result = yield collection.find();
        const resultArray = yield result.toArray();
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(resultArray);
    }
    catch (e) {
        console.log('Funny error' + e);
        next(e);
    }
});
exports.getAll = getAll;
const getSingle = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = new ObjectId(req.params.id);
        const result = connect_1.mongoclient.getDB().db('LDSForum').collection('users').find({ _id: userId });
        const resultArray = yield result.toArray();
        console.log('Single Contact Data example: \nId: ' + resultArray[0]);
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(resultArray[0]);
    }
    catch (error) {
        res.status(404).send("<p>Couldn't access to database!\n <hr>Error: </p>\t" + error);
    }
});
exports.getSingle = getSingle;
const updateUsr = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = new ObjectId(req.params.id);
    const doc = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        age: req.body.age,
        description: req.body.description,
        password: req.body.password,
    };
    const collection = connect_1.mongoclient.getDB().db('LDSForum').collection('users');
    const result = yield collection.replaceOne({ _id: userId }, doc);
    if (result.modifiedCount > 0) {
        res.status(204).send('PUT request successful');
    }
    else {
        res.status(500).json(result.error || 'Some error occurred while updating the contact.');
    }
});
exports.updateUsr = updateUsr;
const delUsr = (res, req, next) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = new ObjectId(req.params.id);
    const collection = connect_1.mongoclient.getDB().db('LDSForum').collection('users');
    const result = yield collection.deleteOne({ _id: userId }, true);
    if (result.deletedCount > 0) {
        res.status(204).send('DELETE request sucessful');
    }
    else {
        res.status(500).json(result.error || 'Some error occurred while deleting the contact.');
    }
});
exports.delUsr = delUsr;
//# sourceMappingURL=loggers.js.map
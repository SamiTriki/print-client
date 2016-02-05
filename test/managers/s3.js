"use strict";
process.env.NODE_ENV = 'test';

const chai = require("chai");
const chaiAsPromised = require("chai-as-promised");
const should = chai.should();
const s3 = require('../../managers/s3');
chai.use(chaiAsPromised);

require('dotenv').load();

describe("External storage (s3)", external_storage_test);

function external_storage_test () {

    describe('Getting document from storage', () => {
        let path = "paris1/105280/commande_fabrication_105280.pdf";

        let lptDocument = s3.getOrderDocument(path);

        it("Result should exist", () => {
            should.exist(lptDocument);
        });

        it("Should return a promise", () => {
            lptDocument.should.be.instanceof(Promise);
        });

        it("Promise must resolve an object (document)", () => {
            return lptDocument.should.eventually.be.instanceof(Object);
        });

        it("The document should have an 'extension' property", () => {
            return lptDocument.should.eventually.have.property("extension");
        });

        it("Entension must be recognised, (within: jpg, png, pdf)", () => {
            let recognized = ['pdf', 'jpg', 'png'];
            return s3.getOrderDocument(path)
            .then(document => recognized.should.include(document.extension));
        });

        it("The document should have an 'file' property", () => {
            return lptDocument.should.eventually.have.property("file");
        });

        it("The file should be a buffer", () => {
            return lptDocument.should.eventually.have.property("file").to.be.instanceof(Buffer);
        });
    });
}


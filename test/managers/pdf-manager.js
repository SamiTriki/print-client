"use strict";

const chai = require("chai");
const chaiAsPromised = require("chai-as-promised");
const should = chai.should();
const pdf_manager = require('../../managers/pdf-manager');
chai.use(chaiAsPromised);
chai.use(require('chai-fs'));
describe("PDF manager", pdf_manager_test);

function pdf_manager_test () {

    describe('Label creation', () => {
        let labelInfo = {
            type: 'certified',
            order_id: Math.floor(Math.random() * 999999),
            customer_name: 'Jean Dupont',
            manufacturer_name: 'Jean-Michel Monteur',
            manufacturing: 'Atelier Paris',
            destination: 'Magasin Paris'
        };

        let label_path = pdf_manager.label(labelInfo);

        it("Result should exist", () => {
            should.exist(label_path);
        });

        it("Should return a promise", () => {
            label_path.should.be.instanceof(Promise);
        });

        it("Promise should resolve a string", () => {
            return label_path.should.eventually.to.be.a('string');
        });

        it("Promise should resolve a valid path to a file", () => {
            return pdf_manager.label(labelInfo)
            .then(label_path => label_path.should.be.a.path(label_path));
        });

        it("Should create a file", () => {
            return pdf_manager.label(labelInfo)
            .then(label_path => label_path.should.be.a.file(label_path));
        });

        it("The file should be a pdf", () => {
            return pdf_manager.label(labelInfo)
            .then(label_path => label_path.split('.')[label_path.split('.').length -1].should.equal('pdf'));
        });

        it("The file should not be empty", () => {
            return pdf_manager.label(labelInfo)
            .then(label_path => label_path.should.be.a.file(label_path).and.not.empty);
        });
    });
}


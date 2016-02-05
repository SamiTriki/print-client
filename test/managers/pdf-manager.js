"use strict";
process.env.NODE_ENV = 'test';

const chai = require("chai");
const chaiAsPromised = require("chai-as-promised");
const should = chai.should();
const pdf_manager = require('../../managers/pdf-manager');
chai.use(chaiAsPromised);
chai.use(require('chai-fs'));
describe("PDF manager", pdf_manager_test);

function pdf_manager_test () {

    describe('Label creation', label_creation);
    describe('Shipping document cropping', shipping_crop);

    function label_creation() {
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

        it("The file should be valid", () => {
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
    }

    function shipping_crop() {
        let exec = require('child_process').exec;
        let fs = require('fs');
        let test_pdf_path = 'ressources/chronopost_test.pdf';
        let test_pdf_document = {
            file: fs.readFileSync(test_pdf_path),
            extension: 'pdf'
        };
        let cropped_document = pdf_manager.crop(test_pdf_document);

        it("Pdfcrop library should be installed on the system", (done) => {
            exec('dpkg -S `which pdfcrop`', (err, stdout, stderr) => {
                stderr = stderr || undefined;
                err = err || undefined;

                should.not.exist(err);
                should.not.exist(stderr);
                should.exist(stdout);
                stdout.should.contain('pdfcrop');
                done();
            });
        });

        it("test pdf document path should be valid", () => {
            test_pdf_path.should.be.a.path();
        });

        it("the test pdf should be a non empty file", () => {
            return test_pdf_path.should.be.a.file().and.not.empty;
        });

        it("Should return a promise", () => {
            cropped_document.should.be.instanceof(Promise);
        });

        it("Promise should resolve an object", () => {
            return cropped_document.should.eventually.be.instanceof(Object);
        });

        it("The cropped document should have an 'extension' property", () => {
            return cropped_document.should.eventually.have.property("extension");
        });

        it("Entension must be pdf", () => {
            return cropped_document.should.eventually.have.property("extension").to.be.eql('pdf');
        });

        it("The document should have an 'file' property", () => {
            return cropped_document.should.eventually.have.property("file");
        });

        it("The file should be a buffer", () => {
            return cropped_document.should.eventually.have.property("file").to.be.instanceof(Buffer);
        });

        it("Should not error while cropping", () => {
            return cropped_document.should.not.be.rejected;
        });

    }
}


"use strict";
process.env.NODE_ENV = 'test';

const chai = require("chai");
const chaiAsPromised = require("chai-as-promised");
const should = chai.should();
const barcode_manager = require('../../managers/barcode-manager');
const _private = require('../../managers/barcode-manager')._private;
chai.use(chaiAsPromised);
chai.use(require('chai-fs'));
describe("PDF manager", barcode_manager_test);

function barcode_manager_test () {

    describe('Barcode image creation', barcode_image_creation);
    describe('Numbers padding', numbers_padding);

    function barcode_image_creation() {
        let rand = Math.floor(Math.random() * 999999);
        let generate_barcode_image = barcode_manager.img(rand);

        it("Result should exist", () => {
            should.exist(generate_barcode_image);
        });

        it("Should return a promise", () => {
            generate_barcode_image.should.be.instanceof(Promise);
        });

        it("Promise should resolve an string", () => {
            return generate_barcode_image.should.eventually.to.be.a('string');
        });

        it("Promise should resolve a valid path to a file", () => {
            return barcode_manager.img(rand)
            .then(barcode_path => barcode_path.should.be.a.path(barcode_path));
        });

        it("The file should be valid", () => {
            return barcode_manager.img(rand)
            .then(barcode_path => barcode_path.should.be.a.file(barcode_path));
        });

        it("The file should be a png", () => {
            return barcode_manager.img(rand)
            .then(barcode_path => barcode_path.split('.')[barcode_path.split('.').length -1].should.equal('png'));
        });

        it("The file should not be empty", () => {
            return barcode_manager.img(rand)
            .then(barcode_path => barcode_path.should.be.a.file(barcode_path).and.not.empty);
        });
    }

    function numbers_padding() {
        // todo RUN TEST 1000 TIMES
        let rand = (min,max) => Math.floor(Math.random()*(max-min+1)+min);
        let randomNumber = rand(0, 9999999999999);
        let pad = _private.pad;
        let padded_number = pad(randomNumber);

        it("Should exist", () => {
            should.exist(padded_number);
        });

        it("Should be a string", () => {
            padded_number.should.be.a('string');
        });

        it("Should be 13 characters long", () => {
            padded_number.length.should.eql(13);
        });
    }
}


"use strict";
process.env.NODE_ENV = 'test';

const chai = require("chai");
const chaiAsPromised = require("chai-as-promised");
const should = chai.should();
const exec = require('child_process').exec;

chai.use(chaiAsPromised);
chai.use(require('chai-fs'));
describe("Linux Dependencies", linux_dependencies_test);

function linux_dependencies_test () {


    it('Nodejs should be in version 5', (done) => {
        exec('node -v', (err, stdout, stderr) => {
            stderr = stderr || undefined;
            err = err || undefined;

            should.not.exist(err);
            should.not.exist(stderr);
            should.exist(stdout);
            stdout.should.contain('v5');
            done();
        });
    });

    it("Pdfcrop library should be installed", (done) => {
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

    it("CUPS should be installed", (done) => {
        exec('dpkg -S `which cups-config`', (err, stdout, stderr) => {
            stderr = stderr || undefined;
            err = err || undefined;

            should.not.exist(err);
            should.not.exist(stderr);
            should.exist(stdout);
            stdout.should.contain('cups-config');
            done();
        });
    });

    it("Apache should be installed", (done) => {
        exec('dpkg -S `which apache2`', (err, stdout, stderr) => {
            stderr = stderr || undefined;
            err = err || undefined;

            should.not.exist(err);
            should.not.exist(stderr);
            should.exist(stdout);
            stdout.should.contain('apache2');
            done();
        });
    });

    it("Make should be installed", (done) => {
        exec('dpkg -S `which make`', (err, stdout, stderr) => {
            stderr = stderr || undefined;
            err = err || undefined;

            should.not.exist(err);
            should.not.exist(stderr);
            should.exist(stdout);
            stdout.should.contain('make');
            done();
        });
    });

    it("Autoconf should be installed", (done) => {
        exec('dpkg -S `which make`', (err, stdout, stderr) => {
            stderr = stderr || undefined;
            err = err || undefined;

            should.not.exist(err);
            should.not.exist(stderr);
            should.exist(stdout);
            stdout.should.contain('make');
            done();
        });
    });

    it("Gcc should be installed", (done) => {
        exec('dpkg -S `which gcc`', (err, stdout, stderr) => {
            stderr = stderr || undefined;
            err = err || undefined;

            should.not.exist(err);
            should.not.exist(stderr);
            should.exist(stdout);
            stdout.should.contain('gcc');
            done();
        });
    });

    it('Ghostscripts should be installed', (done) => {
        exec('gs -v', (err, stdout, stderr) => {
            stderr = stderr || undefined;
            err = err || undefined;

            should.not.exist(err);
            should.not.exist(stderr);
            should.exist(stdout);
            done();
        });
    });

    it('poppler-utils should be installed', (done) => {
        exec('dpkg -s poppler-utils', (err, stdout, stderr) => {
            stderr = stderr || undefined;
            err = err || undefined;

            should.not.exist(err);
            should.not.exist(stderr);
            should.exist(stdout);
            done();
        });
    });
}


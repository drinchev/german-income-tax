import * as chai from "chai";
import exportedFunction from "../src";

chai.should();

/**
 * Module tests
 */
describe( "module requirements", function() {

    it( "should export a function", () => {
        exportedFunction.should.be.a( "function" );
    } );

    it( "should throw if no options are provided", () => {
        (function() { exportedFunction() }).should.not.throw();
    } );

});
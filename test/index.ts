import * as chai from "chai";
import tax, { Year, family } from "../src";

chai.should();

/**
 * Module tests
 */
describe( "module requirements", function() {

    it( "should calculate tax for Zone 1", function() {
        tax( 8471, Year.Y2015 ).should.equal( 0 );
    } );

    it( "should calculate tax for Zone 3", function() {
        tax( 26582, Year.Y2015 ).should.equal( 4485 );
    } );

    it( "should calculate tax for Zone 4", function() {
        tax( 58000, Year.Y2015 ).should.equal( 16098 );
    } );

    it( "should calculate tax for Zone 5", function() {
        tax( 280000, Year.Y2015 ).should.equal( 110216 );
    } );

    it( "should calculate tax for family", function() {
        console.log( family( 60000, 60000, Year.Y2017 ) );
    } );

} );
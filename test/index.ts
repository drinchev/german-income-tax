/**
 *  German Income Tax / Tests
 * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 *
 *  Calculates the tax for germany, including income tax and solidarity tax
 *
 */

/** Dependencies */
import * as chai from "chai";
import * as fs from "fs";
import * as path from "path";

/** CSV library */
const csv = require( "csv" );

/** Subject */
import tax, { Year } from "../src";

/** Initialize should */
chai.should();

/**
 * Load a fixture with sample data
 *
 * All fixtures are taken from
 *
 * http://steuertabelle.com.de/Steuertabelle-download.php
 *
 * @param name
 * @param callback
 */
function loadFixture( name : string, callback : Function ) {
    fs.readFile( path.join( __dirname, `fixtures/${name}.csv` ), function( err, data ) {
        if ( err ) { return callback( err ); }
        csv.parse( data, function( err : any, data : Array<Array<string>> ) {
            if ( err ) { return callback( err ); }
            callback(
                null,
                data.map( row => row.map( column => column.replace( /\./g, "" ) ) )
                    .map( row => row.map( column => column.replace( /,/g, "." ) ) )
                    .map( row => ({
                        income : parseFloat( row[0] ),
                        tax : parseFloat( row[1] ),
                        solidarity : parseFloat( row[4] )
                    }) )
            )
        } );
    } );
}

describe( "Tax / Individual", function() {

    it( "should calculate taxes for 2015 properly", function( done ) {
        loadFixture( "2015-i", function( error : any, data : any ) {
            if ( error ) { throw error; }
            data.forEach( ( row : any ) => {
                tax( row.income, Year.Y2015 ).should.deep.equal( {
                    incomeTax : row.tax,
                    solidarityTax : row.solidarity
                } );
            } );
            done();
        } );
    } );

    it( "should calculate taxes for 2016 properly", function( done ) {
        loadFixture( "2016-i", function( error : any, data : any ) {
            if ( error ) { throw error; }
            data.forEach( ( row : any ) => {
                tax( row.income, Year.Y2016 ).should.deep.equal( {
                    incomeTax : row.tax,
                    solidarityTax : row.solidarity
                } );
            } );
            done();
        } );
    } );

    it( "should calculate taxes for 2017 properly", function( done ) {
        loadFixture( "2017-i", function( error : any, data : any ) {
            if ( error ) { throw error; }
            data.forEach( ( row : any ) => {
                tax( row.income, Year.Y2017 ).should.deep.equal( {
                    incomeTax : row.tax,
                    solidarityTax : row.solidarity
                } );
            } );
            done();
        } );
    } );

    it( "should calculate taxes for 2018 properly", function( done ) {
        loadFixture( "2018-i", function( error : any, data : any ) {
            if ( error ) { throw error; }
            data.forEach( ( row : any ) => {
                tax( row.income, Year.Y2018 ).should.deep.equal( {
                    incomeTax : row.tax,
                    solidarityTax : row.solidarity
                } );
            } );
            done();
        } );
    } );

} );

describe( "Tax / Family", function() {

    it( "should calculate taxes for 2015 properly", function( done ) {
        loadFixture( "2015-c", function( error : any, data : any ) {
            if ( error ) { throw error; }
            data.forEach( ( row : any ) => {
                tax( row.income, Year.Y2015, { couple : true } ).should.deep.equal( {
                    incomeTax : row.tax,
                    solidarityTax : row.solidarity
                } );
            } );
            done();
        } );
    } );

    it( "should calculate taxes for 2016 properly", function( done ) {
        loadFixture( "2016-c", function( error : any, data : any ) {
            if ( error ) { throw error; }
            data.forEach( ( row : any ) => {
                tax( row.income, Year.Y2016, { couple : true } ).should.deep.equal( {
                    incomeTax : row.tax,
                    solidarityTax : row.solidarity
                } );
            } );
            done();
        } );
    } );

    it( "should calculate taxes for 2017 properly", function( done ) {
        loadFixture( "2017-c", function( error : any, data : any ) {
            if ( error ) { throw error; }
            data.forEach( ( row : any ) => {
                tax( row.income, Year.Y2017, { couple : true } ).should.deep.equal( {
                    incomeTax : row.tax,
                    solidarityTax : row.solidarity
                } );
            } );
            done();
        } );
    } );

    it( "should calculate taxes for 2018 properly", function( done ) {
        loadFixture( "2018-c", function( error : any, data : any ) {
            if ( error ) { throw error; }
            data.forEach( ( row : any ) => {
                tax( row.income, Year.Y2018, { couple : true } ).should.deep.equal( {
                    incomeTax : row.tax,
                    solidarityTax : row.solidarity
                } );
            } );
            done();
        } );
    } );

} );

/**
 *  German Freelance Tax
 * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 *
 *  Calculates the tax you owe in Germany, if working as a freelancer
 *
 */

/** Local Dependencies */
import { Year, Zone } from "./constants";
import parameters from "./parameters";

/** Exports */
export { Year } from "./constants";

/**
 * Options provided to the tax function
 */
export interface TaxOptions {}

/**
 * Will return which zone is the income of the person
 *
 * @param income  The income of the person
 * @param year    The year which we want to check
 */
function getZone( income : number, year : Year ) {

    const zones = parameters[year].zoneBoundaries;

    if ( income <= zones[1] ) {
        return Zone.First;
    } else if ( income <= zones[2] ) {
        return Zone.Second;
    } else if ( income <= zones[3] ) {
        return Zone.Third;
    } else if ( income <= zones[4] ) {
        return Zone.Fourth;
    } else {
        return Zone.Fifth;
    }

}

/**
 * Get the income tax for a year
 *
 * The formula is taken from
 *
 * https://de.wikipedia.org/wiki/Einkommensteuer_(Deutschland)#Tarif_2018
 *
 * @param income
 * @param year
 * @param zone
 */
function tax( income : number, year : Year, zone : Zone ) : number {

    const { zoneBoundaries, progression, threshold, percent } = parameters[year];

    switch ( zone ) {
        case Zone.First:
            return 0;
        case Zone.Second:
            const y = (income - zoneBoundaries[1]) / 10000;
            return ((progression[Zone.Second] * y) + threshold[Zone.Second] * 10000) * y;
        case Zone.Third:
            const z = (income - zoneBoundaries[2]) / 10000;
            return (((progression[Zone.Third] * z) + threshold[Zone.Third] * 10000) * z) +
                tax( zoneBoundaries[2], year, Zone.Second );
        case Zone.Fourth:
            return (percent[Zone.Fourth] * (income - zoneBoundaries[3])) +
                tax( zoneBoundaries[3], year, Zone.Third );
        case Zone.Fifth:
            return (percent[Zone.Fifth] * (income - zoneBoundaries[4])) +
                tax( zoneBoundaries[4], year, Zone.Fourth );
        default:
            throw Error( "Zone can't be found" );
    }

}

/**
 * Calculate taxes for married
 */
export function family( incomeA : number, incomeB : number, year : Year ) {

    const split = (incomeA + incomeB) / 2,
          zone  = getZone( split, year );

    return Math.floor( 2 * (tax( split, year, zone )) );

}

/**
 * Calculate the tax
 *
 * @param income
 * @param year
 * @param options
 */
export default function( income : number, year : Year, options : TaxOptions = {} ) {

    const zone = getZone( income, year );

    return Math.floor( tax( income, year, zone ) );

}
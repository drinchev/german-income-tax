/**
 *  German Income Tax
 * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 *
 *  Calculates the tax for germany, including income tax and solidarity tax
 *
 */

/** Local Dependencies */
import parameters, { Year, Zone } from "./parameters";

/** Exports */
export { Year } from "./parameters";

/**
 * Will return which zone is the income of the person
 *
 * @param income  The income of the person
 * @param year    The year that this income was earned
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
 * Calculate the solidarity tax
 *
 * The solidarity tax is not applied for income tax below certain threshold.
 *
 * https://de.wikipedia.org/wiki/Solidaritätszuschlag
 * https://www.ihk-muenchen.de/ihk/documents/Recht-Steuern/Steuerrecht/Einkommensteuer/Gesetz-zur-Umsetzung-der-Änderungen-der-EU-Amtshilferichtlinie.pdf
 *
 * @param tax     The income tax paid
 * @param year    The year that the tax was for
 * @param couple  Calculate as if the income of a married couple
 */
function solidarity( tax : number, year : Year, couple : boolean ) {
    const { solidarity, solidarityThreshold } = parameters[year];
    if ( tax <= solidarityThreshold * (couple ? 2 : 1) ) { return 0; }
    return Math.min(
        solidarity * tax,
        (tax - (solidarityThreshold * (couple ? 2 : 1))) * 0.2
    );
}

/**
 * Get the income tax for a year
 *
 * The formula is taken from
 *
 * https://de.wikipedia.org/wiki/Einkommensteuer_(Deutschland)#Tarif_2018
 *
 * @param income  The income of the individual(s)
 * @param year    The year that this income was earned
 * @param zone    The zone which this income is in
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
    }

}

/**
 * Options provided to the tax function
 */
export interface TaxOptions {
    couple? : boolean
}

/**
 * Calculate the tax
 *
 * @param income          The income of the individual(s)
 * @param year            The year that income was earned
 * @param options         Additional options
 * @param options.couple  Calculate as is the income of a married couple
 */
export default function( income : number, year : Year, options : TaxOptions = {} ) {

    const result = {
        incomeTax : 0,
        solidarityTax : 0
    };

    if ( options.couple ) {
        const spl = income / 2;
        result.incomeTax = Math.floor(
            2 * Math.floor( tax( spl, year, getZone( spl, year ) ) )
        );
    } else {
        result.incomeTax = Math.floor( tax( income, year, getZone( income, year ) ) );
    }

    result.solidarityTax = Math.round(
        solidarity( result.incomeTax, year, options.couple ) * 100
    ) / 100;

    return result;

}

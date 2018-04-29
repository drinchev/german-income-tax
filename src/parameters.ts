/**
 *  German Income Tax / Parameters
 * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 *
 *  We store the parameters for the different years
 *
 *  All parameters are taken from Wikipedia
 *
 *  https://de.wikipedia.org/wiki/Einkommensteuer_(Deutschland)#Entwicklung_der_Parameter
 *
 */

/**
 * Years that we have data for
 */
export enum Year {
    Y2015 = 2015,
    Y2016 = 2016,
    Y2017 = 2017,
    Y2018 = 2018
}

/**
 * The zones that we have the tax
 */
export enum Zone {
    First  = "First",
    Second = "Second",
    Third  = "Third",
    Fourth = "Fourth",
    Fifth  = "Fifth"
}

/**
 * We keep for each year the parameters that are relevant for calculating the tax
 */
export default {

    /**
     * 2015
     */
    [Year.Y2015] : {
        zoneBoundaries : [0, 8472, 13469, 52881, 250730, Infinity],
        threshold : {
            [Zone.Second] : 0.14,
            [Zone.Third] : 0.2397
        },
        progression : {
            [Zone.Second] : 997.60,
            [Zone.Third] : 228.74
        },
        percent : {
            [Zone.Fourth] : 0.42,
            [Zone.Fifth] : 0.45,
        },
        solidarity : 0.055,
        solidarityThreshold : 972
    },

    /**
     * 2016
     */
    [Year.Y2016] : {
        zoneBoundaries : [0, 8652, 13669, 53665, 254447, Infinity],
        threshold : {
            [Zone.Second] : 0.14,
            [Zone.Third] : 0.2397
        },
        progression : {
            [Zone.Second] : 993.62,
            [Zone.Third] : 225.40
        },
        percent : {
            [Zone.Fourth] : 0.42,
            [Zone.Fifth] : 0.45,
        },
        solidarity : 0.055,
        solidarityThreshold : 972
    },

    /**
     * 2017
     */
    [Year.Y2017] : {
        zoneBoundaries : [0, 8820, 13769, 54057, 256303, Infinity],
        threshold : {
            [Zone.Second] : 0.14,
            [Zone.Third] : 0.2397
        },
        progression : {
            [Zone.Second] : 1007.27,
            [Zone.Third] : 223.76
        },
        percent : {
            [Zone.Fourth] : 0.42,
            [Zone.Fifth] : 0.45,
        },
        solidarity : 0.055,
        solidarityThreshold : 972
    },

    /**
     * 2018
     */
    [Year.Y2018] : {
        zoneBoundaries : [0, 9000, 13996, 54949, 260532, Infinity],
        threshold : {
            [Zone.Second] : 0.14,
            [Zone.Third] : 0.2397
        },
        progression : {
            [Zone.Second] : 997.80,
            [Zone.Third] : 220.13
        },
        percent : {
            [Zone.Fourth] : 0.42,
            [Zone.Fifth] : 0.45,
        },
        solidarity : 0.055,
        solidarityThreshold : 972
    }
};



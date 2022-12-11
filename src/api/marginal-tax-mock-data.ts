import { TTaxData } from './marginal-tax';

export const mockTaxData: TTaxData = {
  2019: [
    {
        "min": 0,
        "max": 47630,
        "rate": 0.15
    },
    {
        "min": 47630,
        "max": 95259,
        "rate": 0.205
    },
    {
        "min": 95259,
        "max": 147667,
        "rate": 0.26
    },
    {
        "min": 147667,
        "max": 210371,
        "rate": 0.29
    },
    {
        "min": 210371,
        // this rate was the wrong type (string) originally in source file
        "rate": 0.33
    }
  ],
  2020: [
    {
        "min": 0,
        "max": 48535,
        "rate": 0.15
    },
    {
        "min": 48535,
        "max": 97069,
        "rate": 0.205
    },
    {
        "min": 97069,
        "max": 150473,
        "rate": 0.26
    },
    {
        "min": 150473,
        "max": 214368,
        "rate": 0.29
    },
    {
        "min": 214368,
        "rate": 0.33
    }
  ],
  2021: [
    {
        "min": 0,
        "max": 49020,
        "rate": 0.15
    },
    {
        "min": 49020,
        "max": 98040,
        "rate": 0.205
    },
    {
        "min": 98040,
        "max": 151978,
        "rate": 0.26
    },
    {
        "min": 151978,
        "max": 216511,
        "rate": 0.29
    },
    {
        "min": 216511,
        "rate": 0.33
    }
  ]
}
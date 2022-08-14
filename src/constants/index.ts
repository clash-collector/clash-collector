export const IS_MAINNET = false;
export const APP_NAME = "Nifty Royale";

import { testCollections, mainnetCollections } from "./collections";
export const collections = IS_MAINNET ? mainnetCollections : testCollections;

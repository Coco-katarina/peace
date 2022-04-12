import DefaultStructure from './default-structure';
import sturctureSet from './things/default';
import { Things } from './things';
import ceDian from './cdContainer';
import Integrations from './integration';
import Threshold from './threshold';
import Zuhe from './combCalcContainer';
import bim from './bim/index';
import Video from './videoConfigContainer';
import Collection from './dynamic-collection';

import StationDeploy2D from './station-deploy-2d';

import DtuState from './communication-state';
import threeBuDian from './threeBuDianContainer';
import ThreeDeploy from './hotspotThreeContainer/three-deploy';
import AggregateContainers from './aggregateConfigContainer'
const { ThreeBuDian } = threeBuDian;
const {
    Zuwang,
} = Integrations;
const { CeDian } = ceDian;
const { GlBim, GlBimSetup } = bim;

export {
    DefaultStructure,
    sturctureSet,
    Things,
    CeDian,
    Zuwang,
    Threshold,
    ThreeBuDian,
    Zuhe,
    GlBim,
    GlBimSetup,
    Video,
    Collection,

    StationDeploy2D,
    ThreeDeploy,
    DtuState,
    AggregateContainers
};


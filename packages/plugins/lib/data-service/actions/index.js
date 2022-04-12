'use strict';

import dataFiles from './dataFiles';
import panFiles from './panFiles';
import getHistoryData from './historyData'

export default {
    ...dataFiles,
    ...panFiles,
    ...getHistoryData
}
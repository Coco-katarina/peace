
import { useFsRequest, ApiTable } from '$utils';

export function useThingsLinkStatus(iotaThingId) {
    let url = ApiTable.getIotaThingsLlinkStatus.replace('{iotaThingId}', iotaThingId);
    return useFsRequest({url, pollingInterval: 4000, pollingWhenHidden: false });
}

export default {
    useThingsLinkStatus
}


export const DataServiceApiTable = {
    netdiskFiles: 'users/{userId}/netdisk-files',
    uploadFile:'users/{userId}/netdisk-files/upload',
    deleteFile: 'netdisk-files/{fileId}',
    attachments: 'attachments',
    downloadHdfsFile: 'structures/{structureId}/{dataType}/data-file/download?path={path}',
    fileRename:'netdisk-files/rename',
    getProjects: 'projects/userId/{userId}',
    getStaticFiles:'static/pan/files',
    starFileDirectory: 'users/{userId}/file-types/{fileTypeId}/targets/{targetId}/star',
    unstarFileDirectory: 'users/{userId}/file-types/{fileTypeId}/targets/{targetId}/unstar',
    uploadManmadeData: 'man-madedata/upload',
    getHdfsDirStats: 'organizations/{organizationId}/data-file/stats?dataType={dataType}',
    getHdfsDir: 'structures/{structureId}/{dataType}/data-file/dir?path={path}',
    batchDownload: 'download/batch',
};


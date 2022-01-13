import { Observable, of, from } from 'rxjs';
import { groupBy, map, mergeMap, reduce, switchAll, tap, toArray } from 'rxjs/operators';
export function getRandomId(): string {
    return Math.random().toString(36).substring(2) + Math.random().toString(36).substring(2);
}

export function getFolderDisplayName(path: string, sperator: string = '/'): string {
    if (!path) return "";
    let folderList = path.split(sperator);
    return folderList[folderList.length - 1];
}

export function getParentFolders(path: string, sperator: string = '/'): string {
    if (!path) return path;
    if (path.split('/').length <= 1) return path;

    return path.slice(0, path.lastIndexOf('/'));
}
const getPaermissions = (count = 10) => {
    let _data = [];

    for (let i = 0; i < count; i++) {
        _data.push({
            id: getRandomId(),
            path: "a/b/c",
            displayName: `name ${i}`
        })
    }

    return _data;
}

export function buildFolderGroups(data: any): Observable<any> {
    let permissionsList = data?.body?.permissions;
    permissionsList = getPaermissions(1);
    return from(permissionsList).pipe(
        map((x: any) => {
            x.id = getRandomId();
            return x;
        }),
        groupBy((f) => f.path),
        mergeMap((group) =>
            group.pipe(
                reduce(
                    (acc, cur) => {
                        acc.values.push(cur);
                        return acc;
                    },
                    { key: group.key, values: [] }
                )
            )
        ),
        toArray(),
        map(x => x.sort((a, b) => a.key?.split('/')?.length > b.key?.split('/')?.length ? 1 : b.key?.split('/')?.length > a.key?.split('/')?.length ? -1 : 0)),
        map((x) => constructTreeList(x)),
        map((x) => ({ treeListData: x, apiData: data }))
    );
}

export function constructTreeList(groups: any[]) {
    let mappedArray: any[] = [];
    let listMeta: any = {};

    const setupFolderMaps = () => {
        for (let i = 0; i < groups.length; i++) {
            const arr: any = groups[i];

            listMeta[groups[i].key] = {
                id: getRandomId(),
                parent: null,
                displayName: getFolderDisplayName(groups[i].key),
                isFolder: true,
                count: 0
            };

            if (!arr.key) listMeta[groups[i].key].id = null;
        }
    };
    setupFolderMaps();

    const setupParents = () => {
        for (let i = 0; i < groups.length; i++) {
            const arr: any = groups[i];
            arr.values.forEach((x: any) => {
                mappedArray.push({ ...x, parent: listMeta[groups[i].key].id, rolePermissionValue: x.rolePermissionValue || '' });
            });

            listMeta[groups[i].key].count += arr.values.length;
        }
    };
    setupParents();

    const ensureFolderHierarchy = () => {
        delete listMeta['null'];
        delete listMeta['undefined'];

        for (const key in listMeta) {
            if (Object.prototype.hasOwnProperty.call(listMeta, key)) {
                const element = listMeta[key];
                // once dictionary ready, ensure all child & parent tables;
                if (key?.split('/')?.length > 1) {
                    let _parentKey = getParentFolders(key);
                    if (Object.prototype.hasOwnProperty.call(listMeta, _parentKey)) {
                        listMeta[key].parent = listMeta[_parentKey].id;
                    } else {
                        // handle 1st level
                        listMeta[_parentKey] = {
                            id: getRandomId(),
                            parent: null,
                            displayName: getFolderDisplayName(_parentKey),
                            isFolder: true,
                            count: 0
                        };
                        listMeta[key].parent = listMeta[_parentKey].id;
                        if (_parentKey.split('/')?.length > 1) {
                            // handle 2nd level
                            let _nextParentKey = getParentFolders(_parentKey);
                            if (Object.prototype.hasOwnProperty.call(listMeta, _nextParentKey)) {
                                listMeta[_parentKey].parent = listMeta[_nextParentKey].id;
                            } else {
                                // parent does not exist
                                listMeta[_nextParentKey] = {
                                    id: getRandomId(),
                                    parent: null,
                                    displayName: getFolderDisplayName(_nextParentKey),
                                    isFolder: true,
                                    count: 0
                                };

                                mappedArray.push(listMeta[_nextParentKey]);
                                listMeta[_parentKey].parent = listMeta[_nextParentKey].id;
                            }
                        }
                        mappedArray.push(listMeta[_parentKey]);
                    }
                }

                mappedArray.push(listMeta[key]);
            }
        }
    };
    ensureFolderHierarchy();

    const updatePermissionCount = () => {
        let folders = mappedArray.filter((x) => !!x.isFolder);
        for (let ind = 0; ind < folders.length; ind++) {
            const folder = folders[ind];
            if (!!folder.parent) {
                let _parent = mappedArray.find((x) => x.id == folder.parent);
                _parent.count += folder.count;

                if (!!_parent.parent) mappedArray.find((x) => x.id == _parent.parent).count += folder.count;
            }
        }
    };
    updatePermissionCount();
    //   console.log(Object.keys(listMeta));
    return mappedArray;
}

of({
    body: {
        permissions: [23, 323]
    }
})
    .pipe(
        map(x => buildFolderGroups(x)),
        switchAll()
    ).subscribe(console.log)
export function mapAttributes(data: any) {
    return data?.models?.map((x: any) => x.attrs);
}

export function mapSingleAttribute(data: any) {
    return data?.attrs;
}
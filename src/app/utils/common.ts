export function objectToQueryString(obj: any): string {
    var str = [];
    for (var p in obj)
        if (obj.hasOwnProperty(p)) {
            str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
        }
    return str.join("&");
}


export function toNumber(str?: string | null): number | null {
    if (!str || isNaN(+str)) {
        return null;
    }
    return +str || null;
}
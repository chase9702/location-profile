export const encodeQueryData = (data): string => {
    const ret = [];
    for (const d in data) {
        if (data[d]) {
            ret.push(encodeURIComponent(d) + '=' + encodeURIComponent(data[d]));
        }
    }
    return ret.join('&');
};
export const check_body = (props: Array<string>, body: object): string => {
    for (let i = 0; i < props.length; i++)
        if (!(props[i] in body)) return props[i];
    return "";
};

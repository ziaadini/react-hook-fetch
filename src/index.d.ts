import {useGet, useJustGet,empty} from "/src";

export function useGet(initialUrl: string = null, initialData: object = {}, reducer = () => {
},axiosConfig={}) {
    return useGet();
}

export function useJustGet(initialUrl: string = null, initialData: object = {}) {
    return useJustGet();
}

export function getUrlParams(search: string);

export function buildQuery(params: object);
export function pushQuery(query: string,object:object);

export function empty(data);

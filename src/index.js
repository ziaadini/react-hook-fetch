import {useState, useEffect} from "react";
import axios from 'axios';
//if don't want get data at the begining set initial url to null
//reducer Simulated like a reducer
export const useGet = (initialUrl = null, initialData = {}, reducer = () => {
},axiosConfig={}) => {
    const [state, setState] = useState({data: initialData, url: initialUrl, isLoading: false, isError: false});

    const fetchData = async () => {
        if (!state.isLoading || state.isError) {
            setState(state => ({...state, isError: false, isLoading: true}));
        }

        try {
            let options = {
                method: 'GET',
                url: state.url,
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json;charset=UTF-8'
                },
            };
            options=Object.assign({},options,axiosConfig);
            const result = await axios(options);
            setState(state => ({...state, data: result.data, isLoading: false}));
        } catch (error) {
            setState(state => ({...state, isError: true, isLoading: false}));
        }
    };

    useEffect(() => {
        if (state.url) {
            fetchData();
        }
    }, [state.url]);

    const dispatch = (action) => {
        let data = reducer(state, action);
        setState(data);
    };

    return [dispatch, state.data, state.isLoading, state.isError];
};


export const useJustGet = (initialUrl = null, initialData = {}) => {
    const [state, setState] = useState({data: initialData, url: initialUrl, isLoading: false, isError: false});

    const fetchData = async () => {
        if (!state.isLoading || state.isError) {
            setState(state => ({...state, isError: false, isLoading: true}));
        }

        try {
            let options = {
                method: 'GET',
                url: state.url,
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json;charset=UTF-8'
                },
            };
            const result = await axios(options);
            setState(state => ({...state, data: result.data, isLoading: false}));
        } catch (error) {
            setState(state => ({...state, isError: true, isLoading: false}));
        }
    };

    useEffect(() => {
        if (state.url) {
            fetchData();
        }
    }, [state.url, initialUrl]);

    const doGet = (event, url) => {
        setState(state => ({...state, url: url}));
        event.preventDefault();
    };

    return [state.data, state.isLoading, state.isError, doGet];
};

export function getUrlParams(search) {
    if(typeof search!=="string"){
        console.warn("getUrlParams method accept string wrong parameter given");
        return {}
    }
    let hashes = search.slice(search.indexOf('?') + 1).split('&');
    let params = {};
    hashes.map(hash => {
        let [key, val] = hash.split('=');
        if (key) {
            params[key] = decodeURIComponent(val)
        }
    });

    return params
}

export function buildQuery(params = {}) {
    if(typeof params!=="object"||Array.isArray(params)){
        console.warn("buildQuery method accept object wrong parameter given");
        return "";
    }
    let i = 0;
    let query = "";
    for (let key in params) {
        if (i === 0) {
            query = "?" + key + "=" + params[key];
        } else {
            query += "&" + key + "=" + params[key];
        }
        i++;
    }
    return query;
}
export function pushQuery(query,newParams={}) {
    if(typeof newParams!=="object"||Array.isArray(newParams)){
        console.warn("pushQuery method accept object in second parameter wrong parameter given");
        return "";
    }
    if(typeof query!=="string"){
        console.warn("pushQuery method accept string in first parameter wrong parameter given");
        return "";
    }
    let params=getUrlParams(query);
    return buildQuery({...params,...newParams})
}

export function empty(obj) {
    if (!obj) {
        return true;
    }
    if (typeof obj === "string" || isNumeric(obj)) {//zero is empty? yes
        if (obj) {
            return false;
        }
    }

    let flag = Object.keys(obj).length === 0 && obj.constructor === Object;//check object
    if (Array.isArray(obj) && obj.length === 0) {
        flag = true;
    }
    return flag;
}
function isNumeric(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
}
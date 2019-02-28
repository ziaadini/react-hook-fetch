# a react custom fetch hook, for get data from server

## install
> `npm install react-hook-fetch`

***
## Usage

***
```
import React from 'react';
import {useGet} from "react-hook-fetch";

function reducer(state, action) {
    console.log('state is : ', state);
    //state is :  {data: {…}, url: "your url", isLoading: false, isError: false}
    switch (action.type) {
        case "get":
            return {...state, url: action.payload};
        case "changeData":
            return {...state, data: {/*any*/}}

    }
}

function App() {
    let url = "your url here";
    const [dispatch, data, isLoading, isError] = useGet(url, [], reducer);
    const refreshData = () => {
        dispatch({type: 'get', payload: url + "?id=6"});
    };

    if(isLoading){
        return (<h1>loading...</h1>);
    }else if(isError){
        return (<h1>error...</h1>);
    }
    return (
        <div>
            {console.log("data : ", data, "loading: ", isLoading, "error: ", isError)}
            <button onClick={refreshData}>get data again</button>
        </div>
    );
}

export default App;

```
## let me explain what is happening

`const [dispatch, data, isLoading, isError] = useGet(url, [], reducer);`
this above line is the main line in your code useGet function params is
* first:  it's your initial url if you don't want get data at the beginning ->null
* second: this is your initial data
* third : this is your reducer width this reducer you can manipulate the state :
> for example you may want get data from server again with a new url (may be when user click a button), you can do it like above example
-> **note: ** _re-get data only when url has been changed_
* fourth : this is an object for axios extra config
## other methods :

```
import {getUrlParams,buildQuery,pushQuery,empty} from "react-hook-fetch";
getUrlParams("?id=7&name=ali");//{id: "7", name: "ali"}
buildQuery({id:7,name:'ali'});//?id=7&name=ali
pushQuery("?id=7&name=ali",{page:5,id:8}));//?id=8&name=ali&page=5
console.log(empty(0),empty("0"),empty({}),empty([]),empty(undefined));
//true false true true true
```

import {Platform} from "react-native";

let packageJSON = require('../../package.json');
const serverAddress = packageJSON.proxy;

exports.addItem = item =>
{
    return fetch(serverAddress + 'addItem',
        {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(item)
        }).then(res => res.json().then((data) =>
    {
        if (data.output === 'SUCCESS')
        {
            return new Promise((res, rej) =>
            {
                res()
            })
        }
        else
        {
            return new Promise((res, rej) =>
            {
                rej('ההוספה נכשלה')
            })
        }
    }));
};

exports.getItem = id =>
{
    return fetch(serverAddress + 'getItem/' + id).then(response =>
    {
        return response.json().then(data =>
        {
            return new Promise((res, rej) =>
            {
                if (data.output === 'SUCCESS')
                {
                    res(data.item);
                }
                else
                {
                    rej(data.reason);
                }
            })
        })
    })
};

exports.getItems = (category, preference, from, howMany, location) =>
{
    return fetch(serverAddress + 'getItems?categoryID=' + category + '&preference=' + preference +
        '&from=' + from + '&howMany=' + howMany +
        (location === undefined ? '' : 'location=' + location))
        .then(response =>
        {
            console.log("1here444");
            return response.json().then(data =>
            {
                console.log("1here777");
                return new Promise ((res, rej) =>
                {
                    if (data.output === 'SUCCESS')
                    {
                        console.log('1here888');
                        res(data.items);
                    }
                    else
                    {
                        console.log('1here999');
                        rej(data.reason);
                    }
                })
            })
        }).catch(err=>{console.log("1here555")}).catch(err=>{console.log("1here666")}).catch(err=>{console.log("1here565")})
};

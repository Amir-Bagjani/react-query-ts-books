import axios from "axios";

const client = axios.create({ baseURL: 'http://localhost:3030'})

export const request = ({...options}: { [x: string]: any }) => {

    client.defaults.headers.common.Authorization = `Bearer token`

    const onSuccess = (response: any)  => response.data
    
    const onError = (error: string) => {
        //catch error and additional logging here
        return error
    }

    return client(options).then(onSuccess).catch(onError)
}
import axios from "axios";

export function createLiveStream() {
    return new Promise(function (resolve, reject) {
        axios.post("/api/createLiveStream", {streamId: null}, {headers: {"Content-Type": "application/json"}})
            .then(({data}) => {
                resolve(data);
            }, () => {
                reject();
            });
    });
}

export function deleteLiveStream(streamId) {
    return new Promise(function (resolve, reject) {
        axios.post("/api/deleteLiveStream", {streamId: streamId}, {headers: {"Content-Type": "application/json"}})
            .then(({data}) => {
                resolve(data);
            }, () => {
                reject();
            });
    });
}
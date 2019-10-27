var db = require("./db");
let fdb = db.fdb;

if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

const Mux = require('@mux/mux-node');
const {Video, Data} = new Mux(); // Success!


const express = require('express');

const app = express();
app.use(express.json());

const port = 5000;

app.post('/api/createLiveStream', (req, res) => {
    Video.LiveStreams.create({
        "playback_policy": ["public"],
        "new_asset_settings": {"playback_policy": ["public"]}
    }).then((data) => {
        res.json({muxData: data});
    });
});

app.post('/api/deleteLiveStream', (req, res) => {
    const {streamId} = req.body;

    Video.LiveStreams.del(streamId).then(() => {
        // TODO: handle errors
        res.json({success: true});
    });
});

// API which Listens for callbacks from Mux
app.post('/mux-hook', function (req, res) {
    if (req.body.type.startsWith('video.live_stream')) {

        let streamId = req.body.data.id;

        fdb.collection("office_hour").where("mux_data.id", "==", streamId)
            .get()
            .then(snapshot => {

                if (snapshot.empty) {
                    res.status(200).send('Thanks, Mux!');
                    return;
                }

                var officeHour = {id: snapshot.docs[0].id, doc: snapshot.docs[0].data()};

                let officeHourId = officeHour.id;

                let update = {mux_data: {...req.body.data, type: req.body.type}};

                if (req.body.type === "video.live_stream.active") {
                    update.pre_stream = false;
                }

                fdb.collection("office_hour").doc(officeHourId).update(update).then(() => {
                    res.status(200).send('Thanks, Mux!');
                })
            });
    } else if (req.body.type === "video.asset.ready") {
        let assetID = req.body.data.id;

        fdb.collection("office_hour").where("mux_data.active_asset_id", "==", assetID)
            .get()
            .then(snapshot => {

                if (snapshot.empty) {
                    res.status(200).send('Thanks, Mux!');
                    return;
                }

                var officeHour = {id: snapshot.docs[0].id, doc: snapshot.docs[0].data()};

                let officeHourId = officeHour.id;

                let update = {mux_assets_data: req.body.data};


                fdb.collection("office_hour").doc(officeHourId).update(update).then(() => {
                    res.status(200).send('Thanks, Mux!');
                })
            });
    }
});


app.listen(port, () => console.log(`Backend server listening on port ${port}!`));
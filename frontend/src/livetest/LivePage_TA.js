import React from 'react';
import createLiveStream from "../streaming";

class LivePage_TA extends React.Component {

    constructor() {
        super();
        this.state = {isStreaming: false, streamMuxData: null};
    }

    startLiveSession = () => {
        createLiveStream()
            .then(({muxData}) => {
                console.log(muxData);
                this.setState({streamMuxData: muxData});
            })
    };

    render() {

        if (this.state.isStreaming) {
            return <div>You're streaming!</div>
        } else if (this.state.streamMuxData) {
            return (
                <div className={"container p-5"}>
                    <div className={"row"}>
                        <div className={"col"}>
                            <h3 className={"text-white"}>Stream key</h3>
                            <div className={"text-light"}>{this.state.streamMuxData.stream_key}</div>
                        </div>
                    </div>
                </div>
            );
        } else {
            return (
                <div className={"container p-5"}>
                    <div className={"row"}>
                        <div className={"col"}>
                            <button className={"btn btn-light btn-lg"} onClick={this.startLiveSession}>Start a live
                                session
                            </button>
                        </div>
                    </div>
                </div>
            );
        }
    }

}

export default LivePage_TA;
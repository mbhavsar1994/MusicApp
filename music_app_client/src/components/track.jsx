import React, { Component } from "react";
class Track extends Component {
  state = {};
  render() {
    const { track } = this.props;
    console.log("inside Track", track);
    return (
      <tr>
        <td>
          <img src={track.thumb} alt={track.title} height="70"></img>
        </td>
        <td>{track.master_id}</td>
        <td style={{ width: "40%" }}>{track.title}</td>
        <td>
          <button
            className="btn btn-primary btn-md m-1"
            onClick={() => this.props.AddTrack(track)}
          >
            Add to PlayList
          </button>
          <button className="btn btn-primary btn-md m-1">
            Go to the track
          </button>
        </td>
      </tr>
    );
  }
}

export default Track;

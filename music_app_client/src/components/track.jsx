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
            name="addtrack"
            className="btn btn-primary btn-md m-1"
            onClick={() => this.props.AddTrack(track)}
          >
            Add to PlayList
          </button>
          <button
            name="redirectToSong"
            className="btn btn-primary btn-md m-1"
            onClick={() =>
              window.open("https://www.discogs.com/" + track.uri, "_blank")
            }
          >
            Go to the track
          </button>
        </td>
      </tr>
    );
  }

  handlerTargetSong = Uri => {
    console.log(Uri);
  };
}

export default Track;

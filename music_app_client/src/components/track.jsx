import React, { Component } from "react";
class Track extends Component {
  state = {};
  render() {
    const { track, TracksForSearch } = this.props;
    console.log("track for search", TracksForSearch);
    console.log("inside Track", track);
    return (
      <tr>
        <td>
          {TracksForSearch === "yes" && (
            <img src={track.thumb} alt={track.title} height="70"></img>
          )}
        </td>
        <td>{track.master_id}</td>
        <td style={{ width: "40%" }}>{track.title}</td>
        <td>
          {TracksForSearch === "yes" && (
            <button
              name="addtrack"
              className="btn btn-primary btn-sm m-1"
              onClick={() => this.props.AddTrack(track)}
            >
              Add to PlayList
            </button>
          )}
          <button
            name="redirectToSong"
            className="btn btn-primary btn-sm m-1"
            onClick={() =>
              window.open("https://www.discogs.com/" + track.uri, "_blank")
            }
          >
            Go to the track
          </button>

          {TracksForSearch === "no" && (
            <button
              name="deleteSong"
              className="btn btn-danger btn-sm m-1"
              onClick={() => this.props.DeleteTrack(track)}
            >
              Delete track
            </button>
          )}
          {TracksForSearch === "no" && (
            <button
              name="editSong"
              className="btn btn-warning btn-sm m-1"
              onClick={() => this.props.EditTrack(track)}
            >
              Edit track
            </button>
          )}
        </td>
      </tr>
    );
  }

  handlerTargetSong = Uri => {
    console.log(Uri);
  };
}

export default Track;

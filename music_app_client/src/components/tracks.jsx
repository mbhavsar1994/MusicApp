import React, { Component } from "react";
import Track from "./track";
class Tracks extends Component {
  state = {};

  render() {
    const { searchedTracks } = this.props;
    console.log("logged from tracks", searchedTracks);
    return (
      <div>
        <table
          className="table table-striped"
          style={{
            width: "90%",
            tablelayout: "fixed",
            margin: "auto",
            marginTop: "2%",
            border: "1px solid black"
          }}
        >
          <thead
            style={{
              fontSize: "20px",
              fontWeight: "bold",
              backgroundColor: "Grey",
              color: "white"
            }}
          >
            <tr>
              <th></th>
              <th>Master_Id</th>
              <th style={{ width: "20%" }}>Title</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>{this.renderTracks(searchedTracks)}</tbody>
          <tfoot
            style={{
              fontSize: "15px",
              fontWeight: "bold",
              backgroundColor: "Grey",
              color: "white"
            }}
          >
            <tr>
              <td></td>
              <td></td>
              <td>Powered By @Discogs-Api</td>
              <td></td>
            </tr>
            <tr>
              <td></td>
              <td></td>
              <td>Developed by :Mehul Bhavsar, AMi Dave, Krishna Panchal</td>
              <td></td>
            </tr>
          </tfoot>
        </table>
      </div>
    );
  }

  renderTracks = searchedTracks => {
    console.log("inside Method", searchedTracks);
    let { TracksForSearch } = this.props;
    console.log("abc", TracksForSearch);
    if (searchedTracks !== "undefined") {
      console.log("inside if");
      return searchedTracks.map(track => (
        <Track
          key={track.id}
          id={track.master_id}
          AddTrack={this.HandlerAddTrackToPlayList}
          DeleteTrack={this.HandlerDeleteTrackFromPlayList}
          EditTrack={this.HandlerEditTrackFromPlayList}
          track={track}
          TracksForSearch={TracksForSearch}
        />
      ));
    } else {
      console.log("inside else");
      return (
        <tr>
          <td></td>
          <td></td>
          <td>No track available for serach result</td>
          <td></td>
        </tr>
      );
    }
  };

  HandlerAddTrackToPlayList = track => {
    let plyId = this.props.selectedPlayList.id;
    console.log(track.title);
    console.log(plyId);
    console.log(track.uri);
    console.log(track.master_id);
    fetch("http://localhost:8000/track", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        playListID: plyId,
        title: track.title,
        uri: track.uri,
        masterID: track.master_id
      })
    })
      .then(response => response.json())
      .then(response => {
        this.props.onStatusChange(response.data);
      })
      .catch(err => console.log(err));
  };

  HandlerDeleteTrackFromPlayList = track => {};
}

export default Tracks;

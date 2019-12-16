import React from "react";
import "./App.css";
import NavBar from "./components/navBar";
import appkey from "./config/AppKeys";
import loader from "./assets/giphy.gif";
import Tracks from "./components/tracks";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      playList: [],
      tracks: [],
      selectedPlayList: "",
      errormsg: "",
      statusmsg: "",
      loading: false,
      isSerchCompleted: false
    };
  }
  // state = {};
  componentDidMount() {
    this.getPlayList();
  }
  getPlayList = () => {
    fetch("http://localhost:8000/playlists")
      .then(response => response.json())
      .then(response => this.setState({ playList: response.data }))
      .catch(err => console.log(err));
  };

  render() {
    return (
      <div className="App">
        <NavBar
          playList={this.state.playList}
          onPlayListChange={this.handlerSelectPlayList}
          onSearch={this.handlerSearchTrack}
          onReset={this.resetTracksHandler}
          seltdPlayList={this.state.selectedPlayList}
          error={this.state.errormsg}
        />
        <span
          className="text-success"
          style={{ fontWeight: "bold", fontSize: "15px;" }}
        >
          {this.state.statusmsg !== "" && this.state.statusmsg}
        </span>
        {this.state.loading === true && this.renderLoader()}
        {this.state.isSerchCompleted === true && (
          <Tracks
            searchedTracks={this.state.tracks}
            selectedPlayList={this.state.playList.find(
              p => p.title === this.state.selectedPlayList
            )}
            onStatusChange={this.setStatusmsg}
          />
        )}
      </div>
    );
  }

  setStatusmsg = msg => {
    console.log("added");
    console.log(msg);
    // console.log();
    this.setState({ statusmsg: msg });
    setTimeout(() => {
      this.setState({ statusmsg: "" });
    }, 10000);
  };

  renderLoader() {
    return <img src={loader} alt="loading..." />;
  }

  handlerSelectPlayList = playListTitle => {
    console.log("playlist option change", playListTitle);
    this.setState({ selectedPlayList: playListTitle });
    this.setState({ errormsg: "" });
  };

  handlerSearchTrack = srchQuery => {
    let plist = this.state.selectedPlayList !== "" ? true : false;
    if (plist) {
      console.log("track", srchQuery);
      if (srchQuery !== "") {
        this.setState({ loading: true });
        this.getTracksfromDiscogs(srchQuery, plist);
      } else {
        this.setState({ errormsg: "Please enter keyword to search track!" });
        this.setState({ loading: false });
      }
    } else {
      this.setState({ errormsg: "Please select playlist!" });
      this.setState({ loading: false });
    }
  };

  getTracksfromDiscogs = (srchQuery, plist) => {
    let uri =
      "https://api.discogs.com/database/search?q=" +
      srchQuery +
      "&genre=" +
      this.state.selectedPlayList +
      " &token=" +
      appkey.token;

    console.log(uri);
    console.log("searching record");
    fetch(uri)
      .then(response => response.json())
      .then(response =>
        this.setState({
          tracks: response.results,
          loading: false,
          isSerchCompleted: true
        })
      )
      .catch(err => console.log(err));
  };

  resetTracksHandler = () => {
    this.setState({
      selectedPlayList: ""
    });
  };
}

export default App;

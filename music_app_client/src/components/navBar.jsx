import React, { Component } from "react";

class NavBar extends Component {
  renderPlayList = playList => (
    <option className="MenuItem" value={playList.title} key={playList.id}>
      {playList.title}
    </option>
  );

  render() {
    const { playList, seltdPlayList, error } = this.props;
    console.log(playList, seltdPlayList);
    return (
      <nav className="navbar sticky-top navbar-expand-lg navbar-light bg-light">
        <a
          className="navbar-brand m-3"
          href="/"
          style={{ color: "#ff1a1a", fontWeight: "bold" }}
        >
          <h2>Suitify</h2>
        </a>

        <ul className="navbar-nav mr-auto ">
          <li className="nav-item dropdown m-3">
            <select
              className="btn btn-primary dropdown-toggle mr-1"
              data-toggle="dropdown"
              onChange={event => {
                this.props.onPlayListChange(event.target.value);
              }}
            >
              <option value="">Select PlayList</option>
              {playList.map(this.renderPlayList)}
            </select>
          </li>

          <li className="nav-item m-2">
            <button
              className="btn btn-outline-primary my-2 my-sm-0"
              onClick={() => {
                this.props.onShowAll();
              }}
            >
              Show Add Tracks
            </button>
          </li>
          <li className="nav-item m-2">
            <a
              className="nav-link text-info"
              style={{
                fontStyle: "italic",
                fontSize: "18px"
              }}
            >
              {seltdPlayList !== "" &&
                "Search Tracks for Playlist : " + seltdPlayList}
            </a>
          </li>
          <li className="nav-item m-2">
            <input
              className="form-control mr-sm-5"
              type="search"
              placeholder="Search"
              aria-label="Search"
              id="track-search"
            />
            <span className="text-danger"> {error !== "" && error}</span>
          </li>
          <li className="nav-item m-2">
            <button
              className="btn btn-outline-primary my-2 my-sm-0"
              onClick={() => {
                this.props.onSearch(
                  document.getElementById("track-search").value
                );
              }}
            >
              Search
            </button>
          </li>
          <li className="nav-item m-2">
            <button
              className="btn btn-outline-warning my-2 my-sm-0"
              onClick={() => {
                this.props.onReset();
              }}
            >
              Reset
            </button>
          </li>
        </ul>
      </nav>
    );
  }
}

export default NavBar;

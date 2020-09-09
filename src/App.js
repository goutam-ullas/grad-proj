import React, { useRef, useEffect, useState } from "react";
import RubberSlider from "@shwilliam/react-rubber-slider";

import "@shwilliam/react-rubber-slider/dist/styles.css";
import "./style.css";

import mapboxgl from "mapbox-gl";
import 'mapbox-gl/dist/mapbox-gl.css';

mapboxgl.accessToken =
  "pk.eyJ1Ijoibm5pa2l0YSIsImEiOiJjazdtYzV2MDYwMzliM2dubnVubnJuMTRrIn0.6KqRhtWgMc_nGwMPAqmstQ";

class Application extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      lng: 78.4735,
      lat: 17.3758,
      value: 1,
      squareText: "",
      circleText: ""
    };
    this.circleFunction = this.circleFunction.bind(this);
    this.squareFunction = this.squareFunction.bind(this);
  }

  componentDidMount() {
    this.map = new mapboxgl.Map({
      container: this.mapContainer,
      style: "mapbox://styles/nnikita/ckd7n4m5b04e31ip8ai5a1xfj",
      center: [this.state.lng, this.state.lat],
      zoom: 18,
      pitch: 90,
      attributionControl: false
    });
    this.map.scrollZoom.disable();
    this.map.doubleClickZoom.disable();
    this.map.dragPan.disable();
    this.map.on("move", () => {
      this.setState({
        lng: this.map.getCenter().lng.toFixed(4),
        lat: this.map.getCenter().lat.toFixed(4),
        zoom: this.map.getZoom().toFixed(2)
      });
    });
    window.scrollTo(500,650);
  }

  circleFunction() {
    console.log("circle");
    this.map.panby([0,10]);
    this.setState({ circleText: "Circle" });
  }

  squareFunction() {
    console.log("square");
    this.setState({ circleText: "Square" });
  }

  componentDidUpdate() {
    const zoom_level = (1 / 49.5) * (this.state.value - 1) + 18;
    this.map.zoomTo(zoom_level);
  }
  render() {
    return (
      <div>
        <div
          ref={el => (this.mapContainer = el)}
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            top: 0,
            height: 2000,
            width:3000
          }}
        />
        <div class="titlebar">
          <RubberSlider
            width={100}
            height={1}
            value={this.state.value}
            onChange={value => this.setState({ value })}
            min={1}
            max={100}
            style={{ position: "absolute", left: 40, top:18 }}
          />
          <p
            style={{
              fontSize: 32,
              position: "absolute",
              left: 260,
              top: -15,
              color: "#2f1dfc"
            }}
          >
            {this.state.circleText}
          </p>
          <span
            role="button"
            aria-label="Circle Button"
            data-balloon-pos="down-right"
            onClick={this.circleFunction}
            style={{
              fontSize: 32,
              position: "absolute",
              left: 170,
              color: "#2f1dfc",
              top: 7
            }}
          >
            &#9677;
          </span>
          <span
            role="button"
            aria-label="Square Button"
            data-balloon-pos="down-right"
            onClick={this.squareFunction}
            style={{
              fontSize: 28,
              position: "absolute",
              left: 210,
              color: "#2f1dfc",
              top: 12
            }}
          >
            &#11199;
          </span>
        </div>
      </div>
    );
  }
}

export default Application;

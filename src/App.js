import React, { useRef, useEffect, useState } from "react";
import RubberSlider from "@shwilliam/react-rubber-slider";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";

import "@shwilliam/react-rubber-slider/dist/styles.css";
import "./style.css";

import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

mapboxgl.accessToken =
  "pk.eyJ1Ijoibm5pa2l0YSIsImEiOiJjazdtYzV2MDYwMzliM2dubnVubnJuMTRrIn0.6KqRhtWgMc_nGwMPAqmstQ";

class Application extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      lng: 78.4735,
      lat: 17.3758,
      value: 1,
      index: true,
      squareState: true,
      circleState: true,
      aboutState: true,
      aboutWidth: 0,
      squareText: "",
      circleText: ""
    };
    this.circleFunction = this.circleFunction.bind(this);
    this.squareFunction = this.squareFunction.bind(this);
    this.aboutFunction = this.aboutFunction.bind(this);
    this.aboutText = "Nikita Narayan's revolutionary graduation project";
  }

  componentDidMount() {
    this.map = new mapboxgl.Map({
      container: this.mapContainer,
      style: "mapbox://styles/nnikita/ckd7n4m5b04e31ip8ai5a1xfj",
      center: [this.state.lng, this.state.lat],
      zoom: 18,
      pitch: 60,
      attributionControl: false,
      interactive: false
    });
    this.map.scrollZoom.disable();
    this.map.doubleClickZoom.disable();
    this.map.dragPan.enable();
    /*this.map.dragPan.disable();*/
    // pixels the map pans when the up or down arrow is clicked
    var deltaDistance = 100;

    // degrees the map rotates when the left or right arrow is clicked
    var deltaDegrees = 10;

    function easing(t) {
      return t * (2 - t);
    }

    this.map.on("load", () => {
      this.map.getCanvas().focus();

      window.addEventListener(
        "keydown",
        e => {
          e.preventDefault();
          if (e.which === 38) {
            // up
            this.map.panBy([0, -deltaDistance], {
              easing: easing
            });
          } else if (e.which === 40) {
            // down
            this.map.panBy([0, deltaDistance], {
              easing: easing
            });
          } else if (e.which === 37) {
            // left
            this.map.easeTo({
              bearing: this.map.getBearing() - deltaDegrees,
              easing: easing
            });
          } else if (e.which === 39) {
            // right
            this.map.easeTo({
              bearing: this.map.getBearing() + deltaDegrees,
              easing: easing
            });
          }
        },
        true
      );
    });

    this.map.on("move", () => {
      this.setState({
        lng: this.map.getCenter().lng.toFixed(4),
        lat: this.map.getCenter().lat.toFixed(4),
        zoom: this.map.getZoom().toFixed(2)
      });
    });
    window.scrollTo(500, 650);
  }

  indexFunction() {
    console.log("index");
    window.location.reload(false);
  }

  aboutFunction() {
    console.log("about");
    this.setState(prevState => ({
      aboutState: !prevState.aboutState
    }));
    if (this.state.aboutState == true) {
      this.setState({ aboutWidth: window.innerWidth / 2 });
    } else {
      this.setState({ aboutWidth: 0 });
    }
  }

  circleFunction() {
    console.log("circle");
    this.setState(prevState => ({
      circleState: !prevState.circleState
    }));
    this.setState({ aboutWidth: 0 });
    this.setState({ aboutState: true });
    if (this.state.circleState == true) {
      this.setState({ circleText: "Circle" });
    } else {
      this.setState({ circleText: "" });
    }
  }

  squareFunction() {
    console.log("square");
    this.setState(prevState => ({
      squareState: !prevState.squareState
    }));
    this.setState({ aboutWidth: 0 });
    this.setState({ aboutState: true });
    if (this.state.squareState == true) {
      this.setState({ squareText: "Square" });
    } else {
      this.setState({ squareText: "" });
    }
    /*this.map.flyTo({
      center: [78.4735, 17.3758],
      zoom: 18,
      essential: true // this animation is considered essential with respect to prefers-reduced-motion
    });*/
  }

  /*componentDidUpdate() {
    const zoom_level = (1 / 49.5) * (this.state.value - 1) + 18;
    this.map.zoomTo(zoom_level);
  }*/

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
            width: 3000
          }}
        />
        <div class="titlebar">
          <span
            role="button"
            aria-label="Index Button"
            data-balloon-pos="down-right"
            onClick={this.indexFunction}
            style={{
              fontSize: 32,
              position: "absolute",
              left: 10,
              color: "#2f1dfc",
              top: 7
            }}
          >
            index
          </span>
          <span
            role="button"
            aria-label="About Button"
            data-balloon-pos="down-right"
            onClick={this.aboutFunction}
            style={{
              fontSize: 32,
              position: "absolute",
              left: 100,
              color: "#2f1dfc",
              top: 7
            }}
          >
            about
          </span>
          <RubberSlider
            width={100}
            height={1}
            value={this.state.value}
            //onChange={value => this.setState({ value })}
            onChange={value => this.map.zoomTo((1 / 49.5) * (value - 1) + 18)}
            min={1}
            max={100}
            style={{ position: "absolute", left: 200, top: 30 }}
          />
          <span
            role="button"
            aria-label="Circle Button"
            data-balloon-pos="down-right"
            onClick={this.circleFunction}
            style={{
              fontSize: 32,
              position: "absolute",
              left: 330,
              color: "#2f1dfc",
              top: 7
            }}
          >
            &#9677;
          </span>
          <p
            style={{
              fontSize: 32,
              position: "absolute",
              left: 300,
              top: 10,
              color: "#2f1dfc"
            }}
          >
            {this.state.circleText}
          </p>
          <span
            role="button"
            aria-label="Square Button"
            data-balloon-pos="down-right"
            onClick={this.squareFunction}
            style={{
              fontSize: 28,
              position: "absolute",
              left: 380,
              color: "#2f1dfc",
              top: 12
            }}
          >
            &#11199;
          </span>
          <p
            style={{
              fontSize: 32,
              position: "absolute",
              left: 380,
              top: 10,
              color: "#2f1dfc"
            }}
          >
            {this.state.squareText}
          </p>
          <span
            role="button"
            aria-label="Triangle Button"
            data-balloon-pos="down-right"
            onClick={this.triangleFunction}
            style={{
              fontSize: 28,
              position: "absolute",
              left: 420,
              color: "#2f1dfc",
              top: 12
            }}
          >
            &#9653;
          </span>
          <span
            role="button"
            aria-label="Theme 1"
            data-balloon-pos="down-right"
            onClick={this.themeOneFunction}
            style={{
              fontSize: 32,
              position: "absolute",
              left: 10,
              color: "#2f1dfc",
              top: 100
            }}
          >
            Theme 1
          </span>
          <span
            role="button"
            aria-label="Theme 2"
            data-balloon-pos="down-right"
            onClick={this.themeTwoFunction}
            style={{
              fontSize: 32,
              position: "absolute",
              left: 10,
              color: "#2f1dfc",
              top: 200
            }}
          >
            Theme 2
          </span>
          <span
            role="button"
            aria-label="Theme 3"
            data-balloon-pos="down-right"
            onClick={this.themeThreeFunction}
            style={{
              fontSize: 32,
              position: "absolute",
              left: 10,
              color: "#2f1dfc",
              top: 300
            }}
          >
            Theme 3
          </span>
          <span
            role="button"
            aria-label="Theme 4"
            data-balloon-pos="down-right"
            onClick={this.themeThreeFunction}
            style={{
              fontSize: 32,
              position: "absolute",
              left: 10,
              color: "#2f1dfc",
              top: 400
            }}
          >
            Theme 4
          </span>
        </div>
        <div class = "wrapper"
          style={{
            width: this.state.aboutWidth,
            height: window.innerHeight
          }}
        >
          <span
            role="button"
            aria-label="Close"
            data-balloon-pos="down-right"
            onClick={this.aboutFunction}
            style={{
              fontSize: 32,
              position: "absolute",
              left: 10,
              color: "blue"
            }}
          >
            &#10005;
          </span>
          <p style={{ margin: 50 }}> {this.aboutText} </p>
        </div>
      </div>
    );
  }
}

export default Application;

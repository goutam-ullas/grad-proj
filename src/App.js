import React, { useRef, useEffect, useState } from "react";
import RubberSlider from "@shwilliam/react-rubber-slider";
import ReactPlayer from "react-player";

import "@shwilliam/react-rubber-slider/dist/styles.css";
import "./style.css";

import mapboxgl from "mapbox-gl";
//import "mapbox-gl/dist/mapbox-gl.css";

mapboxgl.accessToken =
  "pk.eyJ1Ijoibm5pa2l0YSIsImEiOiJjazdtYzV2MDYwMzliM2dubnVubnJuMTRrIn0.6KqRhtWgMc_nGwMPAqmstQ";

class Application extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      lng: 78.4735,
      lat: 17.3755,
      value: 50,
      index: true,
      squareState: true,
      circleState: 1,
      aboutState: true,
      aboutWidth: 0,
      squareText: "",
      circleText: "",
      maxThemes: 2,
      themeLeft: 50,
      themeStart: 1.25 * window.innerHeight,
      themeGap: window.innerHeight,
      videoDimX1: 1,
      videoDimX2: 1,
      videoDimX3: 1,
      videoZindex1: 1,
      videoZindex2: 1,
      videoZindex3: 1
    };
    this.circleFunction = this.circleFunction.bind(this);
    this.squareFunction = this.squareFunction.bind(this);
    this.aboutFunction = this.aboutFunction.bind(this);
    this.aboutText =
      "This thesis looks at an urban market, Begum Bazar situated in the old city of Hyderabad and its relation to gender. The work, initially set out to explore kitchen objects and their place in shaping one’s life, eventually becomes an exploration into how, space and gender narratives co-exist and help sustain each other. By using the example of this market situated in a major metropolitan Indian city, and through interviews of people occupying and visiting the space, the work speculates on how social hierarchies and practices gain ground. This work is an inquiry, which is both personal and not, and in doing so, also wrestles on this interplay between the public and the private, in gender and in research. Through this, the thesis ultimately hopes to express how the organization of space is linked to how power organizes itself. This discussion is told through questions as they came to be felt. This thesis looks at an urban market, Begum Bazar situated in the old city of Hyderabad and its relation to gender. The work, initially set out to explore kitchen objects and their place in shaping one’s life, eventually becomes an exploration into how, space and gender narratives co-exist and help sustain each other. By using the example of this market situated in a major metropolitan Indian city, and through interviews of people occupying and visiting the space, the work speculates on how social hierarchies and practices gain ground. This work is an inquiry, which is both personal and not, and in doing so, also wrestles on this interplay between the public and the private, in gender and in research. Through this, the thesis ultimately hopes to express how the organization of space is linked to how power organizes itself. This discussion is told through questions as they came to be felt.";
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
    var deltaDistance = 100;
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
  }

  indexFunction() {
    console.log("index");
    window.location.reload(true);
    window.scrollTo(0, 0);
  }

  enlargeVid1() {
    this.setState({ videoDimX1: 2 });
  }

  ensmallVide1() {}

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
    this.setState({ aboutWidth: 0 });
    this.setState({ aboutState: true });
    if (this.state.circleState == this.state.maxThemes) {
      this.setState({ circleState: 0 });
    } else {
      this.setState(prevState => ({ circleState: prevState.circleState + 1 }));
    }
    console.log(this.state.circleState);
    var scrollTop = this.state.themeGap * this.state.circleState;
    if (scrollTop == 0) {
      window.scrollTo(0, scrollTop);
    } else {
      window.scroll({
        top: scrollTop,
        left: 0,
        behavior: "smooth"
      });
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
  }

  render() {
    return (
      <div>
        <div
          ref={el => (this.mapContainer = el)}
          style={{
            position: "fixed",
            left: 0,
            right: 0,
            top: 0,
            height: window.innerHeight,
            width: window.innerWidth
          }}
        />
        <div
          style={{
            fontSize: 24,
            position: "absolute",
            color: "black",
            left: this.state.themeLeft,
            top: this.state.themeStart,
            height: this.state.themeGap
          }}
        >
          <p> theme 1 </p>
          <p> theme 1 description </p>
          <ReactPlayer
            className="video"
            style={{
              position: "absolute",
              top: 0,
              left: 400,
              zIndex: this.state.videoZindex1
            }}
            height={this.state.videoDimX1 * 180}
            width={this.state.videoDimX1 * 320}
            url="https://www.youtube.com/watch?v=ug50zmP9I7s"
            controls="true"
            onPlay={() => this.setState({ videoDimX1: 2, videoZindex1: 10 })}
            onPause={() => this.setState({ videoDimX1: 1, videoZindex1: 1 })}
          />
          <ReactPlayer
            className="video"
            style={{
              position: "absolute",
              top: 190,
              left: 550,
              zIndex: this.state.videoZindex2
            }}
            height={this.state.videoDimX2 * 180}
            width={this.state.videoDimX2 * 320}
            url="https://www.youtube.com/watch?v=ug50zmP9I7s"
            controls="true"
            onPlay={() => this.setState({ videoDimX2: 2, videoZindex2: 10 })}
            onPause={() => this.setState({ videoDimX2: 1, videoZindex2: 1 })}
          />
          <ReactPlayer
            className="video"
            style={{
              position: "absolute",
              top: 50,
              left: 900,
              zIndex: this.state.videoZindex3
            }}
            height={this.state.videoDimX3 * 180}
            width={this.state.videoDimX3 * 320}
            url="https://www.youtube.com/watch?v=ug50zmP9I7s"
            controls="true"
            onPlay={() => this.setState({ videoDimX3: 2, videoZindex3: 10 })}
            onPause={() => this.setState({ videoDimX3: 1, videoZindex3: 1 })}
          />
        </div>
        <div
          style={{
            fontSize: 24,
            position: "absolute",
            color: "black",
            left: this.state.themeLeft,
            top: this.state.themeStart + this.state.themeGap,
            height: this.state.themeGap
          }}
        >
          <p> theme 2 </p>
          <p> theme 2 description </p>
          <ReactPlayer
            className="video"
            style={{
              position: "absolute",
              top: 0,
              left: 500,
              zIndex: this.state.videoZindex1
            }}
            height={this.state.videoDimX1 * 180}
            width={this.state.videoDimX1 * 320}
            url="https://www.youtube.com/watch?v=ug50zmP9I7s"
            controls="true"
            onPlay={() => this.setState({ videoDimX1: 2, videoZindex1: 10 })}
            onPause={() => this.setState({ videoDimX1: 1, videoZindex1: 1 })}
          />
          <ReactPlayer
            className="video"
            style={{
              position: "absolute",
              top: 190,
              left: 650,
              zIndex: this.state.videoZindex2
            }}
            height={this.state.videoDimX2 * 180}
            width={this.state.videoDimX2 * 320}
            url="https://www.youtube.com/watch?v=ug50zmP9I7s"
            controls="true"
            onPlay={() => this.setState({ videoDimX2: 2, videoZindex2: 10 })}
            onPause={() => this.setState({ videoDimX2: 1, videoZindex2: 1 })}
          />
        </div>
        <div className="titlebar" style={{ zIndex: 1000 }}>
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
            &#11199;
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
              fontSize: 48,
              position: "absolute",
              left: 375,
              color: "#2f1dfc",
              top: 10
            }}
          >
            &#42;
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
        </div>
        <div
          className="about"
          style={{
            width: this.state.aboutWidth,
            height: window.innerHeight,
            fontSize: 28,
            zIndex: 100
          }}
        >
          <span
            role="button"
            aria-label="Close"
            data-balloon-pos="down-left"
            onClick={this.aboutFunction}
            style={{
              fontSize: 28,
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

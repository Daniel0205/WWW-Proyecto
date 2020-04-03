import React, { Component } from 'react'
import { Map, TileLayer, Marker, Popup } from "react-leaflet";
import "./Mapa.css";
import L from "leaflet";

const Geo = require("open-street-map-reverse-geo-node-client");
const reverse = new Geo.ReverseGeocoder();

class Mapa extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            lat: this.props.lat,
            lng: this.props.long,
            zoom: 13,
            markers: [],
            currentPos: null,
        };
        this.handleClick = this.handleClick.bind(this);
      }

       //Funcion para capturar la latitud, la longitud y la direccion
  //respecto a un click en el mapa
  handleClick(e) {
    this.setState({ currentPos: e.latlng }, () => {
      reverse
        .getReverse(this.state.currentPos.lat, this.state.currentPos.lng)
        .then(() => {
          this.setState(() => {
            this.props.callback({
                lat_address: this.state.currentPos.lat,
                long_address: this.state.currentPos.lng,
            });
          });
        })
        .catch(err => {
          console.error(err);
        });
    });
  }

  render() {
    const position = [this.state.lat, this.state.lng]
    return (
      <Map center={position} zoom={this.state.zoom} onClick={this.handleClick}>
        <TileLayer
          attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={position}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
      </Map>
    )
  }
}

export default Mapa;
import React, { Component } from 'react';
import { withGoogleMap, GoogleMap, Marker } from 'react-google-maps';
import { Container, Row, Col, Button, Alert} from 'reactstrap';


const cities_solution = {
                  "capitalCities": 
                    [
                      {
                        "capitalCity": "Zurich",
                        "lat": "47.37861",
                        "long": "8.54"
                      },
                      {
                        "capitalCity": "Paris",
                        "lat": "48.8667",
                        "long": "2.33333"
                       },
                      {
                        "capitalCity": "Madrid",
                        "lat": "40.4167",
                        "long": "-3.70325"
                      },
                      {
                        "capitalCity": "London",
                        "lat": "51.5072",
                        "long": "-0.1275"
                      },
                      {
                        "capitalCity": "Berlin",
                        "lat": "52.5186",
                        "long": "13.4081"
                      },
                      {
                        "capitalCity": "Amsterdam",
                        "lat": "52.3738",
                        "long": "4.89093"
                      },
                      {
                        "capitalCity": "Rome",
                        "lat": "41.8905",
                        "long": "12.4942"
                      },
                      {
                        "capitalCity": "Oslo",
                        "lat": "59.91273",
                        "long": "10.74609"
                      },
                      {
                        "capitalCity": "Vienna",
                        "lat": "48.2092",
                        "long": "16.3728"
                      }
                    ]
                }


const handleClick = (event, city, props) => {
    var lat = event.latLng.lat();
    var lng = event.latLng.lng();
    // Distance between two points
    var x = Math.pow((parseFloat(lat) - parseFloat(city['lat'])), 2);
    var y = Math.pow((parseFloat(lng) - parseFloat(city['long'])), 2);
    var distance = Math.sqrt(x+y);
    // 1 lat = 111,12 km => 50km = 0,450 lat
    if(distance < 0.45){
      // Next step
      props.userNotification(parseInt(distance*111.12), 'success');
      props.changeCity(city);
    }else{
      let points = JSON.stringify(parseInt(distance*111.12));
      props.userNotification(points, 'warming');
      let score = props.score;
      let new_score =  score - points;
      if(new_score < 0){
        props.userNotification(new_score, 'fail');
        window.location.reload();
      }else{
        props.changeScore(new_score);
      }      
    }
  }

const mapStyles = [
                    {
                      elementType: "labels",
                      stylers: [{visibility: "off"}]
                    },
                    {
                      featureType: "administrative.land_parcel",
                      stylers: [{visibility: "off"}]
                    },
                    {
                      featureType: "administrative.neighborhood",
                      stylers: [{visibility: "off"}]
                    },
                    {
                      featureType: "road",
                      stylers: [{visibility: "off"}]
                    }
                  ]

const GoogleMapExample = withGoogleMap(props => (
    <GoogleMap
      center = { { lat: 40.0, lng: 5.0 } }
      defaultZoom = { 5 }
      onClick={(e) => {handleClick(e, props['city'], props)}}
      options={{maxZoom: 6, minZoom: 5, disableDefaultUI: true, styles: mapStyles }}
    >
    </GoogleMap>
 ));

class Map extends Component {
  constructor(props){
    super(props)
    this.state = {
      city: this.props.city,
      score: this.props.score,
      points: this.props.points
    }
  }

  changeCity(city){
    let index = this.props.cities["capitalCities"].indexOf(this.state.city)  
    this.setState({
      city: this.props.cities["capitalCities"][index+1]
    })    
  }

  changeScore(points){
    this.setState({
      score: points
    })
  }

  userNotification(data, type){  
    let notification;
    switch(type) {
        case 'warming':
            notification = "Try again! "+data+" km"
            break;
        case 'fail':
            notification = "Game over: "+data+" km extra"
            break;
        case 'success':
            notification = "Well done! Next city..."
            break;
        default:
            return '';
    } 
    return alert(notification);
  }
 
  render() {
   return(
      <div>
        <Alert color="info">
          Score: {this.state.score}
        </Alert>
        <div>
        {(typeof(this.state.city) == 'undefined' || this.state.city == null) ? 
          <div>
            <Alert color="success">
              Finish
            </Alert>
            <Button color="primary" onClick={() => {window.location.reload()}}>Play again</Button>
          </div> : 
          <div> 
            <Alert color="light">
              Where is <b>{this.state.city['capitalCity']}</b>?
            </Alert>  
            <GoogleMapExample
              containerElement={ <div style={{ height: `500px`, width: '100%' }} /> }
              mapElement={ <div style={{ height: `100%` }} /> }
              city= {this.state.city}
              score={this.state.score}
              changeCity={this.changeCity.bind(this)}
              changeScore={this.changeScore.bind(this)}
              userNotification={this.userNotification.bind(this)}
            />
          </div>
        }
        </div>
      </div>
   );
 }
}

export default Map;

Map.defaultProps = {
  cities: cities_solution,
  city: cities_solution["capitalCities"][0],
  score: 1500,
  points: 0
}

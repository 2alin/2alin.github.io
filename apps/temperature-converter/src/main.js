//'use strict';
const scaleNames = {
  C: 'Celsius',
  F: 'Fahrenheit',
  K: 'Kelvin'
}

function celsiusToKelvin(value) {
  return value + 273.15;
}

function fahrenheitToKelvin(value) {
  return 5 * (value - 32) / 9 + 273.15;
}

function kelvinToCelsius(value) {
  return value - 273.15;
}

function kelvinToFahrenheit(value) {
  return 9 * (value - 273.15) / 5 + 32;
}

function TemperatureDisplay(props) {
  if(! isNaN(props.kelvin)) {
    const kelvin = props.kelvin;
    switch(props.scale) {
        case 'celsius':
          const celsius = Math.floor(kelvinToCelsius(kelvin)*1000)/1000;
          return <p>{celsius} C</p>;
        case 'fahrenheit':
          const fahrenheit = Math.floor(kelvinToFahrenheit(kelvin)*1000)/1000;
          return <p>{fahrenheit} F</p>;
        case 'kelvin':
          const roundedKelvin = Math.floor(kelvin*1000)/1000
          return <p>{roundedKelvin} K</p>;
        default:
          return <p>Unidentified scale</p>;
          
    }
  }
  return null;
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {userInput: '', scale: '', temperature: NaN};
    this.handleChange = this.handleChange.bind(this);
  }
  
  handleChange(e) {
    const userInput = e.target.value;
    this.setState({userInput: userInput});
    const lastChar = userInput.trim().slice(-1).toUpperCase();
    const scale = Object.keys(scaleNames).includes(lastChar) ? lastChar : "" ;
    const temperature = scale ? parseFloat(userInput.trim().slice(0,-1)) : NaN;
    this.setState({scale: scale, temperature: temperature});
  }
  
  render() {
    const userInput = this.state.userInput;
    const scale = this.state.scale;
    const temperature = this.state.temperature;
    let kelvin = NaN;
    if(! isNaN(temperature) ) {
      switch(scale) {
        case 'C':
          kelvin = celsiusToKelvin(temperature);
          break;
        case 'F':
          kelvin = fahrenheitToKelvin(temperature);
          break;
        case 'K':
          kelvin = temperature;
          break;
        default:
          break;
      }
    }
    
    return (
      <div>
        <div id="input-field">
          <label for="user-input" >Your value: </label>
          <input id="user-input" value={userInput} onChange={this.handleChange} placeholder="Eg. 47c, -3f, 20k"/>
        </div>
        <TemperatureDisplay scale="celsius" kelvin={kelvin} />
        <TemperatureDisplay scale="fahrenheit" kelvin={kelvin} />
        <TemperatureDisplay scale="kelvin" kelvin={kelvin} />
      </div>
    );
  }
}


const domContainer = document.querySelector('#app');

ReactDOM.render(<App/>, domContainer);
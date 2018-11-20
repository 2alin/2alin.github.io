var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

//'use strict';
var scaleNames = {
  C: 'Celsius',
  F: 'Fahrenheit',
  K: 'Kelvin'
};

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
  if (!isNaN(props.kelvin)) {
    var kelvin = props.kelvin;
    switch (props.scale) {
      case 'celsius':
        var celsius = Math.floor(kelvinToCelsius(kelvin) * 1000) / 1000;
        return React.createElement(
          'p',
          null,
          celsius,
          ' C'
        );
      case 'fahrenheit':
        var fahrenheit = Math.floor(kelvinToFahrenheit(kelvin) * 1000) / 1000;
        return React.createElement(
          'p',
          null,
          fahrenheit,
          ' F'
        );
      case 'kelvin':
        var roundedKelvin = Math.floor(kelvin * 1000) / 1000;
        return React.createElement(
          'p',
          null,
          roundedKelvin,
          ' K'
        );
      default:
        return React.createElement(
          'p',
          null,
          'Unidentified scale'
        );

    }
  }
  return null;
}

var App = function (_React$Component) {
  _inherits(App, _React$Component);

  function App(props) {
    _classCallCheck(this, App);

    var _this = _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).call(this, props));

    _this.state = { userInput: '', scale: '', temperature: NaN };
    _this.handleChange = _this.handleChange.bind(_this);
    return _this;
  }

  _createClass(App, [{
    key: 'handleChange',
    value: function handleChange(e) {
      var userInput = e.target.value;
      this.setState({ userInput: userInput });
      var lastChar = userInput.trim().slice(-1).toUpperCase();
      var scale = Object.keys(scaleNames).includes(lastChar) ? lastChar : "";
      var temperature = scale ? parseFloat(userInput.trim().slice(0, -1)) : NaN;
      this.setState({ scale: scale, temperature: temperature });
    }
  }, {
    key: 'render',
    value: function render() {
      var userInput = this.state.userInput;
      var scale = this.state.scale;
      var temperature = this.state.temperature;
      var kelvin = NaN;
      if (!isNaN(temperature)) {
        switch (scale) {
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

      return React.createElement(
        'div',
        null,
        React.createElement(
          'div',
          { id: 'input-field' },
          React.createElement(
            'label',
            { 'for': 'user-input' },
            'Your value: '
          ),
          React.createElement('input', { id: 'user-input', value: userInput, onChange: this.handleChange, placeholder: 'Eg. 47c, -3f, 20k' })
        ),
        React.createElement(TemperatureDisplay, { scale: 'celsius', kelvin: kelvin }),
        React.createElement(TemperatureDisplay, { scale: 'fahrenheit', kelvin: kelvin }),
        React.createElement(TemperatureDisplay, { scale: 'kelvin', kelvin: kelvin })
      );
    }
  }]);

  return App;
}(React.Component);

var domContainer = document.querySelector('#app');

ReactDOM.render(React.createElement(App, null), domContainer);
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function Button(props) {
  return React.createElement(
    'button',
    { onClick: props.onClick },
    props.value
  );
}

var Calculator = function (_React$Component) {
  _inherits(Calculator, _React$Component);

  function Calculator(props) {
    _classCallCheck(this, Calculator);

    var _this = _possibleConstructorReturn(this, (Calculator.__proto__ || Object.getPrototypeOf(Calculator)).call(this, props));

    _this.handleClick = _this.handleClick.bind(_this);
    _this.handleClear = _this.handleClear.bind(_this);
    _this.handleDelete = _this.handleDelete.bind(_this);
    _this.state = {
      input: ""
    };
    return _this;
  }

  _createClass(Calculator, [{
    key: 'handleClick',
    value: function handleClick(e) {
      var keyValue = e.target.textContent;
      var updatedInput = this.state.input + keyValue;
      this.setState({
        input: updatedInput
      });
      console.log(updatedInput);
    }
  }, {
    key: 'handleClear',
    value: function handleClear() {
      this.setState({
        input: ''
      });
      console.log('cleared');
    }
  }, {
    key: 'handleDelete',
    value: function handleDelete() {
      var input = this.state.input;
      var updatedInput = input.slice(0, -1);
      this.setState({
        input: updatedInput
      });
      console.log(updatedInput);
    }
  }, {
    key: 'render',
    value: function render() {
      return React.createElement(
        'div',
        null,
        React.createElement(
          'div',
          { className: 'row' },
          React.createElement(Button, { value: 'C', onClick: this.handleClear }),
          React.createElement(Button, { value: 'DEL', onClick: this.handleDelete })
        ),
        React.createElement(
          'div',
          { className: 'row' },
          React.createElement(Button, { value: '7', onClick: this.handleClick }),
          React.createElement(Button, { value: '8', onClick: this.handleClick }),
          React.createElement(Button, { value: '9', onClick: this.handleClick }),
          React.createElement(Button, { value: '\xF7' })
        ),
        React.createElement(
          'div',
          { className: 'row' },
          React.createElement(Button, { value: '4', onClick: this.handleClick }),
          React.createElement(Button, { value: '5', onClick: this.handleClick }),
          React.createElement(Button, { value: '6', onClick: this.handleClick }),
          React.createElement(Button, { value: '\xD7' })
        ),
        React.createElement(
          'div',
          { className: 'row' },
          React.createElement(Button, { value: '1', onClick: this.handleClick }),
          React.createElement(Button, { value: '2', onClick: this.handleClick }),
          React.createElement(Button, { value: '3', onClick: this.handleClick }),
          React.createElement(Button, { value: '\u2212' })
        ),
        React.createElement(
          'div',
          { className: 'row' },
          React.createElement(Button, { value: '0', onClick: this.handleClick }),
          React.createElement(Button, { value: '.', onClick: this.handleClick }),
          React.createElement(Button, { value: '=' }),
          React.createElement(Button, { value: '+' })
        )
      );
    }
  }]);

  return Calculator;
}(React.Component);

ReactDOM.render(React.createElement(Calculator, null), document.getElementById("root"));
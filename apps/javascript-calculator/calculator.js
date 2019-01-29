var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function Button(props) {
  return React.createElement(
    "button",
    { onClick: props.onClick },
    props.value
  );
}

function DisplayScreen(props) {
  return React.createElement(
    "div",
    { id: "display-screen" },
    React.createElement(
      "p",
      { id: "formula-display" },
      props.formula
    ),
    React.createElement(
      "p",
      { id: "display" },
      props.display
    )
  );
}

var Calculator = function (_React$Component) {
  _inherits(Calculator, _React$Component);

  function Calculator(props) {
    _classCallCheck(this, Calculator);

    var _this = _possibleConstructorReturn(this, (Calculator.__proto__ || Object.getPrototypeOf(Calculator)).call(this, props));

    _this.handleDigit = _this.handleDigit.bind(_this);
    _this.handlePeriod = _this.handlePeriod.bind(_this);
    _this.handleOperator = _this.handleOperator.bind(_this);
    _this.handleEqual = _this.handleEqual.bind(_this);
    _this.handleClear = _this.handleClear.bind(_this);
    _this.handleDelete = _this.handleDelete.bind(_this);
    _this.state = {
      input: "0",
      formula: ""
    };
    return _this;
  }

  _createClass(Calculator, [{
    key: "handleDigit",
    value: function handleDigit(e) {
      var keyValue = e.target.textContent;
      var updatedInput = void 0;
      if (this.state.input === "0") {
        // handle initial state '0'
        updatedInput = keyValue;
      } else {
        updatedInput = this.state.input + keyValue;
      }

      this.setState({
        input: updatedInput
      });
      console.log(updatedInput);
    }
  }, {
    key: "handlePeriod",
    value: function handlePeriod() {
      var updatedInput = void 0;
      if (/\.\d*$/.test(this.state.input)) {
        // handle multiple periods
        updatedInput = this.state.input;
      } else if (/[^\d]$/.test(this.state.input)) {
        // handle operands starting without a digit
        updatedInput = this.state.input + "0.";
      } else {
        updatedInput = this.state.input + ".";
      }

      this.setState({
        input: updatedInput
      });
      console.log(updatedInput);
    }
  }, {
    key: "handleOperator",
    value: function handleOperator(e) {
      var keyValue = e.target.textContent;
      var updatedInput = void 0;
      if (/[\+\-\*\/\.]$/.test(this.state.input)) {
        // handle replacing operator and period ending
        updatedInput = this.state.input.slice(0, -1) + keyValue;
      } else {
        updatedInput = this.state.input + keyValue;
      }

      this.setState({
        input: updatedInput
      });
      console.log(updatedInput);
    }
  }, {
    key: "handleEqual",
    value: function handleEqual() {}
  }, {
    key: "handleClear",
    value: function handleClear() {
      this.setState({
        input: "0"
      });
      console.log("cleared");
    }
  }, {
    key: "handleDelete",
    value: function handleDelete() {
      var input = this.state.input;
      var updatedInput = input.slice(0, -1);
      this.setState({
        input: updatedInput === "" ? "0" : updatedInput
      });
      console.log(updatedInput);
    }
  }, {
    key: "render",
    value: function render() {
      var input = this.state.input;
      var formula = this.state.formula;
      return React.createElement(
        "div",
        null,
        React.createElement(DisplayScreen, { formula: formula, display: input }),
        React.createElement(
          "div",
          { className: "row" },
          React.createElement(Button, { value: "C", id: "clear", onClick: this.handleClear }),
          React.createElement(Button, { value: "DEL", id: "delete", onClick: this.handleDelete })
        ),
        React.createElement(
          "div",
          { className: "row" },
          React.createElement(Button, { value: "7", id: "seven", onClick: this.handleDigit }),
          React.createElement(Button, { value: "8", id: "eight", onClick: this.handleDigit }),
          React.createElement(Button, { value: "9", id: "nine", onClick: this.handleDigit }),
          React.createElement(Button, { value: "/", id: "divide", onClick: this.handleOperator })
        ),
        React.createElement(
          "div",
          { className: "row" },
          React.createElement(Button, { value: "4", id: "four", onClick: this.handleDigit }),
          React.createElement(Button, { value: "5", id: "five", onClick: this.handleDigit }),
          React.createElement(Button, { value: "6", id: "six", onClick: this.handleDigit }),
          React.createElement(Button, { value: "*", id: "multiply", onClick: this.handleOperator })
        ),
        React.createElement(
          "div",
          { className: "row" },
          React.createElement(Button, { value: "1", id: "one", onClick: this.handleDigit }),
          React.createElement(Button, { value: "2", id: "two", onClick: this.handleDigit }),
          React.createElement(Button, { value: "3", id: "three", onClick: this.handleDigit }),
          React.createElement(Button, { value: "-", id: "substract", onClick: this.handleOperator })
        ),
        React.createElement(
          "div",
          { className: "row" },
          React.createElement(Button, { value: "0", id: "zero", onClick: this.handleDigit }),
          React.createElement(Button, { value: ".", id: "decimal", onClick: this.handlePeriod }),
          React.createElement(Button, { value: "=", id: "equals", onClick: this.handleEqual }),
          React.createElement(Button, { value: "+", id: "add", onClick: this.handleOperator })
        )
      );
    }
  }]);

  return Calculator;
}(React.Component);

ReactDOM.render(React.createElement(Calculator, null), document.getElementById("root"));
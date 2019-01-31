var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function setActiveKey(key) {
  keyID = {
    "0": "zero",
    "1": "one",
    "2": "two",
    "3": "three",
    "4": "four",
    "5": "five",
    "6": "six",
    "7": "seven",
    "8": "eight",
    "9": "nine",
    ".": "decimal",
    "+": "add",
    "-": "subtract",
    "*": "multiply",
    "/": "divide",
    enter: "equals",
    backspace: "delete",
    escape: "clear",
    c: "clear"
  };
  var DOM_Key = document.getElementById(keyID[key.toLowerCase()]);
  console.log(keyID[key]);
  DOM_Key.classList.add("active");
  setTimeout(function () {
    DOM_Key.classList.remove("active");
  }, 150);
}

function Button(props) {
  return React.createElement(
    "button",
    {
      className: props.className,
      id: props.idValue,
      onClick: props.onClick
    },
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
      props.formula + (props.formula ? "=" : "")
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
    _this.handleKeyDown = _this.handleKeyDown.bind(_this);
    _this.state = {
      formula: "",
      input: "0",
      result: ""
    };
    return _this;
  }

  _createClass(Calculator, [{
    key: "handleDigit",
    value: function handleDigit(e) {
      var keyValue = e.target.textContent;
      var updatedInput = void 0;

      if (this.state.result != "") {
        // handle key press after an operation has been made
        updatedInput = keyValue;
        this.setState({ formula: "", result: "" });
      } else if (/(^0$)|([\+\-\*\/]0)$/.test(this.state.input)) {
        // handle leading '0' at operands
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
    key: "handlePeriod",
    value: function handlePeriod() {
      var updatedInput = void 0;

      if (this.state.result != "") {
        // handle key press after an operation has been made
        updatedInput = "0.";
        this.setState({ formula: "", result: "" });
      } else if (/\.\d*$/.test(this.state.input)) {
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
    value: function handleOperator(char) {
      var keyValue = char;
      var updatedInput = void 0;

      if (this.state.result !== "") {
        // handle key press after an operation has been made
        updatedInput = this.state.result + keyValue;
        this.setState({ formula: "", result: "" });
      } else if (/[\+\-\*\/\.]$/.test(this.state.input)) {
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
    value: function handleEqual() {
      var formulaValue = this.state.formula === "" ? this.state.input : this.state.formula;
      var result = eval(formulaValue);
      result = Math.round(result * Math.pow(10, 10)) / Math.pow(10, 10);
      result = result.toString();

      this.setState({
        formula: formulaValue,
        input: "0",
        result: result
      });

      console.log(result);
    }
  }, {
    key: "handleClear",
    value: function handleClear() {
      this.setState({
        formula: "",
        input: "0",
        result: ""
      });
      console.log("cleared");
    }
  }, {
    key: "handleDelete",
    value: function handleDelete() {
      if (this.state.result != "") {
        // handle key press after an operation has been made
        this.setState({ formula: "", result: "" });
      }

      var input = this.state.input;
      var updatedInput = input.slice(0, -1);
      this.setState({
        input: updatedInput === "" ? "0" : updatedInput
      });
      console.log(updatedInput);
    }
  }, {
    key: "handleKeyDown",
    value: function handleKeyDown(e) {
      console.log("key " + e.key + " was pressed");
      var key = e.key;
      // creating a sintetic event to emulate clicking over the buttons
      var eventKey = { target: { textContent: key } };

      // handling all valid keys
      if (/^[0-9]$/.exec(key)) {
        setActiveKey(key);
        this.handleDigit(eventKey);
      } else if (/^\.$/.exec(key)) {
        setActiveKey(key);
        this.handlePeriod();
      } else if (/^[\+\-\*\/]$/.exec(key)) {
        e.preventDefault(); // prevent browser key bindings for '/'
        setActiveKey(key);
        this.handleOperator(key);
      } else if (/^enter$/i.exec(key)) {
        e.preventDefault(); // prevent focused key to be clicked
        setActiveKey(key);
        this.handleEqual();
      } else if (/^backspace$/i.exec(key)) {
        setActiveKey(key);
        this.handleDelete();
      } else if (/^(escape)|(c)$/i.exec(key)) {
        setActiveKey(key);
        this.handleClear();
      }
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      addEventListener("keydown", this.handleKeyDown);
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      removeEventListener("keydown", this.handleKeyDown);
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var formula = this.state.formula;
      var input = this.state.input;
      var result = this.state.result;

      var display = result !== "" ? result : input;

      return React.createElement(
        "div",
        { id: "calculator" },
        React.createElement(DisplayScreen, { formula: formula, display: display }),
        React.createElement(
          "div",
          { className: "row" },
          React.createElement(Button, { value: "C", idValue: "clear", onClick: this.handleClear }),
          React.createElement(Button, {
            value: "keyboard_backspace",
            className: "material-icons",
            idValue: "delete",
            onClick: this.handleDelete
          }),
          React.createElement(Button, {
            value: "\xF7",
            idValue: "divide",
            onClick: function onClick() {
              return _this2.handleOperator("/");
            }
          })
        ),
        React.createElement(
          "div",
          { className: "row" },
          React.createElement(Button, { value: "7", idValue: "seven", onClick: this.handleDigit }),
          React.createElement(Button, { value: "8", idValue: "eight", onClick: this.handleDigit }),
          React.createElement(Button, { value: "9", idValue: "nine", onClick: this.handleDigit }),
          React.createElement(Button, {
            value: "\xD7",
            idValue: "multiply",
            onClick: function onClick() {
              return _this2.handleOperator("*");
            }
          })
        ),
        React.createElement(
          "div",
          { className: "row" },
          React.createElement(Button, { value: "4", idValue: "four", onClick: this.handleDigit }),
          React.createElement(Button, { value: "5", idValue: "five", onClick: this.handleDigit }),
          React.createElement(Button, { value: "6", idValue: "six", onClick: this.handleDigit }),
          React.createElement(Button, {
            value: "\u2212",
            idValue: "subtract",
            onClick: function onClick() {
              return _this2.handleOperator("-");
            }
          })
        ),
        React.createElement(
          "div",
          { className: "row" },
          React.createElement(Button, { value: "1", idValue: "one", onClick: this.handleDigit }),
          React.createElement(Button, { value: "2", idValue: "two", onClick: this.handleDigit }),
          React.createElement(Button, { value: "3", idValue: "three", onClick: this.handleDigit }),
          React.createElement(Button, {
            value: "+",
            idValue: "add",
            onClick: function onClick() {
              return _this2.handleOperator("+");
            }
          })
        ),
        React.createElement(
          "div",
          { className: "row" },
          React.createElement(Button, { value: "0", idValue: "zero", onClick: this.handleDigit }),
          React.createElement(Button, { value: ".", idValue: "decimal", onClick: this.handlePeriod }),
          React.createElement(Button, { value: "=", idValue: "equals", onClick: this.handleEqual })
        )
      );
    }
  }]);

  return Calculator;
}(React.Component);

ReactDOM.render(React.createElement(Calculator, null), document.getElementById("root"));
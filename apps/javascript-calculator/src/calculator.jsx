function Button(props) {
  return (
    <button
      className={props.className}
      id={props.idValue}
      onClick={props.onClick}
    >
      {props.value}
    </button>
  );
}

function DisplayScreen(props) {
  return (
    <div id="display-screen">
      <p id="formula-display">{props.formula}</p>
      <p id="display">{props.display}</p>
    </div>
  );
}

class Calculator extends React.Component {
  constructor(props) {
    super(props);
    this.handleDigit = this.handleDigit.bind(this);
    this.handlePeriod = this.handlePeriod.bind(this);
    this.handleOperator = this.handleOperator.bind(this);
    this.handleEqual = this.handleEqual.bind(this);
    this.handleClear = this.handleClear.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.state = {
      formula: "",
      input: "0",
      result: ""
    };
  }

  handleDigit(e) {
    const keyValue = e.target.textContent;
    let updatedInput;

    if (this.state.result != "") {
      // handle key press after an operation has been made
      updatedInput = keyValue;
      this.setState({ formula: "", result: "" });
    } else if (/(^0$)|([\+\-\*\/]0)$/.exec(this.state.input)) {
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

  handlePeriod() {
    let updatedInput;

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

  handleOperator(char) {
    const keyValue = char;
    let updatedInput;

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

  handleEqual() {
    const formulaValue =
      this.state.input !== "0" ? this.state.input : this.state.formula;
    let result = eval(formulaValue);
    result = Math.round(result * 10 ** 10) / 10 ** 10;
    result = result.toString();

    this.setState({
      formula: formulaValue,
      input: "0",
      result: result
    });

    console.log(result);
  }

  handleClear() {
    this.setState({
      formula: "",
      input: "0",
      result: ""
    });
    console.log("cleared");
  }

  handleDelete() {
    if (this.state.result != "") {
      // handle key press after an operation has been made
      this.setState({ formula: "", result: "" });
    }

    const input = this.state.input;
    const updatedInput = input.slice(0, -1);
    this.setState({
      input: updatedInput === "" ? "0" : updatedInput
    });
    console.log(updatedInput);
  }

  handleKeyDown(e) {
    console.log(`key ${e.key} was pressed`);
    const key = e.key;
    // creating a sintetic event to emulate clicking over the buttons
    let eventKey = { target: { textContent: key } };

    // handling all valid keys
    if (/^[0-9]$/.exec(key)) {
      this.handleDigit(eventKey);
    } else if (/^\.$/.exec(key)) {
      this.handlePeriod();
    } else if (/^[\+\-\*\/]$/.exec(key)) {
      e.preventDefault(); // prevent browser key bindings for '/'
      this.handleOperator(eventKey);
    } else if (/^enter$/i.exec(key)) {
      this.handleEqual();
    } else if (/^backspace$/i.exec(key)) {
      this.handleDelete();
    } else if (/^escape$/i.exec(key)) {
      this.handleClear();
    }
  }

  componentDidMount() {
    addEventListener("keydown", this.handleKeyDown);
  }

  componentWillUnmount() {
    removeEventListener("keydown", this.handleKeyDown);
  }

  render() {
    const formula = this.state.formula;
    const input = this.state.input;
    const result = this.state.result;

    const display = result !== "" ? result : input;

    return (
      <div>
        <DisplayScreen formula={formula} display={display} />
        <div className="row">
          <Button value="C" idValue="clear" onClick={this.handleClear} />
          <Button
            value="🡐"
            idValue="delete"
            onClick={this.handleDelete}
          />
          <Button value="÷" idValue="divide" onClick={()=>this.handleOperator('/')} />
        </div>
        <div className="row">
          <Button value="7" idValue="seven" onClick={this.handleDigit} />
          <Button value="8" idValue="eight" onClick={this.handleDigit} />
          <Button value="9" idValue="nine" onClick={this.handleDigit} />
          <Button value="×" idValue="multiply" onClick={() => this.handleOperator('*')} />
        </div>
        <div className="row">
          <Button value="4" idValue="four" onClick={this.handleDigit} />
          <Button value="5" idValue="five" onClick={this.handleDigit} />
          <Button value="6" idValue="six" onClick={this.handleDigit} />
          <Button value="−" idValue="subtract" onClick={() => this.handleOperator('-')} />
        </div>
        <div className="row">
          <Button value="1" idValue="one" onClick={this.handleDigit} />
          <Button value="2" idValue="two" onClick={this.handleDigit} />
          <Button value="3" idValue="three" onClick={this.handleDigit} />
          <Button value="+" idValue="add" onClick={() => this.handleOperator('+')} />
        </div>
        <div className="row">
          <Button value="0" idValue="zero" onClick={this.handleDigit} />
          <Button value="." idValue="decimal" onClick={this.handlePeriod} />
          <Button value="=" idValue="equals" onClick={this.handleEqual} />
        </div>
      </div>
    );
  }
}

ReactDOM.render(<Calculator />, document.getElementById("root"));

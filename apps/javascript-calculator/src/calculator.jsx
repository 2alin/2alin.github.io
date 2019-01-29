function Button(props) {
  return <button onClick={props.onClick}>{props.value}</button>;
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
    this.state = {
      input: "0",
      formula: ""
    };
  }

  handleDigit(e) {
    const keyValue = e.target.textContent;
    let updatedInput;
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

  handlePeriod() {
    let updatedInput;
    if (/\.\d*$/.test(this.state.input)) {
      // handle multiple periods
      updatedInput = this.state.input;
    } else if (/[^\d]$/.test(this.state.input)) {
      // handle operands starting without a digit
      updatedInput = this.state.input + "0."
    } else {
      updatedInput = this.state.input + ".";
    }

    this.setState({
      input: updatedInput
    });
    console.log(updatedInput);
  }

  handleOperator(e) {
    const keyValue = e.target.textContent;
    let updatedInput;
    if (/[\+\-\*\/\.]$/.test(this.state.input)) {
      // handle replacing operator and period ending
      updatedInput = this.state.input.slice(0,-1) + keyValue;
    } else {
      updatedInput = this.state.input + keyValue;
    }

    this.setState({
      input: updatedInput
    });
    console.log(updatedInput);
  }

  handleEqual() {
    
  }

  handleClear() {
    this.setState({
      input: "0"
    });
    console.log("cleared");
  }

  handleDelete() {
    const input = this.state.input;
    const updatedInput = input.slice(0, -1);
    this.setState({
      input: updatedInput === "" ? "0" : updatedInput
    });
    console.log(updatedInput);
  }

  render() {
    const input = this.state.input;
    const formula = this.state.formula;
    return (
      <div>
        <DisplayScreen formula={formula} display={input} />
        <div className="row">
          <Button value="C" id="clear" onClick={this.handleClear} />
          <Button value="DEL" id="delete" onClick={this.handleDelete} />
        </div>
        <div className="row">
          <Button value="7" id="seven" onClick={this.handleDigit} />
          <Button value="8" id="eight" onClick={this.handleDigit} />
          <Button value="9" id="nine" onClick={this.handleDigit} />
          <Button value="/" id="divide" onClick={this.handleOperator} />
        </div>
        <div className="row">
          <Button value="4" id="four" onClick={this.handleDigit} />
          <Button value="5" id="five" onClick={this.handleDigit} />
          <Button value="6" id="six" onClick={this.handleDigit} />
          <Button value="*" id="multiply" onClick={this.handleOperator} />
        </div>
        <div className="row">
          <Button value="1" id="one" onClick={this.handleDigit} />
          <Button value="2" id="two" onClick={this.handleDigit} />
          <Button value="3" id="three" onClick={this.handleDigit} />
          <Button value="-" id="substract" onClick={this.handleOperator} />
        </div>
        <div className="row">
          <Button value="0" id="zero" onClick={this.handleDigit} />
          <Button value="." id="decimal" onClick={this.handlePeriod} />
          <Button value="=" id="equals" onClick={this.handleEqual}/>
          <Button value="+" id="add" onClick={this.handleOperator} />
        </div>
      </div>
    );
  }
}

ReactDOM.render(<Calculator />, document.getElementById("root"));

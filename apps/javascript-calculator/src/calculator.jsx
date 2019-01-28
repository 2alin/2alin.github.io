function Button(props) {
  return <button onClick={props.onClick}>{props.value}</button>;
}

class Calculator extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.handleClear = this.handleClear.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.state = {
      input: ""
    };
  }

  handleClick(e) {
    const keyValue = e.target.textContent;
    const updatedInput = this.state.input + keyValue;
    this.setState({
      input: updatedInput
    });
    console.log(updatedInput);
  }

  handleClear() {
    this.setState({
      input: ''
    })
    console.log('cleared')
  }

  handleDelete() {
    const input = this.state.input;
    const updatedInput = input.slice(0, -1);
    this.setState({
      input: updatedInput
    })
    console.log(updatedInput)
  }

  render() {
    return (
      <div>
        <div className="row">
          <Button value="C" onClick={this.handleClear}/>
          <Button value="DEL" onClick={this.handleDelete}/>
        </div>
        <div className="row">
          <Button value="7" onClick={this.handleClick} />
          <Button value="8" onClick={this.handleClick} />
          <Button value="9" onClick={this.handleClick} />
          <Button value="÷" />
        </div>
        <div className="row">
          <Button value="4" onClick={this.handleClick} />
          <Button value="5" onClick={this.handleClick} />
          <Button value="6" onClick={this.handleClick} />
          <Button value="×" />
        </div>
        <div className="row">
          <Button value="1" onClick={this.handleClick} />
          <Button value="2" onClick={this.handleClick} />
          <Button value="3" onClick={this.handleClick} />
          <Button value="−" />
        </div>
        <div className="row">
          <Button value="0" onClick={this.handleClick} />
          <Button value="." onClick={this.handleClick} />
          <Button value="=" />
          <Button value="+" />
        </div>
      </div>
    );
  }
}

ReactDOM.render(<Calculator />, document.getElementById("root"));

const { CSSTransition, TransitionGroup } = ReactTransitionGroup;

let root = document.documentElement;

const API_LINK =
  "https://andruxnet-random-famous-quotes.p.mashape.com/?cat=famous";
const API_HEADERS = {
  "X-Mashape-Key": "fAn7NcSc4dmshsAkSswz2r6FgSQQp1yrjTKjsnhpxg1yzpUIxA",
  Accept: "application/json"
};

const COLORS = [
  "#843b62",
  "#5c7893",
  "#c85108",
  "#a20e0e",
  "#f05d23",
  "#612147",
  "#0c907d",
  "#5c848e",
  "#929aab",
  "#616f39",
  "#ed6363  ",
  "#00541a",
  "#5c3c10",
  "#d56073",
  "#326765"
];

function randomColorIndex(currentIndex) {
  let newIndex;
  newIndex = currentIndex + Math.floor(Math.random() * (COLORS.length - 2) + 1);
  newIndex = newIndex % COLORS.length;
  return newIndex;
}

function TweetButton(props) {
  return (
    <button type="button" onClick={props.onClick} id="tweet-quote">
      <span className="fab fa-twitter"> </span>
    </button>
  );
}

function NewButton(props) {
  return (
    <button onClick={props.onClick} id="new-quote">
      <span className="fa fa-random"> </span>
    </button>
  );
}

function Quote(props) {
  return (
    <main className={props.className}>
      <blockquote id="text">{props.quote.text}</blockquote>
      <cite id="author">{props.quote.author}</cite>
    </main>
  );
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      display: false,
      fetched: false,
      colorIndex: 0,
      quote: {
        text: "",
        author: ""
      }
    };
    this.updateQuote = this.updateQuote.bind(this);
    this.handleClickNew = this.handleClickNew.bind(this);
    this.handleClickTweet = this.handleClickTweet.bind(this);
  }

  componentWillMount() {
    this.updateQuote();
  }

  updateQuote() {
    console.log("I'm updating")
    this.setState({ fetched: false });
    fetch(API_LINK, { headers: API_HEADERS })
      .then(response => response.json())
      .then(data => {
        this.setState({
          fetched: true,
          display: true,
          colorIndex: randomColorIndex(this.state.colorIndex),
          quote: {
            text: data[0].quote,
            author: data[0].author
          }
        });        
        root.style.setProperty("--main-color", COLORS[this.state.colorIndex]);  
      });
  }

  handleClickNew() {
    if (this.state.display) {
      this.setState({ display: false });
      clearTimeout(this.timeoutID);
      this.timeoutID = setTimeout(this.updateQuote, 1000);
    }
  }

  handleClickTweet() {
    const URL =
      "https://twitter.com/intent/tweet?hashtags=quotes&text=" +
      '"' +
      this.state.quote.text +
      '" ' +
      this.state.quote.author;
    // const URL = 'https://twitter.com/';
    window.open(URL, "_blank");
    console.log("tweeted");
  }

  render() {
    return (
      <div id="container">
        <div id="quote-box">
          <CSSTransition
            in={this.state.display}
            timeout={1000}
            classNames="quote"
            unmountOnExit
          >
            <Quote quote={this.state.quote} className="quote" />
          </CSSTransition>
          <footer>
            <TweetButton onClick={this.handleClickTweet} />
            <NewButton onClick={this.handleClickNew} />
          </footer>
        </div>
        <footer id="credits">
          by{" "}
          <a
            href="http://twitter.com/2alin"
            target="_blank"
            rel="noopener noreferrer"
          >
            adilson
          </a>
        </footer>
      </div>
    );
  }
}
ReactDOM.render(<App />, document.getElementById("root"));

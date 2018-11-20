var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _ReactTransitionGroup = ReactTransitionGroup,
    CSSTransition = _ReactTransitionGroup.CSSTransition,
    TransitionGroup = _ReactTransitionGroup.TransitionGroup;


var root = document.documentElement;

var API_LINK = "https://andruxnet-random-famous-quotes.p.mashape.com/?cat=famous";
var API_HEADERS = {
  "X-Mashape-Key": "fAn7NcSc4dmshsAkSswz2r6FgSQQp1yrjTKjsnhpxg1yzpUIxA",
  Accept: "application/json"
};

var COLORS = ["#843b62", "#5c7893", "#c85108", "#a20e0e", "#f05d23", "#612147", "#0c907d", "#5c848e", "#929aab", "#616f39", "#ed6363  ", "#00541a", "#5c3c10", "#d56073", "#326765"];

function randomColorIndex(currentIndex) {
  var newIndex = void 0;
  newIndex = currentIndex + Math.floor(Math.random() * (COLORS.length - 2) + 1);
  newIndex = newIndex % COLORS.length;
  return newIndex;
}

function TweetButton(props) {
  return React.createElement(
    "button",
    { type: "button", onClick: props.onClick, id: "tweet-quote" },
    React.createElement(
      "span",
      { className: "fab fa-twitter" },
      " "
    )
  );
}

function NewButton(props) {
  return React.createElement(
    "button",
    { onClick: props.onClick, id: "new-quote" },
    React.createElement(
      "span",
      { className: "fa fa-random" },
      " "
    )
  );
}

function Quote(props) {
  return React.createElement(
    "main",
    { className: props.className },
    React.createElement(
      "blockquote",
      { id: "text" },
      props.quote.text
    ),
    React.createElement(
      "cite",
      { id: "author" },
      props.quote.author
    )
  );
}

var App = function (_React$Component) {
  _inherits(App, _React$Component);

  function App(props) {
    _classCallCheck(this, App);

    var _this = _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).call(this, props));

    _this.state = {
      display: false,
      fetched: false,
      colorIndex: 0,
      quote: {
        text: "",
        author: ""
      }
    };
    _this.updateQuote = _this.updateQuote.bind(_this);
    _this.handleClickNew = _this.handleClickNew.bind(_this);
    _this.handleClickTweet = _this.handleClickTweet.bind(_this);
    return _this;
  }

  _createClass(App, [{
    key: "componentWillMount",
    value: function componentWillMount() {
      this.updateQuote();
    }
  }, {
    key: "updateQuote",
    value: function updateQuote() {
      var _this2 = this;

      console.log("I'm updating");
      this.setState({ fetched: false });
      fetch(API_LINK, { headers: API_HEADERS }).then(function (response) {
        return response.json();
      }).then(function (data) {
        _this2.setState({
          fetched: true,
          display: true,
          colorIndex: randomColorIndex(_this2.state.colorIndex),
          quote: {
            text: data[0].quote,
            author: data[0].author
          }
        });
        root.style.setProperty("--main-color", COLORS[_this2.state.colorIndex]);
      });
    }
  }, {
    key: "handleClickNew",
    value: function handleClickNew() {
      if (this.state.display) {
        this.setState({ display: false });
        clearTimeout(this.timeoutID);
        this.timeoutID = setTimeout(this.updateQuote, 1000);
      }
    }
  }, {
    key: "handleClickTweet",
    value: function handleClickTweet() {
      var URL = "https://twitter.com/intent/tweet?hashtags=quotes&text=" + '"' + this.state.quote.text + '" ' + this.state.quote.author;
      // const URL = 'https://twitter.com/';
      window.open(URL, "_blank");
      console.log("tweeted");
    }
  }, {
    key: "render",
    value: function render() {
      return React.createElement(
        "div",
        { id: "container" },
        React.createElement(
          "div",
          { id: "quote-box" },
          React.createElement(
            CSSTransition,
            {
              "in": this.state.display,
              timeout: 1000,
              classNames: "quote",
              unmountOnExit: true
            },
            React.createElement(Quote, { quote: this.state.quote, className: "quote" })
          ),
          React.createElement(
            "footer",
            null,
            React.createElement(TweetButton, { onClick: this.handleClickTweet }),
            React.createElement(NewButton, { onClick: this.handleClickNew })
          )
        ),
        React.createElement(
          "footer",
          { id: "credits" },
          "by",
          " ",
          React.createElement(
            "a",
            {
              href: "http://twitter.com/2alin",
              target: "_blank",
              rel: "noopener noreferrer"
            },
            "adilson"
          )
        )
      );
    }
  }]);

  return App;
}(React.Component);

ReactDOM.render(React.createElement(App, null), document.getElementById("root"));
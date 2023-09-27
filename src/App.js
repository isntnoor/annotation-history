import logo from "./logo.svg";
import "./App.css";
import { useEffect, useRef, useState } from "react";
import { Stage, Layer, Image } from "react-konva";

// var quotes = ["this is quote 1", "this is quote 2"];

// var current_quote = "this is not the curr";

function App() {
  const [quotes, setQuotes] = useState(["this is quote 1", "this is quote 2"]);
  const [curr, setCurr] = useState("this is curr strin");
  const [input, setInput] = useState("");

  const [dimensions, setDimensions] = useState({
    width: 0,
    height: 0,
  });

  const divRef = useRef(null);

  const [image, setImage] = useState(new window.Image());

  useEffect(() => {
    const img = new window.Image();
    img.src =
      "https://plus.unsplash.com/premium_photo-1673734625879-2dd5410bc3e1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80";
    setImage(img);
  }, []);

  useEffect(() => {
    if (divRef.current?.offsetHeight && divRef.current?.offsetWidth) {
      setDimensions({
        width: divRef.current.offsetWidth - 50,
        height: divRef.current.offsetHeight - 50,
      });
    }
  }, []);

  useEffect(() => {
    const storedArray = JSON.parse(localStorage.getItem("myQuotes"));
    const currString = localStorage.getItem("currQuote");
    if (storedArray) {
      setQuotes(storedArray);
    }
    if (currString) {
      setCurr(currString);
    }
  }, []);

  console.log(JSON.parse(localStorage.getItem("myQuotes")));

  const quote_list = quotes.map(function (text, index) {
    // console.log(index)
    // console.log(index)
    return (
      <div
        key={index}
        style={{ marginBottom: "5px" }}
        onClick={() => {
          update_quote(index);
        }}
        className="click-div p-6 bg-white border border-gray-200 rounded-lg  dark:border-gray-700"
      >
        {index + 1}.&nbsp;&nbsp;&nbsp;
        {text}
        <br></br>
      </div>
    );
  });

  const update_quote = (index) => {
    // setQuotes([curr , ...quotes])
    quotes.unshift(curr);
    // setQuotes
    setCurr(quotes[index + 1]);
    // current_quote = quotes[index];
    quotes.splice(index + 1, 1);
    localStorage.setItem("myQuotes", JSON.stringify(quotes));
    localStorage.setItem("currQuote", curr);
  };

  return (
    <div className="App">
      <div className="grid grid-cols-2 gap-4 ">
        <div
          className="bg-gray-200 p-4"
          style={{ minHeight: "750px" , }}
          ref={divRef}
        >
          <h2
            className="text-3xl font-bold underline"
            style={{ marginBottom: "10px" }}
          >
            Image
          </h2>

          <Stage width={dimensions.width} height={dimensions.height}>
            <Layer>
              <Image
                x={0}
                y={0}
                image={image}
                width={dimensions.width}
                height={dimensions.height}
              />
            </Layer>
          </Stage>

          {/* <img src="https://plus.unsplash.com/premium_photo-1673734625879-2dd5410bc3e1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80"></img> */}
        </div>
        <div
          style={{ maxHeight: "800px" }}
          className="bg-gray-200 p-4 overflow-auto"
        >
          <h2
            className="text-3xl font-bold underline"
            style={{ marginBottom: "10px" }}
          >
            Annotation History
          </h2>

          {quote_list}
        </div>
        <div className="bg-gray-200 p-4">
          <h3 className="text-3xl font-bold">{curr}</h3>
        </div>
        <div className="bg-gray-200 p-4">
          <div>
            {/* <h2>Add New Annotation</h2> */}
            <form
              onSubmit={(e) => {
                // setQuotes([input, ...quotes]);
                e.preventDefault();
                quotes.unshift(input);
                update_quote(0);
                console.log(quotes);
                localStorage.setItem("myQuotes", JSON.stringify(quotes));
                localStorage.setItem("currQuote", curr);
              }}
            >
              <input
                className="py-2 px-4"
                style={{ marginRight: "20px" }}
                id="textinput"
                value={input}
                onChange={(e) => {
                  setInput(e.target.value);
                }}
              ></input>
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick={() => {
                  // setQuotes([input, ...quotes]);
                  quotes.unshift(input);
                  update_quote(0);
                  console.log(quotes);
                }}
              >
                add
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;

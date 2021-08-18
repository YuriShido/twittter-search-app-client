import React, { useState, useEffect, useCallback, useRef } from 'react';
import './App.css';
import axios from 'axios'
// import socketIo from  'socket.io'
import TweetCard from './component/TweetCard'


function App() {
  const [serverData, setServerData] = useState ({ search_metadata: {}, statuses: []})
  const [input, setInput] = useState()
  const [sendInput, setSendInput] = useState()
  const [toggle, setToggle] = useState(true)
  const textRef = useRef(null)
  useEffect(() => {
    const getData = () => {
      
      axios.get("http://localhost:8000/")
      .then((response) => {
        // console.log('data!!!', response.data.statuses[0].created_at);
        console.log(response.data);
        setServerData({...response.data})

      })
      .then(setToggle(true))
      .catch( err => console.log(err))
      
    }
    
    getData()
    
  }, [input,toggle])
  console.log('data:',serverData);
  
  const handleSearch = async(e) => {
    e.preventDefault()
    // setSendInput(input)
    // console.log(sendInput);
    console.log(textRef.current.value);
    let inputValue = textRef.current.value
    setInput(inputValue)
    try {
      const inputData = {
        inputValue
      }
      console.log(inputValue);
      await axios.post("http://localhost:8000/search", inputData)
      .then(setToggle(false))
      console.log('toggle:',toggle);
    } catch (error) {
      console.log("Error: ",error.response)

    }
  }
  console.log("after function INPUT",input);
  const handleClick = async() => {
      await axios.get("http://localhost:8000/update")
      .then((response) => {
        // console.log('data!!!', response.data.statuses[0].created_at);
        setServerData(response.data)
      })
  }
  // const handleOnChange = (e) => {
  //     setInput(e.target.value)
  //     console.log(input);
  //     setSendInput(input)
  // }

  return (
    <div className="App">
      {/* <div className="header-container"> */}

      <div className="header">
      <h1 className="title">Search the Tweet</h1>
      <form onSubmit={handleSearch}>
        {/* <input className="input" type="text" onChange={(e) => setInput(e.target.value)}/> */}
        <input className="input" type="text" ref={textRef} />
        {/* <input type="text" onChange={(e) => handleOnChange(e)}/> */}
        <input className="search-btn" type="submit" value="search"/>
      </form>
      <button className="btn" onClick={handleClick}>Web Job</button>
      </div>
      {/* </div> */}
      {/* {
        serverData ?
        (serverData.statuses.map(tweet => (
          <div key={tweet.id}>
          <p>{tweet.created_at}</p>
          <p>{tweet.text}</p>
          </div>
        ))
      ) : null
      } */}
      <div>
      <TweetCard serverData={serverData} />
      
      </div>

    </div>
  );
}

export default App;

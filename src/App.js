import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import axios from 'axios'
// import socketIo from  'socket.io'
import TweetCard from './component/TweetCard'


function App() {
  const [serverData, setServerData] = useState({ search_metadata: {}, statuses: [] })
  const [input, setInput] = useState()
  // const [sendInput, setSendInput] = useState()
  const [toggle, setToggle] = useState(true)
  const textRef = useRef(null)
  useEffect(() => {
    const getData = () => {

      axios.get(`${process.env.REACT_APP_SERVER_URL}`)
        .then((response) => {
          // console.log('data!!!', response.data.statuses[0].created_at);
          console.log('res data: ', response.data);
          if (response) {
            setServerData({ ...response.data })
          }

        })
        .then(setToggle(true))
        .catch(err => console.log(err))

    }

    getData()

  }, [input, toggle])
  console.log('data:', serverData);

  const handleSearch = async (e) => {
    e.preventDefault()
    // console.log(sendInput);
    console.log(textRef.current.value);
    let inputValue = textRef.current.value
    setInput(inputValue)
    try {
      const inputData = {
        inputValue
      }
      console.log(inputValue);
      await axios.post(`${process.env.REACT_APP_SERVER_URL}/search`, inputData)
        .then(setToggle(false))
      console.log('toggle:', toggle);
    } catch (error) {
      console.log("Error: ", error.response)

    }
  }
  console.log("after function INPUT", input);
  const handleClick = async () => {
    await axios.get(`${process.env.REACT_APP_SERVER_URL}/update`)
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
       
        <h1 className="title">find web job tweets</h1>

        <div className='topic-search'>
        <form onSubmit={handleSearch}>
          {/* <input className="input" type="text" onChange={(e) => setInput(e.target.value)}/> */}
          <input className="input" type="text" ref={textRef} placeholder="search anything" />
          {/* <input type="text" onChange={(e) => handleOnChange(e)}/> */}
          <input className="search-btn" type="submit" value="search" />
        </form>
        <button className="btn" onClick={handleClick}>Web Job <i className="fas fa-laptop-code"></i></button>
        </div>
        <p className="topic">Search Topic: <span className="topic-name">{serverData.search_metadata.query}</span></p>
      </div>
      
      <div>
        <TweetCard serverData={serverData} />
      </div>
      <p className="copy-right">&copy; Find web job tweets 2021, All Right Reserved</p>
    </div>
  );
}

export default App;

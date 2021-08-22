import React from 'react'
import '../App.css';

const TweetCard = ({ serverData }) => {
    return (
        <div className="TweetCard-container">
            {
                serverData.search_metadata && serverData.statuses.map(tweet => (

                    <div key={tweet.id} className="card clearfix">
                        <div className='user'>
                            <img className="icon-img" src={tweet.user.profile_image_url_https} alt="user-icon"/>
                            <p>{tweet.user.name}</p>
                            <div className='date'>

                            <p>{new Date(tweet.created_at).toLocaleTimeString()}</p>
                            <p>{new Date(tweet.created_at).toLocaleDateString()}</p>
                            </div>
                        </div>
                        {/* <p>{tweet.retweeted_status.text}</p> */}
                        <p className="text">{tweet.text}</p>
                        <a className="link" href={`https://twitter.com/${tweet.user.screen_name}`}>Go to page <i className="fab fa-twitter"></i></a>
                        {/* /status/${tweet.id} */}
                    </div>
                ))
            }
        </div>
    )
}

export default TweetCard

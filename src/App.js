
import './App.css';
import { useState } from 'react';
import { Log } from './Middleware/Middleware';
function App() {
   const [url, setUrl] = useState('');
  const [shortUrl, setShortUrl] = useState('');
  const shorterner= async ()=>{
    if(!url){
      alert("please enter your url")
      await Log("frontend", "warn", "utils", "No URL entered by user");
      return;
    }
    try{
       await Log("frontend", "info", "utils", `Sending URL to TinyURL API: ${url}`);
      const res = await fetch(`https://api.tinyurl.com/create`, {
  method: "POST",
  headers: {
    "Authorization": "Bearer iaBXg9WEvWsQFGn5mZHQVazfsxatxcl4PIiDcgFl7X10c7fDNUrANrqLzJOr",
    "Content-Type": "application/json"
  },
  body: JSON.stringify({
    url: url,
    domain: "tinyurl.com"
  })
});
       const data=await res.json();
       console.log(data);
       
       if (data.data && data.data.tiny_url) {
        await Log("frontend", "info", "utils", `Short URL generated successfully: ${data.data.tiny_url}`);
        setShortUrl(data.data.tiny_url);
        setUrl("")
      } else {
        alert("'Failed to shorten URL")
      }
    }catch(error){
      console.error("Error shortening URL:", error);
      alert("An error occured",error.message)
    }
  }
  return (
    <div className="App">
      <div>
        <h1>URL Shorterner App</h1>
        <input placeholder='Enter Your URL' value={url} onChange={(e)=>setUrl(e.target.value)}/><br/>
        <button onClick={shorterner}>Short URL</button>
        {shortUrl&&(
        <p>
           Short URL: <a href={shortUrl} target="_blank" rel="noopener noreferrer">{shortUrl}</a>
        </p>
      )}
      </div>
    </div>
  );
}

export default App;

import { useEffect, useState } from 'react';
import './App.css';
const Card = ({ title, description }) => {
  const [count,setCount] =useState(0);
  const [hasLiked, setHasLiked] = useState(false);
  const handleLike = () => {
    setHasLiked(!hasLiked);
    setCount(count + 1);
  }
 
  useEffect(() => {
     console.log(`${title} has been ${hasLiked ? 'liked' : 'unliked'}`);
  },[hasLiked]);
  
  return (
    <div className="card" >
      <h2>{title}  </h2>
      <p>{description}</p>
      <button onClick={handleLike}>{hasLiked ? 'Liked' : 'Like'} {count}</button>
    </div>
  )
}
const App = () => {
  return (
    <div className="card-container">
       
      <Card title="Card 1" description="description 1" />
      <Card title="Card 2" description="description 2" />
      <Card title="Card 3" description="description 3" />
    </div>
  )
}

export default App

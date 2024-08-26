import './App.css';
import ImageSlider from './components/imageSlider';

function App() {
  return (
    <div className="App">
      {/* image Slider component */}
      <ImageSlider url={"https://picsum.photos/v2/list"} limit={10}/>
    </div>
  );
}

export default App;

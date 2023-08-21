import { useEffect, useState } from 'react';
import { API_HOST } from './config';
import './App.css';

declare var window: any;
function App() {

  const [files, setFiles] = useState<FileList | null>(null);
  const [jsonData, setJsonData] = useState<string>('');

  const onSubmit = () => {
    if (!files) {
      return;
    }

    const formData = new FormData();
    formData.append('file', files[0]);

    fetch(`${API_HOST}/upload`, {
      method: 'POST',
      body: formData,
    })
      .then(resp => resp.json())
      .then(data => {
        setJsonData(JSON.stringify(data, null, 2));
      });
  };


  useEffect(() => {
    console.log('window', window.wx);
    console.log('window.wx.miniProgram', window?.wx?.miniProgram);
  }, []);

  const onTest = () => {
    console.log('click mini');
    if (window.wx && window.wx.miniProgram) {
      console.log('window', window);
      window.wx.miniProgram.navigateTo({ url: '/pages/index/index?needAuth=true' });
    }
  };


  return (
    <div className="App">
      <input type='file' onChange={(e) => {
        setFiles(e.target.files);
      }} />
      <button onClick={onSubmit}>upload</button>
      <br />
      <button onClick={onTest}>test mini app</button>
    </div>
  );
}

export default App;

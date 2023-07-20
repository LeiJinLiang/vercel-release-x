import { useState } from 'react';
import { API_HOST } from './config';
import './App.css';

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


  return (
    <div className="App">
      <input type='file' onChange={(e) => {
        setFiles(e.target.files);
      }} />
      <button onClick={onSubmit}>upload</button>
      <br />
    </div>
  );
}

export default App;

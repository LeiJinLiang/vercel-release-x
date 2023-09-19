import { useEffect, useState } from "react";
import { API_HOST } from "./config";
import "./App.css";

declare var window: any;
function App() {
  const [files, setFiles] = useState<FileList | null>(null);
  const [jsonData, setJsonData] = useState<string>("");

  const onSubmit = () => {
    if (!files) {
      return;
    }

    const formData = new FormData();
    formData.append("file", files[0]);

    fetch(`${API_HOST}/upload`, {
      method: "POST",
      body: formData,
    })
      .then((resp) => resp.json())
      .then((data) => {
        setJsonData(JSON.stringify(data, null, 2));
      });
  };

  useEffect(() => {
    console.log("window", window.wx);
    console.log("window.wx.miniProgram", window?.wx?.miniProgram);
  }, []);

  const onTest = () => {
    console.log("click mini");
    if (window.wx && window.wx.miniProgram) {
      console.log("window", window);
      window.wx.miniProgram.navigateTo({
        url: "/pages/index/index?needAuth=true",
      });
    }
  };

  const onDebugger = () => {
    window.open("https://www.baidu.com");
  };

  const onDebugger2 = (e: any) => {
    e.preventDefault();
    window.location.href = "https://www.baidu.com";
  };

  const isInWechatMP = () => {
    return !!((navigator.userAgent.match(/micromessenger/i) && navigator.userAgent.match(/miniprogram/i)) || window.__wxjs_environment === 'miniprogram');
  };

  return (
    <div className="App">
      <input
        type="file"
        onChange={(e) => {
          setFiles(e.target.files);
        }}
      />
      <button onClick={onSubmit}>upload</button>
      <br />
      <button onClick={onTest}>test mini app</button>

      <button onClick={onDebugger}>debugger</button>
      <button onClick={onDebugger2}>debugger2</button>
      <a href="https://www.lilith.com/termofservice" target="_blank">
        《用户协议》
      </a>
      <a href="https://www.lilith.com/termofservice">《用户协议》2</a>

      <div
        onClick={(e: any) => {
          e.preventDefault();
          window.location.href = "https://www.lilithgames.com/privacy";
        }}
      >
        《隐私政策》
      </div>
      <div
        onClick={(e: any) => {
          window.location.href = "https://www.lilithgames.com/privacy";
        }}
      >
        《隐私政策222》
      </div>
      <h3>{isInWechatMP()}</h3>
      <div>{JSON.stringify(navigator.userAgent)}</div>
    </div>
  );
}

export default App;

import { Html5Qrcode, Html5QrcodeScanner } from "html5-qrcode";
import { useEffect, useRef, useState } from "react";

import "./App.css";

function App() {
  const scannerRef = useRef<Html5Qrcode | null>(null);
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  // 1. 첫 렌더링 시, qr 스캐너 실행
  useEffect(() => {
    scannerRef.current = new Html5Qrcode("reader");
    const qrCodeSuccessCallback = (decodedText: any, decodedResult: any) => {
      /* handle success */
    };
    const config = {
      fps: 20,
      qrbox: {
        width: 236,
        height: 236,
      },
    };

    // If you want to prefer front camera
    scannerRef.current.start(
      { facingMode: "environment" },
      config,
      qrCodeSuccessCallback,
      undefined
    );

    return () => {
      scannerRef.current?.clear();
    };
  }, [windowSize]);

  return (
    <div className="test">
      <div id="reader" style={{ width: "100%" }} />
    </div>
  );
}

export default App;

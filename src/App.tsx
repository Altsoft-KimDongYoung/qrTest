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
      qrbox: (viewfinderWidth: any, viewfinderHeight: any) => {
        // 중앙에 위치할 스캔 영역 크기 설정
        const boxSize = Math.min(viewfinderWidth, viewfinderHeight) * 0.5;
        return { width: boxSize, height: boxSize };
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
    <div
      id="reader"
      style={{
        width: "100dvw",
        height: "100dvh",
      }}
    />
  );
}

export default App;

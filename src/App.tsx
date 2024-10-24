import { Html5Qrcode, Html5QrcodeScanner } from "html5-qrcode";
import { useEffect, useRef, useState } from "react";

function App() {
  const scannerRef = useRef<Html5QrcodeScanner | null>(null);
  const [test, setTest] = useState(true);

  // useEffect(() => {
  //   const checkCameraPermission = async () => {
  //     try {
  //       // TypeScript에서는 'camera'를 PermissionDescriptor로 명시적으로 변환
  //       const permissionStatus = await navigator.permissions.query({
  //         name: "camera" as PermissionDescriptor["name"],
  //       });

  //       console.log("permissionStatus", permissionStatus);
  //       // 권한 상태가 변경될 때마다 업데이트
  //       permissionStatus.onchange = () => {
  //         console.log(
  //           "permissionStacdajdajdajdlkajdakjdkajdadjtus",
  //           permissionStatus
  //         );

  //         setTimeout(() => {
  //           const cameraStartButton = document.getElementById(
  //             "html5-qrcode-button-camera-start"
  //           );
  //           console.log("cameraStartButton", cameraStartButton);
  //           cameraStartButton?.click();
  //         }, 3000);
  //       };
  //     } catch (error) {
  //       console.error("권한 상태를 확인하는 데 오류가 발생했습니다:", error);
  //     }
  //   };

  //   checkCameraPermission();
  // }, []);

  function checkMediaPermissions() {
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then((stream) => {
        console.log("Camera and microphone access granted");
        // 권한이 허용되었으면 주기적으로 권한을 요청하는 것을 멈추거나 필요한 작업을 합니다.
        clearInterval(permissionInterval); // 주기적인 요청을 멈춥니다.
        setTimeout(() => {
          const cameraStartButton = document.getElementById(
            "html5-qrcode-button-camera-start"
          );
          console.log("cameraStartButton", cameraStartButton);
          cameraStartButton?.click();
        }, 3000);
        // 스트림 사용
      })
      .catch((error) => {
        if (error.name === "NotAllowedError") {
          console.log("Camera and microphone access denied");
        } else {
          console.log("Error occurred:", error.name);
        }
      });
  }

  // 5초(5000ms) 간격으로 권한을 요청
  const permissionInterval = setInterval(checkMediaPermissions, 5000);

  // async function checkPermission() {
  //   try {
  //     const permissionStatus = await navigator.permissions.query({
  //       name: "camera" as PermissionDescriptor["name"],
  //     });

  //     const handlePermissionChange = () => {
  //       console.log("Permission changed:", permissionStatus.state);
  //     };

  //     // 수동으로 상태를 주기적으로 체크하는 방식 (폴링)
  //     setInterval(() => {
  //       handlePermissionChange();
  //     }, 3000); // 1초마다 권한 상태 확인
  //   } catch (error) {
  //     console.error("Permissions API is not supported in this browser.");
  //   }
  // }

  // useEffect(() => {
  //   checkPermission();
  // }, []);

  useEffect(() => {
    setTimeout(() => {
      const cameraStartButton = document.getElementById(
        "html5-qrcode-button-camera-permission"
      );
      cameraStartButton?.click();
    }, 1000);

    try {
      Html5Qrcode.getCameras()
        .then((cameras) => {
          if (cameras && cameras.length) {
            console.log("Available cameras:", cameras);

            // 사용 가능한 카메라 목록을 출력하거나 선택할 수 있습니다.
            // 예: 첫 번째 카메라로 스캐너 시작
            const cameraId = cameras[0].id;
            console.log("cameras", cameras);
            // scannerRef.current.render(
            //   (decodedText, decodedResult) => {
            //     console.log(`QR Code detected: ${decodedText}`);
            //   },
            //   (errorMessage) => {
            //     console.error(`QR Code scan error: ${errorMessage}`);
            //   }
            // );
          }
        })
        .catch((err) => {
          console.error("Error getting cameras:", err);
        });
      console.log("Switched to front camera");
    } catch (error) {
      console.error("Failed to switch camera:", error);
    }
  }, [test]);

  // 1. 첫 렌더링 시, qr 스캐너 실행
  useEffect(() => {
    scannerRef.current = new Html5QrcodeScanner(
      "reader",
      {
        aspectRatio: 1,
        fps: 200,
        qrbox: { width: 280, height: 280 },
      },
      false
    );

    console.log("scannerRef.current", scannerRef.current);
    setTest(false);
    scannerRef.current.render(() => {}, undefined);
    // console.log(scannerRef.current.getRunningTrackCapabilities());
    // console.log(
    //   ' scannerRef.current?.getRunningTrackSettings',
    //   scannerRef.current?.getRunningTrackSettings()
    // );

    return () => {
      scannerRef.current?.clear();
    };
  }, []);

  return <div id="reader"></div>;
}

export default App;

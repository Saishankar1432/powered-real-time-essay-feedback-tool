import React, { useRef, useState } from 'react';
import Webcam from 'react-webcam';

const CameraInput = ({ setScannedText }) => {
  const webcamRef = useRef(null);
  const [capturedImage, setCapturedImage] = useState(null);
  const [isCameraOn, setIsCameraOn] = useState(false); // Manage camera on/off state
  const [loading, setLoading] = useState(false);

  const captureImage = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    setCapturedImage(imageSrc);
    processImage(imageSrc); // Extract text after capturing
  };

  const processImage = async (imageSrc) => {
    setLoading(true);
    try {
      const Tesseract = await import('tesseract.js'); // Import Tesseract dynamically
      const result = await Tesseract.recognize(imageSrc, 'eng', {
        logger: (info) => console.log(info), // Optional: log progress
      });
      setScannedText(result.data.text); // Send extracted text to the parent component
    } catch (error) {
      console.error('Error during OCR:', error);
      setScannedText('Failed to extract text.');
    } finally {
      setLoading(false);
    }
  };

  const toggleCamera = () => {
    setIsCameraOn(!isCameraOn); // Toggle camera state
    if (!isCameraOn) {
      setCapturedImage(null); // Clear captured image when turning off the camera
    }
  };

  return (
    <div>
      <button onClick={toggleCamera}>
        {isCameraOn ? 'Turn Off Camera' : 'Turn On Camera'}
      </button>
      {isCameraOn && (
        <>
          {!capturedImage ? (
            <>
              <Webcam
                audio={false}
                ref={webcamRef}
                screenshotFormat="image/jpeg"
                width={300}
              />
              <br />
              <button onClick={captureImage}>Capture Image</button>
            </>
          ) : (
            <>
              <img src={capturedImage} alt="Captured" width="300" />
              <br />
              <button onClick={() => setCapturedImage(null)}>Retake</button>
            </>
          )}
        </>
      )}
      {loading && <p>Processing Image...</p>}
    </div>
  );
};

export default CameraInput;

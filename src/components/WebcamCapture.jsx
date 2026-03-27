import React, { useRef, useState, useCallback } from 'react';
import Webcam from 'react-webcam';
import { Camera, RefreshCw, Check, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Button from './Button';
import { cn } from '../lib/utils';
import Card from './Card';

const videoConstraints = {
    width: 720,
    height: 720,
    facingMode: "user"
};

const WebcamCapture = ({ onCapture, isProcessing = false }) => {
    const webcamRef = useRef(null);
    const [capturedImages, setCapturedImages] = useState([]);
    const [isCapturing, setIsCapturing] = useState(false);
    const [error, setError] = useState(null);

    const captureBurst = useCallback(async () => {
        setIsCapturing(true);
        setCapturedImages([]);
        const shots = [];
        const burstCount = 3;
        const intervalCb = 500; // ms between shots

        try {
            for (let i = 0; i < burstCount; i++) {
                if (webcamRef.current) {
                    const imageSrc = webcamRef.current.getScreenshot();
                    if (imageSrc) {
                        shots.push(imageSrc);
                        // Flash effect or optional feedback here
                    }
                }
                await new Promise(resolve => setTimeout(resolve, intervalCb));
            }
            setCapturedImages(shots);
        } catch (err) {
            console.error("Capture failed:", err);
            setError("Failed to capture images. Please try again.");
        } finally {
            setIsCapturing(false);
        }
    }, [webcamRef]);

    const handleRetake = () => {
        setCapturedImages([]);
        setError(null);
    };

    const handleConfirm = () => {
        if (onCapture) {
            onCapture(capturedImages);
        }
    };

    const hasCaptured = capturedImages.length > 0;

    return (
        <div className="w-full max-w-2xl mx-auto space-y-4">
            <div className="relative overflow-hidden rounded-2xl bg-black border border-slate-800 shadow-2xl aspect-square md:aspect-video flex flex-col items-center justify-center">
                {!hasCaptured ? (
                    <>
                        {/* Camera View */}
                        <Webcam
                            audio={false}
                            ref={webcamRef}
                            screenshotFormat="image/jpeg"
                            videoConstraints={videoConstraints}
                            className="w-full h-full object-contain"
                            onUserMediaError={(e) => setError("Camera access denied. Please check permissions.")}
                        />

                        {/* Capture Controls */}
                        <div className="absolute bottom-6 left-0 right-0 flex justify-center z-20">
                            <Button
                                onClick={captureBurst}
                                disabled={isCapturing}
                                className="h-16 w-16 rounded-full bg-white border-4 border-slate-300 hover:bg-slate-100 shadow-xl"
                            >
                                {/* Inner dot */}
                            </Button>
                        </div>
                    </>
                ) : (
                    /* Review View */
                    <div className="w-full h-full bg-slate-900 p-6 flex flex-col items-center justify-center space-y-4">
                        <div className="grid grid-cols-3 gap-2 w-full max-w-lg">
                            {capturedImages.map((img, idx) => (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: idx * 0.1 }}
                                    className="relative aspect-square rounded-lg overflow-hidden border border-slate-700 shadow-md"
                                >
                                    <img src={img} alt={`Capture ${idx + 1}`} className="w-full h-full object-cover" />
                                </motion.div>
                            ))}
                        </div>
                        <p className="text-slate-400 text-sm">3 images captured for deepfake analysis</p>
                    </div>
                )}

                {/* Capturing Overlay */}
                {isCapturing && (
                    <div className="absolute inset-0 bg-black/50 z-50 flex items-center justify-center flex-col space-y-2 backdrop-blur-sm">
                        <div className="h-8 w-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
                        <p className="text-white font-medium">Capturing burst...</p>
                    </div>
                )}

                {/* Error Overlay */}
                {error && (
                    <div className="absolute inset-0 bg-red-900/80 z-50 flex items-center justify-center p-6 text-center">
                        <div className="flex flex-col items-center space-y-2">
                            <AlertCircle className="w-8 h-8 text-white" />
                            <p className="text-white font-medium">{error}</p>
                            <Button onClick={() => setError(null)} variant="secondary" size="sm">Dismiss</Button>
                        </div>
                    </div>
                )}
            </div>

            {/* Action Buttons (Outside Camera) */}
            <AnimatePresence>
                {hasCaptured && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex space-x-3 justify-center"
                    >
                        <Button
                            variant="outline"
                            onClick={handleRetake}
                            className="w-1/3"
                            disabled={isProcessing}
                        >
                            <RefreshCw className="w-4 h-4 mr-2" />
                            Retake
                        </Button>
                        <Button
                            variant="primary"
                            onClick={handleConfirm}
                            isLoading={isProcessing}
                            className="w-1/3"
                        >
                            <Check className="w-4 h-4 mr-2" />
                            {isProcessing ? 'Processing...' : 'Confirm'}
                        </Button>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default WebcamCapture;

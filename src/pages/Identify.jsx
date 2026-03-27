import React, { useState } from 'react';
import Card from '../components/Card';
import Button from '../components/Button';
import WebcamCapture from '../components/WebcamCapture';
import StatusBadge from '../components/StatusBadge';
import { useAuth } from '../context/AuthContext';
import { identifyUser } from '../services/api';
import { ScanFace, User } from 'lucide-react';

const Identify = () => {
    const { apiKey, baseUrl } = useAuth();
    const [step, setStep] = useState(1); // 1: Capture, 2: Result
    const [isLoading, setIsLoading] = useState(false);
    const [result, setResult] = useState(null);
    const [error, setError] = useState(null);

    const handleCaptureComplete = async (images) => {
        setIsLoading(true);
        setError(null);
        try {
            const data = await identifyUser({
                baseUrl,
                apiKey,
                images
            });
            setResult(data);
            setStep(2);
        } catch (err) {
            console.error(err);
            setError(err.response?.data?.message || err.message || 'Identification failed');
        } finally {
            setIsLoading(false);
        }
    };

    const reset = () => {
        setResult(null);
        setError(null);
        setStep(1);
    };

    return (
        <div className="max-w-4xl mx-auto space-y-6">
            <div className="flex items-center space-x-3 mb-8">
                <div className="p-3 rounded-lg bg-purple-600/20 text-purple-400">
                    <ScanFace className="w-6 h-6" />
                </div>
                <h1 className="text-3xl font-bold">Visitor Identification</h1>
            </div>

            {step === 1 && (
                <div className="space-y-6">
                    <p className="text-slate-400 text-center max-w-xl mx-auto">
                        Scan visitor face to check against watchlist and access logs.
                    </p>

                    <WebcamCapture onCapture={handleCaptureComplete} isProcessing={isLoading} />

                    {error && (
                        <div className="bg-red-500/10 border border-red-500/20 text-red-200 p-4 rounded-lg mt-4 max-w-2xl mx-auto">
                            <span className="font-bold">Error:</span> {error}
                        </div>
                    )}
                </div>
            )}

            {step === 2 && result && (
                <Card className="max-w-md mx-auto text-center space-y-6">
                    <div className="flex justify-center">
                        {result.identified ? (
                            <div className="h-24 w-24 bg-purple-500/20 rounded-full flex items-center justify-center border-4 border-purple-500/30">
                                <User className="w-12 h-12 text-purple-500" />
                            </div>
                        ) : (
                            <div className="h-24 w-24 bg-slate-800 rounded-full flex items-center justify-center border-4 border-slate-700">
                                <ScanFace className="w-12 h-12 text-slate-500" />
                            </div>
                        )}
                    </div>

                    <div>
                        <h2 className="text-3xl font-bold mb-2">
                            {result.identified ? "User Identified" : "No Match Found"}
                        </h2>
                        {result.identified && result.top_match && (
                            <div className="mt-4 p-4 bg-purple-500/10 rounded-lg border border-purple-500/20">
                                <p className="text-sm text-purple-300 uppercase tracking-wider mb-1">Identified As</p>
                                <p className="text-2xl font-mono text-white tracking-tight">{result.top_match.user_id}</p>
                            </div>
                        )}
                    </div>

                    <div className="flex justify-center space-x-4">
                        <div className="bg-slate-900 p-3 rounded-lg border border-slate-800">
                            <p className="text-xs text-slate-500 mb-1">Deepfake Check</p>
                            <StatusBadge
                                status={result.is_deepfake ? 'error' : 'success'}
                                text={result.is_deepfake ? 'Fake Detected' : 'Real Face'}
                                type={result.is_deepfake ? 'alert' : 'check'}
                            />
                        </div>
                    </div>

                    <Button onClick={reset} className="w-full">
                        Scan Another Face
                    </Button>
                </Card>
            )}
        </div>
    );
};

export default Identify;

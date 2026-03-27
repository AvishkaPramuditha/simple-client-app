import React, { useState } from 'react';
import Card from '../components/Card';
import Input from '../components/Input';
import Button from '../components/Button';
import WebcamCapture from '../components/WebcamCapture';
import StatusBadge from '../components/StatusBadge';
import { useAuth } from '../context/AuthContext';
import { verifyUser } from '../services/api';
import { UserCheck } from 'lucide-react';

const Verify = () => {
    const { apiKey, baseUrl } = useAuth();
    const [step, setStep] = useState(1);
    const [userId, setUserId] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [result, setResult] = useState(null);
    const [error, setError] = useState(null);

    const handleStartCapture = (e) => {
        e.preventDefault();
        if (!userId.trim()) return;
        setStep(2);
    };

    const handleCaptureComplete = async (images) => {
        setIsLoading(true);
        setError(null);
        try {
            const data = await verifyUser({
                baseUrl,
                apiKey,
                userId,
                images
            });
            setResult(data);
            setStep(3);
        } catch (err) {
            console.error(err);
            setError(err.response?.data?.message || err.message || 'Verification failed');
        } finally {
            setIsLoading(false);
        }
    };

    const reset = () => {
        setUserId('');
        setResult(null);
        setError(null);
        setStep(1);
    };

    return (
        <div className="max-w-4xl mx-auto space-y-6">
            <div className="flex items-center space-x-3 mb-8">
                <div className="p-3 rounded-lg bg-green-600/20 text-green-400">
                    <UserCheck className="w-6 h-6" />
                </div>
                <h1 className="text-3xl font-bold">Secure Zone Access</h1>
            </div>

            {step === 1 && (
                <Card className="max-w-md mx-auto">
                    <form onSubmit={handleStartCapture} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-slate-300 mb-2">Employee ID</label>
                            <Input
                                value={userId}
                                onChange={(e) => setUserId(e.target.value)}
                                placeholder="e.g. EMP-2024-001"
                                required
                                autoFocus
                            />
                            <p className="text-xs text-slate-500 mt-2">
                                Enter your Employee ID to verify clearance level.
                            </p>
                        </div>
                        <Button type="submit" className="w-full" disabled={!userId.trim()}>
                            Next: Verify Face
                        </Button>
                    </form>
                </Card>
            )}

            {step === 2 && (
                <div className="space-y-6">
                    <div className="flex justify-between items-center">
                        <h2 className="text-xl font-semibold">Verifying: <span className="text-green-400">{userId}</span></h2>
                        <Button variant="ghost" size="sm" onClick={() => setStep(1)} disabled={isLoading}>Back</Button>
                    </div>

                    <WebcamCapture onCapture={handleCaptureComplete} isProcessing={isLoading} />

                    {error && (
                        <div className="bg-red-500/10 border border-red-500/20 text-red-200 p-4 rounded-lg mt-4">
                            <span className="font-bold">Error:</span> {error}
                        </div>
                    )}
                </div>
            )}

            {step === 3 && result && (
                <Card className="max-w-md mx-auto text-center space-y-6">
                    <div className="flex justify-center">
                        {result.verified ? (
                            <div className="h-24 w-24 bg-green-500/20 rounded-full flex items-center justify-center border-4 border-green-500/30">
                                <UserCheck className="w-12 h-12 text-green-500" />
                            </div>
                        ) : (
                            <div className="h-24 w-24 bg-red-500/20 rounded-full flex items-center justify-center border-4 border-red-500/30">
                                <UserCheck className="w-12 h-12 text-red-500" />
                            </div>
                        )}
                    </div>

                    <div>
                        <h2 className="text-3xl font-bold mb-2">
                            {result.verified ? "Identity Verified" : "Verification Failed"}
                        </h2>
                        <p className="text-slate-400">
                            User ID: <span className="text-white font-mono">{userId}</span>
                        </p>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="bg-slate-900 p-3 rounded-lg border border-slate-800">
                            <p className="text-xs text-slate-500 mb-1">Deepfake Check</p>
                            <StatusBadge
                                status={result.is_deepfake ? 'error' : 'success'}
                                text={result.is_deepfake ? 'Fake Detected' : 'Real Face'}
                                type={result.is_deepfake ? 'alert' : 'check'}
                            />
                        </div>
                        <div className="bg-slate-900 p-3 rounded-lg border border-slate-800">
                            <p className="text-xs text-slate-500 mb-1">Match Result</p>
                            <StatusBadge
                                status={result.verified ? 'success' : 'error'}
                                text={result.verified ? 'Matched' : 'No Match'}
                            />
                        </div>
                    </div>

                    <Button onClick={reset} className="w-full">
                        Verify Another
                    </Button>
                </Card>
            )}
        </div>
    );
};

export default Verify;

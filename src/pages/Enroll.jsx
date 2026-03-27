import React, { useState } from 'react';
import Card from '../components/Card';
import Input from '../components/Input';
import Button from '../components/Button';
import WebcamCapture from '../components/WebcamCapture';
import StatusBadge from '../components/StatusBadge';
import { useAuth } from '../context/AuthContext';
import { enrollUser } from '../services/api';
import { UserPlus, ArrowLeft } from 'lucide-react';

const Enroll = () => {
    const { apiKey, baseUrl } = useAuth();
    const [step, setStep] = useState(1); // 1: Input ID, 2: Capture, 3: Success/Result
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
            const data = await enrollUser({
                baseUrl,
                apiKey,
                userId,
                images
            });
            setResult(data);
            setStep(3);
        } catch (err) {
            console.error(err);
            setError(err.response?.data?.message || err.message || 'Enrollment failed');
            // Remain on capture step to retry? or go to result step with error?
            // Let's show error on capture step or move to a result view.
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
                <div className="p-3 rounded-lg bg-blue-600/20 text-blue-400">
                    <UserPlus className="w-6 h-6" />
                </div>
                <h1 className="text-3xl font-bold">New Employee Registration</h1>
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
                                Enter the unique employee identifier for security clearance.
                            </p>
                        </div>
                        <Button type="submit" className="w-full" disabled={!userId.trim()}>
                            Next: Capture Photos
                        </Button>
                    </form>
                </Card>
            )}

            {step === 2 && (
                <div className="space-y-6">
                    <div className="flex justify-between items-center">
                        <h2 className="text-xl font-semibold">Capturing for: <span className="text-blue-400">{userId}</span></h2>
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
                        {result.success && !result.is_deepfake ? (
                            <div className="h-20 w-20 bg-green-500/20 rounded-full flex items-center justify-center">
                                <UserPlus className="w-10 h-10 text-green-500" />
                            </div>
                        ) : (
                            <div className="h-20 w-20 bg-red-500/20 rounded-full flex items-center justify-center">
                                <UserPlus className="w-10 h-10 text-red-500" />
                            </div>
                        )}
                    </div>

                    <div>
                        <h2 className="text-2xl font-bold mb-2">
                            {result.success ? "Enrollment Successful" : "Enrollment Failed"}
                        </h2>
                        <p className="text-slate-400">
                            User ID: <span className="text-white font-mono">{result.user_id}</span>
                        </p>
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
                        <div className="bg-slate-900 p-3 rounded-lg border border-slate-800">
                            <p className="text-xs text-slate-500 mb-1">Status</p>
                            <StatusBadge
                                status={result.enrolled ? 'success' : 'error'}
                                text={result.enrolled ? 'Enrolled' : 'Not Enrolled'}
                            />
                        </div>
                    </div>

                    <Button onClick={reset} className="w-full">
                        Enroll Another User
                    </Button>
                </Card>
            )}
        </div>
    );
};

export default Enroll;

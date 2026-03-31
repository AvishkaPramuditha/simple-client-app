import React, { useState, useEffect } from 'react';
import Card from '../components/Card';
import Input from '../components/Input';
import Button from '../components/Button';
import { useAuth } from '../context/AuthContext';
import { Settings as SettingsIcon, Save } from 'lucide-react';

const Settings = () => {
    const { apiKey, setApiKey, baseUrl, setBaseUrl } = useAuth();
    const [localKey, setLocalKey] = useState(apiKey);
    const [localUrl, setLocalUrl] = useState(baseUrl);
    const [saved, setSaved] = useState(false);

    useEffect(() => {
        setLocalKey(apiKey);
        setLocalUrl(baseUrl);
    }, [apiKey, baseUrl]);

    const handleSave = (e) => {
        e.preventDefault();
        setApiKey(localKey);
        setBaseUrl(localUrl);
        setSaved(true);
        setTimeout(() => setSaved(false), 2000);
    };

    return (
        <div className="max-w-2xl mx-auto space-y-6">
            <div className="flex items-center space-x-3 mb-8">
                <div className="p-3 rounded-lg bg-slate-800 text-slate-400">
                    <SettingsIcon className="w-6 h-6" />
                </div>
                <h1 className="text-3xl font-bold">Settings</h1>
            </div>

            <Card>
                <form onSubmit={handleSave} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">API Base URL</label>
                        <Input
                            value={localUrl}
                            onChange={(e) => setLocalUrl(e.target.value)}
                            placeholder="/api"
                        />
                        <p className="text-xs text-slate-500 mt-2">
                            The endpoint where the DeepAuthBlock API is running.
                        </p>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">API Key</label>
                        <Input
                            type="password"
                            value={localKey}
                            onChange={(e) => setLocalKey(e.target.value)}
                            placeholder="sk_live_..."
                        />
                        <p className="text-xs text-slate-500 mt-2">
                            Your secure API key. This is stored locally in your browser.
                        </p>
                    </div>

                    <div className="pt-4">
                        <Button type="submit" disabled={saved} className="w-full sm:w-auto">
                            <Save className="w-4 h-4 mr-2" />
                            {saved ? 'Saved Successfully' : 'Save Changes'}
                        </Button>
                    </div>
                </form>
            </Card>
        </div>
    );
};

export default Settings;

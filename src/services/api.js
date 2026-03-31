import axios from 'axios';

// Helper to convert Base64 to Blob
export const dataURLtoBlob = (dataurl) => {
    const arr = dataurl.split(',');
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
    }
    return new Blob([u8arr], { type: mime });
};

export const enrollUser = async ({ baseUrl, apiKey, images, userId }) => {
    const formData = new FormData();
    images.forEach((img, index) => {
        const blob = dataURLtoBlob(img);
        formData.append('images', blob, `capture-${index}.jpg`);
    });
    formData.append('client_user_id', userId);

    const url = `${baseUrl}api/v1/client-user/enroll`;
    console.log('📤 Enrolling user...');
    console.log('  URL:', url);
    console.log('  User ID:', userId);
    console.log('  Images count:', images.length);

    try {
        const response = await axios.post(url, formData, {
            headers: {
                'Authorization': `Bearer ${apiKey}`,
                'Content-Type': 'multipart/form-data',
            },
        });
        console.log('✅ Enroll response:', response.data);
        return response.data;
    } catch (error) {
        console.error('❌ Enroll error:', {
            message: error.message,
            code: error.code,
            status: error.response?.status,
            statusText: error.response?.statusText,
            data: error.response?.data,
            url: error.config?.url,
        });
        throw error;
    }
};

export const verifyUser = async ({ baseUrl, apiKey, images, userId }) => {
    const formData = new FormData();
    images.forEach((img, index) => {
        const blob = dataURLtoBlob(img);
        formData.append('images', blob, `capture-${index}.jpg`);
    });
    formData.append('client_user_id', userId);

    const url = `${baseUrl}api/v1/client-user/verify`;
    console.log('📤 Verifying user...');
    console.log('  URL:', url);
    console.log('  User ID:', userId);
    console.log('  Images count:', images.length);

    try {
        const response = await axios.post(url, formData, {
            headers: {
                'Authorization': `Bearer ${apiKey}`,
                'Content-Type': 'multipart/form-data',
            },
        });
        console.log('✅ Verify response:', response.data);
        return response.data;
    } catch (error) {
        console.error('❌ Verify error:', {
            message: error.message,
            code: error.code,
            status: error.response?.status,
            statusText: error.response?.statusText,
            data: error.response?.data,
            url: error.config?.url,
        });
        throw error;
    }
};

export const identifyUser = async ({ baseUrl, apiKey, images }) => {
    const formData = new FormData();
    images.forEach((img, index) => {
        const blob = dataURLtoBlob(img);
        formData.append('images', blob, `capture-${index}.jpg`);
    });

    const url = `${baseUrl}api/v1/client-user/identify`;
    console.log('📤 Identifying user...');
    console.log('  URL:', url);
    console.log('  API Key:', apiKey?.substring(0, 10) + '...');
    console.log('  Images count:', images.length);

    try {
        const response = await axios.post(url, formData, {
            headers: {
                'Authorization': `Bearer ${apiKey}`,
                'Content-Type': 'multipart/form-data',
            },
        });
        console.log('✅ Identify response:', response.data);
        return response.data;
    } catch (error) {
        console.error('❌ Identify error:', {
            message: error.message,
            code: error.code,
            status: error.response?.status,
            statusText: error.response?.statusText,
            data: error.response?.data,
            url: error.config?.url,
        });
        throw error;
    }
};

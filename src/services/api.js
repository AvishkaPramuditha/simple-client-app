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

    const response = await axios.post(`${baseUrl}api/v1/client-user/enroll`, formData, {
        headers: {
            'Authorization': `Bearer ${apiKey}`,
            'Content-Type': 'multipart/form-data',
        },
    });
    return response.data;
};

export const verifyUser = async ({ baseUrl, apiKey, images, userId }) => {
    const formData = new FormData();
    images.forEach((img, index) => {
        const blob = dataURLtoBlob(img);
        formData.append('images', blob, `capture-${index}.jpg`);
    });
    formData.append('client_user_id', userId);

    const response = await axios.post(`${baseUrl}api/v1/client-user/verify`, formData, {
        headers: {
            'Authorization': `Bearer ${apiKey}`,
            'Content-Type': 'multipart/form-data',
        },
    });
    return response.data;
};

export const identifyUser = async ({ baseUrl, apiKey, images }) => {
    const formData = new FormData();
    images.forEach((img, index) => {
        const blob = dataURLtoBlob(img);
        formData.append('images', blob, `capture-${index}.jpg`);
    });

    const response = await axios.post(`${baseUrl}api/v1/client-user/identify`, formData, {
        headers: {
            'Authorization': `Bearer ${apiKey}`,
            'Content-Type': 'multipart/form-data',
        },
    });
    return response.data;
};

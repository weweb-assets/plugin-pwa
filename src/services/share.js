export async function share({ share_title, share_text, share_url, share_files }) {
    if (!('share' in navigator)) {
        throw new Error('Share is not available.');
    }

    try {
        const files = await Promise.all(
            share_files.map(async file => {
                console.log(file);
                const mimeType = getMimeType(file.ext);
                return convertURLToFile(file.url, file.name, mimeType);
            })
        );

        const shareData = {
            title: share_title,
            text: share_text,
            url: share_url,
            files,
        };

        if (navigator.canShare && navigator.canShare(shareData)) {
            await navigator.share(shareData);
        } else {
            throw new Error('Data cannot be shared.');
        }
    } catch (error) {
        throw new Error(error, 'Error while sharing.');
    }
}

async function convertURLToFile(url, filename, mimeType) {
    const response = await fetch(url);
    const blob = await response.blob();
    return new File([blob], filename, { type: mimeType });
}

function getMimeType(extension) {
    const mimeTypes = {
        pdf: 'application/pdf',
        flac: 'audio/flac',
        m4a: 'audio/x-m4a',
        mp3: 'audio/mpeg',
        oga: 'audio/ogg',
        ogg: 'audio/ogg',
        opus: 'audio/ogg',
        wav: 'audio/wav',
        weba: 'audio/webm',
        avif: 'image/avif',
        bmp: 'image/bmp',
        gif: 'image/gif',
        ico: 'image/x-icon',
        jfif: 'image/jpeg',
        jpeg: 'image/jpeg',
        jpg: 'image/jpeg',
        pjp: 'image/jpeg',
        pjpeg: 'image/jpeg',
        png: 'image/png',
        svg: 'image/svg+xml',
        svgz: 'image/svg+xml',
        tif: 'image/tiff',
        tiff: 'image/tiff',
        webp: 'image/webp',
        xbm: 'image/x-xbitmap',
        css: 'text/css',
        csv: 'text/csv',
        ehtml: 'text/html',
        htm: 'text/html',
        html: 'text/html',
        shtm: 'text/html',
        shtml: 'text/html',
        text: 'text/plain',
        txt: 'text/plain',
        m4v: 'video/mp4',
        mp4: 'video/mp4',
        mpeg: 'video/mpeg',
        mpg: 'video/mpeg',
        ogm: 'video/ogg',
        ogv: 'video/ogg',
        webm: 'video/webm',
    };

    return mimeTypes[extension] || 'application/octet-stream';
}

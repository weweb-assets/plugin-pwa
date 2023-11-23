/*=============================================m_ÔÔ_m=============================================\
        SHARE
\================================================================================================*/

export async function convertURLToFile(url, filename, mimeType) {
    const response = await fetch(url);
    const blob = await response.blob();
    return new File([blob], filename, { type: mimeType });
}

export function getMimeType(extension) {
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

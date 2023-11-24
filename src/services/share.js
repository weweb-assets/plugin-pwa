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

function resolveImageUrl(imagePath) {
    const baseUrl = 'https://d1fxy698ilbz6u.cloudfront.net/static/';
    if (imagePath.startsWith('http')) {
        return imagePath;
    }
    return `${baseUrl}${imagePath}`;
}

export { resolveImageUrl };
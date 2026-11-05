function parseCampaignText(rawText) {
    if (!rawText) return { text: "", urls: [], emails: [] };
    
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    const urls = rawText.match(urlRegex) || [];
    
    const emailRegex = /([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/gi;
    const emails = rawText.match(emailRegex) || [];
    
    const cleanText = rawText.toLowerCase().replace(/[^\w\sáéíóúñ]/g, ' ');

    return {
        original: rawText,
        text: cleanText,
        urls: urls,
        emails: emails,
        length: rawText.length
    };
}
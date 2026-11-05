async function saveEvidence(originalText, parsedData, flags, risk) {
    const timestamp = new Date().toISOString();
    const hash = await generateSHA256(originalText);
    const id = generateShortId();

    const evidence = {
        id: id,
        timestamp: timestamp,
        hash: hash,
        originalText: originalText,
        urls: parsedData.urls,
        emails: parsedData.emails,
        flags: flags,
        risk: risk
    };

    let history = JSON.parse(localStorage.getItem('kronos_evidence') || '[]');
    history.push(evidence);
    
    localStorage.setItem('kronos_evidence', JSON.stringify(history));
    
    return evidence;
}
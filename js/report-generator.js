function generateReportHTML(evidence) {
    const date = new Date(evidence.timestamp).toLocaleString();
    
    let flagsHtml = evidence.flags.map(f => `
        <li><strong>[${f.id.toUpperCase()}]</strong> ${f.matches.join(', ')}</li>
    `).join('');

    return `
        <!DOCTYPE html>
        <html>
        <head>
            <title>Reporte KRONOS - ${evidence.id}</title>
            <style>
                body { font-family: sans-serif; padding: 2rem; color: #333; }
                .header { border-bottom: 2px solid #000; padding-bottom: 1rem; margin-bottom: 2rem; }
                .risk { font-size: 2rem; font-weight: bold; color: ${evidence.risk.score >= 50 ? 'red' : 'orange'}; }
                .box { background: #f4f4f4; padding: 1rem; border-left: 4px solid #000; margin: 1rem 0; }
                pre { white-space: pre-wrap; word-wrap: break-word; }
            </style>
        </head>
        <body>
            <div class="header">
                <h1>🛡️ Reporte de Evidencia Antifraude</h1>
                <p><strong>ID:</strong> ${evidence.id} | <strong>Fecha:</strong> ${date}</p>
            </div>
            
            <h2>Nivel de Riesgo: <span class="risk">${evidence.risk.level} (${evidence.risk.score}/100)</span></h2>
            
            <h3>Bandas Rojas Detectadas:</h3>
            <ul>${flagsHtml || '<li>Ninguna</li>'}</ul>
            
            <h3>Mensaje Original:</h3>
            <div class="box"><pre>${evidence.originalText}</pre></div>
            
            <h3>Metadatos Forenses:</h3>
            <ul>
                <li><strong>Hash SHA-256:</strong> ${evidence.hash}</li>
                <li><strong>URLs extraídas:</strong> ${evidence.urls.join(', ') || 'Ninguna'}</li>
                <li><strong>Emails extraídos:</strong> ${evidence.emails.join(', ') || 'Ninguno'}</li>
            </ul>
            
            <hr>
            <p style="font-size: 0.8rem; color: #666;">Generado por KRONOS Luck-Awareness. Evidencia 100% local.</p>
        </body>
        </html>
    `;
}
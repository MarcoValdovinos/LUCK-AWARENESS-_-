let currentAnalysis = null;

document.getElementById('analyze-btn').addEventListener('click', () => {
    const rawText = document.getElementById('message-input').value;
    
    if (!rawText.trim()) {
        alert('Por favor, pega un mensaje para analizar.');
        return;
    }

    const parsed = parseCampaignText(rawText);
    const flags = detectRedFlags(parsed);
    const risk = calculateRiskScore(flags);
    
    currentAnalysis = { rawText, parsed, flags, risk };

    renderResults(risk, flags);
});

function renderResults(risk, flags) {
    const section = document.getElementById('results-section');
    const scoreBox = document.getElementById('risk-score-display');
    const scoreValue = scoreBox.querySelector('.score-value');
    const scoreLabel = scoreBox.querySelector('.score-label');
    const flagsContainer = document.getElementById('flags-container');

    scoreBox.className = 'score-box ' + risk.cssClass;
    
    scoreValue.textContent = risk.score;
    scoreLabel.textContent = risk.level;

    if (flags.length === 0) {
        flagsContainer.innerHTML = '<p style="color:var(--safe)">✅ No se detectaron banderas rojas obvias.</p>';
    } else {
        flagsContainer.innerHTML = flags.map(f => `
            <div class="flag-item">
                <strong>⚠️ ${f.id.toUpperCase()}</strong>
                <span>Palabras clave detectadas: ${f.matches.join(', ')}</span>
            </div>
        `).join('');
    }

    section.classList.remove('hidden');
}

document.getElementById('save-evidence-btn').addEventListener('click', async () => {
    if (!currentAnalysis) return;

    const btn = document.getElementById('save-evidence-btn');
    btn.textContent = "Guardando y Generando...";
    btn.disabled = true;

    try {
        const evidence = await saveEvidence(
            currentAnalysis.rawText, 
            currentAnalysis.parsed, 
            currentAnalysis.flags, 
            currentAnalysis.risk
        );

        const reportHtml = generateReportHTML(evidence);
        
        const blob = new Blob([reportHtml], { type: 'text/html' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `KRONOS-Reporte-${evidence.id}.html`;
        a.click();
        URL.revokeObjectURL(url);

        btn.textContent = "✅ Reporte Descargado";
        alert(`Evidencia guardada con Hash: ${evidence.hash.substring(0,16)}...`);
        
    } catch (e) {
        console.error(e);
        alert("Error al generar reporte.");
        btn.textContent = "Guardar Evidencia y Generar Reporte";
    } finally {
        btn.disabled = false;
    }
});
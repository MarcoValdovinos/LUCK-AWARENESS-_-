function calculateRiskScore(flags) {
    let score = 0;
    
    flags.forEach(flag => {
        score += flag.weight;
    });

    if (score > 100) score = 100;

    let level = 'Bajo';
    let cssClass = 'score-low';

    if (score >= 25 && score < 50) {
        level = 'Medio';
        cssClass = 'score-medium';
    } else if (score >= 50 && score < 80) {
        level = 'Alto';
        cssClass = 'score-high';
    } else if (score >= 80) {
        level = 'Crítico';
        cssClass = 'score-critical';
    }

    return { score, level, cssClass };
}
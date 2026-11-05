const RED_FLAGS = [
    { id: 'urgency', weight: 20, patterns: ['urgente', 'inmediato', '24 horas', 'hoy mismo', 'última oportunidad'] },
    { id: 'secrecy', weight: 25, patterns: ['confidencial', 'no digas a nadie', 'secreto', 'entre nosotros'] },
    { id: 'wealth', weight: 30, patterns: ['ganar dinero', 'inversión segura', 'riqueza', 'multiplicar', 'criptomonedas', 'bitcoin', 'premio', 'lotería'] },
    { id: 'threat', weight: 35, patterns: ['bloquearemos', 'cuenta suspendida', 'acción legal', 'policía', 'multa'] },
    { id: 'authority_fake', weight: 20, patterns: ['banco', 'gobierno', 'soporte técnico', 'microsft', 'apple', 'hacienda'] },
    { id: 'grammar', weight: 10, patterns: ['estimado cliente', 'querido usuario', 'amigo'] }
];

function detectRedFlags(parsedData) {
    const foundFlags = [];
    const text = parsedData.text;

    RED_FLAGS.forEach(flag => {
        let matches = [];
        flag.patterns.forEach(pattern => {
            if (text.includes(pattern)) {
                matches.push(pattern);
            }
        });

        if (matches.length > 0) {
            foundFlags.push({
                id: flag.id,
                weight: flag.weight,
                matches: matches,
                description: `Se detectó lenguaje de tipo: ${flag.id.toUpperCase()}`
            });
        }
    });

    return foundFlags;
}
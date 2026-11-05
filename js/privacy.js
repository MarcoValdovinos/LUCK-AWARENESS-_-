// Módulo de Privacidad y Gestión de Datos Locales

const PrivacyManager = {
    // Borrar toda la evidencia guardada
    clearAllData: function() {
        if (confirm("⚠️ ¿Estás seguro de que deseas borrar TODA la evidencia guardada? Esta acción no se puede deshacer.")) {
            localStorage.removeItem('kronos_evidence');
            alert("✅ Todos los datos locales han sido eliminados de este dispositivo.");
            window.location.reload();
        }
    },

    // Exportar toda la base de datos local a un JSON
    exportDatabase: function() {
        const data = localStorage.getItem('kronos_evidence');
        if (!data || data === '[]') {
            alert("No hay datos para exportar.");
            return;
        }

        const blob = new Blob([data], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `KRONOS-Backup-${new Date().toISOString().split('T')[0]}.json`;
        a.click();
        URL.revokeObjectURL(url);
    },

    // Obtener el peso total de los datos en LocalStorage
    getStorageSize: function() {
        const data = localStorage.getItem('kronos_evidence') || '';
        return new Blob([data]).size;
    }
};

// Agregar botones al footer si estamos en index.html
document.addEventListener('DOMContentLoaded', () => {
    const footer = document.querySelector('footer');
    if (footer && window.location.pathname.endsWith('index.html') || window.location.pathname === '/') {
        const privacyControls = document.createElement('div');
        privacyControls.style.marginTop = "15px";
        privacyControls.innerHTML = `
            <button onclick="PrivacyManager.exportDatabase()" style="width:auto; padding:5px 10px; font-size:0.7rem; background:transparent; border:1px solid #555; color:#888; margin-right:10px;">Exportar Backup</button>
            <button onclick="PrivacyManager.clearAllData()" style="width:auto; padding:5px 10px; font-size:0.7rem; background:transparent; border:1px solid #ff4444; color:#ff4444;">Borrar Mis Datos</button>
        `;
        footer.appendChild(privacyControls);
    }
});
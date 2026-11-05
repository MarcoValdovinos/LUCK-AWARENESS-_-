// Manejador Global de Errores

window.addEventListener('error', function(event) {
    console.error("KRONOS Error:", event.error);
    // Opcional: Mostrar una notificación UI al usuario en lugar de romper la app
    if (!window.hasShownError) {
        window.hasShownError = true;
        alert("⚠️ Ocurrió un error inesperado en la aplicación. Por favor, recarga la página.");
    }
});

window.addEventListener('unhandledrejection', function(event) {
    console.error("KRONOS Promise Rejection:", event.reason);
});
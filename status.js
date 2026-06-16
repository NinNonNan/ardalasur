async function updateStatus() {
    try {
        const response = await fetch('server_status.json');
        if (!response.ok) throw new Error('Errore nel caricamento dei dati');
        
        const data = await response.json();

        // Aggiorna lo stato Online/Offline
        const statusCard = document.getElementById('status-card');
        const statusText = document.getElementById('status-text');
        
        statusText.textContent = data.online ? 'ONLINE' : 'OFFLINE';
        statusText.className = data.online ? 'online' : 'offline';
        statusCard.className = data.online ? 'status-card online' : 'status-card offline';

        // Aggiorna i dati dei giocatori
        document.getElementById('player-count').textContent = data.players;
        document.getElementById('max-players').textContent = data.max_players;
        document.getElementById('version').textContent = data.version;

        // Pulisce e inserisce il MOTD (rimuovendo i codici colore § per semplicità)
        const cleanMotd = data.motd.replace(/\u00a7[0-9a-fk-or]/g, '');
        document.getElementById('motd').textContent = cleanMotd;

    } catch (error) {
        console.error('Errore:', error);
        document.getElementById('status-text').textContent = 'ERRORE';
    }
}

// Aggiorna subito e poi ogni 30 secondi
updateStatus();
setInterval(updateStatus, 30000);
(function() {
    'use strict';
    
    const VALID_USERNAME_HASH = '8c6976e5b5410415bde908bd4dee15dfb167a9c873fc4bb8a81f6f2ab448a918';
    const VALID_PASSWORD_HASH = '084f1cadd37c14b43f0170ede90a2a3d7f8165142536a9f5a10d94beda9fb6c9';
    const AUTH_KEY = 'brewster_auth';
    
    async function hashString(str) {
        const encoder = new TextEncoder();
        const data = encoder.encode(str);
        const hashBuffer = await crypto.subtle.digest('SHA-256', data);
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    }
    
    if (localStorage.getItem(AUTH_KEY) === 'authenticated') {
        return;
    }
    
    const style = document.createElement('style');
    style.id = 'brewster-auth-style';
    style.textContent = 'body { display: none !important; }';
    document.head.appendChild(style);
    
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', showLoginPrompt);
    } else {
        showLoginPrompt();
    }
    
    function showLoginPrompt() {
        let attempts = 0;
        const maxAttempts = 3;
        
        async function attemptLogin() {
            if (attempts >= maxAttempts) {
                alert('Troppi tentativi falliti. Ricarica la pagina per riprovare.');
                return;
            }
            
            const username = prompt('Username:');
            if (username === null) {
                showAccessDenied();
                return;
            }
            
            const password = prompt('Password:');
            if (password === null) {
                showAccessDenied();
                return;
            }
            
            const usernameHash = await hashString(username);
            const passwordHash = await hashString(password);
            
            if (usernameHash === VALID_USERNAME_HASH && passwordHash === VALID_PASSWORD_HASH) {
                localStorage.setItem(AUTH_KEY, 'authenticated');
                const authStyle = document.getElementById('brewster-auth-style');
                if (authStyle) {
                    authStyle.remove();
                }
            } else {
                attempts++;
                alert('Credenziali non valide. Tentativi rimasti: ' + (maxAttempts - attempts));
                if (attempts < maxAttempts) {
                    attemptLogin();
                } else {
                    showAccessDenied('Troppi tentativi falliti. <a href="javascript:location.reload()">Ricarica la pagina</a> per riprovare.');
                }
            }
        }
        
        function showAccessDenied(message = 'Autenticazione richiesta.') {
            document.body.innerHTML = '<div style="padding: 2rem; text-align: center; font-family: sans-serif;"><h1>Accesso Negato</h1><p>' + message + '</p></div>';
            document.body.style.display = 'block';
            const authStyle = document.getElementById('brewster-auth-style');
            if (authStyle) {
                authStyle.remove();
            }
        }
        
        attemptLogin();
    }
})();

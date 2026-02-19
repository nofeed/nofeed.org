/**
 * Simple authentication for Brewster documentation
 * Username: admin
 * Password: admin
 */

(function() {
    'use strict';
    
    const VALID_USERNAME = 'admin';
    const VALID_PASSWORD = 'admin';
    const AUTH_KEY = 'brewster_auth';
    
    // Check if already authenticated (uses localStorage for cross-file persistence)
    if (localStorage.getItem(AUTH_KEY) === 'authenticated') {
        return; // User is authenticated, continue
    }
    
    // Hide body content until authenticated
    document.body.style.display = 'none';
    
    // Wait for DOM to be ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', showLoginPrompt);
    } else {
        showLoginPrompt();
    }
    
    function showLoginPrompt() {
        let attempts = 0;
        const maxAttempts = 3;
        
        function attemptLogin() {
            if (attempts >= maxAttempts) {
                alert('Troppi tentativi falliti. Ricarica la pagina per riprovare.');
                return;
            }
            
            const username = prompt('Username:');
            if (username === null) {
                // User cancelled
                document.body.innerHTML = '<div style="padding: 2rem; text-align: center; font-family: sans-serif;"><h1>Accesso Negato</h1><p>Autenticazione richiesta.</p></div>';
                document.body.style.display = 'block';
                return;
            }
            
            const password = prompt('Password:');
            if (password === null) {
                // User cancelled
                document.body.innerHTML = '<div style="padding: 2rem; text-align: center; font-family: sans-serif;"><h1>Accesso Negato</h1><p>Autenticazione richiesta.</p></div>';
                document.body.style.display = 'block';
                return;
            }
            
            if (username === VALID_USERNAME && password === VALID_PASSWORD) {
                // Authentication successful
                localStorage.setItem(AUTH_KEY, 'authenticated');
                document.body.style.display = 'block';
            } else {
                // Authentication failed
                attempts++;
                alert('Credenziali non valide. Tentativi rimasti: ' + (maxAttempts - attempts));
                if (attempts < maxAttempts) {
                    attemptLogin();
                } else {
                    document.body.innerHTML = '<div style="padding: 2rem; text-align: center; font-family: sans-serif;"><h1>Accesso Negato</h1><p>Troppi tentativi falliti. <a href="javascript:location.reload()">Ricarica la pagina</a> per riprovare.</p></div>';
                    document.body.style.display = 'block';
                }
            }
        }
        
        attemptLogin();
    }
})();

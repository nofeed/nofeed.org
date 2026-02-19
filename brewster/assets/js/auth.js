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
    
    // Inject CSS to hide body content immediately
    const style = document.createElement('style');
    style.id = 'brewster-auth-style';
    style.textContent = 'body { display: none !important; }';
    document.head.appendChild(style);
    
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
                showAccessDenied();
                return;
            }
            
            const password = prompt('Password:');
            if (password === null) {
                // User cancelled
                showAccessDenied();
                return;
            }
            
            if (username === VALID_USERNAME && password === VALID_PASSWORD) {
                // Authentication successful
                localStorage.setItem(AUTH_KEY, 'authenticated');
                // Remove the hiding style
                const authStyle = document.getElementById('brewster-auth-style');
                if (authStyle) {
                    authStyle.remove();
                }
            } else {
                // Authentication failed
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
            const authStyle = document.getElementById('brewster-auth-style');
            if (authStyle) {
                authStyle.remove();
            }
        }
        
        attemptLogin();
    }
})();

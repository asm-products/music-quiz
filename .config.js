// This configuration file is a template. Update its values and rename it from .config.js to config.js (without the initial dot).
module.exports = {

    // For which environment are these configuration settings.
    environment: {
        oneLetterCode: 'O',
        description: 'Ontwikkeling'
    },

    // Ten years.
    expiryDate: 86400000 * 365.2425 * 10,

    // Port where the node.js website is served from.
    port: 8080,

    // Directory that is published and made available.
    publicDirectory: '/src',

    // Facebook graph settings for the fbgraph server side module.
    // Note: Music Quiz O app settings (this isn't the P production app).
    graph: {
        client_id: 'YOUR FACEBOOK APP ID',
        client_secret: 'YOUR FACEBOOK APP SECRET',
        scope: 'email',
        redirect_uri: 'https://localhost:8080/#/facebook'
    },

    // Decibel API keys.
    decibel: {
        applicationId: 'YOUR DECIBEL API APPLICATION ID',
        applicationKey: 'YOUR DECIBEL API APPLICATION KEY'
    }
};
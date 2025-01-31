export const helmetConfig = {
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'", '*'], // Allow everything but prioritize same-origin
      scriptSrc: ["'self'", "'unsafe-inline'", "'unsafe-eval'", '*'], // Allow scripts but avoid XSS risks
      styleSrc: ["'self'", "'unsafe-inline'", '*'], // Allow inline styles and external styles
      fontSrc: ["'self'", '*'], // Allow all font sources
      imgSrc: ["'self'", 'data:', '*'], // Allow images from any source
      connectSrc: ["'self'", '*'], // Allow API calls to any source
      frameSrc: ["'self'", '*'], // Allow iframes (for Apollo Sandbox, etc.)
      objectSrc: ["'none'"], // Disable embedding risky objects
      upgradeInsecureRequests: [], // Automatically upgrade HTTP to HTTPS
    },
  },
};

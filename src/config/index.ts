const config = {
    jwt: {
        secret: 'Back rest Api'
    },
    isDevelopmentMode: process.env.NODE_ENV === 'development',
} as const;

export default config;

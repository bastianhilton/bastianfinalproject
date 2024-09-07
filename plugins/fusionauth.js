import FusionAuthVuePlugin from '@fusionauth/vue-sdk';
import { useCookie } from "#app";
import '@fusionauth/vue-sdk/dist/style.css';

export default defineNuxtPlugin((nuxtApp) => {
    const config = useRuntimeConfig();

    const fusionAuthConfig = {
        clientId: config.public.FUSIONAUTH_CLIENT_ID || "", 
        serverUrl: config.public.FUSIONAUTH_URL || "", 
        redirectUri: config.public.FUSIONAUTH_REDIRECT_URL || "",
        postLogoutRedirectUri: 'http://localhost:3011/logged-out',
        shouldAutoFetchUserInfo: true, 
        shouldAutoRefresh: true, 
        scope: 'openid email profile offline_access',
        onRedirect: (state) => { }, 
    };

    nuxtApp.vueApp.use(FusionAuthVuePlugin, {
        ...fusionAuthConfig,
        nuxtUseCookie: useCookie,
    });
});

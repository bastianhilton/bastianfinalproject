import { useRuntimeConfig } from '#imports';

export const getNavigation = async () => {
  const config = useRuntimeConfig();
  try {
    const navigation = await $fetch(`${config.public.wordpressUrl}/wp-json/wp-json/wp/v2/navigations`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${config.public.wordpressToken}`
      }
    });
    return navigation;
  } catch (error) {
    console.error('Error fetching navigation:', error);
    return [];
  }
};
// composables/useNavigation.js
import { ref } from 'vue';
import { useRuntimeConfig } from '#imports';

export function useNavigation() {
  const config = useRuntimeConfig();
  const navigation = ref([]);

  const fetchNavigation = async (menuNames) => {
    try {
      // Fetch all navigation data from the API
      const response = await $fetch(`${config.public.wordpressUrl}/wp-json/wp/v2/navigation`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${config.public.wordpressToken}`
        }
      });

      // Filter to find the specific navigation by name
      menuNames.forEach(menuName => {
        const specificMenu = response.find(menu => menu.acf.menu_name === menuName);

        if (specificMenu) {
          navigation.value[menuName] = specificMenu.acf.menuItems; // Adjust based on your ACF field group name
        } else {
          console.warn(`Menu "${menuName}" not found`);
        }
      });
    } catch (error) {
      console.error('Error fetching navigation:', error);
    }
  };

  return {
    navigation,
    fetchNavigation,
  };
}

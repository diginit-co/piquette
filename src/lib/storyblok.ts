
import { storyblokInit, apiPlugin, getStoryblokApi as storyblokGetApi } from '@storyblok/react';

// Initialize Storyblok API with apiPlugin
storyblokInit({
  accessToken: "5S5W8DF9iVOiuBxsAQ8wZgtt",
  use: [apiPlugin],
  apiOptions: {
    region: 'us',
  },
  components: {
    
  },
  
});

// Export the getStoryblokApi function directly from @storyblok/react
export const getStoryblokApi = storyblokGetApi;
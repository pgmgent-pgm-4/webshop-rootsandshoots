import fetch from "node-fetch";

/**
 * Resolve unsplash source urls
 *
 * @param {string} url
 */
 export const fetchImageUrl = async (url) => {
    const response = await fetch(url);
    return await response.url;
  };
export async function fetchOneWallpaperUrl() {
  try {
    const response = await fetch('https://b612.one/oneapi/');
    if (!response.ok) {
      // throw new Error("Network response was not OK");
      return 'https://b612.one/oneapi/img/FvNvpKLF74mqdlKqAnhaNWhlToQ6';
    }
    const jsonData = await response.json();
    return (
      'https://b612.one/oneapi/img/' +
      jsonData.data.content_list[0].img_url.slice(27)
    );
  } catch (error) {
    console.error('There has been a problem with your fetch operation:', error);
    return 'https://b612.one/oneapi/img/FvNvpKLF74mqdlKqAnhaNWhlToQ6';
  }
}

export async function fetchOneDailyQuote() {
  try {
    const response = await fetch('https://b612.one/oneapi/');
    if (!response.ok) {
      // throw new Error("Network response was not OK");
      return {
        content: 'Ad astra abyssosque.',
        info: 'Project Asteroid'
      };
    }
    const jsonData = await response.json();
    return {
      content: jsonData.data.content_list[0].forward,
      info: '—— ' + jsonData.data.content_list[0].words_info
    };
  } catch (error) {
    console.error('There has been a problem with your fetch operation:', error);
    return {
      content: 'Ad astra abyssosque.',
      info: 'Project Asteroid'
    };
  }
}

export async function fetchMoonshinerUrl() {
  try {
    const response = await fetch(
      'https://b612.one/static-rsrc/moonshiner.json',
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );
    if (!response.ok) {
      // throw new Error("Network response was not OK");
      console.error('"Network response was not OK');
      return [];
    }
    const jsonData = await response.json();
    // console.log(jsonData.data);
    return jsonData.data;
  } catch (error) {
    console.error('There has been a problem with your fetch operation:', error);
    return [];
  }
}

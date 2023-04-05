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

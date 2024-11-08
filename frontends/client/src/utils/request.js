export async function fetchOneApi() {
  const oneData = {
    wallpaperUrl:
      'https://api.malou.men/oneapi/img/Fh5NZm2cRYJtvIurGJ6sfW-bGP3F',
    dailyQuoteContent: '',
    dailyQuoteInfo: ''
  };
  try {
    const response = await fetch('https://api.malou.men/oneapi/');
    if (response.ok) {
      const jsonData = await response.json();
      oneData.wallpaperUrl =
        'https://api.malou.men/oneapi/img/' +
        jsonData.data.content_list[0].img_url.slice(27);
      oneData.dailyQuoteContent = jsonData.data.content_list[0].forward;
      oneData.dailyQuoteInfo = '—— ' + jsonData.data.content_list[0].words_info;
      return oneData;
    } else {
      // throw new Error("Network response was not OK");
      oneData.dailyQuoteContent = 'Ad astra abyssosque.';
      oneData.dailyQuoteInfo = 'Project Asteroid';
      return oneData;
    }
  } catch (error) {
    console.error('There has been a problem with your fetch operation:', error);
    oneData.dailyQuoteContent = 'Ad astra abyssosque.';
    oneData.dailyQuoteInfo = 'Project Asteroid';
    return oneData;
  }
}

export async function fetchMoonshinerUrl() {
  try {
    const response = await fetch('https://b612.town/static/moonshiner.json', {
      headers: {
        'Content-Type': 'application/json'
      }
    });
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

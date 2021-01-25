// https://stackoverflow.com/questions/5612602/improving-regex-for-parsing-youtube-vimeo-urls/22763925#22763925

const parse = (url) => {
  // - Supported YouTube URL formats:
  //   - http://www.youtube.com/watch?v=My2FRPA3Gf8
  //   - http://youtu.be/My2FRPA3Gf8
  //   - https://youtube.googleapis.com/v/My2FRPA3Gf8
  // - Supported Vimeo URL formats:
  //   - http://vimeo.com/25451551
  //   - http://player.vimeo.com/video/25451551
  // - Also supports relative URLs:
  //   - //player.vimeo.com/video/25451551

  if (!url) {
    return undefined;
  }

  url.match(/(http:|https:|)\/\/(player.|www.)?(vimeo\.com|youtu(be\.com|\.be|be\.googleapis\.com))\/(video\/|embed\/|watch\?v=|v\/)?([A-Za-z0-9._%-]*)(\&\S+)?/); // eslint-disable-line

  let type;

  if (RegExp.$3.indexOf('youtu') > -1) {
    type = 'youtube';
  } else if (RegExp.$3.indexOf('vimeo') > -1) {
    type = 'vimeo';
  }

  return {
    type,
    id: RegExp.$6,
  };
};

export const getEmbed = (url) => {
  const parsed = parse(url);

  if (parsed && parsed.type === 'youtube') {
    return `https://www.youtube.com/embed/${parsed.id}`;
  }

  return url;
};

export default parse;

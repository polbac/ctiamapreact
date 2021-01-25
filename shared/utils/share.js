import Helmet from 'react-helmet';

function share(item, text) {
  const { title, metaTags } = Helmet.peek();
  const el = item.toLowerCase();
  const description = text ? `"${text}"` : metaTags.find(n => n.name === 'description').content;
  const { href } = window.location;
  const twitter = 'CTIA';

  const popupConfig = 'left=0,top=0,width=626,height=436,personalbar=0,toolbar=0,scrollbars=0,resizable=0';
  const concat = `${title} — ${description} ${href}`;

  const bases = {
    twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(concat)}&via=${encodeURIComponent(twitter)}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(href)}&quote=${encodeURIComponent(description)}`,
    linkedin: `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(href)}&title=${encodeURIComponent(title)}&summary=${encodeURIComponent(description)}`,
  };

  return window.open(`${bases[el]}`, '', popupConfig);
}

export default share;

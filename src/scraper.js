const cheerio = require('cheerio');

async function scrapeHackerNews() {
  const url = 'https://news.ycombinator.com/';
  const response = await fetch(url);
  const html = await response.text();
  const $ = cheerio.load(html);

  const stories = [];
  $('.athing').each((i, el) => {
    const title = $(el).find('.storylink').text().trim();
    const url = $(el).find('.storylink').attr('href');
    stories.push({ title, url });
  });

  return stories;
}

module.exports = { scrapeHackerNews };
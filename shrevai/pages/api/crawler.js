import xml2js from 'xml2js';
import { ChromaClient } from 'chromadb';

const parser = new xml2js.Parser();
const client = new ChromaClient({
  path: 'http://127.0.0.1:8000',
});

const docs = [];
const ids = [];

async function fetchAndParseSitemap(url, collection, domainname, index = 0) {
  try {
    const res = await fetch(url, {
      method: 'GET',
      headers: {
        Accept: '*/*',
        'User-Agent': 'Learning Crawler',
      },
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch sitemap: ${res.statusText}`);
    }

    const xml = await res.text();
    const result = await parser.parseStringPromise(xml);

    if (result.urlset) {
      await Promise.all(
        result.urlset.url.map(async (urlEntry, i) => {
          const urlId = `${domainname}_url_${index}_${i}`;
          docs.push(urlEntry.loc[0]);
          ids.push(urlId);
        })
      );
    } else if (result.sitemapindex) {
      await Promise.all(
        result.sitemapindex.sitemap.map((sitemapEntry, i) =>
          fetchAndParseSitemap(
            sitemapEntry.loc[0],
            collection,
            domainname,
            `${index}_${i}`
          )
        )
      );
    }
  } catch (error) {
    console.error(`Error fetching/parsing sitemap: ${error}`);
  }
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { domainname } = req.body;

  const headersList = {
    "Accept": '*/*',
    'User-Agent': 'Learning Crawler',
  };

  try {
    const collection = await client.getOrCreateCollection({
      name: domainname,
    });

    const response = await fetch(`https://${domainname}/robots.txt`, {
      method: 'GET',
      headers: headersList,
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch robots.txt: ${response.statusText}`);
    }

    const data = await response.text();
    const robojson = [];

    data.split('\n').forEach((element) => {
      if (element.toLowerCase().startsWith('sitemap')) {
        robojson.push(element.trim().substring(9));
      }
    });

    await Promise.all(
      robojson.map((element, index) =>
        fetchAndParseSitemap(element, collection, domainname, index)
      )
    );

    for (let i = 0; i < docs.length; i += 4) {
      try {
        await collection.upsert({
          documents: [docs[i], docs[i + 1], docs[i + 2], docs[i + 3]],
          ids: [ids[i], ids[i + 1], ids[i + 2], ids[i + 3]],
        });
        console.log(domainname + ': ' + (i / docs.length) * 100 + '%');
      } catch (error) {
        console.error('Failed to save data to Chroma DB:', error);
      }
    }

    return res.status(200).json({ message: 'Crawling and indexing completed.' });
  } catch (error) {
    console.error(`Error in crawler: ${error}`);
    return res.status(500).json({ message: `Error in crawler: ${error.message}` });
  }
}

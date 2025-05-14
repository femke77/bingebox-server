import { Request, Response } from 'express';
import * as cheerio from 'cheerio';

export const getVidSrcMovie = async (req: Request, res: Response) => {
  const { id } = req.params;
  console.log(`Fetching movie with ID: ${id}`);

  try {
    const response = await fetch(`https://vidsrc.xyz/embed/movie/${id}`, {
      method: 'GET',
    });
    const doc = await response.text();

    const $ = cheerio.load(doc);

    $('script').remove();
    const $iframe = $('iframe').first();

    // Remove all inline event attributes (like onclick, onload, etc.)
    const iframeElement = $iframe.get(0);
    if (iframeElement) {
      iframeElement.attribs = Object.fromEntries(
        Object.entries(iframeElement.attribs).filter(
          ([key]) => !key.startsWith('on')
        )
      );
    }

    const iframe = $.html($iframe);

    if (iframe) {
      res.send(`
            ${iframe}`);
    } else {
      res.status(404).json({ error: 'Iframe not found' });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Something went wrong' });
  }
};

export const getVidSrcTV = async (req: Request, res: Response) => {
  const { series_id, season_number, episode_number } = req.params;
  console.log(series_id, season_number, episode_number);

  try {
    const response = await fetch(
      `https://vidsrc.xyz/embed/tv/${series_id}/${season_number}-${episode_number}`,
      {
        method: 'GET',
      }
    );
    const doc = await response.text();
    const $ = cheerio.load(doc);
    $('script').remove();
    const $iframe = $('iframe').first();

    const iframeElement = $iframe.get(0);
    if (iframeElement) {
      iframeElement.attribs = Object.fromEntries(
        Object.entries(iframeElement.attribs).filter(
          ([key]) => !key.startsWith('on')
        )
      );
    }

    const iframe = $.html($iframe);
    if (iframe) {
      res.send(`
                ${iframe}
       `);
    } else {
      res.status(404).json({ error: 'Iframe not found' });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Something went wrong' });
  }
};

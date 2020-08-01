import { getTopArtists } from '../../lib/spotify';

export default async (_, res) => {
  const response = await getTopArtists();
  const { items } = await response.json();

  const artists = items.slice(0, 10).map((artist) => ({
    id: artist.id,
    url: artist.external_urls.spotify,
    image: artist.images[2].url,
    name: artist.name
  }));

  return res.status(200).json({ artists });
};

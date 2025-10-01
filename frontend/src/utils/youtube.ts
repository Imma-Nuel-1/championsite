// utils/youtube.ts
export const getYouTubeThumbnail = (url?: string): string | null => {
  if (!url) return null;

  // Match common YouTube URL formats
  const match =
    url.match(
      /(?:youtube\.com\/(?:watch\?v=|embed\/|live\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/
    ) || url.match(/[?&]v=([a-zA-Z0-9_-]{11})/);

  return match ? `https://img.youtube.com/vi/${match[1]}/0.jpg` : null;
};

export const getYouTubeEmbedUrl = (url?: string): string | null => {
  if (!url) return null;

  const match =
    url.match(
      /(?:youtube\.com\/(?:watch\?v=|embed\/|live\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/
    ) || url.match(/[?&]v=([a-zA-Z0-9_-]{11})/);

  return match ? `https://www.youtube.com/embed/${match[1]}` : null;
};

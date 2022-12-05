export default function youtubeManager(recipeVideo) {
  const youtubeEmbed = 'https://www.youtube.com/embed/';
  const recipeID = recipeVideo.split('=')[1];

  return youtubeEmbed + recipeID;
}

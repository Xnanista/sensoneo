const formatVolume = (volume: number): string => {
  if (volume >= 1000) {
    return `${(volume / 1000).toFixed(volume % 1000 === 0 ? 0 : 1)}L`;
  }

  return `${volume}ml`;
};

export default formatVolume;

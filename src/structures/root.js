export type SliderStructure = {
  data?: Array<Object>,
  className?: string,
  sliderTitle?: string,
}

export type SeriesStructure = {
  title: string,
}

export type RootStructure = {
  shelves: SeriesStructure[],
};

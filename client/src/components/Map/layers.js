export const clusterLayer = {
    id: 'clusters',
    type: 'circle',
    source: 'output-file',
    filter: [],
    paint: {
      'circle-color': ['step', ['get', 'events'], '#51bbd6', 100, '#f1f075', 750, '#f28cb1'],
      'circle-radius': ['step', ['get', 'events'], 20, 100, 30, 750, 40]
    }
  };
  
  export const clusterCountLayer = {
    id: 'cluster-count',
    type: 'symbol',
    source: 'output-file',
    filter: [],
    layout: {
      'text-field': [],
      'text-font': ['DIN Offc Pro Medium', 'Arial Unicode MS Bold'],
      'text-size': 12
    }
  };
  
  export const unclusteredPointLayer = {
    id: 'unclustered-point',
    type: 'circle',
    source: 'output-file',
    filter: [],
    paint: {
      'circle-color': '#11b4da',
      'circle-radius': 4,
      'circle-stroke-width': 1,
      'circle-stroke-color': '#fff'
    }
  };
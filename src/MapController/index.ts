import { map, mapSection2 } from '../Map';
import { changeLevelSectionAnimation } from '../UI';

export const mapController = {
  selectedMap: 0,
  maps: [map, mapSection2],
};

export function getSelectedMap() {
  return mapController.maps[mapController.selectedMap];
}

export function selectMap(index: number) {
  if (!mapController.maps[index]) {
    return;
  }
  // todo: remove it from here, should not mix UI & stateful logic
  changeLevelSectionAnimation();
  mapController.selectedMap = index;
}

export function changeMap() {
  if (map.offset.x === 2000) {
    selectMap(mapController.selectedMap + 1);
  }

  if (map.offset.x === -1) {
    selectMap(mapController.selectedMap - 1);
  }
}

import { map } from '../Map';
import { changeLevelSectionAnimation } from '../UI';

export const mapController = {
  selectedMap: 0,
  // maps: [map, mapSection3, mapSection4, mapSection2],
  maps: [map],
};

export function getSelectedMap() {
  return mapController.maps[mapController.selectedMap];
}

export function hasNextMap() {
  return !!mapController.maps[mapController.selectedMap + 1];
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
  if (
    getSelectedMap().offset.x ===
    getSelectedMap().image!.width - getSelectedMap().finishLineOffset
  ) {
    return selectMap(mapController.selectedMap + 1);
  }

  if (getSelectedMap().offset.x === -1) {
    return selectMap(mapController.selectedMap - 1);
  }
}

import _ from 'lodash';

export {
  calculateDeliveryCost,
  calculatePossibleDeliveryRoutes,
  calculateCheapestDeliveryRoute,
};

function calculateDeliveryCost(pathString, routesData) {
  let deliveryCost = 0;
  const pathArray = [...pathString];

  for (let index = 1; index < pathArray.length; index++) {
    const startNode = pathArray[index - 1];
    const endNode = pathArray[index];

    // TODO: Improvement
    if (!routesData[startNode]) {
      return null;
    }

    const edge = routesData[startNode][endNode];
    if (!edge) {
      return null;
    }

    deliveryCost += edge;
  }

  return deliveryCost;
}

function calculatePossibleDeliveryRoutes(startNode, endNode, stop, routesData) {
  const possibleDeliveryRoutes = _recursiveCalculate(
    startNode,
    endNode,
    routesData,
    stop,
  );

  return possibleDeliveryRoutes.map(possibleDeliveryRoute => ({
    route: possibleDeliveryRoute,
    cost: calculateDeliveryCost(possibleDeliveryRoute, routesData),
  }));
}

function calculateCheapestDeliveryRoute(startNode, endNode, routesData) {
  let cheapestDeliveryRoute = null;

  const possibleDeliveryRoutes = _recursiveCalculate(
    startNode,
    endNode,
    routesData,
  );

  if (possibleDeliveryRoutes.length > 0) {
    const [firstRoute] = possibleDeliveryRoutes;

    cheapestDeliveryRoute = {
      route: firstRoute,
      cost: calculateDeliveryCost(firstRoute, routesData),
    };

    for (let index = 1; index < possibleDeliveryRoutes.length; index++) {
      const cost = calculateDeliveryCost(
        possibleDeliveryRoutes[index],
        routesData,
      );
      if (cheapestDeliveryRoute.cost > cost) {
        cheapestDeliveryRoute = {
          route: possibleDeliveryRoutes[index],
          cost,
        };
      }
    }
  }

  return cheapestDeliveryRoute;
}

function _recursiveCalculate(
  startNode,
  endNode,
  routesData,
  stop = null,
  foundRoute = '',
) {
  const routesOfStartNode = routesData[startNode];
  let localFoundRoute = foundRoute;

  if(!routesOfStartNode) {
    return [];
  }

  if (localFoundRoute && startNode === endNode) {
    localFoundRoute += endNode;
    return localFoundRoute;
  }

  const skipDuplicatedRoute = [...localFoundRoute].splice(-1) + startNode;
  if (localFoundRoute.includes(skipDuplicatedRoute)) {
    return '';
  }

  localFoundRoute += startNode;

  if (stop !== null && localFoundRoute.length > stop) {
    return '';
  }

  const routeArray = Object.keys(routesOfStartNode)
    .map(node => {
      if (routesOfStartNode[node] === 0) {
        return '';
      }

      return _recursiveCalculate(
        node,
        endNode,
        routesData,
        stop,
        localFoundRoute,
      );
    })
    .filter(route => route !== '');

  return _.flattenDeep(routeArray);
}

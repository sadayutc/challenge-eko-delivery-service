import _ from 'lodash';

export {
  calculateDeliveryCost,
  calculatePossibleDeliveryRoutes,
  calculateCheapestDeliveryRoute,
};

/**
 * Calculate delivery cost
 * @param {string} path
 * @param {Object} routesData
 * @returns {(number|null)}
 */
function calculateDeliveryCost(path, routesData) {
  let deliveryCost = 0;
  const pathArray = [...path];

  for (let index = 1; index < pathArray.length; index++) {
    const startNode = pathArray[index - 1];
    const endNode = pathArray[index];

    // stop if start node is notfound
    if (!routesData[startNode]) {
      return null;
    }

    // stop if end node is notfound
    const edge = routesData[startNode][endNode];
    if (!edge) {
      return null;
    }

    deliveryCost += edge;
  }

  return deliveryCost;
}

/**
 * Calculate possible delivery routes by recursive
 * @param {string} startNode
 * @param {string} endNode
 * @param {(number|null)} stop
 * @param {Object} routesData
 * @returns {Object[]}
 */
function calculatePossibleDeliveryRoutes(startNode, endNode, stop, routesData) {
  const possibleDeliveryRoutes = _recursiveCalculatePossibleDeliveryRoutes(
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

/**
 * Calculate cheapest delivery routes by generated possible delivery routes
 * and find minimum cost
 * @param {string} startNode
 * @param {string} endNode
 * @param {(number|null)} stop
 * @param {Object} routesData
 * @returns {Object[]}
 */
function calculateCheapestDeliveryRoute(startNode, endNode, routesData) {
  let cheapestDeliveryRoute = null;

  const possibleDeliveryRoutes = _recursiveCalculatePossibleDeliveryRoutes(
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

    // find minimum route
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

/**
 * Private recursive function for calculate possible delivery routes
 * @param {string} startNode
 * @param {string} endNode
 * @param {Object} routesData
 * @param {(number|null)} [stop=null]
 * @param {string} [foundRoute='']
 * @returns {string[]}
 */
function _recursiveCalculatePossibleDeliveryRoutes(
  startNode,
  endNode,
  routesData,
  stop = null,
  foundRoute = '',
) {
  const routesOfStartNode = routesData[startNode];
  let localFoundRoute = foundRoute;

  // stop if start node is notfound
  if (!localFoundRoute && !routesOfStartNode) {
    return [];
  }

  // found route
  if (localFoundRoute && startNode === endNode) {
    localFoundRoute += endNode;
    return localFoundRoute;
  }

  // stop if duplicate start route is found
  const skipDuplicatedRoute = [...localFoundRoute].splice(-1) + startNode;
  if (localFoundRoute.includes(skipDuplicatedRoute)) {
    return '';
  }

  localFoundRoute += startNode;

  // stop if stop of route is more that limit stop
  if (stop !== null && localFoundRoute.length > stop) {
    return '';
  }

  const routeArray = Object.keys(routesOfStartNode)
    .map(node => {

      // stop if edge of node is 0
      if (routesOfStartNode[node] === 0) {
        return '';
      }

      return _recursiveCalculatePossibleDeliveryRoutes(
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

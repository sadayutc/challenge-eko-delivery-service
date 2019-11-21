import {
  calculateDeliveryCost,
  calculatePossibleDeliveryRoutes,
  calculateCheapestDeliveryRoute,
} from './route';

const testRoutesData = {
  A: { B: 1, C: 4, D: 10 },
  B: { E: 3 },
  C: { D: 4, F: 2 },
  D: { E: 1 },
  E: { A: 2, B: 3 },
  F: { D: 1 },
};

// CASE 01 - Calculate Delivery Cost
it('should return 4 for delivery cost of route ABE', () => {
  expect(calculateDeliveryCost('ABE', testRoutesData)).toEqual(4);
});

it('should return 10 for delivery cost of route AD', () => {
  expect(calculateDeliveryCost('AD', testRoutesData)).toEqual(10);
});

it('should return 8 for delivery cost of route EACF', () => {
  expect(calculateDeliveryCost('EACF', testRoutesData)).toEqual(8);
});

it('should return null (no such route) for delivery cost of route ADF', () => {
  expect(calculateDeliveryCost('ADF', testRoutesData)).toBeNull();
});

// CASE 02 - Calculate the number of possible delivery routes
it('should return 4 for the number of possible delivery routes of ED with 4 stops and without same route', () => {
  expect(
    calculatePossibleDeliveryRoutes('E', 'D', 4, null, testRoutesData).length,
  ).toEqual(4);
});

it('should return 5 for the number of possible delivery routes of ED without stop and same route', () => {
  expect(
    calculatePossibleDeliveryRoutes('E', 'E', null, null, testRoutesData)
      .length,
  ).toEqual(5);
});

it('should return 29 for the number of possible delivery routes of ED with cost 20 and same route', () => {
  expect(
    calculatePossibleDeliveryRoutes('E', 'E', null, 20, testRoutesData)
      .length,
  ).toEqual(29);
});

// CASE 03 - Calculate cheapest delivery route
it('should return 9 for the cost of cheapest delivery route of ED', () => {
  expect(
    calculateCheapestDeliveryRoute('E', 'D', testRoutesData).cost,
  ).toEqual(9);
});

it('should return 6 for the cost of cheapest delivery route of EE', () => {
  expect(
    calculateCheapestDeliveryRoute('E', 'E', testRoutesData).cost,
  ).toEqual(6);
});

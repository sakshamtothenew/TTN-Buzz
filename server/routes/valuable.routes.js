const route = require('express').Router();

route.get('/', getAllValuables)

route.get('/:id', getValuablesById)

route.post('/', addValuables)

route.put('/:id', updateValuablesById)

route.delete('/:id', deleteValuableById)

module.exports = route;

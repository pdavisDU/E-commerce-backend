const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/',  async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  try {
    const catNow = await Category.findAll();
    //best practices to let them know statuses
    res.status(200).json(catNow);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try { //                               req.params not .body here
    const catNow = await Category.findByPk(req.params.id, {
      include: [{model: Product}],
    });
    if (!catNow) {
      res.status(400).json({message: 'That category doesnt exist'});
      return;
    }
    res.status(200).json(catNow);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.post('/', async (req, res) => {
  // create a new category
  try {
    const catNow = await Category.create(req.body);
    res.status(200).json(catNow);
  } catch (err) {
    res.status(400).json(err);
  }
});
//threw error because forgot the async
router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  try {
    const catNow = await Category.update(
      {
        catgory_name: req.body.category_name,
      },
      {
        where: { id: req.params.id},
      }
    );
    if (!catNow) {
      res.status(404).json({message: 'That category doesnt exist'});
      return;
    }
    res.status(200).json(catNow)
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  try {
    const delCat = await Category.destroy({
      where: {
        id: req.params.id, //again must be params here and then by its id
      },
    });
    if (!delCat) {
      res.status(400).json({message: 'That category doesnt exist'});
      return;
    }
    res.status(200).json({delCat});
  } catch (err) {
    res.status(409).json(err);
  }
});

module.exports = router;

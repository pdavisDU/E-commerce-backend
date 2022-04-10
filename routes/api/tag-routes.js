const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');
//CRUD operations 
// The `/api/tags` endpoint
//async process
router.get('/', async (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  try {
    const getTag = await Tag.findAll({
      include: [{model: Product}],
    });
    res.status(200).json(getTag);
  } catch (err) {
    res.status(500).json(err);
  }
});
//add your async await
router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  //add a try catch
  try {
    const getTag = await Tag.findByPk(req.params.id, {
      include: [{model: Product}],
    });
    if (!getTag) {
      res.status(400).json({message: 'That tag doesnt exist'});
    }
    res.status(200).json(getTag);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  // create a new tag
  try {
    const getTag = await Tag.create(req.body);
    res.status(200).json(getTag);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
  try {
    const getTag = await Tag.update(
      {
        tag_name: req.body.tag_name,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );
    if (!getTag) {
      res.status(400).json({message: 'That tag doesnt exist'});
    }
    res.status(200).json(getTag);
  } catch(err) {
    res.status(500).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value
  try {
    const getTag = await Tag.destroy({
      where: {
        id: req.params.id,
      },
    });
    if(!getTag) {
      res.status(404).json({message: 'That tag doesnt exist'});
      return;
    }
    res.status(200).json(getTag);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;

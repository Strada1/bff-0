const { COMMENT } = require('../services/commentService');
const router = require('../routes/movies');

router.post('/:movieId/comment', async (req, res) => {
  try {
    await COMMENT.CREATE({
      comment: req.body.comment,
      movieId: req.params.movieId,
    });
    return res
      .status(201)
      .send(`comment posted on movie ${req.params.movieId}`);
  } catch (error) {
    return res.status(500).send('error');
  }
});

router
  .route('/:movieId/comment/:commentId')
  .get(async (req, res) => {
    try {
      const commentId = req.params.commentId;
      COMMENT.GET(commentId, (error, comment) => {
        if (error) throw new Error('Read Erro');
        return res.status(201).send(comment);
      });
    } catch (e) {
      return res.status(500).send('error');
    }
  })
  .put(async (req, res) => {
    try {
      const commentId = req.params.commentId;
      await COMMENT.UPDATE(commentId, req.body);
      return res.status(201).send(`comment ${commentId} updated`);
    } catch (e) {
      return res.status(500).send('error');
    }
  })
  .delete(async (req, res) => {
    try {
      const commentId = req.params.commentId;
      await COMMENT.DELETE(commentId);
      return res.status.send(`comment ${commentId} deleted`);
    } catch (e) {
      return res.status(500).send('error');
    }
  });

// create web server    
// create post request
// create get request
// create delete request
// create put request

const express = require('express');
const router = express.Router();
const { Comment, validate } = require('../models/comment');
const { Post } = require('../models/post');
const auth = require('../middleware/auth');

router.post('/', auth, async (req, res) => {
    const { error } = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    const post = await Post.findById(req.body.postId);
    if(!post) return res.status(404).send('The post with the given ID was not found.');

    const comment = new Comment({
        postId: req.body.postId,
        userId: req.body.userId,
        content: req.body.content
    });

    await comment.save();
    res.send(comment);
});

router.get('/:id', auth, async (req, res) => {
    const comment = await Comment.findById(req.params.id);
    if(!comment) return res.status(404).send('The comment with the given ID was not found.');
    res.send(comment);
});

router.delete('/:id', auth, async (req, res) => {
    const comment = await Comment.findByIdAndRemove(req.params.id);
    if(!comment) return res.status(404).send('The comment with the given ID was not found.');
    res.send(comment);
});

router.put('/:id', auth, async (req, res) => {
    const { error } = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    const comment = await Comment.findByIdAndUpdate(req.params.id, {
        postId: req.body.postId,
        userId: req.body.userId,
        content: req.body.content
    }, { new: true });

    if(!comment) return res.status(404).send('The comment with the given ID was not found.');
    res.send(comment);
});

module.exports = router;
"use strict";

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const Post = use("App/Models/Post");

/**
 * Resourceful controller for interacting with posts
 */
class PostController {
  /**
   * Show a list of all posts.
   * GET posts
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index({ request }) {
    if (!request.input("tag")) {
      const posts = await Post.query().fetch();

      return posts;
    } else if (request.input("username")) {
      const posts = await Post.query()
        .where({ tag: request.input("username") })
        .fetch();

      return posts;
    }
    const posts = await Post.query()
      .where({ tag: request.input("tag") })
      .fetch();

    return posts;
  }

  /**
   * Create/save a new post.
   * POST posts
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ request, auth }) {
    const data = request.only(["title", "description", "tag"]);

    const post = await Post.create({ ...data, user_id: auth.user.id });

    return post;
  }

  /**
   * Display a single post.
   * GET posts/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show({ params }) {
    const post = await Post.query()
      .where("id", params.id)
      .with("user")
      .fetch();

    return post;
  }

  /**
   * Update post details.
   * PUT or PATCH posts/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ params, request }) {
    const { title, description, tag } = request.all();

    const post = await Post.findOrFail(params.id);
    post.merge({ title, description, tag });

    await post.save();

    return post;
  }

  /**
   * Delete a post with id.
   * DELETE posts/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({ params }) {
    const post = await Post.findOrFail(params.id);

    await post.delete();
  }
}

module.exports = PostController;

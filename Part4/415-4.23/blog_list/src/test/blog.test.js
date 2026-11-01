// const { test, describe } = require('node:test')
// const assert = require('node:assert')
// const listHelper = require('../utils/list_helper')

import { test, describe, after } from 'node:test'
import assert from 'node:assert'
import { dummy, totalLikes, favoriteBlogs, checkLikesMissing } from '../Utils/list_helper.js'
import supertest from 'supertest'
import mongoose from 'mongoose'
import app from '../../app.js'
import { response } from 'express'
import { Blog } from '../models/blogModels.js'
const api = supertest(app)

describe('count blog', () => {
    test('dummy returns one', () => {
        const blogs = []

        const result = dummy(blogs)
        assert.strictEqual(result, 1)
    })
})
describe('total likes', () => {
    const blogs = [
        {
            _id: "5a422a851b54a676234d17f7",
            title: "React patterns",
            author: "Michael Chan",
            url: "https://reactpatterns.com/",
            likes: 7,
            __v: 0
        },
        {
            _id: "5a422aa71b54a676234d17f8",
            title: "Go To Statement Considered Harmful",
            author: "Edsger W. Dijkstra",
            url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
            likes: 5,
            __v: 0
        },
        {
            _id: "5a422b3a1b54a676234d17f9",
            title: "Canonical string reduction",
            author: "Edsger W. Dijkstra",
            url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
            likes: 12,
            __v: 0
        },
        {
            _id: "5a422b891b54a676234d17fa",
            title: "First class tests",
            author: "Robert C. Martin",
            url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
            likes: 10,
            __v: 0
        },
        {
            _id: "5a422ba71b54a676234d17fb",
            title: "TDD harms architecture",
            author: "Robert C. Martin",
            url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
            likes: 0,
            __v: 0
        },
        {
            _id: "5a422bc61b54a676234d17fc",
            title: "Type wars",
            author: "Robert C. Martin",
            url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
            likes: 2,
            __v: 0
        }
    ]
    test('when list has only one blog, equals the likes of that', () => {
        const result = totalLikes(blogs)
        assert.strictEqual(result, 5)
    })

    test('The most favorite blog', () => {
        const result = favoriteBlogs(blogs)
        assert.deepStrictEqual(result, blogs[2])
    })
})
describe('HTTP Method test', () => {
    test('Check GET /api/blogs', async () => {
        await api
            .get('/api/blogs')
            .expect(200)
            .expect('Content-Type', /application\/json/)
    })
    test('Check unique id', async () => {
        const res = await api.get('/api/blogs');
        assert.strictEqual(res.body.length > 0, true)
        assert.ok(res.body[0].id)
        assert.strictEqual(res.body[0]._id, undefined)
    })
    test('Check HTTP POST successful', async () => {
        const dataUpload = {
            title: "Harry Potter",
            author: "J.K Rowling",
            url: "www.harrypotter.com",
            likes: 100
        }
        const blogArr = await api
            .get('/api/blogs')
        const sumBeforePost = blogArr.body.length;
        const res = await api
            .post('/api/blogs')
            .send(dataUpload)
            .expect(201)
            .expect('Content-Type', /application\/json/)
        const blogArrAfter = await api.get('/api/blogs')
        const sumAfterPost = blogArrAfter.body.length;
        assert.strictEqual(res.body.title, dataUpload.title)
        assert.strictEqual(res.body.author, dataUpload.author)
        assert.strictEqual(sumAfterPost, sumBeforePost + 1)
    })
    test('Check missing likes field', async () => {
        const req = {
            title: "test",
            author: "test   ",
            url: "www.mrbean.com",
        };
        const result = await api
            .post('/api/blogs')
            .send(req)
            .expect(201)
            .expect('Content-Type', /application\/json/)
        assert.notStrictEqual(result.body.likes, undefined)
    })
    test('Check if request has not title and author field', async () => {
        const reqBody = {
            likes: 100
        }
        const result = await api
            .post('/api/blogs')
            .send(reqBody)
        assert.strictEqual(result.status, 400)
    })
    test('Test delete method', async () => {
        const id = "6a9d34526e96c1500375407b";
        const result = await api
            .delete(`/api/blogs/${id}`)
            .expect(204)
        assert.strictEqual(result.status, 204)
    })
    test.only('test updated function', async () => {
        const id = '6a9d34526e96c1500375407c';
        const getById = await api.get(`/api/blogs/${id}`)
        const data ={
            title:'Mr Testing',
            author:"Testing Update again",
            url:"www.testing.com",
            likes:980
        }
        const result = await api
            .put(`/api/blogs/${getById.body.id}`)
            .send(data)
            .expect(200)
        assert.strictEqual(result.status, 200)
        assert.strictEqual(result.body.title,data.title)
        assert.strictEqual(result.body.author,data.author)
    }
    )
    after(async () => {
        await mongoose.connection.close();
    })
})
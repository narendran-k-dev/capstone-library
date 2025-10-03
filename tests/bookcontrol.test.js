const sinon = require('sinon');
const { addbook, findAllBooks } = require('../src/controller/controller.book.js');
const db = require('../src/model');
const { expect } = require('chai');

const mockRequest = (options) => ({
  params: options.params || {},
  query: options.query || {},
  body: options.body || {},
  headers: options.headers || {},
  ...options,
});

const mockResponse = () => {
  const res = {};
  res.status = sinon.stub().returns(res);
  res.json = sinon.stub().returns(res);
  res.send = sinon.stub().returns(res);
  return res;
};

describe('Book Controller - addbook', () => {
  it('should create a new book and respond with data', async () => {
    const req = mockRequest({
      body: {
        title: 'Test Book',
        author: 'John Doe',
        genre: 'Fiction',
        date: '2023-01-01',
        description: 'A test book',
        createdById: 'user123',
      },
    });

    const res = mockResponse();

    const saveStub = sinon.stub(db.Book.prototype, 'save').resolves(req.body);

    await addbook(req, res);

    sinon.assert.calledOnce(saveStub);
    sinon.assert.calledOnce(res.send);
    sinon.assert.calledWith(res.send, req.body);

    saveStub.restore();
  });
});
describe('Book Controller - findAllBooks', () => {
  it('should return all books', async () => {
    const mockBooks = [
      { title: 'Book A' },
      { title: 'Book B' }
    ];

    const findStub = sinon.stub(db.Book, 'find').resolves(mockBooks);

    const req = mockRequest({});
    const res = mockResponse();

    await findAllBooks(req, res);

    sinon.assert.calledOnce(findStub);
    sinon.assert.calledOnce(res.send);
    sinon.assert.calledWith(res.send, mockBooks);

    findStub.restore();
  });
});

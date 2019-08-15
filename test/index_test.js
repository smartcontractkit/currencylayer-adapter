const assert = require('chai').assert;
const createRequest = require('../index.js').createRequest;

describe('createRequest', () => {

  context('Endpoint: historical', () => {
    const jobID = "278c97ffadb54a5bbb93cfec5f7b5503";
    const req = {
      id: jobID,
      data: {
		    endpoint: "historical",
        date: "2019-07-23"
      }
    };

    it('returns data to the node', (done) => {
      createRequest(req, (statusCode, data) => {
        assert.equal(statusCode, 200);
        assert.equal(data.jobRunID, jobID);
        assert.isNotEmpty(data.data);
        done();
      });
    });
  });

  context('Endpoint: live', () => {
    const jobID = "278c97ffadb54a5bbb93cfec5f7b5503";
    const req = {
      id: jobID,
      data: {
		    endpoint: "live"
      }
    };

    it('returns data to the node', (done) => {
      createRequest(req, (statusCode, data) => {
        assert.equal(statusCode, 200);
        assert.equal(data.jobRunID, jobID);
		    assert.isNotEmpty(data.data);
        done();
      });
    });
  });

  context('Endpoint: convert', () => {
    const jobID = "278c97ffadb54a5bbb93cfec5f7b5503";
    const req = {
      id: jobID,
      data: {
        endpoint: "convert",
        from: "EUR",
        to: "USD",
        amount: 100
      }
    };

    it('returns data to the node', (done) => {
      createRequest(req, (statusCode, data) => {
        assert.equal(statusCode, 200);
        assert.equal(data.jobRunID, jobID);
        assert.isNotEmpty(data.data);
        done();
      });
    });
  });

  context('Bad input', () => {
    const jobID = "278c97ffadb54a5bbb93cfec5f7b5503";
    const req = {
      id: jobID,
      data: {}
    };

    it('returns an error to the node', (done) => {
      createRequest(req, (statusCode, data) => {
        assert.equal(statusCode, 200);
        assert.equal(data.jobRunID, jobID);
        assert.equal(data.status, "errored");
        assert.isNotEmpty(data.error);
        done();
      });
    });
  });

  context('Deviator', () => {
    const jobID = "278c97ffadb54a5bbb93cfec5f7b5503";
    const req = {
      id: jobID,
      data: {
        from: "XAU",
        to: "USD"
      }
    };

    it('returns data to the node', (done) => {
      createRequest(req, (statusCode, data) => {
        assert.equal(statusCode, 200);
        assert.equal(data.jobRunID, jobID);
        assert.isNotEmpty(data.data);
        assert.isNumber(data.result);
        done();
      });
    });
  });
});
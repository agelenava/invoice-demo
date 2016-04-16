import request from 'superagent';

function getUrl(path) {
  return path;
}

const HttpClient = {

  get: path => new Promise((resolve, reject) => {
    request
      .get(getUrl(path))
      .accept('application/json')
      .end((err, res) => {
        if (err) {
          if (err.status === 404) {
            resolve(null);
          } else {
            reject(err);
          }
        } else {
          resolve(res.body);
        }
      });
  }),

  put: (path, payload) => new Promise((resolve, reject) => {
    request
      .put(getUrl(path))
      .send(payload)
      .end((err, res) => {
        if (err) {
          if (err.status === 404) {
            resolve(null);
          } else {
            reject(err);
          }
        } else {
          resolve(res.body);
        }
      });
  }),

  post: (path, payload) => new Promise((resolve, reject) => {
    request
      .post(getUrl(path))
      .send(payload)
      .end((err, res) => {
        if (err) {
          if (err.status === 404) {
            resolve(null);
          } else {
            reject(err);
          }
        } else {
          resolve(res.body);
        }
      });
  }),

  delete: (path) => new Promise((resolve, reject) => {
    request
      .del(getUrl(path))
      .end((err, res) => {
        if (err) {
          if (err.status === 404) {
            resolve(null);
          } else {
            reject(err);
          }
        } else {
          resolve(res);
        }
      });
  })

};

export default HttpClient;

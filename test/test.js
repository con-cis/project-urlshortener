const request = require("supertest");
const { app } = require("../index.js");
const chai = require("chai");
const expect = chai.expect;

describe("URL Controller", function () {
  it("should generate a short URL when provided with a valid URL", function (done) {
    request(app)
      .post("/api/shorturl")
      .type("form")
      .send({ url: "https://www.thomasloy.de" })
      .expect(200)
      .expect("Content-Type", /json/)
      .end(function (err, res) {
        if (err) {
          return done(err);
        }
        expect(res.body).to.have.property("original_url");
        expect(res.body).to.have.property("short_url");

        const shortUrl = res.body["short_url"];

        request(app)
          .get(`/api/shorturl/${shortUrl}`)
          .expect(302)
          .expect("location", "https://www.thomasloy.de")
          .end(function (err, res) {
            if (err) {
              return done(err);
            }
            done();
          });
      });
  });

  it("should return an error when provided with an invalid URL", function (done) {
    request(app)
      .post("/api/shorturl")
      .type("form")
      .send({ url: "hxxps://www.invalid.thomaslXXXy.de" })
      .expect(500)
      .end(function (err, res) {
        if (err) {
          expect(res.text).to.be.equal("no valid url");
          return done();
        }
        return done();
      });
  });

  it("should handle DNS lookup errors", function (done) {
    request(app)
      .post("/api/shorturl")
      .type("form")
      .send({ url: "https://www.invalid.thomaslXXXy.de" })
      .expect(500)
      .end(function (err, res) {
        if (err) {
          expect(res.text).to.be.equal("url not found");
          return done();
        }
        return done();
      });
  });
});

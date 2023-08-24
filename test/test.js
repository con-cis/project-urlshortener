const request = require("supertest");
const app = require("../index.js");
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
      .end(function (err, resPostValidUrl) {
        if (err) {
          return done("Error:", err);
        }
        expect(resPostValidUrl.body).to.have.property("original_url");
        expect(resPostValidUrl.body).to.have.property("short_url");

        const shortUrl = resPostValidUrl.body.short_url;
        request(app)
          .get(`/api/shorturl/${shortUrl}`)
          .expect(302)
          .expect("Location", "https://www.thomasloy.de")
          .end(function (err, resRedirect) {
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
      .send({ url: "https://www.invalid.thomasloy.de" })
      .expect(400)
      .expect("Content-Type", /json/)
      .end(function (err, resPostInvalidUrl) {
        if (err) {
          return done("Error:", err);
        }
        expect(resPostInvalidUrl.body).to.have.property("error", "invalid url");
        done();
      });
  });

  it("should handle DNS lookup errors", function (done) {
    request(app)
      .post("/api/shorturl")
      .type("form")
      .send({ url: "https://www.invalid.thomasloy.de" })
      .expect(400)
      .expect("Content-Type", /json/)
      .end(function (err, resDNSLookupError) {
        if (err) {
          return done("Error:", err);
        }
        expect(resDNSLookupError.body).to.have.property("error", "invalid url");
        done();
      });
  });
});

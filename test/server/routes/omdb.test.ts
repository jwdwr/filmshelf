import server from "../../../src/index";
import { describe, it, after } from "mocha";
import { use, expect, request } from "chai";
import chaiHttp from "chai-http";
import dirtyChai from "dirty-chai";

use(chaiHttp);
use(dirtyChai);

describe("OMDB routes", () => {
  const omdbFilmId = "tt2668142";

  it("should successfully search OMDB", done => {
    request(server)
      .get("/omdb/search?title=laser&year=2012")
      .set("Authorization", "Bearer testToken")
      .end((err, res) => {
        expect(err).to.be.null();
        expect(res).to.have.status(200);

        expect(res.body.result.films).to.be.an("array");
        expect(res.body.result.films.length).to.be.greaterThan(1);
        expect(res.body.result.films.length).to.equal(res.body.result.total);
        done();
      });
  });

  it("shouldn't successfully search OMDB without a title", done => {
    request(server)
      .get("/omdb/search?year=2000")
      .set("Authorization", "Bearer testToken")
      .end((err, res) => {
        expect(res).to.have.status(400);
        done();
      });
  });

  it("should successfully get info about a film from OMDB", done => {
    request(server)
      .get(`/omdb/info/${omdbFilmId}`)
      .set("Authorization", "Bearer testToken")
      .end((err, res) => {
        expect(err).to.be.null();
        expect(res).to.have.status(200);

        expect(res.body.filmInfo).to.be.an("object");
        done();
      });
  });

  it("shouldn't successfully get info about a film with an invalid ID", done => {
    request(server)
      .get(`/omdb/info/${omdbFilmId}1234`)
      .set("Authorization", "Bearer testToken")
      .end((err, res) => {
        expect(res).to.have.status(400);
        done();
      });
  });

  it("should successfully add a film from OMDB", done => {
    request(server)
      .post(`/omdb/add/${omdbFilmId}`)
      .set("Authorization", "Bearer testToken")
      .end((err, res) => {
        expect(err).to.be.null();
        expect(res).to.have.status(200);
        expect(res.body.film).to.be.an("object");

        const filmId = res.body.film._id;
        expect(filmId).to.be.a("string");
        done();
      });
  });

  it("shouldn't successfully add a nonexistent film from OMDB", done => {
    const badOmdbFilmId = "tt0000000";
    request(server)
      .post(`/omdb/add/${badOmdbFilmId}`)
      .set("Authorization", "Bearer testToken")
      .end((err, res) => {
        expect(res).to.have.status(404);
        done();
      });
  });
});

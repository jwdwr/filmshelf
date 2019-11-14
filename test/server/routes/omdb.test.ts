import server from "../../../src/index";
import { describe, it, after } from "mocha";
import { use, expect, request } from "chai";
import chaiHttp from "chai-http";
import dirtyChai from "dirty-chai";

use(chaiHttp);
use(dirtyChai);

describe("OMDB routes", () => {
  after(() => {
    server.close();
  });

  const omdbFilmId = "tt2668142";

  it("should successfully search OMDB", done => {
    request(server)
      .get("/omdb/search?title=laser&year=2012")
      .end((err, res) => {
        expect(err).to.be.null();
        expect(res).to.have.status(200);

        expect(res.body.result.films).to.be.an("array");
        expect(res.body.result.films.length).to.be.greaterThan(1);
        done();
      });
  });

  it("should successfully get info about a film from OMDB", done => {
    request(server)
      .get(`/omdb/info/${omdbFilmId}`)
      .end((err, res) => {
        expect(err).to.be.null();
        expect(res).to.have.status(200);

        expect(res.body.filmInfo).to.be.an('object');
        done();
      });
  });

  it("should successfully add a film from OMDB", done => {
    request(server)
      .post(`/omdb/add/${omdbFilmId}`)
      .end((err, res) => {
        expect(err).to.be.null();
        expect(res).to.have.status(200);
        expect(res.body.film).to.be.an("object");

        const filmId = res.body.film._id;
        expect(filmId).to.be.a("string");
        done();
      });
  });
});

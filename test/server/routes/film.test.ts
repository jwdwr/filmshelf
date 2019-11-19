import server from "../../../src/index";
import { describe, it } from "mocha";
import { use, expect, request } from "chai";
import chaiHttp from "chai-http";
import dirtyChai from "dirty-chai";

use(chaiHttp);
use(dirtyChai);

describe("Film routes", () => {
  let filmId: string;
  const badFilmId = "000000000000000000000000";

  it("should successfully add a film", done => {
    request(server)
      .post("/film/add")
      .set("Authorization", "Bearer testToken")
      .send({
        title: "Laser ants",
        format: "VHS",
        length: 360,
        year: 1988,
        rating: 5
      })
      .end((err, res) => {
        expect(err).to.be.null();
        expect(res).to.have.status(200);
        expect(res.body.film).to.be.an("object");

        filmId = res.body.film._id;
        expect(filmId).to.be.a("string");
        done();
      });
  });

  it("shouldn't successfully add an invalid film", done => {
    request(server)
      .post("/film/add")
      .set("Authorization", "Bearer testToken")
      .send({
        title: "Laser dolphins",
        format: "DVD",
        length: 600, // invalid
        year: 1999,
        rating: 0 // invalid
      })
      .end((err, res) => {
        expect(res).to.have.status(400);
        done();
      });
  });

  it("should successfully get a film", done => {
    request(server)
      .get(`/film/get/${filmId}`)
      .set("Authorization", "Bearer testToken")
      .end((err, res) => {
        expect(err).to.be.null();
        expect(res).to.have.status(200);
        expect(res.body.film).to.be.an("object");

        const filmName = res.body.film.title;
        expect(filmName).to.be.a("string");
        done();
      });
  });

  it("should complain about an invalid film ID", done => {
    request(server)
      .get(`/film/get/${filmId}1234`)
      .set("Authorization", "Bearer testToken")
      .end((err, res) => {
        expect(res).to.have.status(400);

        done();
      });
  });

  it("shouldn't find a nonexistent film", done => {
    request(server)
      .get(`/film/get/${badFilmId}`)
      .set("Authorization", "Bearer testToken")
      .end((err, res) => {
        expect(res).to.have.status(404);

        done();
      });
  });

  it("should successfully edit a film", done => {
    const newName = "a new name";
    request(server)
      .put(`/film/edit/${filmId}`)
      .set("Authorization", "Bearer testToken")
      .send({ title: newName })
      .end((err, res) => {
        expect(err).to.be.null();
        expect(res).to.have.status(200);
        expect(res.body.film).to.be.an("object");

        const filmName = res.body.film.title;
        expect(filmName).to.equal(newName);
        done();
      });
  });

  it("shouldn't successfully edit a film with bad info", done => {
    const newName = "a new name";
    request(server)
      .put(`/film/edit/${filmId}`)
      .set("Authorization", "Bearer testToken")
      .send({ title: newName })
      .send({ omdbInfo: "some bad info" })
      .end((err, res) => {
        expect(res).to.have.status(400);
        done();
      });
  });

  it("shouldn't successfully edit a film's OMDB info", done => {
    const newName = "a new name";
    request(server)
      .put(`/film/edit/${filmId}`)
      .set("Authorization", "Bearer testToken")
      .send({ omdbInfo: 'some bad info' })
      .end((err, res) => {
        expect(res).to.have.status(400);
        done();
      });
  });

  it("should successfully delete a film", done => {
    request(server)
      .delete(`/film/delete/${filmId}`)
      .set("Authorization", "Bearer testToken")
      .end((err, res) => {
        expect(err).to.be.null();
        expect(res).to.have.status(200);
        expect(res.body.deleted).to.be.true();
        done();
      });
  });

  it("shouldn't successfully delete a nonexistent film", done => {
    request(server)
      .delete(`/film/delete/${filmId}1234`)
      .set("Authorization", "Bearer testToken")
      .end((err, res) => {
        expect(res).to.have.status(400);
        done();
      });
  });

  it("should successfully list films", done => {
    request(server)
      .get("/film/list")
      .set("Authorization", "Bearer testToken")
      .end((err, res) => {
        expect(err).to.be.null();
        expect(res).to.have.status(200);
        expect(res.body.films).to.be.an("array");
        done();
      });
  });

  it("should successfully sort films", done => {
    const sortBy = "length";
    request(server)
      .get(`/film/list?sortBy=${sortBy}`)
      .set("Authorization", "Bearer testToken")
      .end((err, res) => {
        expect(err).to.be.null();
        expect(res).to.have.status(200);
        expect(res.body.films).to.be.an("array");
        done();
      });
  });

  it("shouldn't successfully sort films by invalid fields", done => {
    const sortBy = "cuteness";
    request(server)
      .get(`/film/list?sortBy=${sortBy}`)
      .set("Authorization", "Bearer testToken")
      .end((err, res) => {
        expect(res).to.have.status(400);
        done();
      });
  });
});

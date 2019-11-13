import server from "../../../src/index";
import { describe, it, after } from "mocha";
import { use, expect, request } from "chai";
import chaiHttp from "chai-http";
import dirtyChai from "dirty-chai";

use(chaiHttp);
use(dirtyChai);

describe("Film routes", () => {
  after(() => {
    server.close();
  });

  it("should successfully add a film", done => {
    request(server)
      .post("/film/add")
      .send({})
      .end((err, res) => {
        expect(err).to.be.null();
        expect(res).to.have.status(200);
        expect(res.body).to.be.an("object");

        const filmId = res.body.id;
        expect(filmId).to.be.a("number");
        done();
      });
  });

  it("should successfully get a film", done => {
    const filmToGet = 1;
    request(server)
      .get(`/film/get/${filmToGet}`)
      .send({})
      .end((err, res) => {
        expect(err).to.be.null();
        expect(res).to.have.status(200);
        expect(res.body).to.be.an("object");

        const filmName = res.body.name;
        expect(filmName).to.be.a("string");
        done();
      });
  });

  it("should successfully edit a film", done => {
    const filmToEdit = 1;
    const newName = "a new name";
    request(server)
      .put(`/film/edit/${filmToEdit}`)
      .send({name: newName})
      .end((err, res) => {
        expect(err).to.be.null();
        expect(res).to.have.status(200);
        expect(res.body).to.be.an("object");

        const filmName = res.body.name;
        expect(filmName).to.equal(newName);
        done();
      });
  });

  it("should successfully delete a film", done => {
    const filmToDelete = 1;
    request(server)
      .delete(`/film/delete/${filmToDelete}`)
      .end((err, res) => {
        expect(err).to.be.null();
        expect(res).to.have.status(200);
        expect(res.body).to.be.true();
        done();
      });
  });

  it("should successfully list films", done => {
    const filmToDelete = 1;
    request(server)
      .get("/film/list")
      .end((err, res) => {
        expect(err).to.be.null();
        expect(res).to.have.status(200);
        expect(res.body).to.be.an("array");
        done();
      });
  });
});

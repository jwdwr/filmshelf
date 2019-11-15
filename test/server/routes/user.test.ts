import server from "../../../src/index";
import { describe, it, after } from "mocha";
import { use, expect, request } from "chai";
import chaiHttp from "chai-http";
import dirtyChai from "dirty-chai";

use(chaiHttp);
use(dirtyChai);

describe("User routes", () => {
  after(() => {
    server.close();
  });

  const username = "superuser" + Math.floor(Math.random() * 1000000);
  const password = 'superpassword';
  const badUsername = "u";
  const wrongPassword = "password";

  it("should successfully create a user", done => {
    request(server)
      .post(`/user/signup`)
      .send({ username, password })
      .end((err, res) => {
        expect(err).to.be.null();
        expect(res).to.have.status(200);
        expect(res.body.token).to.be.a("string");

        done();
      });
  });

  it("shouldn't successfully create an invalid user", done => {
    request(server)
      .post(`/user/signup`)
      .send({ badUsername, password })
      .end((err, res) => {
        expect(res).to.have.status(400);
        done();
      });
  });

  it("should successfully get a token", done => {
    request(server)
      .post(`/user/token`)
      .send({ username, password })
      .end((err, res) => {
        expect(err).to.be.null();
        expect(res).to.have.status(200);
        expect(res.body.token).to.be.a("string");

        done();
      });
  });

  it("shouldn't get a token with the wrong password", done => {
    request(server)
      .post(`/user/token`)
      .send({ username, password: wrongPassword })
      .end((err, res) => {
        expect(res).to.have.status(401);
        done();
      });
  });
});
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

  it("should successfully create a user", done => {
    request(server)
      .post(`/user/signup`)
      .send({username, password})
      .end((err, res) => {
        expect(err).to.be.null();
        expect(res).to.have.status(200);
        expect(res.body.token).to.be.a("string");

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
});
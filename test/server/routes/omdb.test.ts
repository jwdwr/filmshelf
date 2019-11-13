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

  let filmId: string;

  it("should successfully add a film from OMDB", done => {
    request(server)
      .post("/omdb/add/tt0261392")
      .end((err, res) => {
        expect(err).to.be.null();
        expect(res).to.have.status(200);
        expect(res.body.film).to.be.an("object");

        filmId = res.body.film._id;
        expect(filmId).to.be.a("string");
        done();
      });
  });
});

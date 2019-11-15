import server from "../../src/index";
import { describe, it } from "mocha";
import { use, expect, request } from "chai";
import chaiHttp from "chai-http";
import dirtyChai from "dirty-chai";

use(chaiHttp);
use(dirtyChai);

describe("Express server", () => {
  it("should load the root route", done => {
    request(server)
      .get("/")
      .end((err, res) => {
        expect(err).to.be.null();
        expect(res).to.have.status(200);
        expect(res.body).to.equal(true);
      });
      done();
  });
});

after(() => {
  server.close();
  process.exit(0);
});
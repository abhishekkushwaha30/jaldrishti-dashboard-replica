import { readFileSync } from "node:fs";
import { JSDOM } from "jsdom";
import { describe, expect, it } from "vitest";

const html = readFileSync("public/jaldrishti.html", "utf8");
function demo() {
  return new JSDOM(html, { runScripts: "dangerously", url: "http://localhost:8080" });
}

describe("Demo repair signals", () => {
  it("turns a repaired leakage green while keeping historic water loss", () => {
    const dom = demo();
    const result = dom.window.eval(`(() => {
      const f=F.find(f=>f.z=='Rampur'&&f.type=='Suspected leakage');
      const loss=R.Rampur.loss;
      AL[f.id].st='Repaired';refreshSignals();
      return [signal(f),R.Rampur.worst,R.Rampur.loss===loss];
    })()`);
    expect(result).toEqual(["Normal", "Normal", true]);
    dom.window.close();
  });
  it("does not clear another unresolved issue in the same zone", () => {
    const dom = demo();
    const result = dom.window.eval(`(() => {
      const f=F.find(f=>f.z=='Rampur');
      AL[f.id].st='Repaired';
      R.Rampur.F.push({id:'other',sev:'High'});AL.other={st:'Assigned'};
      refreshSignals();return R.Rampur.worst;
    })()`);
    expect(result).toBe("High");
    dom.window.close();
  });
  it("allows the demo engineer to repair Rampur but not a citizen", () => {
    const dom = demo();
    const result = dom.window.eval(`(() => {
      S.user={name:'JE R. Verma',role:'block',s:'Punjab',d:'Ludhiana',b:'Doraha'};
      const engineer=canRepair('Rampur');
      S.user={role:'citizen'};return [engineer,canRepair('Rampur')];
    })()`);
    expect(result).toEqual([true, false]);
    dom.window.close();
  });
});
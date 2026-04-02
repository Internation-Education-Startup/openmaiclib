import { promises as r } from "fs";
import i from "path";
const e = i.join(process.cwd(), "data", "classrooms");
i.join(process.cwd(), "data", "classroom-jobs");
async function a(s) {
  await r.mkdir(s, { recursive: !0 });
}
async function m() {
  await a(e);
}
async function w(s, n) {
  const o = i.dirname(s);
  await a(o);
  const t = `${s}.${process.pid}.${Date.now()}.tmp`, c = JSON.stringify(n, null, 2);
  await r.writeFile(t, c, "utf-8"), await r.rename(t, s);
}
async function l(s, n) {
  const o = {
    id: s.id,
    stage: s.stage,
    scenes: s.scenes,
    createdAt: (/* @__PURE__ */ new Date()).toISOString()
  };
  await m();
  const t = i.join(e, `${s.id}.json`);
  return await w(t, o), {
    ...o,
    url: `${n}/classroom/${s.id}`
  };
}
export {
  e as CLASSROOMS_DIR,
  m as ensureClassroomsDir,
  l as persistClassroom,
  w as writeJsonFileAtomic
};
//# sourceMappingURL=classroom-storage.js.map

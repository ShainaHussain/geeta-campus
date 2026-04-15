import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

// ═══════════════════════════════════════════════════════════════════
//  GEETA UNIVERSITY — 3D Campus  (Walk Mode Edition)
// ═══════════════════════════════════════════════════════════════════

// ── BRAND COLORS ─────────────────────────────────────────────────
const GU_ADMIN    = 0xf59e0b;
const GU_ACADEMIC = 0x2563eb;
const GU_HOSTEL   = 0x6366f1;
const GU_MESS     = 0xf97316;
const GU_SPORTS   = 0x4a7a5a;
const GU_PRIMARY  = 0x1e3a8a;

const GU_GOLD = 0xd4a017;
const GU_NAVY = 0x1a2e5c;
const GU_CREAM = 0xd4c4a0;
const GU_BRICK = 0xc87941;
const GU_TEAL = 0x2a6b6b;

const GU_PURPLE = 0x7a5a9a;

const UNIT        = 4;
const p = (x, z) => [x * UNIT, 0, z * UNIT];
function pos(x, z) {
  return [x * UNIT, 0, z * UNIT];
}
// ── BUILDING DATA ─────────────────────────────────────────────────
const BUILDINGS = [
  // ── TOP HALF (North of main road) ──────────────────────────────

  {
    id: "admin-e-block",
    label: "Admin + E Block",
    blockCode: "E",
    name: "Administration & E Block",
    // Left side near parking (as per 2D map)
    pos: pos(-8, -3),
    size: [17, 14, 24],
    color: GU_GOLD,
    floors: [
      {
        label: "Ground Floor",
        desc: "Reception, Accounts Office, Student Helpdesk",
      },
      { label: "1st Floor", desc: "Principal Office, VC Office, Board Room" },
      { label: "2nd Floor", desc: "Exam Cell, Registrar, HR Office" },
    ],
    tags: ["admin", "reception", "registrar", "E Block"],
    tagTypes: ["tag-admin", "tag-admin", "tag-admin", "tag-admin"],
  },

  {
    id: "stage",
    label: "Stage / OAT",
    blockCode: "",
    name: "Open Air Stage & Theatre",
    // In front of C Block, slightly to the left
    pos: pos(-1.5, -12),
    size: [20, 2, 7],
    color: 0x5a4a3a,
    floors: [
      // {
      //   label: "Open Stage",
      //   desc: "University events, cultural programs, convocation",
      // },
    ],
    tags: ["events", "cultural", "stage", "OAT"],
    tagTypes: ["tag-academic", "tag-academic", "tag-academic", "tag-academic"],
  },

  {
    id: "c-block",
    label: "C Block — CSE",
    blockCode: "C",
    name: "Computer Science & Engineering",
    // Central in the top section
    pos: pos(4, -10),
    size: [15, 15, 20],
    color: GU_TEAL,
    floors: [
      {
        label: "Ground Floor",
        desc: "GTH Office, GTH Labs (General Training & Hacking)",
      },
      { label: "1st Floor", desc: "CSE Classrooms, Faculty Cabins" },
      {
        label: "2nd Floor",
        desc: "AI/ML Labs, Networking Lab, Programming Lab",
      },
    ],
    tags: ["C Block", "CSE", "academic", "labs", "GTH"],
    tagTypes: [
      "tag-academic",
      "tag-academic",
      "tag-academic",
      "tag-academic",
      "tag-academic",
    ],
  },

  {
    id: "b-block",
    label: "B Block — Mess",
    blockCode: "B",
    name: "Mess + B Block (Hotel Management)",
    // Right of C Block
    pos: pos(11, -12.7),
    size: [20, 14, 8],
    color: GU_BRICK,
    floors: [
      {
        label: "Ground Floor",
        desc: "Mess / Dining Hall — open to all students",
      },
      {
        label: "1st Floor",
        desc: "Hotel Management Classrooms, Kitchen Lab, Bakery Lab",
      },
      { label: "2nd Floor", desc: "Food Production Lab, Staff Rooms" },
    ],
    tags: ["B Block", "mess", "cafeteria", "hotel management"],
    tagTypes: ["tag-academic", "tag-admin", "tag-hostel", "tag-academic"],
  },

  {
    id: "boys-hostel",
    label: "Boys Hostel",
    blockCode: "BH",
    name: "Boys Hostel Blocks",
    // Far right
    pos: pos(20.5, -27),
    size: [9, 12, 8],
    color: GU_HOSTEL,
    floors: [
      {
        label: "Ground–3rd Floor",
        desc: "Boys Hostel Rooms, Common Room, Washrooms",
      },
    ],
    tags: ["hostel", "boys", "residential"],
    tagTypes: ["tag-hostel", "tag-hostel", "tag-hostel"],
  },

  {
    id: "girls-hostel",
    label: "Girls Hostel",
    blockCode: "GH",
    name: "Girls Hostel",
    // Slightly below Boys Hostel
    pos: pos(9.5, -7.5),
    size: [10, 11, 7],
    color: GU_PURPLE,
    floors: [
      {
        label: "Ground Floor",
        desc: "Entrance, Warden Office, Visitor Lounge, Common Room",
      },
      { label: "1st Floor", desc: "Girls Hostel Rooms" },
      { label: "2nd Floor", desc: "Girls Hostel Rooms" },
      { label: "3rd Floor", desc: "Girls Hostel Rooms" },
    ],
    tags: ["hostel", "girls", "residential"],
    tagTypes: ["tag-hostel", "tag-hostel", "tag-hostel"],
  },

  {
    id: "gym-dsw",
    label: "Gym & DSW",
    blockCode: "DSW",
    name: "Gym & Dean of Student Welfare",
    // To the right of Girls Hostel (same cluster)
    pos: pos(12.01, -7.5),
    size: [10, 11, 7],
    color: GU_NAVY,
    floors: [
      { label: "Ground Floor", desc: "University Gym, Fitness Center" },
      {
        label: "1st Floor",
        desc: "DSW Office, Counselling Cell, Student Grievance",
      },
      {
        label: "1st Floor",
        desc: "DSW Office, Counselling Cell, Student Grievance",
      },
      {
        label: "1st Floor",
        desc: "DSW Office, Counselling Cell, Student Grievance",
      },
    ],
    tags: ["DSW", "gym", "fitness", "student welfare"],
    tagTypes: ["tag-sports", "tag-sports", "tag-admin", "tag-admin"],
  },

  // ── BOTTOM HALF (South of main road) ───────────────────────────

  {
    id: "f-block",
    label: "F Block",
    blockCode: "F",
    name: "F Block + Idea Lab",
    // Bottom-left
    pos: pos(-8, 6),
    size: [16, 13, 15],

    
    color: GU_CREAM,
    floors: [
      { label: "Ground Floor", desc: "Idea Lab, Innovation Hub, Maker Space" },
      { label: "1st Floor", desc: "Classrooms, Seminar Halls" },
      { label: "2nd Floor", desc: "Labs + Classrooms (Pharmacy, Sciences)" },
      { label: "3rd Floor", desc: "Research Labs, Faculty Rooms" },
      { label: "3rd Floor", desc: "Research Labs, Faculty Rooms" },
    ],
    tags: ["F Block", "academic", "labs", "idea lab", "innovation"],
    tagTypes: [
      "tag-academic",
      "tag-academic",
      "tag-academic",
      "tag-academic",
      "tag-academic",
    ],
  },

  {
    id: "auditorium",
    label: "Auditorium",
    blockCode: "AUD",
    name: "Auditorium & Incubation Center",
    // Center-bottom
    pos: pos(-4.25, 6),
    size: [14, 13, 15],
    color: GU_GOLD,
    floors: [
      {
        label: "Auditorium",
        desc: "Main Auditorium — 1000+ seating, AC, stage",
      },
      {
        label: "Incubation Center",
        desc: "Startup incubation, co-working, VC meets",
      },
      { label: "Seminar Hall", desc: "Conference rooms, seminar halls" },
      { label: "Seminar Hall", desc: "Conference rooms, seminar halls" },
      { label: "Seminar Hall", desc: "Conference rooms, seminar halls" },
    ],
    tags: ["auditorium", "incubation", "events", "startup"],
    tagTypes: ["tag-admin", "tag-academic", "tag-academic", "tag-academic"],
  },

  {
    id: "cafeteria",
    label: "Cafeteria",
    blockCode: "CAF",
    name: "Central Cafeteria",
    // Below auditorium
    pos: pos(0, 8),
    size: [15, 5, 10],
    color: GU_BRICK,
    floors: [
      {
        label: "Ground Floor",
        desc: "Food Court, multiple cuisine stalls, seating area",
      },
    ],
    tags: ["cafeteria", "food", "canteen", "dining"],
    tagTypes: ["tag-admin", "tag-admin", "tag-admin", "tag-admin"],
  },
  {
    id: "cafeteria1",
    label: "Cafeteria 1",
    blockCode: "CAF1",
    name: "Central Cafeteria",
    // Below auditorium
    pos: pos(4, 8),
    size: [5, 5, 10],
    color: GU_BRICK,
    floors: [
      {
        label: "Ground Floor",
        desc: "Food Court, multiple cuisine stalls, seating area",
      },
    ],
    tags: ["cafeteria", "food", "canteen", "dining"],
    tagTypes: ["tag-admin", "tag-admin", "tag-admin", "tag-admin"],
  },
  {
    id: "cafeteria2",
    label: "Cafeteria 2",
    blockCode: "CAF2",
    name: "Central Cafeteria",
    // Below auditorium
    pos: pos(5.5, 8),
    size: [5, 5, 10],
    color: GU_BRICK,
    floors: [
      {
        label: "Ground Floor",
        desc: "Food Court, multiple cuisine stalls, seating area",
      },
    ],
    tags: ["cafeteria", "food", "canteen", "dining"],
    tagTypes: ["tag-admin", "tag-admin", "tag-admin", "tag-admin"],
  }, {
    id: "cafeteria3",
    label: "Cafeteria 3",
    blockCode: "CAF3",
    name: "Central Cafeteria",
    // Below auditorium
    pos: pos(7, 8),
    size: [5, 5, 10],
    color: GU_BRICK,
    floors: [
      {
        label: "Ground Floor",
        desc: "Food Court, multiple cuisine stalls, seating area",
      },
    ],
    tags: ["cafeteria", "food", "canteen", "dining"],
    tagTypes: ["tag-admin", "tag-admin", "tag-admin", "tag-admin"],
  },

  {
    id: "d-block",
    label: "D Block",
    blockCode: "D",
    name: "Academic Block — D",
    // Bottom-right
    pos: pos(10, 6),
    size: [14, 13, 15],
    color: GU_CREAM,
    floors: [
      {
        label: "Ground Floor",
        desc: "Classrooms, Tutorial Rooms, Registrar Office",
      },
      {
        label: "1st Floor",
        desc: "Labs + Classrooms (ECE, Mechanical, Civil)",
      },
      { label: "2nd Floor", desc: "Advanced Labs + Research Rooms" },
      { label: "3rd Floor", desc: "Advanced Labs + Research Rooms" },
    ],
    tags: ["D Block", "academic", "labs", "ECE", "mechanical"],
    tagTypes: [
      "tag-academic",
      "tag-academic",
      "tag-academic",
      "tag-academic",
      "tag-academic",
    ],
  },
];

// ── SEARCH INDEX ────────────────────────────────────────────────────
const SEARCH_KEYWORDS = {
  "admin-e-block": ["admin","administration","e block","reception","accounts","registrar","principal","vc","hr","exam cell"],
  "stage":         ["stage","oat","open air","events","cultural","convocation","theatre","amphitheatre"],
  "c-block":       ["c block","cse","computer science","engineering","gth","lab","programming","networking","ai","ml","cyber"],
  "b-block":       ["b block","mess","cafeteria","canteen","food","hotel management","bakery","kitchen","dining"],
  "boys-hostel":   ["boys hostel","hostel","boys","residential","warden"],
  "girls-hostel":  ["girls hostel","hostel","girls","warden","residential","dispensary"],
  "gym-dsw":       ["gym","dsw","dean","student welfare","fitness","counselling","grievance","nss","ncc"],
  "f-block":       ["f block","idea lab","innovation","pharmacy","sciences","research","maker space","3d print"],
  "auditorium":    ["auditorium","incubation","startup","events","seminar","conference","vc meet"],
  "cafeteria":     ["cafeteria","food","canteen","dining","cafe","mess"],
  "d-block":       ["d block","academic","ece","mechanical","civil","labs","classrooms","matlab","ansys"],
};

// ═══════════════════════════════════════════════════════════════════
//  SCENE SETUP
// ═══════════════════════════════════════════════════════════════════
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x0d1a2e);
scene.fog = new THREE.FogExp2(0x0d1a2e, 0.0022);

const camera = new THREE.PerspectiveCamera(60, innerWidth / innerHeight, 0.1, 600);
camera.position.set(0, 80, 110);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(innerWidth, innerHeight);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.15;
document.getElementById("canvas-container").prepend(renderer.domElement);

// ── ORBIT CONTROLS ──────────────────────────────────────────────────
const orbitControls = new OrbitControls(camera, renderer.domElement);
orbitControls.enableDamping = true;
orbitControls.dampingFactor = 0.06;
orbitControls.minDistance = 15;
orbitControls.maxDistance = 200;
orbitControls.maxPolarAngle = Math.PI / 2.1;
orbitControls.target.set(0, 0, 0);

// ── LIGHTS ──────────────────────────────────────────────────────────
scene.add(new THREE.AmbientLight(0x8899bb, 0.6));
const sun = new THREE.DirectionalLight(0xfff5d0, 1.5);
sun.position.set(50, 90, 30);
sun.castShadow = true;
sun.shadow.mapSize.set(2048, 2048);
sun.shadow.camera.left = sun.shadow.camera.bottom = -120;
sun.shadow.camera.right = sun.shadow.camera.top = 120;
sun.shadow.camera.far = 300;
sun.shadow.bias = -0.0005;
scene.add(sun);
const fill = new THREE.DirectionalLight(0xb0c8ff, 0.35);
fill.position.set(-40, 50, -20);
scene.add(fill);

// ── ENVIRONMENT ─────────────────────────────────────────────────────
function flat(x, z, w, d, color, y = 0.05) {
  const m = new THREE.Mesh(
    new THREE.PlaneGeometry(w, d),
    new THREE.MeshStandardMaterial({ color, roughness: 0.9 })
  );
  m.rotation.x = -Math.PI / 2;
  m.position.set(x, y, z);
  m.receiveShadow = true;
  scene.add(m);
}

// Ground
const ground = new THREE.Mesh(
  new THREE.PlaneGeometry(280, 280),
  new THREE.MeshStandardMaterial({ color: 0x1a2e1a, roughness: 0.9 })
);
ground.rotation.x = -Math.PI / 2;
ground.receiveShadow = true;
scene.add(ground);

// Green patches
[[-14,-36,8,10],[-8,-20,7,8],[14,-20,7,8],[-36,0,10,12],[-36,20,10,12],
 [14,10,8,8],[-14,10,8,8],[14,36,12,10],[28,36,10,20],[-10,42,12,8],[12,42,12,8]]
  .forEach(([x,z,w,d]) => flat(x,z,w,d, 0x2a5c2a));

// OAT circle with rings
const oatBase = new THREE.Mesh(
  new THREE.CircleGeometry(5, 32),
  new THREE.MeshStandardMaterial({ color: 0x3d6b3d })
);
oatBase.rotation.x = -Math.PI / 2;
oatBase.position.set(28.5, 0.06, -40);
scene.add(oatBase);
[4.2, 3.6, 3.0].forEach((r, i) => {
  const ring = new THREE.Mesh(
    new THREE.RingGeometry(r - 0.4, r, 32),
    new THREE.MeshStandardMaterial({ color: 0x8a7a5a, side: THREE.DoubleSide })
  );
  ring.rotation.x = -Math.PI / 2;
  ring.position.set(28.5, 0.07 + i * 0.08, -40);
  scene.add(ring);
});

// Fountain
const fbMesh = new THREE.Mesh(
  new THREE.CylinderGeometry(3, 3.5, 0.4, 24),
  new THREE.MeshStandardMaterial({ color: 0x6688aa, roughness: 0.4, metalness: 0.3 })
);
fbMesh.position.set(0, 0.2, 30);
scene.add(fbMesh);
const fwMesh = new THREE.Mesh(
  new THREE.CylinderGeometry(2.4, 2.4, 0.15, 24),
  new THREE.MeshStandardMaterial({ color: 0x4488cc, transparent: true, opacity: 0.7 })
);
fwMesh.position.set(0, 0.42, 30);
scene.add(fwMesh);
const fSpout = new THREE.Mesh(
  new THREE.CylinderGeometry(0.2, 0.3, 2, 8),
  new THREE.MeshStandardMaterial({ color: 0x8899aa, metalness: 0.4 })
);
fSpout.position.set(0, 1.2, 30);
scene.add(fSpout);

// Roads
const ROAD = 0x22263a, WALK = 0x3a415a;
flat(0, 8, 110, 8, ROAD, 0.07); // main road
[[-42,-16,6.5,50],[18,-16,7,50],[46,-10,7,38],[0,18,7,30],
 [28,-40,56,6.5],[-24,-36,36,6.5],[0,24,90,6.5],[0,38,50,6]]
  .forEach(([x,z,w,d]) => flat(x,z,w,d, ROAD, 0.07));

// Road dashes
for (let x = -46; x < 50; x += 7) {
  const dash = new THREE.Mesh(
    new THREE.PlaneGeometry(4, 0.25),
    new THREE.MeshStandardMaterial({ color: 0xffffff, emissive: 0x888888, emissiveIntensity: 0.3 })
  );
  dash.rotation.x = -Math.PI / 2;
  dash.position.set(x, 0.09, 8);
  scene.add(dash);
}

// Walkways
[[23.5,-44,11,2.8],[28.5,-42,2.8,6.5],[33.5,-44,11,2.8],
 [-2,30,6,2.8],[0,32,2.8,16],[46,-1,2.8,18]]
  .forEach(([x,z,w,d]) => flat(x,z,w,d, WALK, 0.075));

// Parking
function parking(x, z, w, d) {
  flat(x, z, w, d, 0x181c2c, 0.065);
  const cols = Math.floor(w / 2.6);
  for (let i = 0; i <= cols; i++) {
    const line = new THREE.Mesh(
      new THREE.PlaneGeometry(0.1, d - 0.4),
      new THREE.MeshStandardMaterial({ color: 0x5588aa, emissive: 0x224455, emissiveIntensity: 0.3 })
    );
    line.rotation.x = -Math.PI / 2;
    line.position.set(x - w/2 + i*2.6, 0.09, z);
    scene.add(line);
  }
}
parking(-50, -44, 14, 10);
parking(-40, -30, 12, 8);
parking(-50, 26, 14, 10);

// Boundary walls
function wall(x, z, w, d) {
  const m = new THREE.Mesh(
    new THREE.BoxGeometry(w, 1.4, d),
    new THREE.MeshStandardMaterial({ color: 0x8a7a5a })
  );
  m.position.set(x, 0.7, z);
  m.castShadow = true;
  scene.add(m);
}
wall(-28,-56,40,0.6); wall(24,-56,20,0.6);
wall(0,52,100,0.6); wall(-56,0,0.6,112); wall(56,0,0.6,112);

// Gates
function buildGate(x, z, label) {
  const mat = new THREE.MeshStandardMaterial({ color: 0xd4a017, roughness: 0.3, metalness: 0.2 });
  [z-4, z+4].forEach(oz => {
    const p = new THREE.Mesh(new THREE.BoxGeometry(1.5, 6, 1.5), mat);
    p.position.set(x, 3, oz); p.castShadow = true; scene.add(p);
  });
  const arch = new THREE.Mesh(new THREE.BoxGeometry(1.2, 0.8, 10), mat);
  arch.position.set(x, 6.4, z); scene.add(arch);
  envLabel(label, x, 8.5, z, 0xffd700);
}
buildGate(-52, 8, "GATE 4");
buildGate(52, 8, "GATE 3");

// Main entrance
const gP = new THREE.MeshStandardMaterial({ color: 0xd4a017, roughness: 0.3, metalness: 0.2 });
[-4, 8].forEach(ox => {
  const p = new THREE.Mesh(new THREE.BoxGeometry(1.6, 5, 1.6), gP);
  p.position.set(ox, 2.5, -56); scene.add(p);
});
const mainArch = new THREE.Mesh(new THREE.BoxGeometry(14, 0.9, 1.4), gP);
mainArch.position.set(2, 5.45, -56); scene.add(mainArch);
envLabel("MAIN ENTRANCE", 2, 7.5, -56, 0xffd700);

// Trees
function tree(x, z, s = 1, v = 0) {
  const th = 2 * s;
  const trunk = new THREE.Mesh(
    new THREE.CylinderGeometry(0.18*s, 0.25*s, th, 6),
    new THREE.MeshStandardMaterial({ color: 0x4a3010 })
  );
  trunk.position.set(x, th/2, z); trunk.castShadow = true; scene.add(trunk);
  const cr = (1.1 + (v%3)*0.2) * s;
  const canopy = new THREE.Mesh(
    new THREE.SphereGeometry(cr, 7, 6),
    new THREE.MeshStandardMaterial({ color: [0x2a6e35, 0x246030, 0x336640, 0x1e5a2a][v%4] })
  );
  canopy.position.set(x, th+cr*0.7, z); canopy.castShadow = true; scene.add(canopy);
}
for (let z = -48; z <= 44; z += 6) { tree(-3.5,z,0.85,z%4); tree(3.5,z,0.85,(z+2)%4); }
[-18,-12,14,20].forEach((x,i) => tree(x,-48,1,i));
for (let z = -38; z <= 2; z += 7) tree(18,z,0.9,z%4);
for (let z = -10; z <= 38; z += 6) tree(-32,z,1,2);
[-8,8,16,-16].forEach((x,i) => tree(x,48,1.1,i));
[[-2,-20],[10,-20],[2,-22],[6,-22]].forEach(([x,z],i) => tree(x,z,0.8,i));

// ═══════════════════════════════════════════════════════════════════
//  BUILDINGS
// ═══════════════════════════════════════════════════════════════════
const buildingMeshes = [];
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();
let selectedMesh = null;

function darken(hex, f) {
  return (Math.floor(((hex>>16)&0xff)*f)<<16)|(Math.floor(((hex>>8)&0xff)*f)<<8)|Math.floor((hex&0xff)*f);
}

BUILDINGS.forEach(bld => {
  const [bx,,bz] = bld.pos, [bw,bh,bd] = bld.size;
  const mat = new THREE.MeshStandardMaterial({ color: bld.color, roughness: 0.72, metalness: 0.05 });
  const mesh = new THREE.Mesh(new THREE.BoxGeometry(bw, bh, bd), mat);
  mesh.position.set(bx, bh/2, bz);
  mesh.castShadow = true; mesh.receiveShadow = true;
  mesh.userData = { buildingId: bld.id };
  scene.add(mesh);

  // Roof
  const roof = new THREE.Mesh(
    new THREE.BoxGeometry(bw+0.5, 0.6, bd+0.5),
    new THREE.MeshStandardMaterial({ color: darken(bld.color, 0.75), roughness: 0.55 })
  );
  roof.position.set(bx, bh+0.3, bz); scene.add(roof);

  // Floor bands
  for (let f = 1; f < bld.floors.length; f++) {
    const line = new THREE.Mesh(
      new THREE.BoxGeometry(bw+0.1, 0.22, bd+0.1),
      new THREE.MeshStandardMaterial({ color: 0x080808, transparent: true, opacity: 0.45 })
    );
    line.position.set(bx, (bh/bld.floors.length)*f, bz); scene.add(line);
  }

  // Windows
  addWindows(bx, bz, bw, bh, bd, bld.floors.length);

  // Entrance step
  const step = new THREE.Mesh(
    new THREE.BoxGeometry(Math.min(bw*0.6, 6), 0.4, 1.2),
    new THREE.MeshStandardMaterial({ color: 0xd4a017, roughness: 0.4, metalness: 0.2 })
  );
  step.position.set(bx, 0.2, bz + bd/2 + 0.6); scene.add(step);

  buildingMeshes.push(mesh);
});

function addWindows(bx, bz, bw, bh, bd, floors) {
  const winMat = new THREE.MeshStandardMaterial({
    color: 0x88c0e8, roughness: 0.1, metalness: 0.3,
    transparent: true, opacity: 0.75, emissive: 0x1a4466, emissiveIntensity: 0.5
  });
  const flH = bh/floors, cf = Math.max(2, Math.floor(bw/2.2)), cs = Math.max(1, Math.floor(bd/2.5));
  for (let f = 0; f < floors; f++) {
    const wy = f*flH + flH*0.55;
    for (let c = 0; c < cf; c++) {
      const wx = bx - bw/2 + (bw/(cf+1))*(c+1);
      [bz+bd/2+0.07, bz-bd/2-0.07].forEach(wz => {
        const w = new THREE.Mesh(new THREE.BoxGeometry(0.85, 0.65, 0.08), winMat);
        w.position.set(wx, wy, wz); scene.add(w);
      });
    }
    for (let c = 0; c < cs; c++) {
      const wz = bz - bd/2 + (bd/(cs+1))*(c+1);
      [bx+bw/2+0.07, bx-bw/2-0.07].forEach(wx => {
        const w = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.65, 0.75), winMat);
        w.position.set(wx, wy, wz); scene.add(w);
      });
    }
  }
}

// ── LABELS ──────────────────────────────────────────────────────────
function blockLabel(text, blockCode, x, y, z) {
  const canvas = document.createElement("canvas");
  canvas.width = 340; canvas.height = 80;
  const ctx = canvas.getContext("2d");
  ctx.fillStyle = "rgba(5,10,26,0.9)";
  ctx.beginPath(); ctx.roundRect(4,4,332,72,10); ctx.fill();
  ctx.strokeStyle = "rgba(212,160,23,0.8)"; ctx.lineWidth = 2; ctx.stroke();
  if (blockCode) {
    ctx.fillStyle = "#d4a017";
    ctx.beginPath(); ctx.roundRect(10,10,46,56,6); ctx.fill();
    ctx.fillStyle = "#0a0f1a";
    ctx.font = "bold 22px sans-serif"; ctx.textAlign = "center";
    ctx.fillText(blockCode.substring(0,3), 33, 48);
    ctx.fillStyle = "#ffffff";
    ctx.font = "bold 16px sans-serif"; ctx.textAlign = "left";
    ctx.fillText(text, 66, 46);
  } else {
    ctx.fillStyle = "#ffc83c";
    ctx.font = "bold 18px sans-serif"; ctx.textAlign = "center";
    ctx.fillText(text, 170, 46);
  }
  const mat = new THREE.SpriteMaterial({ map: new THREE.CanvasTexture(canvas), transparent: true, depthTest: false });
  const sprite = new THREE.Sprite(mat);
  sprite.position.set(x, y, z); sprite.scale.set(10, 2.4, 1); scene.add(sprite);
}

function envLabel(text, x, y, z, color = 0xffc83c) {
  const canvas = document.createElement("canvas");
  canvas.width = 200; canvas.height = 48;
  const ctx = canvas.getContext("2d");
  ctx.fillStyle = "rgba(5,10,26,0.78)";
  ctx.beginPath(); ctx.roundRect(2,2,196,44,8); ctx.fill();
  ctx.fillStyle = "#" + color.toString(16).padStart(6,"0");
  ctx.font = "bold 15px sans-serif"; ctx.textAlign = "center";
  ctx.fillText(text, 100, 30);
  const mat = new THREE.SpriteMaterial({ map: new THREE.CanvasTexture(canvas), transparent: true, depthTest: false });
  const sprite = new THREE.Sprite(mat);
  sprite.position.set(x, y, z); sprite.scale.set(7, 1.7, 1); scene.add(sprite);
}

BUILDINGS.forEach(bld => {
  const [bx,,bz] = bld.pos, [,bh] = bld.size;
  blockLabel(bld.label, bld.blockCode, bx, bh+3.5, bz);
});
envLabel("OAT", 28.5, 1.8, -40, 0xffc83c);
envLabel("Fountain", 0, 3.5, 30, 0x88ccff);

// ═══════════════════════════════════════════════════════════════════
//  WALK MODE
// ═══════════════════════════════════════════════════════════════════
let walkMode = false;
const walkPos = new THREE.Vector3(0, 3.5, 0);
const walkYaw = { value: 0 };  // left-right look
const walkPitch = { value: -0.2 };
const keys = {};

// Pointer lock state
let pointerLocked = false;

document.addEventListener("keydown", e => { keys[e.key.toLowerCase()] = true; });
document.addEventListener("keyup",   e => { keys[e.key.toLowerCase()] = false; });

// Pointer lock for mouse-look in walk mode
renderer.domElement.addEventListener("click", () => {
  if (walkMode && !pointerLocked) {
    renderer.domElement.requestPointerLock();
  }
});
document.addEventListener("pointerlockchange", () => {
  pointerLocked = document.pointerLockElement === renderer.domElement;
});
document.addEventListener("mousemove", e => {
  if (!walkMode || !pointerLocked) return;
  walkYaw.value   -= e.movementX * 0.002;
  walkPitch.value -= e.movementY * 0.002;
  walkPitch.value = Math.max(-0.6, Math.min(0.6, walkPitch.value));
});

// Mobile drag for walk mode (when no pointer lock)
let lastTouchX = 0, lastTouchY = 0, touching = false;
renderer.domElement.addEventListener("touchstart", e => {
  if (!walkMode) return;
  lastTouchX = e.touches[0].clientX;
  lastTouchY = e.touches[0].clientY;
  touching = true;
});
renderer.domElement.addEventListener("touchmove", e => {
  if (!walkMode || !touching) return;
  const dx = e.touches[0].clientX - lastTouchX;
  const dy = e.touches[0].clientY - lastTouchY;
  walkYaw.value   -= dx * 0.004;
  walkPitch.value -= dy * 0.003;
  walkPitch.value = Math.max(-0.6, Math.min(0.6, walkPitch.value));
  lastTouchX = e.touches[0].clientX;
  lastTouchY = e.touches[0].clientY;
});
renderer.domElement.addEventListener("touchend", () => { touching = false; });

// Mouse drag for walk mode (desktop, no pointer lock)
let mouseDown = false, lastMouseX = 0, lastMouseY = 0;
renderer.domElement.addEventListener("mousedown", e => {
  if (!walkMode) return;
  mouseDown = true; lastMouseX = e.clientX; lastMouseY = e.clientY;
});
renderer.domElement.addEventListener("mousemove", e => {
  if (!walkMode || !mouseDown || pointerLocked) return;
  const dx = e.clientX - lastMouseX, dy = e.clientY - lastMouseY;
  walkYaw.value   -= dx * 0.003;
  walkPitch.value -= dy * 0.003;
  walkPitch.value = Math.max(-0.6, Math.min(0.6, walkPitch.value));
  lastMouseX = e.clientX; lastMouseY = e.clientY;
});
renderer.domElement.addEventListener("mouseup", () => { mouseDown = false; });

function updateWalkCamera() {
  const SPEED = 0.18;
  const fw = new THREE.Vector3(-Math.sin(walkYaw.value), 0, -Math.cos(walkYaw.value));
  const rt = new THREE.Vector3(Math.cos(walkYaw.value), 0, -Math.sin(walkYaw.value));
  if (keys["w"] || keys["arrowup"])    walkPos.addScaledVector(fw,  SPEED);
  if (keys["s"] || keys["arrowdown"])  walkPos.addScaledVector(fw, -SPEED);
  if (keys["a"] || keys["arrowleft"])  walkPos.addScaledVector(rt, -SPEED);
  if (keys["d"] || keys["arrowright"]) walkPos.addScaledVector(rt,  SPEED);
  // Clamp to campus bounds
  walkPos.x = Math.max(-54, Math.min(54, walkPos.x));
  walkPos.z = Math.max(-54, Math.min(50, walkPos.z));
  walkPos.y = 3.5;
  camera.position.copy(walkPos);
  const target = new THREE.Vector3(
    walkPos.x + Math.sin(walkYaw.value) * Math.cos(walkPitch.value),
    walkPos.y + Math.sin(walkPitch.value) * 3,
    walkPos.z + Math.cos(walkYaw.value) * Math.cos(walkPitch.value)
  ).negate().negate(); // just compute forward
  camera.lookAt(
    walkPos.x + Math.sin(walkYaw.value),
    walkPos.y + Math.sin(walkPitch.value) * 2,
    walkPos.z + Math.cos(walkYaw.value)
  );
}

// Ctrl button bindings
document.querySelectorAll(".ctrl-btn").forEach(btn => {
  const key = btn.dataset.key;
  btn.addEventListener("pointerdown", () => { keys[key] = true; btn.classList.add("pressed"); });
  btn.addEventListener("pointerup",   () => { keys[key] = false; btn.classList.remove("pressed"); });
  btn.addEventListener("pointerleave",() => { keys[key] = false; btn.classList.remove("pressed"); });
});

// Mode toggle
const modeBtn = document.getElementById("mode-btn");
modeBtn.addEventListener("click", toggleWalkMode);

document.addEventListener("keydown", e => {
  if (e.key === "Escape") {
    if (walkMode) exitWalkMode();
  }
});

function enterWalkMode() {
  walkMode = true;
  // Save orbit camera position for restoring later
  orbitControls.enabled = false;
  walkPos.set(orbitControls.target.x, 3.5, orbitControls.target.z + 10);
  walkYaw.value = 0; walkPitch.value = -0.1;
  modeBtn.textContent = "🔭 Overview";
  modeBtn.classList.add("walk-active");
  document.getElementById("walk-controls").style.display = "flex";
  document.getElementById("walk-hint").style.display = "block";
  document.getElementById("crosshair").style.display = "block";
  document.getElementById("legend").style.display = "none";
  document.getElementById("info-panel").style.display = "none";
}

function exitWalkMode() {
  walkMode = false;
  if (pointerLocked) document.exitPointerLock();
  orbitControls.enabled = true;
  camera.position.set(0, 80, 110);
  orbitControls.target.set(0, 0, 0);
  modeBtn.textContent = "🚶 Walk Mode";
  modeBtn.classList.remove("walk-active");
  document.getElementById("walk-controls").style.display = "none";
  document.getElementById("walk-hint").style.display = "none";
  document.getElementById("crosshair").style.display = "none";
  document.getElementById("legend").style.display = "block";
}

function toggleWalkMode() {
  walkMode ? exitWalkMode() : enterWalkMode();
}

// ═══════════════════════════════════════════════════════════════════
//  HIGHLIGHT + INFO PANEL
// ═══════════════════════════════════════════════════════════════════
function highlight(mesh) {
  if (selectedMesh && selectedMesh !== mesh) {
    selectedMesh.material.emissive.setHex(0);
    selectedMesh.material.emissiveIntensity = 0;
  }
  if (mesh) {
    mesh.material.emissive.setHex(0xffd060);
    mesh.material.emissiveIntensity = 0.35;
    selectedMesh = mesh;
  }
}

let currentBuilding = null;

function showPanel(bld) {
  currentBuilding = bld;
  document.getElementById("panel-label").textContent = bld.label;
  document.getElementById("panel-name").textContent  = bld.name;
  document.getElementById("panel-floors").innerHTML  = bld.floors.map(f =>
    `<div class="fi"><div class="fl">${f.label}</div><div class="fd">${f.desc}</div></div>`
  ).join('<div class="pdiv"></div>');
  document.getElementById("panel-tags").innerHTML = bld.tags.map((t,i) =>
    `<span class="tag ${bld.tagTypes[i]||"tag-academic"}">${t}</span>`
  ).join("");
  const enterBtn = document.getElementById("enter-btn");
  enterBtn.style.display = "block";
  enterBtn.onclick = () => openInterior(bld);
  document.getElementById("info-panel").style.display = "block";
}

document.getElementById("panel-close").addEventListener("click", () => {
  document.getElementById("info-panel").style.display = "none";
  if (selectedMesh) {
    selectedMesh.material.emissive.setHex(0);
    selectedMesh.material.emissiveIntensity = 0;
    selectedMesh = null;
  }
  currentBuilding = null;
});

// ── CLICK HANDLER ───────────────────────────────────────────────────
renderer.domElement.addEventListener("click", e => {
  if (walkMode && pointerLocked) return; // walk mode click = pointer lock
  mouse.x =  (e.clientX/innerWidth)*2 - 1;
  mouse.y = -(e.clientY/innerHeight)*2 + 1;
  raycaster.setFromCamera(mouse, camera);
  const hits = raycaster.intersectObjects(buildingMeshes);
  if (hits.length) {
    const bld = BUILDINGS.find(b => b.id === hits[0].object.userData.buildingId);
    if (bld) { highlight(hits[0].object); showPanel(bld); if (!walkMode) flyTo(bld); }
  }
});

// Walk mode: press E near a building to enter
document.addEventListener("keydown", e => {
  if (e.key.toLowerCase() === "e" && walkMode && currentBuilding) {
    openInterior(currentBuilding);
  }
});

// ── FLY TO ──────────────────────────────────────────────────────────
function flyTo(bld) {
  const [bx,,bz] = bld.pos, [,bh] = bld.size;
  const tP = new THREE.Vector3(bx+22, bh+18, bz+28);
  const tL = new THREE.Vector3(bx, bh/2, bz);
  const sP = camera.position.clone(), sL = orbitControls.target.clone();
  let t = 0;
  const fly = () => {
    t += 0.025; if (t > 1) t = 1;
    const ease = 1 - Math.pow(1-t, 3);
    camera.position.lerpVectors(sP, tP, ease);
    orbitControls.target.lerpVectors(sL, tL, ease);
    orbitControls.update();
    if (t < 1) requestAnimationFrame(fly);
  };
  fly();
}

// ═══════════════════════════════════════════════════════════════════
//  INTERIOR PANEL  ─ 2D floor plan + room cards
// ═══════════════════════════════════════════════════════════════════
let activeFloorIdx = 0;

function openInterior(bld) {
  activeFloorIdx = 0;
  document.getElementById("interior-title").textContent = bld.name;
  document.getElementById("interior-panel").style.display = "flex";
  buildFloorNav(bld);
  renderFloor(bld, 0);
}

document.getElementById("back-btn").addEventListener("click", () => {
  document.getElementById("interior-panel").style.display = "none";
});

function buildFloorNav(bld) {
  const nav = document.getElementById("floor-nav");
  nav.innerHTML = "";
  bld.floors.forEach((floor, idx) => {
    const btn = document.createElement("button");
    btn.className = "floor-btn" + (idx === 0 ? " active" : "");
    btn.textContent = floor.label;
    btn.onclick = () => {
      nav.querySelectorAll(".floor-btn").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      activeFloorIdx = idx;
      renderFloor(bld, idx);
    };
    nav.appendChild(btn);
  });
}

function renderFloor(bld, idx) {
  const floor = bld.floors[idx];
  document.getElementById("fib-title").textContent = `${bld.label} — ${floor.label}`;
  document.getElementById("fib-desc").textContent  = floor.desc;

  // Room cards
  const grid = document.getElementById("room-grid");
  if (floor.rooms && floor.rooms.length) {
    grid.innerHTML = floor.rooms.map(r =>
      `<div class="room-card"><div class="rn">${r.name}</div><div class="rd">${r.desc}</div></div>`
    ).join("");
  } else {
    grid.innerHTML = "";
  }

  // Draw 2D floor plan on canvas
  drawFloorPlan(bld, floor);
}

function drawFloorPlan(bld, floor) {
  const canvas = document.getElementById("floor-canvas");
  const ctx = canvas.getContext("2d");
  const W = canvas.width, H = canvas.height;
  ctx.clearRect(0, 0, W, H);

  // Background
  ctx.fillStyle = "#0d1a2e";
  ctx.fillRect(0, 0, W, H);

  const rooms = floor.rooms || [];
  if (!rooms.length) {
    ctx.fillStyle = "rgba(255,200,60,0.3)";
    ctx.fillRect(0,0,W,H);
    ctx.fillStyle = "#ffc83c";
    ctx.font = "bold 18px sans-serif";
    ctx.textAlign = "center";
    ctx.fillText(floor.label, W/2, H/2);
    return;
  }

  // Layout: grid of rooms
  const cols = Math.min(rooms.length, 3);
  const rows = Math.ceil(rooms.length / cols);
  const pad = 18, gap = 10;
  const cellW = (W - pad*2 - gap*(cols-1)) / cols;
  const cellH = (H - pad*2 - gap*(rows-1)) / rows;

  // Color palette based on building color
  const hue = getBuildingHue(bld.color);
  rooms.forEach((room, i) => {
    const col = i % cols, row = Math.floor(i / cols);
    const rx = pad + col*(cellW+gap), ry = pad + row*(cellH+gap);

    // Room fill
    ctx.fillStyle = `hsla(${hue},40%,18%,0.9)`;
    ctx.beginPath();
    ctx.roundRect(rx, ry, cellW, cellH, 6);
    ctx.fill();

    // Room border
    ctx.strokeStyle = `hsla(${hue},60%,50%,0.5)`;
    ctx.lineWidth = 1.5;
    ctx.stroke();

    // Door indicator (small gap at bottom)
    ctx.strokeStyle = `hsla(${hue},80%,70%,0.8)`;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(rx + cellW*0.35, ry + cellH);
    ctx.lineTo(rx + cellW*0.65, ry + cellH);
    ctx.stroke();

    // Room name
    ctx.fillStyle = "#ffc83c";
    ctx.font = `bold ${Math.min(13, cellW/8)}px sans-serif`;
    ctx.textAlign = "center";
    const nameY = ry + cellH*0.42;
    ctx.fillText(truncate(room.name, 18), rx + cellW/2, nameY);

    // Room desc (smaller)
    ctx.fillStyle = "rgba(224,232,240,0.55)";
    ctx.font = `${Math.min(10, cellW/10)}px sans-serif`;
    const lines = wrapText(ctx, room.desc, cellW - 12);
    lines.slice(0,2).forEach((line, li) => {
      ctx.fillText(line, rx + cellW/2, nameY + 16 + li*13);
    });
  });

  // Corridor (horizontal strip at bottom)
  ctx.fillStyle = "rgba(255,200,60,0.08)";
  ctx.fillRect(0, H-14, W, 14);
  ctx.fillStyle = "rgba(255,200,60,0.4)";
  ctx.font = "10px sans-serif"; ctx.textAlign = "center";
  ctx.fillText("CORRIDOR", W/2, H-4);
}

function getBuildingHue(hex) {
  const r = (hex>>16)&0xff, g = (hex>>8)&0xff, b = hex&0xff;
  const max = Math.max(r,g,b), min = Math.min(r,g,b);
  if (max === min) return 0;
  const d = max-min;
  let h = 0;
  if (max===r) h = (g-b)/d + (g<b?6:0);
  else if (max===g) h = (b-r)/d + 2;
  else h = (r-g)/d + 4;
  return Math.round(h*60);
}

function truncate(str, max) {
  return str.length > max ? str.substring(0, max-1)+"…" : str;
}

function wrapText(ctx, text, maxW) {
  const words = text.split(" "), lines = [];
  let cur = "";
  words.forEach(w => {
    const test = cur ? cur+" "+w : w;
    if (ctx.measureText(test).width > maxW && cur) { lines.push(cur); cur = w; }
    else cur = test;
  });
  if (cur) lines.push(cur);
  return lines;
}

// ═══════════════════════════════════════════════════════════════════
//  SEARCH
// ═══════════════════════════════════════════════════════════════════
const sInput   = document.getElementById("search-input");
const sResults = document.getElementById("search-results");

sInput.addEventListener("input", () => {
  const q = sInput.value.toLowerCase().trim();
  if (!q) { sResults.style.display = "none"; return; }
  const matches = BUILDINGS.filter(bld => {
    const keys = SEARCH_KEYWORDS[bld.id] || [];
    return keys.some(k => k.includes(q)) || bld.name.toLowerCase().includes(q) || bld.label.toLowerCase().includes(q);
  });
  if (!matches.length) { sResults.style.display = "none"; return; }
  sResults.innerHTML = matches.map(bld =>
    `<div class="sri" data-id="${bld.id}"><div class="bt">${bld.label}</div><div>${bld.name}</div></div>`
  ).join("");
  sResults.style.display = "block";
  sResults.querySelectorAll(".sri").forEach(el => {
    el.addEventListener("click", () => {
      const bld  = BUILDINGS.find(b => b.id === el.dataset.id);
      const mesh = buildingMeshes.find(m => m.userData.buildingId === bld.id);
      if (bld && mesh) { highlight(mesh); showPanel(bld); if (!walkMode) flyTo(bld); }
      sResults.style.display = "none";
      sInput.value = bld.name;
    });
  });
});
document.addEventListener("click", e => {
  if (!sInput.contains(e.target) && !sResults.contains(e.target)) sResults.style.display = "none";
});

// ═══════════════════════════════════════════════════════════════════
//  RESIZE + LOADING + ANIMATE
// ═══════════════════════════════════════════════════════════════════
window.addEventListener("resize", () => {
  camera.aspect = innerWidth / innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(innerWidth, innerHeight);
});

setTimeout(() => {
  const l = document.getElementById("loading");
  if (l) { l.style.transition = "opacity 0.6s"; l.style.opacity = "0"; setTimeout(() => l.remove(), 700); }
}, 1400);

// Walk mode detection near buildings (show E-to-enter hint)
const _buildingWorldPos = new THREE.Vector3();
function checkBuildingProximity() {
  if (!walkMode) return;
  let closest = null, closestDist = 12;
  BUILDINGS.forEach((bld, i) => {
    const mesh = buildingMeshes[i];
    mesh.getWorldPosition(_buildingWorldPos);
    const dist = walkPos.distanceTo(_buildingWorldPos);
    if (dist < closestDist) { closest = bld; closestDist = dist; }
  });
  if (closest && closest !== currentBuilding) {
    const mesh = buildingMeshes[BUILDINGS.indexOf(closest)];
    highlight(mesh);
    showPanel(closest);
  }
}

function animate() {
  requestAnimationFrame(animate);
  if (walkMode) {
    updateWalkCamera();
    checkBuildingProximity();
  } else {
    orbitControls.update();
  }
  renderer.render(scene, camera);
}
animate();
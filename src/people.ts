export type PersonCategory = "board" | "fellow" | "speaker" | "newcomer" | "member" | "team";

export interface Person {
  id: string;
  name: string;
  role?: string;
  org?: string;
  city?: string;
  category: PersonCategory;
  also?: PersonCategory[];
  email?: string;
}

// All members from AMI Boston meeting packet — emails sourced directly.
// Photo: `/ami/headshots/${id}.jpg` — generated from PDF.
export const people: Person[] = [
  // ── BOARD ────────────────────────────────────────────────────
  { id: "p-zuidinga", name: "Karyn Zuidinga", role: "Board Chair · Founder", org: "NextWAVE Innovation", city: "Vancouver, BC", category: "board", email: "karyn@nextwaveinnovation.io" },
  { id: "p-heaton", name: "Jenny Heaton", role: "Prior Board Chair", org: "Bates Leadership", city: "Chapel Hill, NC", category: "board", email: "jbatesdc@gmail.com" },
  { id: "p-gryskiewicz", name: "Stanley S. Gryskiewicz", role: "Founder · Chair Emeritus", org: "AMI", city: "Alexandria, VA", category: "board", email: "stan@aminnovation.org" },
  { id: "p-mallon", name: "Bill Mallon", role: "Treasurer · Sr. Director, Strategy & Innovation", org: "AAMC", city: "Washington, DC", category: "board", email: "wmallon@aamc.org" },
  { id: "p-york", name: "Matt York", role: "Secretary · Colonel", org: "USAF", city: "Arlington, VA", category: "board", email: "jmattyork@gmail.com" },
  { id: "p-clauson", name: "Kristin Clauson", role: "Director, Corporate Partnership Development", org: "Share Our Strength · No Kid Hungry", city: "Durham, NC", category: "board", email: "kclauson@strength.org" },
  { id: "p-mescobosa", name: "Meg Escobosa", role: "Director", org: "The Krinsky Company", city: "San Francisco, CA", category: "board", email: "meg@escobosa.com" },
  { id: "p-hilberry", name: "Jane Hilberry", role: "Professor Emeritus, Creativity & Innovation", org: "Colorado College", city: "Colorado Springs, CO", category: "board", email: "jhilberry@coloradocollege.edu" },
  { id: "p-stephens", name: "Mark Stephens", role: "Senior Innovation Consultant", city: "Chicago, IL", category: "board", email: "mark.a.stephens@live.com" },
  { id: "p-zepeda", name: "Susana Zepeda", role: "Head of Strategic Partnerships", org: "The Third Floor, Inc.", city: "Los Angeles, CA", category: "board", email: "Susana.Zepeda@yahoo.com" },

  // ── FELLOWS ──────────────────────────────────────────────────
  { id: "p-rgardner", name: "Vaness \"Reece\" Gardner", role: "Chief People Officer · AMI Host", org: "Babson College — Crafting Tomorrow", city: "Minot, ME", category: "fellow", email: "vgardner1@babson.edu" },
  { id: "p-skarns", name: "Spencer Karns", role: "Founder, ML Engineer · AMI Host", org: "Aiscend", city: "Goshen, NY", category: "fellow", email: "spencer.karns@gmail.com" },
  { id: "p-newsom", name: "Camille Newsom", role: "Founder", org: "ecocreative", city: "Grand Rapids, MI", category: "fellow", email: "cnewsom24@gmail.com" },
  { id: "p-ekejiuba", name: "Innocent Ekejiuba", role: "Assistant Professor", org: "Pratt Institute", city: "New York, NY", category: "fellow", email: "iekejiub@pratt.edu" },
  { id: "p-yasuda", name: "Lily Yasuda", role: "Manager", org: "Alliance to Stop Foodborne Illness", city: "Chicago, IL", category: "fellow", email: "lyasuda@stopfoodborneillness.org" },
  { id: "p-arora", name: "Radhika Arora", role: "Student", org: "Pratt Institute", city: "New York, NY", category: "fellow", also: ["newcomer"], email: "rarora16@pratt.edu" },
  { id: "p-harbison", name: "Connor Harbison", role: "Independent Advisor / Strategic Consultant", city: "Boston, MA", category: "fellow", also: ["newcomer"], email: "harbison.connor@gmail.com" },
  { id: "p-ingle", name: "Eddie Ingle", role: "Chief Executive Officer", org: "Unifi Manufacturing", city: "Greensboro, NC", category: "fellow", also: ["newcomer"], email: "eingle@unifi.com" },
  { id: "p-isac", name: "Diana Isac", role: "Founder", org: "QALL", city: "Wellesley Hills, MA", category: "fellow", also: ["newcomer"], email: "diana.antonia.isac@gmail.com" },
  { id: "p-liu", name: "Yixuan Liu", role: "PhD Student", org: "Northeastern University", city: "Boston, MA", category: "fellow", also: ["newcomer"], email: "liu.yixuan2@northeastern.edu" },
  { id: "p-mcelderry", name: "Justin McElderry", role: "Founder & Director", org: "WorkStudy", city: "Chicago, IL", category: "fellow", also: ["newcomer"], email: "jm@justinmcelderry.com" },
  { id: "p-mendelsohn", name: "Payton Mendelsohn", role: "Crummer MBA Student", city: "Gainesville, FL", category: "fellow", also: ["newcomer"], email: "paytonmendelsohn@gmail.com" },
  { id: "p-sivalingam", name: "Thulasi Sivalingam", role: "Programming & Engagement, Strategic Events", org: "United Nations Global Compact", city: "New York, NY", category: "fellow", also: ["newcomer"], email: "thulasisivalingam@yahoo.com" },
  { id: "p-sungu", name: "Azra Sungu", role: "Senior Consultant, Strategic Design", org: "Deloitte Digital", city: "Chicago, IL", category: "fellow", also: ["newcomer"], email: "azrasungu@gmail.com" },
  { id: "p-walter", name: "Stephen Walter", role: "Director of Innovation + Creative Strategy", org: "Brookline Interactive", city: "Brookline, MA", category: "fellow", also: ["newcomer"], email: "steve@brooklineinteractive.org" },
  { id: "p-coleman", name: "Durell Coleman", role: "Founder & CEO", org: "DC Designs", city: "Austin, TX", category: "fellow", also: ["newcomer"], email: "dc@dcdesignltd.com" },
  { id: "p-noyes", name: "Erik Noyes", role: "Associate Professor, Entrepreneurship · AMI Host", org: "Babson College", city: "Cambridge, MA", category: "fellow", also: ["newcomer"], email: "enoyes@babson.edu" },

  // ── SPEAKERS (Positive Turbulence) ────────────────────────────
  { id: "p-canca", name: "Cansu Canca", role: "Founder", org: "AI Ethics Lab", city: "Cambridge, MA", category: "speaker", also: ["newcomer"], email: "cansu@aiethicslab.com" },
  { id: "p-mescobosa2", name: "Marc Escobosa", role: "VP, Salesforce Futures", org: "Salesforce", city: "San Francisco, CA", category: "speaker", also: ["newcomer"], email: "marc@escobosa.com" },
  { id: "p-jacob", name: "Nigel Jacob", role: "Co-Founder", org: "City of Boston · New Urban Mechanics", city: "Boston, MA", category: "speaker", also: ["newcomer"], email: "nsjacob@gmail.com" },
  { id: "p-shannon", name: "Kyle Shannon", role: "Founder", org: "AI Salon", city: "Denver, CO", category: "speaker", also: ["newcomer"], email: "Kyle@storyvine.com" },
  { id: "p-cwilliams", name: "Christian Williams", role: "VP of Startup Banking", org: "J.P. Morgan", city: "Boston, MA", category: "speaker", also: ["newcomer"], email: "Christian.x.williams@JPMorgan.com" },
  { id: "p-herrera", name: "Yessica Herrera", role: "Artist-in-Residence · Lucy Family Institute", org: "University of Notre Dame", city: "Chicago, IL", category: "speaker", also: ["newcomer"], email: "yessita@icloud.com" },

  // ── NEWCOMERS ────────────────────────────────────────────────
  { id: "p-jalbert", name: "Jim Albert", role: "Chairman & CEO, retired", org: "Neptune Flood Insurance", category: "newcomer", email: "jdalbert9@gmail.com" },
  { id: "p-jarnold", name: "Jim Arnold", role: "Historian", org: "Caldwell Fellows", category: "newcomer", email: "james_w_arnold@yahoo.com" },
  { id: "p-bernstein", name: "Melissa Bernstein", role: "Co-Founder", org: "Melissa & Doug · Lifelines", city: "Westport, CT", category: "newcomer" },
  { id: "p-gbrown", name: "Gabriel Brown", role: "Student", city: "Portland, OR", category: "newcomer" },
  { id: "p-nbrown", name: "Noel Brown", role: "Impact Director", org: "Conscious Wealth Mgmt — Morgan Stanley", city: "Portland, OR", category: "newcomer", email: "Noel.Brown@morganstanley.com" },
  { id: "p-gcafasso", name: "Gitana Cafasso", role: "Director of Marketing", org: "Burke Construction Group", city: "Las Vegas, NV", category: "newcomer", email: "gcafasso@burkecgi.com" },
  { id: "p-mcafasso", name: "Michael Cafasso", role: "President", org: "St. Mary-Corwin Hospital · CommonSpirit", city: "Pueblo, CO", category: "newcomer", email: "michaelcafasso@gmail.com" },
  { id: "p-scafasso", name: "Sabret Cafasso", role: "Director of Nursing", org: "Azura Vascular Care", city: "Las Vegas, NV", category: "newcomer", email: "sabretcafasso@gmail.com" },
  { id: "p-campbell", name: "Dugald Campbell", role: "Maintenance Lead", org: "Next Step of West Michigan", category: "newcomer", email: "dugcampbell@comcast.net" },
  { id: "p-dewitt", name: "Isaiah Dewitt", role: "Analytics Intern", org: "Rensselaer Polytechnic Institute", city: "New York, NY", category: "newcomer", email: "isaiahdwt7@gmail.com" },
  { id: "p-downer", name: "Leilani Downer", role: "Sr. Director of Advancement & Communications", org: "New Horizons", city: "Los Angeles, CA", category: "newcomer", email: "ldowner@newhorizons-sfv.org" },
  { id: "p-farmakidis", name: "Anne Farmakidis", role: "Sr. Director, Digital Medical Education", org: "AAMC", city: "Washington, DC", category: "newcomer", email: "afarmakidis@aamc.org" },
  { id: "p-froehlich", name: "John Froehlich", role: "Chief Financial Officer", org: "Wexford Health", city: "Pittsburgh, PA", category: "newcomer", email: "jfroehlich@wexfordhealth.com" },
  { id: "p-ckaynor", name: "Chapin Kaynor", role: "Director of Product", org: "Toast", city: "Chicago, IL", category: "newcomer", email: "ckaynor@gmail.com" },
  { id: "p-mcbride", name: "Mary McBride", role: "Chair & Professor, Creative Enterprise Leadership", org: "Pratt Institute", city: "New York, NY", category: "newcomer", email: "mmcb1033@PRATT.EDU" },
  { id: "p-mccormick", name: "Melanie McCormick", role: "Senior Consultant", org: "Deloitte", city: "Alexandria, VA", category: "newcomer", email: "mtmccorm@gmail.com" },
  { id: "p-mohaideen", name: "Siddiq Mohaideen", role: "Business Analyst Intern", org: "Rensselaer Polytechnic Institute", city: "Albany, NY", category: "newcomer", email: "rpi.siddiq@gmail.com" },
  { id: "p-mowrey", name: "Dustin Mowrey", role: "Founder", org: "Mowrey Performance Coaching", city: "Columbus, MS", category: "newcomer", email: "dustinmowrey@gmail.com" },
  { id: "p-pacarro", name: "Gary Pacarro", role: "Trustee", org: "Pacific University", city: "Kailua, HI", category: "newcomer" },
  { id: "p-park", name: "Mo Sook Park", role: "Adjunct Lecturer", org: "Harvard Graduate School of Education", city: "Boston, MA", category: "newcomer", email: "mosookpark@gmail.com" },
  { id: "p-peaslee", name: "Philip Peaslee", role: "VP & Chief Information Officer", org: "Unifi", city: "Greensboro, NC", category: "newcomer", email: "ppeaslee@unifi.com" },
  { id: "p-price", name: "Robert Price", role: "Managing Principal", org: "Geyer Valmont", city: "Sydney, Australia", category: "newcomer", email: "rprice@geyervalmont.com" },
  { id: "p-shull", name: "Leigh Shull", role: "North America AI Champion", org: "Visa", city: "Wellesley, MA", category: "newcomer", email: "leshull@visa.com" },
  { id: "p-wickramasinghe", name: "Tamara Wickramasinghe", role: "Managing Partner, Operations", org: "Creative Realities", city: "Winchester, MA", category: "newcomer", email: "tamara@creativerealities.com" },
  { id: "p-wilson", name: "Anna Wilson", role: "Executive in Residence", org: "Christensen Family Center · Duke", city: "Durham, NC", category: "newcomer", email: "anna.wilson@duke.edu" },

  // ── COMMUNITY MEMBERS ────────────────────────────────────────
  { id: "p-dchase", name: "David Chase", role: "Co-Founder", org: "Unconventional Learning", city: "Alameda, CA", category: "member", email: "dmillschase@gmail.com" },
  { id: "p-nchase", name: "Nichol Chase", role: "Co-Founder", org: "Unconventional Learning", city: "Alameda, CA", category: "member", email: "nicholchase@gmail.com" },
  { id: "p-cimino", name: "John Cimino", role: "Founder, President & CEO", org: "The Renaissance Center · Creative Leaps Intl.", city: "Chester, NY", category: "member", email: "jcimino@creativeleaps.org" },
  { id: "p-collins", name: "Cole Collins", role: "Co-Founder", org: "Crafting Tomorrow", city: "Libertyville, IL", category: "member", email: "ccollins@craftingtomorrowai.com" },
  { id: "p-conn", name: "Dan Conn", role: "President & CEO", org: "Wexford Health", city: "Pittsburgh, PA", category: "member", email: "dconn@wexfordhealth.com" },
  { id: "p-culton", name: "David Culton", role: "Business Innovationist", org: "Creative Realities", city: "Westerly, RI", category: "member", email: "david@creativerealities.com" },
  { id: "p-gammal", name: "Joe Gammal", role: "Founder · Imagine Corps · Synecticsworld", city: "Hopkinton, MA", category: "member", email: "jgammal@possibilitybridge.com" },
  { id: "p-gannett", name: "Toby Gannett", role: "President/CEO", org: "Draper Commons Affordable Housing", city: "Colorado Springs, CO", category: "member", email: "thomasbgannett@gmail.com" },
  { id: "p-garsoe", name: "Susan Garsoe", city: "Colorado Springs, CO", category: "member", email: "sgarsoe@msn.com" },
  { id: "p-george", name: "Heather George", role: "SVP, Brand Strategy", org: "Lowes Foods", city: "Winston-Salem, NC", category: "member", email: "heather.george@lowesfoods.com" },
  { id: "p-rgreen", name: "Richard Green", role: "Professor", org: "Pratt Institute", city: "New York, NY", category: "member", email: "rgreen@pratt.edu" },
  { id: "p-jacquet", name: "Fabienne Jacquet", role: "Founder & CEO", org: "INNOVEVE, LLC", city: "Charleston, SC", category: "member", email: "fabienne@innoveve.com" },
  { id: "p-julian", name: "Ellen Julian", role: "Principal & Founder", org: "Julian Consulting", city: "Buffalo, NY", category: "member", email: "ellen@julianconsulting.com" },
  { id: "p-kelley", name: "Bill Kelley", category: "member", email: "wrkelley2012@gmail.com" },
  { id: "p-lord", name: "David Lord", role: "Board Member & Founder", org: "Innovations in Aging Collaborative", city: "Colorado Springs, CO", category: "member", email: "dlord@dlordinvest.com" },
  { id: "p-maxwell", name: "Jim Maxwell", role: "Retired President", org: "Greensboro Radiology", city: "Greensboro, NC", category: "member", email: "realcobra@gmail.com" },
  { id: "p-semmel", name: "Marsha Semmel", role: "Principal", org: "Marsha Semmel Consulting", city: "Arlington, VA", category: "member", email: "marsha.semmel@gmail.com" },
  { id: "p-sheridan", name: "Richard Sheridan", role: "CEO & Co-Founder", org: "Menlo Innovations", city: "Ann Arbor, MI", category: "member", email: "rsheridan@menloinnovations.com" },
  { id: "p-wellsch", name: "Brent Wellsch", role: "Community Innovation Lead", org: "Urban Matters CCC", city: "Edmonton, AB", category: "member", email: "wellschbrent@gmail.com" },
  { id: "p-wiet", name: "Steve Wiet", role: "Principal", org: "Stephan Wiet Associates", city: "Leland, NC", category: "member", email: "Stephan.wiet@gmail.com" },
  { id: "p-wolfe", name: "Chuck Wolfe", role: "CEO", org: "Chiles Group", city: "Anna Maria, FL", category: "member", email: "chuckwolfe@mac.com" },
  { id: "p-bai", name: "Xue \"Snow\" Bai", role: "Assistant Chair & Asst. Professor", org: "Pratt Institute", city: "New York, NY", category: "member", email: "XBAI4@PRATT.EDU" },

  // ── TEAM ────────────────────────────────────────────────────
  { id: "p-dkaynor", name: "Danielle Kaynor", role: "Executive Leader & Community Catalyst", org: "AMI", city: "Chicago, IL", category: "team", email: "danielle@aminnovation.org" },
  { id: "p-ratke", name: "Laura Ratke", role: "Community Builder", org: "AMI", city: "Chicago, IL", category: "team", email: "laura@aminnovation.org" },
  { id: "p-nielsen", name: "Wendy Nielsen", role: "Community Coordinator", org: "AMI", city: "Las Vegas, NV", category: "team", email: "admin@aminnovation.org" },
  { id: "p-roe", name: "Meghan Roe", role: "Asst. Community Coordinator", org: "AMI", city: "Kalispell, MT", category: "team", email: "admin@aminnovation.org" },
];

export function photoFor(id: string): string {
  return `/ami/headshots/${id}.jpg`;
}

// Hand-curated edges that mirror the meeting packet
export const connections: Array<[string, string]> = [
  ["p-rgardner", "p-skarns"], ["p-rgardner", "p-noyes"], ["p-rgardner", "p-dkaynor"],
  ["p-skarns", "p-dkaynor"], ["p-noyes", "p-dkaynor"],
  ["p-zuidinga", "p-heaton"], ["p-zuidinga", "p-gryskiewicz"], ["p-heaton", "p-gryskiewicz"],
  ["p-mallon", "p-zuidinga"], ["p-york", "p-zuidinga"], ["p-clauson", "p-zuidinga"],
  ["p-mescobosa", "p-zuidinga"], ["p-hilberry", "p-zuidinga"], ["p-stephens", "p-zuidinga"],
  ["p-zepeda", "p-zuidinga"], ["p-mescobosa", "p-mescobosa2"],
  ["p-arora", "p-bai"], ["p-arora", "p-rgreen"], ["p-arora", "p-mcbride"],
  ["p-ekejiuba", "p-mcbride"], ["p-ekejiuba", "p-rgreen"], ["p-bai", "p-rgreen"],
  ["p-rgardner", "p-collins"], ["p-noyes", "p-rgardner"],
  ["p-conn", "p-froehlich"],
  ["p-mcafasso", "p-scafasso"], ["p-gcafasso", "p-mcafasso"],
  ["p-dchase", "p-nchase"],
  ["p-shannon", "p-skarns"], ["p-canca", "p-skarns"],
  ["p-jacob", "p-rgardner"], ["p-mescobosa2", "p-rgardner"], ["p-cwilliams", "p-skarns"],
  ["p-dewitt", "p-mohaideen"],
  ["p-dkaynor", "p-ratke"], ["p-dkaynor", "p-nielsen"], ["p-dkaynor", "p-roe"],
  ["p-ratke", "p-nielsen"],
  ["p-newsom", "p-rgardner"], ["p-yasuda", "p-dkaynor"], ["p-coleman", "p-skarns"],
  ["p-isac", "p-noyes"], ["p-walter", "p-jacob"], ["p-liu", "p-canca"],
  ["p-mallon", "p-farmakidis"],
  ["p-ingle", "p-peaslee"],
  ["p-culton", "p-wickramasinghe"],
];

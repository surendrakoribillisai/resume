const defaults = {
  profile: {
    name: 'Your Name',
    title: 'UI/UX Designer & AI Developer',
    heroTitle: 'Designing ideas.<br><span>Building experiences.</span>',
    bio: 'I design clean, user-centered digital products and build technology-driven experiences.',
    aboutTitle: 'Turning concepts into useful digital products.',
    about: 'I am a UI/UX designer with hands-on experience in Figma, wireframing, prototyping and user-centered design.',
    email: 'your.email@example.com',
    mobile: '1234567890',
    extra: []
  },

  links: [
    { title: 'LinkedIn', url: '#', place: 'contact' },
    { title: 'GitHub', url: '#', place: 'contact' },
    { title: 'Figma', url: '#', place: 'contact' }
  ],

  skills: [
    { name: 'UI/UX Design', details: 'Figma · Wireframing · Prototyping' },
    { name: 'Product Design', details: 'User journeys · Design systems' },
    { name: 'Web Development', details: 'HTML · CSS · JavaScript · React' },
    { name: 'Programming', details: 'Python · Java' },
    { name: 'AI / ML', details: 'AI concepts · ML projects' },
    { name: 'Databases', details: 'MongoDB · SQL' },
    { name: 'Tools', details: 'Git · GitHub · VS Code' },
    { name: 'Visual Design', details: 'Branding · UI systems' }
  ],

  education: [],
  experience: [],

  projects: [
    {
      title: 'Haptic Scene',
      description:
        'AI-powered accessibility concept for communication between people with different communication needs.',
      tags: ['AI', 'Accessibility', 'Product'],
      links: []
    },
    {
      title: 'AI Travel Guide',
      description:
        'Travel product concept focused on personalized discovery and a clear user journey.',
      tags: ['UI/UX', 'Figma', 'Case Study'],
      links: []
    }
  ],

  certificates: [],
  details: []
};


/* =========================
   HELPERS
========================= */

function clone(o) {
  return JSON.parse(JSON.stringify(o));
}


function normalizeProfile(p) {
  const profile = {
    ...defaults.profile,
    ...(p || {})
  };

  const extras = Array.isArray(profile.extra)
    ? clone(profile.extra)
    : [];

  const mobileExtra = extras.find(
    x =>
      String(x.label || '')
        .trim()
        .toLowerCase() === 'mobile'
  );

  if (!profile.mobile && mobileExtra?.value) {
    profile.mobile = mobileExtra.value;
  }

  profile.extra = extras.filter(
    x =>
      String(x.label || '')
        .trim()
        .toLowerCase() !== 'mobile'
  );

  return profile;
}


/* =========================
   LOAD LOCAL DATA
========================= */

function load() {
  try {
    const s = JSON.parse(
      localStorage.getItem('portfolioData') || '{}'
    );

    return {
      profile: normalizeProfile(s.profile),

      links: Array.isArray(s.links)
        ? s.links
        : clone(defaults.links),

      skills: Array.isArray(s.skills)
        ? s.skills
        : clone(defaults.skills),

      education: Array.isArray(s.education)
        ? s.education
        : [],

      experience: Array.isArray(s.experience)
        ? s.experience
        : [],

      projects: Array.isArray(s.projects)
        ? s.projects
        : clone(defaults.projects),

      certificates: Array.isArray(s.certificates)
        ? s.certificates
        : [],

      details: Array.isArray(s.details)
        ? s.details
        : []
    };

  } catch (error) {
    console.warn('Local data load failed:', error);
    return clone(defaults);
  }
}


let d = load();

const app = document.getElementById('app');


/* =========================
   HTML ESCAPE
========================= */

const esc = s =>
  String(s == null ? '' : s)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;');


/* =========================
   INPUT HELPERS
========================= */

function input(label, key, value, area = false) {

  if (area) {
    return `
      <label>
        ${label}
        <textarea data-key="${key}">${esc(value)}</textarea>
      </label>
    `;
  }

  return `
    <label>
      ${label}
      <input
        data-key="${key}"
        value="${esc(value)}"
      >
    </label>
  `;
}


function extraInput(label, key, value, i) {

  return `
    <label>
      ${label}
      <input
        data-profile-extra="${i}"
        data-key="${key}"
        value="${esc(value)}"
      >
    </label>
  `;
}


/* =========================
   MAIN RENDER
========================= */

function render(tab = 'profile') {

  document
    .querySelectorAll('.side')
    .forEach(b =>
      b.classList.toggle(
        'active',
        b.dataset.tab === tab
      )
    );

  let html = '';


  /* PROFILE */

  if (tab === 'profile') {
    html = profileTab();
  }


  /* LINKS */

  if (tab === 'links') {
    html = linksTab();
  }


  /* EDUCATION */

  if (tab === 'education') {

    html = arrayTab(
      'Education',
      'education',

      () => ({
        title: 'Degree / Course',
        institution: '',
        period: '',
        board: '',
        stream: '',
        cgpa: '',
        percentage: '',
        grade: '',
        description: '',
        url: ''
      }),

      i => `
        <div class="grid">

          ${input(
            'Degree / Course',
            'title',
            d.education[i].title
          )}

          ${input(
            'Institution',
            'institution',
            d.education[i].institution
          )}

          ${input(
            'Period',
            'period',
            d.education[i].period
          )}

          ${input(
            'Board / University',
            'board',
            d.education[i].board || ''
          )}

          ${input(
            'Stream / Specialization',
            'stream',
            d.education[i].stream || ''
          )}

          ${input(
            'CGPA',
            'cgpa',
            d.education[i].cgpa || ''
          )}

          ${input(
            'Percentage',
            'percentage',
            d.education[i].percentage || ''
          )}

          ${input(
            'Grade / Class',
            'grade',
            d.education[i].grade || ''
          )}

          ${input(
            'Link',
            'url',
            d.education[i].url || ''
          )}

          ${input(
            'Description',
            'description',
            d.education[i].description || '',
            true
          )}

        </div>
      `
    );
  }


  /* EXPERIENCE */

  if (tab === 'experience') {

    html = arrayTab(
      'Experience',
      'experience',

      () => ({
        title: 'Role',
        company: '',
        period: '',
        description: ''
      }),

      i => `
        <div class="grid">

          ${input(
            'Role',
            'title',
            d.experience[i].title
          )}

          ${input(
            'Company',
            'company',
            d.experience[i].company
          )}

          ${input(
            'Period',
            'period',
            d.experience[i].period
          )}

          ${input(
            'Description',
            'description',
            d.experience[i].description,
            true
          )}

        </div>
      `
    );
  }


  /* SKILLS */

  if (tab === 'skills') {

    html = arrayTab(
      'Skills',
      'skills',

      () => ({
        name: 'New Skill',
        details: ''
      }),

      i => `
        <div class="grid">

          ${input(
            'Skill name',
            'name',
            d.skills[i].name
          )}

          ${input(
            'Skill details',
            'details',
            d.skills[i].details
          )}

        </div>
      `
    );
  }


  /* PROJECTS */

  if (tab === 'projects') {
    html = projectsTab();
  }


  /* CERTIFICATES */

  if (tab === 'certificates') {

    html = arrayTab(
      'Certificates',
      'certificates',

      () => ({
        title: 'New Certificate',
        issuer: '',
        date: '',
        description: '',
        url: ''
      }),

      i => `
        <div class="grid">

          ${input(
            'Certificate title',
            'title',
            d.certificates[i].title
          )}

          ${input(
            'Issuer',
            'issuer',
            d.certificates[i].issuer
          )}

          ${input(
            'Date',
            'date',
            d.certificates[i].date
          )}

          ${input(
            'Verification URL',
            'url',
            d.certificates[i].url
          )}

          ${input(
            'Description',
            'description',
            d.certificates[i].description,
            true
          )}

        </div>
      `
    );
  }


  /* ADDITIONAL DETAILS */

  if (tab === 'details') {

    html = arrayTab(
      'Additional Details',
      'details',

      () => ({
        title: 'New Detail',
        text: '',
        linkTitle: 'Open link',
        url: '',
        place: 'beforeContact'
      }),

      i => `
        <div class="grid">

          ${input(
            'Title',
            'title',
            d.details[i].title
          )}

          ${input(
            'Link title',
            'linkTitle',
            d.details[i].linkTitle
          )}

          ${input(
            'Link URL',
            'url',
            d.details[i].url
          )}

          <label>
            Placement

            <select data-arr="details" data-i="${i}" data-key="place">
              <option
                value="afterAbout"
                ${d.details[i].place === 'afterAbout'
                  ? 'selected'
                  : ''}
              >
                After About
              </option>

              <option
                value="beforeContact"
                ${d.details[i].place !== 'afterAbout'
                  ? 'selected'
                  : ''}
              >
                Before Contact
              </option>
            </select>

          </label>

          ${input(
            'Details',
            'text',
            d.details[i].text,
            true
          )}

        </div>
      `
    );
  }


  /* RESUME */

  if (tab === 'resume') {

    html = `
      <div class="card">

        <h2>Resume PDF</h2>

        <p class="hint">
          Upload a PDF. It is stored in this browser in this demo.
        </p>

        <input
          type="file"
          id="resumeFile"
          accept="application/pdf"
        >

        <p
          id="fileName"
          class="hint"
        ></p>

      </div>
    `;
  }


  app.innerHTML = html;

  wire(tab);
}


/* =========================
   PROFILE TAB
========================= */

function profileTab() {

  return `
    <div class="card">

      <h2>Profile</h2>

      <p class="hint">
        Edit the content shown on the portfolio.
      </p>

      <div class="grid">

        ${input(
          'Name',
          'name',
          d.profile.name
        )}

        ${input(
          'Professional title',
          'title',
          d.profile.title
        )}

        ${input(
          'Hero heading (HTML allowed)',
          'heroTitle',
          d.profile.heroTitle,
          true
        )}

        ${input(
          'Email',
          'email',
          d.profile.email
        )}

        ${input(
          'Mobile Number',
          'mobile',
          d.profile.mobile || ''
        )}

        ${input(
          'Bio',
          'bio',
          d.profile.bio,
          true
        )}

        ${input(
          'About heading',
          'aboutTitle',
          d.profile.aboutTitle
        )}

        ${input(
          'About',
          'about',
          d.profile.about,
          true
        )}

      </div>


      <div class="profile-extra">

        <div class="bar">

          <div>

            <h3>
              Additional Profile Fields
            </h3>

            <p>
              Add location, designation,
              website, social info or any
              other custom profile detail.
            </p>

          </div>

          <button
            onclick="addProfileField()"
          >
            + Add New
          </button>

        </div>


        ${d.profile.extra.map((x, i) => `

          <div class="item">

            <div class="itemhead">

              <b>
                Profile Field ${i + 1}
              </b>

              <button
                class="danger small"
                onclick="removeProfileField(${i})"
              >
                Delete
              </button>

            </div>


            <div class="grid">

              ${extraInput(
                'Field name',
                'label',
                x.label,
                i
              )}

              ${extraInput(
                'Value',
                'value',
                x.value,
                i
              )}

              ${extraInput(
                'Link URL (optional)',
                'url',
                x.url,
                i
              )}

              <label>

                Show in

                <select
                  data-profile-extra="${i}"
                  data-key="place"
                >

                  <option
                    value="hero"
                    ${x.place === 'hero'
                      ? 'selected'
                      : ''}
                  >
                    Hero
                  </option>

                  <option
                    value="about"
                    ${x.place === 'about'
                      ? 'selected'
                      : ''}
                  >
                    About
                  </option>

                  <option
                    value="contact"
                    ${x.place === 'contact'
                      ? 'selected'
                      : ''}
                  >
                    Contact
                  </option>

                </select>

              </label>

            </div>

          </div>

        `).join('')}

      </div>

    </div>
  `;
}


/* =========================
   LINKS TAB
========================= */

function linksTab() {

  return `
    <div class="card">

      <div class="bar">

        <div>

          <h2>Links</h2>

          <p>
            Add a link, give it a title
            and choose where it appears.
          </p>

        </div>

        <button onclick="addLink()">
          + Add New Link
        </button>

      </div>


      ${d.links.map((x, i) => `

        <div class="item">

          <div class="itemhead">

            <b>
              Link ${i + 1}
            </b>

            <button
              class="danger small"
              onclick="removeItem('links', ${i})"
            >
              Delete
            </button>

          </div>


          <div class="row">

            <label>

              Title

              <input
                data-arr="links"
                data-i="${i}"
                data-key="title"
                value="${esc(x.title)}"
              >

            </label>


            <label>

              URL

              <input
                data-arr="links"
                data-i="${i}"
                data-key="url"
                value="${esc(x.url)}"
              >

            </label>


            <label>

              Place

              <select
                data-arr="links"
                data-i="${i}"
                data-key="place"
              >

                <option
                  value="nav"
                  ${x.place === 'nav'
                    ? 'selected'
                    : ''}
                >
                  nav
                </option>

                <option
                  value="hero"
                  ${x.place === 'hero'
                    ? 'selected'
                    : ''}
                >
                  hero
                </option>

                <option
                  value="contact"
                  ${x.place === 'contact'
                    ? 'selected'
                    : ''}
                >
                  contact
                </option>

              </select>

            </label>

            <span></span>

          </div>

        </div>

      `).join('')}

    </div>
  `;
}


/* =========================
   ARRAY TAB
========================= */

function arrayTab(title, arr, make, body) {

  return `
    <div class="card">

      <div class="bar">

        <div>

          <h2>
            ${title}
          </h2>

          <p>
            Add, edit or delete
            ${title.toLowerCase()} entries.
          </p>

        </div>

        <button
          onclick="addArray('${arr}')"
        >
          + Add New ${title.replace(/s$/, '')}
        </button>

      </div>


      ${d[arr].map((x, i) => `

        <div class="item">

          <div class="itemhead">

            <b>
              ${title} ${i + 1}
            </b>

            <button
              class="danger small"
              onclick="removeItem('${arr}', ${i})"
            >
              Delete
            </button>

          </div>

          ${body(i)}

        </div>

      `).join('')}

    </div>
  `;
}


/* =========================
   PROJECTS TAB
========================= */

function projectsTab() {

  return `
    <div class="card">

      <div class="bar">

        <div>

          <h2>Projects</h2>

          <p>
            Add projects, edit them
            and attach multiple links.
          </p>

        </div>

        <button
          onclick="addArray('projects')"
        >
          + Add New Project
        </button>

      </div>


      ${d.projects.map((x, i) => `

        <div class="item">

          <div class="itemhead">

            <b>
              Project ${i + 1}
            </b>

            <button
              class="danger small"
              onclick="removeItem('projects', ${i})"
            >
              Delete
            </button>

          </div>


          <div class="grid">

            ${input(
              'Project title',
              'title',
              x.title
            )}

            ${input(
              'Tags (comma separated)',
              'tags',
              (x.tags || []).join(', ')
            )}

            ${input(
              'Description',
              'description',
              x.description,
              true
            )}

          </div>


          <div class="linkbox">

            <b>
              Project links
            </b>


            ${(x.links || []).map((l, j) => `

              <div
                class="row"
                style="margin-top:9px"
              >

                <label>

                  Title

                  <input
                    data-proj="${i}"
                    data-link="${j}"
                    data-lkey="title"
                    value="${esc(l.title)}"
                  >

                </label>


                <label>

                  URL

                  <input
                    data-proj="${i}"
                    data-link="${j}"
                    data-lkey="url"
                    value="${esc(l.url)}"
                  >

                </label>


                <span></span>


                <button
                  class="danger small"
                  onclick="removeProjectLink(${i}, ${j})"
                >
                  Delete
                </button>

              </div>

            `).join('')}


            <button
              class="subbtn"
              onclick="addProjectLink(${i})"
            >
              + Add Project Link
            </button>

          </div>

        </div>

      `).join('')}

    </div>
  `;
}


/* =========================
   INPUT EVENTS
========================= */

function wire(tab) {

  document
    .querySelectorAll('[data-key]')
    .forEach(el => {

      const event =
        el.tagName === 'SELECT'
          ? 'change'
          : 'input';

      el.addEventListener(event, () => {

        if (el.dataset.arr) {

          d[el.dataset.arr][
            +el.dataset.i
          ][el.dataset.key] = el.value;

        }

        else if (
          el.dataset.profileExtra !== undefined
        ) {

          d.profile.extra[
            +el.dataset.profileExtra
          ][el.dataset.key] = el.value;

        }

        else if (tab === 'profile') {

          d.profile[
            el.dataset.key
          ] = el.value;

        }

        else if (tab === 'details') {

          const index =
            +el.dataset.i;

          if (
            !Number.isNaN(index) &&
            d.details[index]
          ) {
            d.details[index][el.dataset.key] =
              el.value;
          }

        }

      });

    });


  document
    .querySelectorAll('[data-profile-extra]')
    .forEach(el => {

      const event =
        el.tagName === 'SELECT'
          ? 'change'
          : 'input';

      el.addEventListener(event, () => {

        d.profile.extra[
          +el.dataset.profileExtra
        ][el.dataset.key] = el.value;

      });

    });


  document
    .querySelectorAll('[data-proj]')
    .forEach(el => {

      el.oninput = () => {

        d.projects[
          +el.dataset.proj
        ].links[
          +el.dataset.link
        ][el.dataset.lkey] = el.value;

      };

    });


  /* Project main fields */

  if (tab === 'projects') {

    document
      .querySelectorAll(
        '.item .grid [data-key]'
      )
      .forEach(el => {

        const item =
          el.closest('.item');

        const items =
          [...document.querySelectorAll('.item')];

        const projectIndex =
          items.indexOf(item);

        if (
          projectIndex >= 0 &&
          d.projects[projectIndex]
        ) {

          el.oninput = () => {

            if (
              el.dataset.key === 'tags'
            ) {

              d.projects[
                projectIndex
              ].tags = el.value
                .split(',')
                .map(x => x.trim())
                .filter(Boolean);

            } else {

              d.projects[
                projectIndex
              ][el.dataset.key] = el.value;

            }

          };

        }

      });

  }


  /* Resume */

  if (tab === 'resume') {

    const resumeFile =
      document.getElementById('resumeFile');

    if (resumeFile) {
      resumeFile.onchange = uploadResume;
    }

  }

}


/* =========================
   PROFILE ACTIONS
========================= */

function addProfileField() {

  d.profile.extra.push({
    label: 'New Field',
    value: '',
    url: '',
    place: 'contact'
  });

  render('profile');
}


function removeProfileField(i) {

  d.profile.extra.splice(i, 1);

  render('profile');
}


/* =========================
   LINK ACTIONS
========================= */

function addLink() {

  d.links.push({
    title: 'New Link',
    url: '#',
    place: 'contact'
  });

  render('links');
}


/* =========================
   ARRAY ACTIONS
========================= */

function addArray(a) {

  const x = {

    education: {
      title: 'Degree / Course',
      institution: '',
      period: '',
      board: '',
      stream: '',
      cgpa: '',
      percentage: '',
      grade: '',
      description: '',
      url: ''
    },

    experience: {
      title: 'Role',
      company: '',
      period: '',
      description: ''
    },

    skills: {
      name: 'New Skill',
      details: ''
    },

    projects: {
      title: 'New Project',
      description: '',
      tags: [],
      links: []
    },

    certificates: {
      title: 'New Certificate',
      issuer: '',
      date: '',
      description: '',
      url: ''
    },

    details: {
      title: 'New Detail',
      text: '',
      linkTitle: 'Open link',
      url: '',
      place: 'beforeContact'
    }

  }[a];

  d[a].push(x);

  render(a);
}


function removeItem(a, i) {

  d[a].splice(i, 1);

  render(a);
}


/* =========================
   PROJECT LINK ACTIONS
========================= */

function addProjectLink(i) {

  d.projects[i].links.push({
    title: 'Demo',
    url: '#'
  });

  render('projects');
}


function removeProjectLink(i, j) {

  d.projects[i].links.splice(j, 1);

  render('projects');
}


/* =========================
   RESUME
========================= */

function uploadResume(e) {

  const f = e.target.files[0];

  if (!f) return;


  if (f.size > 8 * 1024 * 1024) {

    show('PDF is larger than 8 MB.');

    return;
  }


  const r = new FileReader();


  r.onload = () => {

    localStorage.setItem(
      'portfolioResume',
      r.result
    );

    show('Resume PDF saved.');

  };


  r.readAsDataURL(f);
}


/* =========================
   STATUS MESSAGE
========================= */

function show(t) {

  const s =
    document.getElementById('status');

  if (!s) return;

  s.textContent = t;

  s.style.display = 'block';


  setTimeout(() => {

    s.style.display = 'none';

  }, 3000);
}


/* =========================
   NAVIGATION
========================= */

document
  .querySelectorAll('.side')
  .forEach(b => {

    b.onclick = () =>
      render(b.dataset.tab);

  });


/* =========================
   SAVE TO SUPABASE
========================= */

document
  .getElementById('save')
  .onclick = async () => {

    /* Always save locally too */

    localStorage.setItem(
      'portfolioData',
      JSON.stringify(d)
    );


    /* Check Supabase connection */

    if (!window.supabaseClient) {

      console.error(
        'Supabase client is not available.'
      );

      show(
        'Saved locally, but Supabase is not connected.'
      );

      return;
    }


    try {

      const payload = {
        data: d,
        updated_at: new Date().toISOString()
      };


      const {
        data: result,
        error
      } = await window.supabaseClient

        .from('portfolio_data')

        .update(payload)

        .eq('id', 1)

        .select();


      if (error) {

        console.error(
          'Supabase save error:',
          error
        );

        show(
          'Supabase save failed: ' +
          error.message
        );

        return;
      }


      console.log(
        'Portfolio saved to Supabase:',
        result
      );


      show(
        'Changes saved to Supabase successfully.'
      );


    } catch (error) {

      console.error(
        'Supabase save exception:',
        error
      );

      show(
        'Supabase save failed: ' +
        error.message
      );

    }

  };


/* =========================
   PREVIEW
========================= */

document
  .getElementById('preview')
  .onclick = () =>
    window.open(
      'index.html',
      '_blank'
    );


/* =========================
   LOAD FROM SUPABASE
========================= */

async function loadRemoteAdmin() {

  if (!window.supabaseClient) {

    console.warn(
      'Supabase client not connected.'
    );

    return;
  }


  try {

    const {
      data: row,
      error
    } = await window.supabaseClient

      .from('portfolio_data')

      .select('data')

      .eq('id', 1)

      .maybeSingle();


    if (error) {

      console.error(
        'Supabase load error:',
        error
      );

      return;
    }


    if (!row || !row.data) {

      console.log(
        'No portfolio data found in Supabase yet.'
      );

      return;
    }


    /*
      Replace local data with
      Supabase data.
    */

    d = {
      ...d,
      ...row.data,
      profile: normalizeProfile(
        row.data.profile
      )
    };


    /* Update browser copy */

    localStorage.setItem(
      'portfolioData',
      JSON.stringify(d)
    );


    render();


    show(
      'Loaded from Supabase.'
    );


  } catch (error) {

    console.error(
      'Supabase load failed:',
      error
    );

  }

}


/* =========================
   START
========================= */

render();

loadRemoteAdmin();
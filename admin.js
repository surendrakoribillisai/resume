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
      description: 'AI-powered accessibility concept for communication between people with different communication needs.',
      tags: ['AI', 'Accessibility', 'Product'],
      links: []
    },
    {
      title: 'AI Travel Guide',
      description: 'Travel product concept focused on personalized discovery and a clear user journey.',
      tags: ['UI/UX', 'Figma', 'Case Study'],
      links: []
    }
  ],

  certificates: [],

  details: []
};

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
    x => String(x.label || '').trim().toLowerCase() === 'mobile'
  );

  if (!profile.mobile && mobileExtra?.value) {
    profile.mobile = mobileExtra.value;
  }

  profile.extra = extras.filter(
    x => String(x.label || '').trim().toLowerCase() !== 'mobile'
  );

  return profile;
}

function load() {
  try {
    const saved = JSON.parse(
      localStorage.getItem('portfolioData') || '{}'
    );

    return {
      profile: normalizeProfile(saved.profile),

      links: Array.isArray(saved.links)
        ? saved.links
        : clone(defaults.links),

      skills: Array.isArray(saved.skills)
        ? saved.skills
        : clone(defaults.skills),

      education: Array.isArray(saved.education)
        ? saved.education
        : [],

      experience: Array.isArray(saved.experience)
        ? saved.experience
        : [],

      projects: Array.isArray(saved.projects)
        ? saved.projects
        : clone(defaults.projects),

      certificates: Array.isArray(saved.certificates)
        ? saved.certificates
        : [],

      details: Array.isArray(saved.details)
        ? saved.details
        : []
    };

  } catch (error) {
    console.error('Local data load failed:', error);
    return clone(defaults);
  }
}

let d = load();

const app = document.getElementById('app');

const esc = s =>
  String(s == null ? '' : s)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;');

function input(label, key, value, area = false) {
  return `
    <label>
      ${label}
      ${
        area
          ? `<textarea data-key="${key}">${esc(value)}</textarea>`
          : `<input data-key="${key}" value="${esc(value)}">`
      }
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

function render(tab = 'profile') {

  document.querySelectorAll('.side').forEach(button => {
    button.classList.toggle(
      'active',
      button.dataset.tab === tab
    );
  });

  let html = '';

  if (tab === 'profile') {
    html = profileTab();
  }

  if (tab === 'links') {
    html = linksTab();
  }

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
          ${input('Degree / Course', 'title', d.education[i].title)}
          ${input('Institution', 'institution', d.education[i].institution)}
          ${input('Period', 'period', d.education[i].period)}
          ${input('Board / University', 'board', d.education[i].board || '')}
          ${input('Stream / Specialization', 'stream', d.education[i].stream || '')}
          ${input('CGPA', 'cgpa', d.education[i].cgpa || '')}
          ${input('Percentage', 'percentage', d.education[i].percentage || '')}
          ${input('Grade / Class', 'grade', d.education[i].grade || '')}
          ${input('Link', 'url', d.education[i].url)}
          ${input('Description', 'description', d.education[i].description, true)}
        </div>
      `
    );
  }

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
          ${input('Role', 'title', d.experience[i].title)}
          ${input('Company', 'company', d.experience[i].company)}
          ${input('Period', 'period', d.experience[i].period)}
          ${input('Description', 'description', d.experience[i].description, true)}
        </div>
      `
    );
  }

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
          ${input('Skill name', 'name', d.skills[i].name)}
          ${input('Skill details', 'details', d.skills[i].details)}
        </div>
      `
    );
  }

  if (tab === 'projects') {
    html = projectsTab();
  }

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
          ${input('Certificate title', 'title', d.certificates[i].title)}
          ${input('Issuer', 'issuer', d.certificates[i].issuer)}
          ${input('Date', 'date', d.certificates[i].date)}
          ${input('Verification URL', 'url', d.certificates[i].url)}
          ${input('Description', 'description', d.certificates[i].description, true)}
        </div>
      `
    );
  }

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
          ${input('Title', 'title', d.details[i].title)}
          ${input('Link title', 'linkTitle', d.details[i].linkTitle)}
          ${input('Link URL', 'url', d.details[i].url)}

          <label>
            Placement
            <select data-key="place">
              <option value="afterAbout" ${
                d.details[i].place === 'afterAbout'
                  ? 'selected'
                  : ''
              }>
                After About
              </option>

              <option value="beforeContact" ${
                d.details[i].place !== 'afterAbout'
                  ? 'selected'
                  : ''
              }>
                Before Contact
              </option>
            </select>
          </label>

          ${input('Details', 'text', d.details[i].text, true)}
        </div>
      `
    );
  }

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

        <p id="fileName" class="hint"></p>
      </div>
    `;
  }

  app.innerHTML = html;

  wire(tab);
}

function profileTab() {

  return `
    <div class="card">

      <h2>Profile</h2>

      <p class="hint">
        Edit the content shown on the portfolio.
      </p>

      <div class="grid">

        ${input('Name', 'name', d.profile.name)}

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
            <h3>Additional Profile Fields</h3>

            <p>
              Add location, designation, website,
              social info or any other custom profile detail.
            </p>
          </div>

          <button onclick="addProfileField()">
            + Add New
          </button>

        </div>

        ${
          d.profile.extra
            .map(
              (x, i) => `
                <div class="item">

                  <div class="itemhead">
                    <b>Profile Field ${i + 1}</b>

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
                          ${
                            x.place === 'hero'
                              ? 'selected'
                              : ''
                          }
                        >
                          Hero
                        </option>

                        <option
                          value="about"
                          ${
                            x.place === 'about'
                              ? 'selected'
                              : ''
                          }
                        >
                          About
                        </option>

                        <option
                          value="contact"
                          ${
                            x.place === 'contact'
                              ? 'selected'
                              : ''
                          }
                        >
                          Contact
                        </option>

                      </select>
                    </label>

                  </div>

                </div>
              `
            )
            .join('')
        }

      </div>

    </div>
  `;
}

function linksTab() {

  return `
    <div class="card">

      <div class="bar">

        <div>
          <h2>Links</h2>

          <p>
            Add a link, give it a title and choose
            where it appears.
          </p>
        </div>

        <button onclick="addLink()">
          + Add New Link
        </button>

      </div>

      ${d.links
        .map(
          (x, i) => `
            <div class="item">

              <div class="itemhead">

                <b>Link ${i + 1}</b>

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
                    <option ${
                      x.place === 'nav'
                        ? 'selected'
                        : ''
                    }>
                      nav
                    </option>

                    <option ${
                      x.place === 'hero'
                        ? 'selected'
                        : ''
                    }>
                      hero
                    </option>

                    <option ${
                      x.place === 'contact'
                        ? 'selected'
                        : ''
                    }>
                      contact
                    </option>
                  </select>

                </label>

                <span></span>

              </div>

            </div>
          `
        )
        .join('')}

    </div>
  `;
}

function arrayTab(title, arr, make, body) {

  return `
    <div class="card">

      <div class="bar">

        <div>
          <h2>${title}</h2>

          <p>
            Add, edit or delete
            ${title.toLowerCase()} entries.
          </p>
        </div>

        <button onclick="addArray('${arr}')">
          + Add New ${title.replace(/s$/, '')}
        </button>

      </div>

      ${d[arr]
        .map(
          (x, i) => `
            <div class="item">

              <div class="itemhead">

                <b>${title} ${i + 1}</b>

                <button
                  class="danger small"
                  onclick="removeItem('${arr}', ${i})"
                >
                  Delete
                </button>

              </div>

              ${body(i)}

            </div>
          `
        )
        .join('')}

    </div>
  `;
}

function projectsTab() {

  return `
    <div class="card">

      <div class="bar">

        <div>
          <h2>Projects</h2>

          <p>
            Add projects, edit them and attach
            multiple links.
          </p>
        </div>

        <button onclick="addArray('projects')">
          + Add New Project
        </button>

      </div>

      ${d.projects
        .map(
          (x, i) => `
            <div class="item">

              <div class="itemhead">

                <b>Project ${i + 1}</b>

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

                <b>Project links</b>

                ${(x.links || [])
                  .map(
                    (l, j) => `
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
                    `
                  )
                  .join('')}

                <button
                  class="subbtn"
                  onclick="addProjectLink(${i})"
                >
                  + Add Project Link
                </button>

              </div>

            </div>
          `
        )
        .join('')}

    </div>
  `;
}

function wire(tab) {

  document
    .querySelectorAll('[data-key]')
    .forEach(el => {

      el.oninput = () => {

        if (el.dataset.arr) {

          d[el.dataset.arr][
            +el.dataset.i
          ][el.dataset.key] = el.value;

        } else if (
          el.dataset.profileExtra !== undefined
        ) {

          d.profile.extra[
            +el.dataset.profileExtra
          ][el.dataset.key] = el.value;

        } else if (tab === 'profile') {

          d.profile[el.dataset.key] = el.value;
        }
      };
    });

  document
    .querySelectorAll('[data-profile-extra]')
    .forEach(el => {

      el.onchange = () => {

        d.profile.extra[
          +el.dataset.profileExtra
        ][el.dataset.key] = el.value;

      };
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

  if (tab === 'resume') {

    const resumeFile =
      document.getElementById('resumeFile');

    if (resumeFile) {
      resumeFile.onchange = uploadResume;
    }
  }
}

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

function addLink() {

  d.links.push({
    title: 'New Link',
    url: '#',
    place: 'contact'
  });

  render('links');
}

function addArray(a) {

  const templates = {

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
  };

  if (!templates[a]) return;

  d[a].push(
    clone(templates[a])
  );

  render(a);
}

function removeItem(a, i) {

  d[a].splice(i, 1);

  render(a);
}

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

function uploadResume(e) {

  const file = e.target.files[0];

  if (!file) return;

  if (file.size > 8 * 1024 * 1024) {

    show('PDF is larger than 8 MB.');

    return;
  }

  const reader = new FileReader();

  reader.onload = () => {

    localStorage.setItem(
      'portfolioResume',
      reader.result
    );

    show('Resume PDF saved locally.');
  };

  reader.readAsDataURL(file);
}

function show(message) {

  const status =
    document.getElementById('status');

  status.textContent = message;
  status.style.display = 'block';

  setTimeout(() => {

    status.style.display = 'none';

  }, 3000);
}


/* ------------------------------
   ADMIN SAVE TO SUPABASE
-------------------------------- */

document
  .querySelectorAll('.side')
  .forEach(button => {

    button.onclick = () => {
      render(button.dataset.tab);
    };

  });


document.getElementById('save').onclick =
  async () => {

    // Always keep a local backup
    localStorage.setItem(
      'portfolioData',
      JSON.stringify(d)
    );

    // Check Supabase connection
    if (!window.supabaseClient) {

      console.error(
        'Supabase client is not available.'
      );

      show(
        'Supabase is not connected. Check supabase-config.js'
      );

      return;
    }

    try {

      const payload = {

        id: 1,

        name: d.profile.name || '',

        title: d.profile.title || '',

        mobile: d.profile.mobile || '',

        email: d.profile.email || '',

        bio: d.profile.bio || '',

        about_title:
          d.profile.aboutTitle || '',

        about:
          d.profile.about || '',

        data: d,

        updated_at:
          new Date().toISOString()
      };

      console.log(
        'Sending to Supabase:',
        payload
      );

      const result =
        await window.supabaseClient
          .from('portfolio')
          .update(payload)
          .eq('id', 1)
          .select()
          .single();

      if (result.error) {

        console.error(
          'SUPABASE ERROR:',
          result.error
        );

        show(
          'Supabase error: ' +
          result.error.message
        );

        return;
      }

      console.log(
        'Saved successfully:',
        result.data
      );

      show(
        '✓ Changes saved to Supabase'
      );

    } catch (error) {

      console.error(
        'SAVE ERROR:',
        error
      );

      show(
        'Supabase error: ' +
        error.message
      );
    }
  };


document.getElementById('preview').onclick =
  () => {

    window.open(
      'index.html',
      '_blank'
    );

  };


/* ------------------------------
   LOAD FROM SUPABASE
-------------------------------- */

async function loadRemoteAdmin() {

  if (!window.supabaseClient) {

    console.warn(
      'Supabase client not available.'
    );

    return;
  }

  try {

    const result =
      await window.supabaseClient
        .from('portfolio')
        .select('data')
        .eq('id', 1)
        .maybeSingle();

    if (result.error) {

      console.error(
        'Supabase load error:',
        result.error
      );

      return;
    }

    if (
      !result.data ||
      !result.data.data
    ) {

      console.log(
        'No remote portfolio data yet.'
      );

      return;
    }

    d = {
      ...d,
      ...result.data.data,
      profile:
        normalizeProfile(
          result.data.data.profile
        )
    };

    render();

    show(
      'Loaded from Supabase.'
    );

  } catch (error) {

    console.warn(
      'Supabase load failed; using local data.',
      error
    );
  }
}


/* ------------------------------
   START ADMIN
-------------------------------- */

render();

loadRemoteAdmin();
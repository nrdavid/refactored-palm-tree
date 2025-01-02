// get the ninja-keys element
const ninja = document.querySelector('ninja-keys');

// add the home and posts menu items
ninja.data = [{
    id: "nav-about",
    title: "about",
    section: "Navigation",
    handler: () => {
      window.location.href = "/";
    },
  },{id: "nav-blog",
          title: "blog",
          description: "",
          section: "Navigation",
          handler: () => {
            window.location.href = "/blog/";
          },
        },{id: "nav-publications",
          title: "publications",
          description: "All of my publications.",
          section: "Navigation",
          handler: () => {
            window.location.href = "/publications/";
          },
        },{id: "nav-projects",
          title: "projects",
          description: "Some recent projects I&#39;ve been working on.",
          section: "Navigation",
          handler: () => {
            window.location.href = "/projects/";
          },
        },{id: "nav-repositories",
          title: "repositories",
          description: "Some of my GitHub repositories. Many research projects are private and are not listed here.",
          section: "Navigation",
          handler: () => {
            window.location.href = "/repositories/";
          },
        },{id: "nav-cv",
          title: "cv",
          description: "Ph.D. Candidate Materials Science &amp; Engineering and Scientific Computing",
          section: "Navigation",
          handler: () => {
            window.location.href = "/cv/";
          },
        },{id: "nav-teaching",
          title: "teaching",
          description: "Courses I&#39;ve taught.",
          section: "Navigation",
          handler: () => {
            window.location.href = "/teaching/";
          },
        },{id: "post-public-facing-dynamic-visualizations",
      
        title: "Public facing dynamic visualizations",
      
      description: "This guide will demonstrate how to host a public, dynamic, interactive visualization",
      section: "Posts",
      handler: () => {
        
          window.location.href = "/blog/2024/public-dynamic-viz/";
        
      },
    },{id: "post-configuring-ssh-key-authentication-on-a-linux-server",
      
        title: "Configuring SSH key authentication on a linux server",
      
      description: "This guide will demonstrate how to configure SSH key authentication on a linux server.",
      section: "Posts",
      handler: () => {
        
          window.location.href = "/blog/2023/ssh-key-auth/";
        
      },
    },{id: "post-connecting-to-a-docker-container-via-ssh",
      
        title: "Connecting to a Docker Container via SSH",
      
      description: "This guide will demonstrate how to connect to a Ubuntu Docker container via SSH for remote development.",
      section: "Posts",
      handler: () => {
        
          window.location.href = "/blog/2023/docker-ssh/";
        
      },
    },{id: "post-creating-a-linux-docker-container-for-development-on-windows",
      
        title: "Creating a Linux Docker Container for Development on Windows",
      
      description: "This guide will demonstrate how to create a linux docker container for code development on a native Windows OS.",
      section: "Posts",
      handler: () => {
        
          window.location.href = "/blog/2023/docker-setup/";
        
      },
    },{id: "post-onboarding-the-volcano-plot",
      
        title: "Onboarding - The Volcano Plot",
      
      description: "This guide is meant for new members of the Sun group, or anyone interested in getting started with the Materials Project API.",
      section: "Posts",
      handler: () => {
        
          window.location.href = "/blog/2022/volcano-guide/";
        
      },
    },{id: "news-i-start-my-ph-d-in-materials-science-engineering-and-scientific-computing-at-the-university-of-michigan",
          title: 'I start my Ph.D. in Materials Science Engineering and Scientific Computing at the...',
          description: "",
          section: "News",},{id: "news-our-comment-article-the-promise-and-pitfalls-of-ai-for-molecular-and-materials-synthesis-is-published-in-nature-computational-science",
          title: 'Our comment article “The promise and pitfalls of AI for molecular and materials...',
          description: "",
          section: "News",},{id: "news-i-present-graduate-admissions-research-at-the-midas-data-science-summit",
          title: 'I present graduate admissions research at the MIDAS Data Science Summit!',
          description: "",
          section: "News",handler: () => {
              window.location.href = "/news/announcement_3/";
            },},{id: "news-i-am-awarded-the-nsf-graduate-research-fellowship-total-award-amount-159-000-3-years",
          title: 'I am awarded the NSF Graduate Research Fellowship! Total award amount: $159,000 /...',
          description: "",
          section: "News",},{id: "news-i-pass-my-candidacy-exam",
          title: 'I pass my candidacy exam!',
          description: "",
          section: "News",},{id: "news-our-article-a-critical-reflection-on-attempts-to-machine-learn-materials-synthesis-insights-from-text-mined-literature-recipes-is-published-and-presented-in-faraday-discussions-on-data-driven-discovery-in-the-chemical-sciences",
          title: 'Our article “A critical reflection on attempts to machine-learn materials synthesis insights from...',
          description: "",
          section: "News",},{id: "projects-free-energy-of-iron-from-materials-properties",
          title: 'Free Energy of Iron from Materials Properties',
          description: "From properties to free energy",
          section: "Projects",handler: () => {
              window.location.href = "/projects/iron/";
            },},{
        id: 'social-email',
        title: 'email',
        section: 'Socials',
        handler: () => {
          window.open("mailto:%6E%72%64%61%76%69%64@%75%6D%69%63%68.%65%64%75", "_blank");
        },
      },{
        id: 'social-github',
        title: 'GitHub',
        section: 'Socials',
        handler: () => {
          window.open("https://github.com/nrdavid", "_blank");
        },
      },{
        id: 'social-linkedin',
        title: 'LinkedIn',
        section: 'Socials',
        handler: () => {
          window.open("https://www.linkedin.com/in/nicholas-david-", "_blank");
        },
      },{
        id: 'social-orcid',
        title: 'ORCID',
        section: 'Socials',
        handler: () => {
          window.open("https://orcid.org/0000-0002-5949-4581", "_blank");
        },
      },{
        id: 'social-rss',
        title: 'RSS Feed',
        section: 'Socials',
        handler: () => {
          window.open("/feed.xml", "_blank");
        },
      },{
      id: 'light-theme',
      title: 'Change theme to light',
      description: 'Change the theme of the site to Light',
      section: 'Theme',
      handler: () => {
        setThemeSetting("light");
      },
    },
    {
      id: 'dark-theme',
      title: 'Change theme to dark',
      description: 'Change the theme of the site to Dark',
      section: 'Theme',
      handler: () => {
        setThemeSetting("dark");
      },
    },
    {
      id: 'system-theme',
      title: 'Use system default theme',
      description: 'Change the theme of the site to System Default',
      section: 'Theme',
      handler: () => {
        setThemeSetting("system");
      },
    },];

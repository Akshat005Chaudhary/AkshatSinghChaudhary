1. Clone the repo `https://github.com/cassidoo/blahg`
2. You can remove the .git in it if you want a clean fresh cloned repo
3. Put up the local cloned repo in your github, this is needed to get the credentials for TinaCMS later-on. Which is quintensial to edit your website later.
4. Once cloned properly and once its up there in your github you can install dependencies from the project's root directory using `npm install` and run it using `npm run dev`. This site will be live on `http://localhost:4321`
5. To edit vist Tina at `http://localhost:4321/admin/index.html`
6. astro.config.mjs → update site: with your domain if you have one.
7. src/config.js → update your site title, author, or any other settings.
8. public/robots.txt → add your site URL on the first line.
9. src/components/Header.astro → add links to your GitHub, LinkedIn, etc.
10. pages/about.md → update your intro.
11. tina/config.js → optionally, edit tags/categories.

---

12. To add new tags in tinaCMS go to tina/config.js and add the tag in the tags array.
For example:
To add a new tag "dsa" add the following line in the tags array:
{
	value: "dsa",
	label: "DSA",
}

---

13. After making all the changes run `npm run build` which will create a `dist/` folder (production ready site)

---

14. Note that inline editing is blocked on live website with netlify so i can't make changes in the live production website. Instead what im gonna do to make changes in the website. Come to the root terminal of the repo. Run `npm run dev`. Go to `http://localhost:4321/admin/index.html` and make the changes there. After making the changes run `npm run build` to deploy the changes to netlify. After this dist/ gets updated so now just commit and push the changes to github which will be detected by netlify and it will deploy the changes to the live website.
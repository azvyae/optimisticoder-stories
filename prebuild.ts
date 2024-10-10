import fs from 'fs-extra';
import path from 'path';
import matter from 'gray-matter';
import readingTime from 'reading-time';

const storiesDir = 'stories';
const storiesIndexerPath = path.join(process.cwd(), storiesDir, 'stories.json');
const storiesMetaPath = path.join(process.cwd(), storiesDir, 'meta.json');
const sitemapPath = path.join(process.cwd(), storiesDir, 'sitemap.json');

async function getFiles(dir: string, depth: number = 0): Promise<string[]> {
  const subdirs = await fs.readdir(dir);
  const files = await Promise.all(
    subdirs.map(async (subdir) => {
      const res = path.resolve(dir, subdir);
      const stat = await fs.stat(res);

      // Skip .git, node_modules, and all first-level files
      if (
        subdir === '.git' ||
        subdir === 'node_modules' ||
        subdir === 'docs' ||
        (depth === 0 && stat.isFile())
      ) {
        return [];
      }

      // Recursively get files from directories, filter out non-page.md files
      if (stat.isDirectory()) {
        return getFiles(res, depth + 1);
      } else if (path.basename(res) === 'page.md') {
        return [res];
      } else {
        return [];
      }
    }),
  );

  return files.reduce((a, f) => a.concat(f), []);
}

async function indexFiles() {
  const files = await getFiles(storiesDir);
  const storiesIndex: StoryIndexEntry[] = [];
  const categoriesIndex: CategoryIndexEntry = [];

  for (const file of files) {
    if (path.basename(file) === 'page.md') {
      const content = await fs.readFile(file, 'utf8');
      const { data } = matter(content);
      const relativePath = path.relative(storiesDir, file);
      const [category, slug] = relativePath.split(path.sep);

      storiesIndex.push({
        title: data.title,
        slug: slug,
        category: category,
        subtitle: data.subtitle,
        keywords: data.keywords,
        excerpt: data.excerpt,
        cover: `/stories/${category}/${slug}/${data.cover}`,
        date: data.date,
        readTime: readingTime(content).text,
      });
      if (!categoriesIndex.includes(category)) {
        categoriesIndex.push(category);
      }
    }
  }
  // Sort the index by date
  storiesIndex.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );

  fs.writeFileSync(
    storiesMetaPath,
    JSON.stringify(
      {
        totalStories: storiesIndex.length,
        categories: categoriesIndex,
      },
      null,
      2,
    ),
  );
  fs.writeFileSync(storiesIndexerPath, JSON.stringify(storiesIndex, null, 2));
  console.info('Indexing complete. Check index file for results.');
}

async function generateSitemapXml() {
  const sitemapEntries: Sitemap = [];
  const storiesIndexes: StoryIndexEntry[] = JSON.parse(
    fs.readFileSync(storiesIndexerPath).toString(),
  );
  storiesIndexes.forEach((item) => {
    sitemapEntries.push({
      url: `https://optimisticoder.com/stories/${item.slug}`,
      lastModified: item.date,
      changeFrequency: 'weekly',
      priority: 0.5,
    });
  });
  fs.writeFileSync(sitemapPath, JSON.stringify(sitemapEntries, null, 2));
  console.info('Sitemap successfully generated.');
}

async function main() {
  try {
    await indexFiles();
    await generateSitemapXml();
  } catch (error) {
    if (error instanceof Error) {
      console.error('Error occurred:', error.message);
    }
  }
}

main();

export {};

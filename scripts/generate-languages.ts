import * as fs from 'fs';
import * as path from 'path';

interface GitHubRepo {
  name: string;
  languages_url: string;
}

interface LanguageStats {
  [language: string]: number;
}

interface OutputData {
  languages: string[];
  lastUpdated: string;
}

async function fetchWithAuth(url: string, token: string): Promise<any> {
  const response = await fetch(url, {
    headers: {
      'Accept': 'application/vnd.github.v3+json',
      'Authorization': `token ${token}`,
      'User-Agent': 'GitHub-Language-Stats-Generator'
    }
  });

  if (!response.ok) {
    throw new Error(`GitHub API error: ${response.status} ${response.statusText}`);
  }

  return response.json();
}

async function getAllRepositories(username: string, token: string): Promise<GitHubRepo[]> {
  const repos: GitHubRepo[] = [];
  let page = 1;
  const perPage = 100;

  while (true) {
    const url = `https://api.github.com/user/repos?sort=updated&per_page=${perPage}&page=${page}&visibility=all`;
    const pageRepos = await fetchWithAuth(url, token);

    if (pageRepos.length === 0) {
      break;
    }

    repos.push(...pageRepos);

    if (pageRepos.length < perPage) {
      break;
    }

    page++;
  }

  return repos;
}

async function getLanguageStats(repo: GitHubRepo, token: string): Promise<LanguageStats> {
  try {
    return await fetchWithAuth(repo.languages_url, token);
  } catch (error) {
    console.warn(`Failed to fetch languages for ${repo.name}:`, error);
    return {};
  }
}

async function main() {
  const token = process.env.GITHUB_TOKEN;
  const username = process.env.GITHUB_USERNAME || 'SakutoHata';

  if (!token) {
    console.error('Error: GITHUB_TOKEN environment variable is required');
    process.exit(1);
  }

  console.log(`Fetching repositories for user: ${username}`);

  const repos = await getAllRepositories(username, token);
  console.log(`Found ${repos.length} repositories`);

  const allLanguages: LanguageStats = {};

  for (const repo of repos) {
    const languages = await getLanguageStats(repo, token);

    for (const [lang, bytes] of Object.entries(languages)) {
      allLanguages[lang] = (allLanguages[lang] || 0) + bytes;
    }
  }

  // Sort languages by bytes and get top languages
  const sortedLanguages = Object.entries(allLanguages)
    .sort((a, b) => b[1] - a[1])
    .map(([lang]) => lang);

  const outputData: OutputData = {
    languages: sortedLanguages,
    lastUpdated: new Date().toISOString()
  };

  // Write to public directory
  const outputPath = path.join(process.cwd(), 'public', 'github-languages.json');
  fs.writeFileSync(outputPath, JSON.stringify(outputData, null, 2));

  console.log(`✅ Successfully generated ${outputPath}`);
  console.log(`📊 Top languages: ${sortedLanguages.slice(0, 10).join(', ')}`);
}

main().catch(error => {
  console.error('Error:', error);
  process.exit(1);
});

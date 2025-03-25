import { Octokit } from '@octokit/rest';

export interface TechDoc {
  title: string;
  repository: string;
  path: string;
  lastUpdated: string;
  content?: string;
  navigation?: DocNavigation[];
}

export interface DocNavigation {
  title: string;
  path: string;
  children?: DocNavigation[];
}

export class GitHubService {
  private octokit: Octokit;
  private org: string;

  constructor(org: string, token?: string) {
    this.org = org;
    this.octokit = new Octokit({
      auth: token,
      userAgent: 'techdoc-hackathon',
    });
  }

  async getTechDocs(): Promise<TechDoc[]> {
    try {
      // Get all repositories in the organization
      const { data: repos } = await this.octokit.repos.listForOrg({
        org: this.org,
      });

      const techDocs: TechDoc[] = [];

      // Search for techdocs in each repository
      for (const repo of repos) {
        try {
          const { data: searchResults } = await this.octokit.search.code({
            q: `org:${this.org} repo:${repo.name} filename:mkdocs.yml`,
          });

          if (searchResults.items.length > 0) {
            // Found a repository with techdocs
            const { data: content } = await this.octokit.repos.getContent({
              owner: this.org,
              repo: repo.name,
              path: 'mkdocs.yml',
            });

            if ('content' in content) {
              const yamlContent = Buffer.from(content.content, 'base64').toString();
              const extractedTitle = this.extractTitleFromYaml(yamlContent);
              const title = extractedTitle || repo.name;

              techDocs.push({
                title,
                repository: repo.name,
                path: `/${repo.name}`,
                lastUpdated: repo.updated_at || new Date().toISOString(),
              });
            }
          }
        } catch (error) {
          console.error(`Error processing repository ${repo.name}:`, error);
        }
      }

      return techDocs;
    } catch (error) {
      console.error('Error fetching techdocs:', error);
      throw error;
    }
  }

  async getDocContent(repo: string, path: string = 'docs/index.md'): Promise<string> {
    try {
      // Ensure the path starts with 'docs/'
      const normalizedPath = path.startsWith('docs/') ? path : `docs/${path}`;
      
      const { data: content } = await this.octokit.repos.getContent({
        owner: this.org,
        repo,
        path: normalizedPath,
      });

      if ('content' in content) {
        return Buffer.from(content.content, 'base64').toString();
      }
      throw new Error('Content not found');
    } catch (error) {
      console.error(`Error fetching content from ${repo}:`, error);
      throw error;
    }
  }

  async getDocNavigation(repo: string): Promise<DocNavigation[]> {
    try {
      const { data: content } = await this.octokit.repos.getContent({
        owner: this.org,
        repo,
        path: 'mkdocs.yml',
      });

      if ('content' in content) {
        const yamlContent = Buffer.from(content.content, 'base64').toString();
        return this.extractNavigationFromYaml(yamlContent);
      }
      return [];
    } catch (error) {
      console.error(`Error fetching navigation from ${repo}:`, error);
      return [];
    }
  }

  private extractTitleFromYaml(yamlContent: string): string | null {
    try {
      const titleMatch = yamlContent.match(/site_name:\s*(.+)/);
      return titleMatch ? titleMatch[1].trim() : null;
    } catch (error) {
      console.error('Error extracting title from YAML:', error);
      return null;
    }
  }

  private extractNavigationFromYaml(yamlContent: string): DocNavigation[] {
    try {
      const navMatch = yamlContent.match(/nav:\s*([\s\S]*?)(?=\n\w|$)/);
      if (!navMatch) return [];

      const navContent = navMatch[1];
      const lines = navContent.split('\n');
      const navigation: DocNavigation[] = [];
      let currentSection: DocNavigation | null = null;
      let currentDepth = 0;

      for (const line of lines) {
        const trimmedLine = line.trim();
        if (!trimmedLine || trimmedLine.startsWith('#')) continue;

        const depth = line.search(/\S/);
        const titleMatch = trimmedLine.match(/-?\s*['"]?([^'"]+)['"]?\s*:\s*['"]?([^'"]+)['"]?/);
        
        if (titleMatch) {
          const [, title, path] = titleMatch;
          const item: DocNavigation = { 
            title, 
            path: path.startsWith('docs/') ? path.slice(5) : path 
          };

          if (depth === 0) {
            navigation.push(item);
            currentSection = item;
          } else if (currentSection) {
            if (!currentSection.children) {
              currentSection.children = [];
            }
            currentSection.children.push(item);
          }
        }
      }

      return navigation;
    } catch (error) {
      console.error('Error extracting navigation from YAML:', error);
      return [];
    }
  }
} 
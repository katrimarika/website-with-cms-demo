import type { FileContent } from './data';
import type { CommitStatus, File, FolderContent } from './data';

export function mockFetch<T>(data: T) {
  return new Promise<T>((resolve) => resolve(data));
}

const mockContent = [
  {
    path: 'content/blog',
    type: 'dir',
  },
  {
    path: 'content/_index.md',
    type: 'file',
    sha: 'mockindex1',
    content:
      'LS0tCnRpdGxlOiAnTXkgc2l0ZScKZGF0ZTogMjAyMC0wOS0wN1QwNzo0ODo1MSswMzowMApkcmFmdDogZmFsc2UKLS0tCgpUaGlzIGlzIG15IHNpdGUuCg==',
  },
  {
    path: 'content/blog/post1.md',
    type: 'file',
    sha: 'mockpost1',
    content:
      'LS0tCnRpdGxlOiAnRmlyc3QgcG9zdCcKZGF0ZTogMjAyMC0wOS0wN1QxNjo1Mzo0MyswMzowMApkcmFmdDogZmFsc2UKLS0tCgpUaGlzIGlzIHRoZSAqKmZpcnN0KiogcG9zdC4K',
  },
  {
    path: 'content/blog/post2.md',
    type: 'file',
    sha: 'mockpost3',
    content:
      'LS0tCnRpdGxlOiAnU2Vjb25kIHBvc3QnCmRhdGU6IDIwMjAtMDktMDdUMTY6NTM6NDMrMDM6MDAKZHJhZnQ6IHRydWUKLS0tCgpUaGlzIGlzIGEgZHJhZnQgZm9yIGEgc2Vjb25kIHBvc3QuCg==',
  },
  {
    path: 'images/example.png',
    type: 'file',
    sha: 'mockimage1',
    content:
      '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',
  },
];

export function initApiClient(_accessKey: string) {
  function apiFilePath(from: string) {
    const isImage = from.startsWith('images');
    return isImage ? `site/static/${from}` : `site/${from}`;
  }

  function ownFilePath(from: string) {
    if (from.startsWith('site/static/')) {
      return from.replace('site/static/', '');
    }
    return from.replace('site/', '');
  }

  function validateFolderData(data: any): FolderContent {
    if (!Array.isArray(data)) {
      throw new Error('Unexpected response format.');
    }
    const validatedData = data.reduce<FolderContent>((list, d) => {
      if (typeof d === 'object') {
        const { name, path, type } = d;
        if (
          name &&
          typeof name === 'string' &&
          path &&
          typeof path === 'string' &&
          (type === 'file' || type === 'dir')
        ) {
          list.push({
            name,
            path: ownFilePath(path),
            type,
          });
        }
      }
      return list;
    }, []);
    return validatedData.sort((a, b) => (a.type >= b.type ? 1 : -1));
  }

  async function fetchFolder(path: string) {
    const content = mockContent
      .filter(
        (c) =>
          c.path.startsWith(path) &&
          c.path.split('/').length === path.split('/').length + 1
      )
      .map((c) => ({
        ...c,
        path: apiFilePath(c.path),
        name: c.path.split('/').slice(-1)[0],
      }));
    return mockFetch(validateFolderData(content));
  }

  function validateFileContent(data: any): FileContent {
    if (typeof data !== 'object') {
      throw new Error('Unexpected response format.');
    }
    const { sha, content, encoding } = data;
    if (
      !sha ||
      typeof sha !== 'string' ||
      !content ||
      typeof content !== 'string' ||
      encoding !== 'base64'
    ) {
      throw new Error('Unexpected response data.');
    }
    return { sha, content };
  }

  async function fetchFileContent(path: string) {
    const content = mockContent.find((f) => f.path === path) || {};
    return mockFetch(
      validateFileContent({
        ...content,
        encoding: 'base64',
      })
    );
  }

  async function postNewFile(path: string, _content: string): Promise<File> {
    return mockFetch({
      type: 'file' as const,
      name: path.split('/').slice(-1)[0],
      path,
    });
  }

  async function postFileContents(_path: string, sha: string, content: string) {
    return mockFetch({
      sha,
      content,
    });
  }

  async function deleteFile(_path: string, _sha: string) {
    return mockFetch(null);
  }

  function validateCommitStatus(data: any): CommitStatus {
    if (typeof data !== 'object') {
      throw new Error('Unexpected response format.');
    }
    const { status, ahead_by, behind_by, files, commits, base_commit } = data;
    if (!Array.isArray(files) || !Array.isArray(commits)) {
      throw new Error('Unexpected response data.');
    }
    const commitMessages = commits.map((c) =>
      !!c && !!c.commit && typeof c.commit.message === 'string'
        ? c.commit.message
        : ''
    );
    const relevantFiles = files.reduce((list, f) => {
      if (
        typeof f === 'object' &&
        !!f.filename &&
        typeof f.filename === 'string'
      ) {
        if (f.filename.startsWith('site/content/')) {
          list.push(f.filename.replace('site/', ''));
        } else if (f.filename.startsWith('site/static/images/')) {
          list.push(f.filename.replace('site/static/', ''));
        }
      }
      return list;
    }, []);
    const latestCommit = commits.length
      ? commits[commits.length - 1]
      : base_commit;
    return {
      status: !!status && typeof status === 'string' ? status : '',
      aheadBy: typeof ahead_by === 'number' ? ahead_by : 0,
      behindBy: typeof behind_by === 'number' ? behind_by : 0,
      commits: commitMessages,
      fileCount: files.length,
      contentFiles: relevantFiles,
      baseCommitSha:
        !!base_commit && typeof base_commit.sha === 'string'
          ? base_commit.sha
          : '',
      latestCommitSha:
        !!latestCommit && typeof latestCommit.sha === 'string'
          ? latestCommit.sha
          : '',
    };
  }

  async function fetchCommitStatus() {
    return mockFetch(
      validateCommitStatus({
        status: 'ahead',
        ahead_by: 1,
        behind_by: 0,
        files: [{ sha: 'mockfile', filename: 'site/content/_index.md' }],
        commits: [
          {
            sha: 'mockcommit',
            commit: {
              message: 'Changed content/_index.md via admin UI.',
            },
          },
        ],
        base_commit: { sha: 'mockbase' },
      })
    );
  }

  async function postUpdateBranch(
    _branch: string,
    _sha: string,
    _force = false
  ) {
    return mockFetch(null);
  }

  async function fetchArchetype(name: string) {
    return mockFetch(
      validateFileContent({
        sha: 'mockarchetype',
        content:
          'LS0tCnRpdGxlOiAie3sgcmVwbGFjZSAuTmFtZSAiLSIgIiAiIHwgdGl0bGUgfX0iCnNsdWc6IHt7IC5OYW1lIH19CmRhdGU6IHt7IC5EYXRlIH19CmRyYWZ0OiB0cnVlCi0tLQo=',
        encoding: 'base64',
      })
    );
  }

  return {
    fetchFolder,
    fetchFileContent,
    postFileContents,
    postNewFile,
    deleteFile,
    fetchCommitStatus,
    postUpdateBranch,
    fetchArchetype,
  };
}

export type ApiClient = ReturnType<typeof initApiClient>;

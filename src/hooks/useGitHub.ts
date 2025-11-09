import { useState, useEffect } from 'react'

export interface GitHubRepo {
  name: string
  description: string | null
  html_url: string
  language: string | null
  languages_url: string
  stargazers_count: number
  updated_at: string
  topics: string[]
}

export interface GitHubLanguages {
  [key: string]: number
}

export function useGitHubRepos(username: string, token?: string) {
  const [repos, setRepos] = useState<GitHubRepo[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchRepos() {
      try {
        // GitHub Personal Access Tokenがあればヘッダーに含める
        const headers: HeadersInit = {
          'Accept': 'application/vnd.github.v3+json'
        }

        if (token) {
          headers['Authorization'] = `token ${token}`
        }

        // トークンがある場合は /user/repos (認証ユーザーのリポジトリ、privateを含む)
        // トークンがない場合は /users/{username}/repos (publicのみ)
        const url = token
          ? 'https://api.github.com/user/repos?sort=updated&per_page=100&visibility=all'
          : `https://api.github.com/users/${username}/repos?sort=updated&per_page=100`

        const response = await fetch(url, { headers })

        if (!response.ok) {
          const errorBody = await response.text()
          console.error('GitHub API Error:', {
            status: response.status,
            statusText: response.statusText,
            body: errorBody,
            url,
            hasToken: !!token
          })

          // 403エラーの場合は詳細メッセージ
          if (response.status === 403) {
            throw new Error('GitHub API rate limit exceeded. Please add a Personal Access Token.')
          }

          throw new Error(`Failed to fetch repositories: ${response.status} ${response.statusText}`)
        }

        const data: GitHubRepo[] = await response.json()

        // Fork以外のリポジトリのみフィルタリング
        const ownRepos = data.filter((repo: any) => !repo.fork)

        setRepos(ownRepos)
        setLoading(false)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred')
        setLoading(false)
      }
    }

    if (username || token) {
      fetchRepos()
    }
  }, [username, token])

  return { repos, loading, error }
}

export function useGitHubLanguages(username: string, token?: string) {
  const { repos } = useGitHubRepos(username, token)
  const [languages, setLanguages] = useState<{ [key: string]: number }>({})
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchLanguages() {
      if (repos.length === 0) {
        setLoading(false)
        return
      }

      try {
        const headers: HeadersInit = {
          'Accept': 'application/vnd.github.v3+json'
        }

        if (token) {
          headers['Authorization'] = `token ${token}`
        }

        const languagePromises = repos.map(async (repo) => {
          const response = await fetch(repo.languages_url, { headers })
          if (!response.ok) return {}
          return response.json()
        })

        const languagesData = await Promise.all(languagePromises)

        // 全リポジトリの言語を集計
        const aggregatedLanguages: { [key: string]: number } = {}
        languagesData.forEach((repoLangs: GitHubLanguages) => {
          Object.entries(repoLangs).forEach(([lang, bytes]) => {
            aggregatedLanguages[lang] = (aggregatedLanguages[lang] || 0) + bytes
          })
        })

        setLanguages(aggregatedLanguages)
        setLoading(false)
      } catch (err) {
        console.error('Failed to fetch languages:', err)
        setLoading(false)
      }
    }

    fetchLanguages()
  }, [repos])

  // バイト数でソートして上位言語を取得
  const topLanguages = Object.entries(languages)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 10)
    .map(([lang]) => lang)

  return { languages, topLanguages, loading }
}

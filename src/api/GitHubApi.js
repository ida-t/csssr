import { apiClient } from './ApiClient';

export class GitHubApi {

  constructor(client = null) {
    this.client = client || apiClient;
  }

  fetchIssues = ({ owner, repo, page, count }) =>
    this.client.get(`/repos/${owner}/${repo}/issues?page=${page}&per_page=${count}`)

  getRepoInformation = ({ owner, repo }) =>
    this.client.get(`/repos/${owner}/${repo}`)

  fetchIssue = ({ owner, repo, number }) =>
    this.client.get(`/repos/${owner}/${repo}/issues/${number}`)

}

export const gitHubApi = new GitHubApi();

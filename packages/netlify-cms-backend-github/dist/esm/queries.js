"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fileSha = exports.pullRequestAndBranch = exports.pullRequests = exports.pullRequest = exports.repository = exports.openAuthoringBranches = exports.branch = exports.files = exports.statues = exports.blob = exports.user = exports.repoPermission = void 0;

var _graphqlTag = _interopRequireDefault(require("graphql-tag"));

var _commonTags = require("common-tags");

var fragments = _interopRequireWildcard(require("./fragments"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const repoPermission = (0, _graphqlTag.default)`
  query repoPermission($owner: String!, $name: String!) {
    repository(owner: $owner, name: $name) {
      ...RepositoryParts
      viewerPermission
    }
  }
  ${fragments.repository}
`;
exports.repoPermission = repoPermission;
const user = (0, _graphqlTag.default)`
  query {
    viewer {
      id
      avatar_url: avatarUrl
      name
      login
    }
  }
`;
exports.user = user;
const blob = (0, _graphqlTag.default)`
  query blob($owner: String!, $name: String!, $expression: String!) {
    repository(owner: $owner, name: $name) {
      ...RepositoryParts
      object(expression: $expression) {
        ... on Blob {
          ...BlobWithTextParts
        }
      }
    }
  }
  ${fragments.repository}
  ${fragments.blobWithText}
`;
exports.blob = blob;
const statues = (0, _graphqlTag.default)`
  query statues($owner: String!, $name: String!, $sha: GitObjectID!) {
    repository(owner: $owner, name: $name) {
      ...RepositoryParts
      object(oid: $sha) {
        ...ObjectParts
        ... on Commit {
          status {
            id
            contexts {
              id
              context
              state
              target_url: targetUrl
            }
          }
        }
      }
    }
  }
  ${fragments.repository}
  ${fragments.object}
`;
exports.statues = statues;

const buildFilesQuery = (depth = 1) => {
  const PLACE_HOLDER = 'PLACE_HOLDER';
  let query = (0, _commonTags.oneLine)`
    ...ObjectParts
    ... on Tree {
      entries {
        ...FileEntryParts
        ${PLACE_HOLDER}
      }
    }
  `;

  for (let i = 0; i < depth - 1; i++) {
    query = query.replace(PLACE_HOLDER, (0, _commonTags.oneLine)`
        object {
          ... on Tree {
            entries {
              ...FileEntryParts
              ${PLACE_HOLDER}
            }
          }
        }
    `);
  }

  query = query.replace(PLACE_HOLDER, '');
  return query;
};

const files = depth => (0, _graphqlTag.default)`
  query files($owner: String!, $name: String!, $expression: String!) {
    repository(owner: $owner, name: $name) {
      ...RepositoryParts
      object(expression: $expression) {
        ${buildFilesQuery(depth)}
      }
    }
  }
  ${fragments.repository}
  ${fragments.object}
  ${fragments.fileEntry}
`;

exports.files = files;
const branchQueryPart = `
branch: ref(qualifiedName: $qualifiedName) {
  ...BranchParts
}
`;
const branch = (0, _graphqlTag.default)`
  query branch($owner: String!, $name: String!, $qualifiedName: String!) {
    repository(owner: $owner, name: $name) {
      ...RepositoryParts
      ${branchQueryPart}
    }
  }
  ${fragments.repository}
  ${fragments.branch}
`;
exports.branch = branch;
const openAuthoringBranches = (0, _graphqlTag.default)`
  query openAuthoringBranches($owner: String!, $name: String!, $refPrefix: String!) {
    repository(owner: $owner, name: $name) {
      ...RepositoryParts
      refs(refPrefix: $refPrefix, last: 100) {
        nodes {
          ...BranchParts
        }
      }
    }
  }
  ${fragments.repository}
  ${fragments.branch}
`;
exports.openAuthoringBranches = openAuthoringBranches;
const repository = (0, _graphqlTag.default)`
  query repository($owner: String!, $name: String!) {
    repository(owner: $owner, name: $name) {
      ...RepositoryParts
    }
  }
  ${fragments.repository}
`;
exports.repository = repository;
const pullRequestQueryPart = `
pullRequest(number: $number) {
  ...PullRequestParts
}
`;
const pullRequest = (0, _graphqlTag.default)`
  query pullRequest($owner: String!, $name: String!, $number: Int!) {
    repository(owner: $owner, name: $name) {
      id
      ${pullRequestQueryPart}
    }
  }
  ${fragments.pullRequest}
`;
exports.pullRequest = pullRequest;
const pullRequests = (0, _graphqlTag.default)`
  query pullRequests($owner: String!, $name: String!, $head: String, $states: [PullRequestState!]) {
    repository(owner: $owner, name: $name) {
      id
      pullRequests(last: 100, headRefName: $head, states: $states) {
        nodes {
          ...PullRequestParts
        }
      }
    }
  }
  ${fragments.pullRequest}
`;
exports.pullRequests = pullRequests;
const pullRequestAndBranch = (0, _graphqlTag.default)`
  query pullRequestAndBranch($owner: String!, $name: String!, $originRepoOwner: String!, $originRepoName: String!, $qualifiedName: String!, $number: Int!) {
    repository(owner: $owner, name: $name) {
      ...RepositoryParts
      ${branchQueryPart}
    }
    origin: repository(owner: $originRepoOwner, name: $originRepoName) {
      ...RepositoryParts
      ${pullRequestQueryPart}
    }
  }
  ${fragments.repository}
  ${fragments.branch}
  ${fragments.pullRequest}
`;
exports.pullRequestAndBranch = pullRequestAndBranch;
const fileSha = (0, _graphqlTag.default)`
  query fileSha($owner: String!, $name: String!, $expression: String!) {
    repository(owner: $owner, name: $name) {
      ...RepositoryParts
      file: object(expression: $expression) {
        ...ObjectParts
      }
    }
  }
  ${fragments.repository}
  ${fragments.object}
`;
exports.fileSha = fileSha;
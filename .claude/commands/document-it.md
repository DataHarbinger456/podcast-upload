---
name: document-it
description: Document processes, scripts, and workflows for future LLMs to access via Queen database
---

# Document Process or Workflow

Store important processes, scripts, workflows, or procedures in the Queen database so future LLMs can access this critical knowledge.

## Usage

```
/document-it How we deploy using the upload-workflow.sh script
/document-it Database backup process using pg_dump
/document-it How to reset development environment
/document-it Custom build process for production
```

## Process

1. **Understand the Process**: Read relevant files, scripts, or observe the workflow
2. **Document Clearly**: Create concise but complete documentation
3. **Store in Database**: Use Queen MCP to store in documentation table
4. **Tag Appropriately**: Add relevant tags for future search

## Documentation Format

Store as `documentation` table entry with:
- **doc_type**: Based on what's being documented
- **importance**: "critical", "important", "helpful" 
- **content**: Clear instructions for future LLMs to follow

## Documentation Approach

1. **Understand what needs documenting**: Scripts, processes, configurations, workflows, integrations
2. **Write clear step-by-step instructions**: Include exact commands, file paths, and expected outcomes
3. **Include context**: When and why to use this process
4. **Add troubleshooting**: Common issues and their solutions
5. **Store with appropriate tags**: For future searchability

## Guidelines

- **Be specific**: Include exact commands and file paths
- **Include context**: When and why to use this process
- **Note prerequisites**: What needs to be set up first
- **Add troubleshooting**: Common issues and solutions
- **Keep concise**: Essential steps only, no fluff

This ensures future LLMs can execute processes correctly without trial and error.
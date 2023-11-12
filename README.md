# Simple TODO Server with serverless

### Start With Hello World

1. Make a directory, initialize npm, git, connect to GitHub repository.

```bash
npm init -y
git init
```

2. Make sure you have AWS account and AWS CLI installed.
   https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html

3. Install minimum package to deploy aws.

```bash
npm install -D serverless serverless-esbuild esbuild serverless-offline ts-node typescript
```

4. Define serverless.yml.
  https://www.serverless.com/framework/docs/tutorial

5. Write simple handler.

```javascript
export const handler = async () => {
  return {
    status: 200,
    body: 'hello world!'
  }
}
```

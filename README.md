
# Lerna Monorepo Template

This project is an example of how to manage multiple JavaScript packages within a single repository while maintaining their independence and enabling a productive development workflows. This is build using the tools listed bellow. Customization is suggested so that this template fits your needs better. Refer to their official documentation to get to know the details on how each tool work.

- [Node](https://nodejs.org/en)
- [TypeScript](https://www.typescriptlang.org/)
- [PNPM Workspaces](https://pnpm.io/workspaces#workspace-protocol-workspace)
- [Changeset CLI](https://www.npmjs.com/package/@changesets/cli)

### Using This Template

The conceptual goal of it is to allow software to be composed of multiple independent pieces of code (packages) that interact through clear boundaries, avoiding unnecessary coupling. This can be achieved by having different packages divided in different repositories; in many circumstances, however, managing code bases that should work coherently together while they are scattered around different repos can get very time consuming and error prone.

By NPM's definition, a packages is "a file or directory that is described by a package.json file". This ample definition imply that packages can be designed to fit different circumstances and needs, either as libraries or applications. This setup supports making changes and publishing multiple projects simultaneously. It allow packages to be either private or public. By using PNPM, we are granted many benefits in terms of workspace management, but not only that: PNPM is also faster and more storage efficient than tools such as NPM and Yarn.

### Getting Started

1. Make sure you are logged in to GitHub
2. Go to the template [GitHub repository](https://github.com/thomazmz/pnpm-monorepo-template) and click the `Use This Template` button 
3. Under the drop-down menu, click `Create New Repository`
4. A new repository will be created under your GitHub account. You should clone it locally 
4. Rename the keys `name`, `author` and `description` on the `pakcage.json` file 
5. Use the examples inside the `./packages` folder to create your monorepo packages 
6. Remember to add your new packages to the `tsconfig.json` `compilerOptions.path` array 
6. Wipe out the preexisting example directories inside the `packages` folder so that they don't clutter your project

### Monorepo Package Location

As a starting point, this monorepo places packages under the `./packages` folder. You can place your packages under a different folder or even under multiple folders, as long as they are not outside your project's directory. To do that, go to your `pnpm-lock.yaml` file and change the globs under the `packages` array.

### Adding Dependencies 

Some of your monorepo packages might be dependent to each other. To add monorepo packages as dependencies of other monorepo packages you should run the following command: 

`pnpm add @monorepo/library --workspace --filter @monorepo/application`

The `--filter` option can also be used to add registry packages/libraries into a specific project of the monorepo. The following example adds the express only on `application`.

`pnpm add express --filter @monorepo/application `

Adding packages at the monorepo's root level is fairly simple. Type the following from the monorepo root folder:

`pnpm add typescript`

### Using TypeScript Across the Monorepo

When you open this project, your IDE might look for the `tsconfig.json` file in the project's root to resolve TypeScript's IntelliSense. This is beneficial because many times the TypeScript compiler configuration desired for development may differ from the one used for final build. Having a centralized `tsconfig.json` file is also important to establish an standardized and opinionated vision on how TypeScript should be used across the monorepo without forcing packages to strictly adhere to them.

If you look into the root `tsconfig.json`, you might realize that its values are not suitable for individual packages to run their production builds. For example: the root configuration file includes test files into the compilation bundle, which is very useful for development but not desired for a final build. It is highly desirable that each package extend the root configuration file and override whatever configuration option to what may better suit the needs of the package in question.

> Some text editors behave differently in regards tsconfig resolution. This monorepo account for Visual Studio Code, which currently does not support having multiple tsconfig.json files on the same project. You might be able to remove the root tsconfig file directly if you are aiming text editors that support multiple tsconfig.json resolution, such as Web Storm.
 
### Lock File

Pnpm workspaces keep a single lock file named `pnpm-lock.yaml` on  the workspace root. The command `pnpm install` can potentially resolve merge conflicts on the workspace lock file.  

### Monorepo Commands

Monorepo commands are performed recursively when called from the monorepo root, triggering all homonymous scripts found under the monorepo package.json file. Packages with missing scripts will be ignored. The following is the semantics we rely on to make sure commands are consistent across different packages.

#### `pnpm run lint`
This script triggers each package  `lint` command  so that it fixes possible linting problems. 

#### `pnpm run lint:check`
This script triggers the package `lint:check` command so that it checks for possible linting problems.

#### `pnpm run build` 
This script is expected to trigger package build for local usage. This means packages can make use of specific compilers that better suite development needs, such as SWC and Sucrase. After a build is concluded, a `dist` folder should be found at the package root directory. 

#### `pnpm run build:watch`
This script is expected to extend the behavior of `build:local`, but executing hot reload when package are identified under the subject package.

#### `pnpm run start`
This script is expected to be used during development for building and starting up packages. When this script is triggered, packages that export resources should expose their latest build artifacts under the root `dist` folder.

#### `pnpm run start:watch`
This script is expected to extend the behavior of `start:local`, but executing hot reload when changes are identified under the subject package.

#### `pnpm run test`
This script will trigger the unit test pipeline of each project. Tests triggered by this command should not rely on external resources such as API calls or remote database connections. They are also expected to run in parallel whenever possible so that tests are executed faster. 

#### `pnpm run test:watch`
This script is expected to extend the behavior of `test`, but executing hot reload when changes are identified under the subject package.

### Naming Production Specific Scripts

As production scripts are usually executed by automated pipelines, reserving the shorter script identifiers to development actions improve development experience a bit. That is why we standardize `build` and `start` for development specific commands. It is also understood that some packages might use the same command for production and development, in this case differentiation would not even be necessary, saving developers cognitive load. When differentiation is necessary, it is suggested that production commands under packages may be suffixed by the term `:production`.

### Version Management

This template uses the Changeset CLI to manage versions independently. There are a tree step process to generate versions: 

1. Run `pnpm changeset`. This will create a new changeset under the `.changeset` directory;
2. Run `pnpm install`. This will generate a new `pnpm-lock.json` file;
3. Run `pnpm version`. This will bump all the versions in accordance to the included changesets. 

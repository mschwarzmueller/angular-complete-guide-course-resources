# Angular - The Complete Guide Course Resources

This repository contains resources (code snapshots, extra files & slides) for my [Angular - The Complete Guide](https://acad.link/angular) online course.

## How To Use

This repository contains the course slides and top-level [code-snapshots](/code-snapshots/) and [attachments](/attachments/) folders.

The [code-snapshots](/code-snapshots/) folder contains multiple code snapshots per course section - these snapshots should help you with debugging you course projects when following along with the course code.

The [attachments](/attachments/) folder contains lecture-specific attachments which I reference in some of the course lectures.

## Using Code Snapshots

Code snapshots are complete Angular projects, provided for you to compare your code to mine. You will often find multiple snapshots for every course section, to reflect **different project states at different points of time**.

The snapshots are stored in folders which carry names that should allow you to infer to which course lecture the snapshot belongs.

You can use these code snapshots (even without downloading the code to your machine, especially when using [this GitHub feature](https://docs.github.com/en/codespaces/the-githubdev-web-based-editor#opening-the-githubdev-editor)) to compare your code to mine.

You can also download the entire repository to your machine via the green "Code" button or by [cloning](https://docs.github.com/en/repositories/creating-and-managing-repositories/cloning-a-repository) it. Once downloaded, you can browse all snapshots locally on your machine.

## Running the Code Snapshots

As mentioned, the code snapshots provided in this repository are complete Angular projects. Their main purpose is to allow you to compare your code to mine (see [above](#using-code-snapshots)).

But once you downloaded them you can also run the code snapshots on your machine. To do this, you must perform the following steps:

### 1) Install dependencies

First, you must re-create the `node_modules` folder and install all required third-party dependencies.

This is done via the following command:

```shell
npm install
```

**Important:** You must be navigated into the project folder (inside your terminal / command prompt) before running this command.

### 2) Run the development server

As a next step, you can start the development server via

```shell
npm start
```

or 

```shell
ng serve
```

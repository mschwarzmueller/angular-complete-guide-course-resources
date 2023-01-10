# Angular - The Complete Guide Course Resources

This repository contains resources (code snapshots, extra files & slides) for my [Angular - The Complete Guide](https://acad.link/angular) online course.

## How To Use

This repository contains the course slides and a top-level `Course Sections` folder.

Inside that folder you find multiple subfolders - **one for each course section**. For example, the folder `Course Sections/01 Getting Started` contains all attachments that belong to the first course section (the "Getting Started" course section).

Inside these course section folders you typically find one or two subfolder(s):

- `Code Snapshots`: This folders contains complete Angular project snapshots (for usage, [see below](#using-code-snapshots))
- `Code Files`: Standalone code files that might be mentioned in some course lectures (e.g., CSS files used in a lecture)

## Using Code Snapshots

Code snapshots are complete Angular projects, provided for you to compare your code to mine. You will often find multiple snapshots for every course section, to reflect **different project states at different points of time**.

The snapshots are stored in folders which carry names that should allow you to infer to which course lecture the snapshot belongs.

You can use these code snapshots (even without downloading the code to your machine, especially when using [this GitHub feature](https://docs.github.com/en/codespaces/the-githubdev-web-based-editor#opening-the-githubdev-editor)) to compare your code to mine.

You can also download the entire repository to your machine via the green "Code" button or by [cloning](https://docs.github.com/en/repositories/creating-and-managing-repositories/cloning-a-repository) it. Once downloaded, you can browse all snapshots locally on your machine.

## Running the Code Snapshots

As mentioned, the code snapshots provided in this repository are complete Angular projects. Their main purpose is to allow you to compare your code to mine (see [above](#using-code-snapshots)).

But, once you downloaded them, you can also run the code snapshots on your machine. To do this, you must perform the following steps:

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
ng serve
```

## Using Code Files

Some lectures also require some extra code files to be added to your Angular projects - for example you might need to add some CSS files (since this is not a CSS course, I do provide such files to you).

If a lecture needs extra code files, it's clearly mentioned in that lecture and a link to the required file is provided as part of the lecture.

That extra file could also be a **starting project** (provided as a ZIP file) that needs to be downloaded. If that's the case, you must not forget to run `npm install` inside the extracted folder before following along (also see ["Running the Code Snapshots"](#running-the-code-snapshots) - the steps are the same).
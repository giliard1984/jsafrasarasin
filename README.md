# J. Safra Sarasin Technical Task

Develop a little frontend for a quiz application
Imagine a company that wants to build a quiz app for their employees. A quiz consists of an
amount of questions. Each employee of the company can answer the questions. Every week
it is possible to define a new quiz and to evaluate the answers.
The task is to develop the employee and admin frontend for this app where the employees
see the questions and can provide an answer. Instead of creating a backend for reading
questions and saving answers, simply use appropriate data structures in the app itself to
maintain the dummy questions and answers as state in memory.
There are three use cases to be implemented:
1. As an employee I can launch the app and have buttons/links to register myself with
an e-mail address and password I define or to login with an already register user and
the proper password.
2. After login the app displays the questions of the currently active quiz. To each
question I can provide an answer. At the end an overview is shown that lists all
questions and the answers I have given including whether they were right or wrong.
No sophisticated navigation is required.
3. As an administrator, I can login, create a new quiz and define the corresponding
questions and answers.
Try to come up with a reasonable data model for the quiz app that can handle multiple
quizzes and knows which employee has given which answer. As a bonus, one or two
component unit tests would also demonstrate know-how in this area.

## Technologies/concepts involved

For the frontend:
* Vite (https://vitejs.dev/guide/) - Created the project by executing the following command: yarn create vite jsafrasarasin --template react-ts
* React
* Typescript
* Antd (https://ant.design/components/overview)
* ContextAPI is here to help us abstract and reuse some states across the application where necessary
* Making use of the Outlet (react-router-dom), so the component can be wrapper in a layout (Basically, a High-Order component, where a function takes a component and returns a new component).
* JSON Server mocking RestFul API, so we can make calls to the endpoints (https://www.npmjs.com/package/json-server). It allows, developers to mock data and make calls to the endpoints as they were reaching the backend.


## Setting Up & starting the application/json server

Please access the `jsafrasarasin` folder, which is the related project.

Please guarantee you have node 20+ installed on your machine.
* Run `yarn install`
* Run `yarn run dev`
  * This command should start the react project (PORT=5182) and the json server (PORT=5182)
  * Frontend: http://localhost:5182/
  * JSON Server: http://localhost:5183/
 
* You can build it by running the following command `yarn run build`

* Note: When logging as an admin, you will be taken on to the manage page. For you to be able, to create a new quiz, you can click on the create a new quiz card/button.
* Note: When submitting the answers, JSON server is recording it twice, which causes problems to see the results. You might need to manually remove one of the entries at this point. I've added an item to fix it (Next steps).

* There are two default users you can use: user@email.com and admin@email.com and their passwords are 123456


![image](https://github.com/user-attachments/assets/ebfd0475-ff0d-477f-845f-a6361f94abed)

![image](https://github.com/user-attachments/assets/26b075b2-878e-4278-9bc9-bfe2f0ed6cc9)

![image](https://github.com/user-attachments/assets/d750cb47-ff49-4776-9244-e6ecf17d7ccb)

![image](https://github.com/user-attachments/assets/21ae1013-a43a-4e94-a2b5-0a6ef019b197)

![image](https://github.com/user-attachments/assets/17a88f07-2b92-4db0-89aa-20e8aa4a9814)

![image](https://github.com/user-attachments/assets/996f6823-1d31-4af1-ba66-571997a0153d)

![image](https://github.com/user-attachments/assets/1a97e43b-c737-4f86-b436-ffcfc11883b5)

![image](https://github.com/user-attachments/assets/cffd53ab-e875-4a60-a9c8-674f913305bc)


## Possible unit tests
* [ ] Verify the login occurs accordingly, given a mock credential
* [ ] Test the signup occurs as expected, given a mocked data
* [ ] Test the admin can see 3 questions on the create a new quiz page
* [ ] Test the admin can see the create button is enabled on the create a new quiz page, considering the questions are fully set
* [ ] Test the user can see the first question when on the quiz page, given a question pool is assigned

## Next steps

This section aims to express the points that are either missing, or should be implemented, for this project to function better.

* [ ] BUG - When submitting the answers, JSON-server is duplicating the entry. It is necessary fixing it.
* [ ] Make use of docker, so starting this project in a different machine should be smoother
* [ ] Implement skeleton, so when loading the new data, we can see it in a more friendly way
* [ ] Implement 1 or 2 unit tests
* [ ] Apply minifier (Terser), so bundled product gets minified (smaller)

# Extras

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default tseslint.config({
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

- Replace `tseslint.configs.recommended` to `tseslint.configs.recommendedTypeChecked` or `tseslint.configs.strictTypeChecked`
- Optionally add `...tseslint.configs.stylisticTypeChecked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and update the config:

```js
// eslint.config.js
import react from 'eslint-plugin-react'

export default tseslint.config({
  // Set the react version
  settings: { react: { version: '18.3' } },
  plugins: {
    // Add the react plugin
    react,
  },
  rules: {
    // other rules...
    // Enable its recommended rules
    ...react.configs.recommended.rules,
    ...react.configs['jsx-runtime'].rules,
  },
})
```

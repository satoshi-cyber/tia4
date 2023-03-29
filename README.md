For reviewers:

Please note that this is an MVP project. I worked as a solo developer, so there are some things that are missing that I would otherwise include in a project:

1. Unit testing with @testing-library/react-hooks. I always write unit tests for common hooks, similar to those found in https://github.com/satoshi-cyber/kanda-test/blob/main/src/hooks/useForm.test.ts.

2. Storybook for common components. I even like the idea of moving them into a separate package.

3. Cypress e2e tests for ./screens. I think testing screen logic is usually better with e2e tests, so I prefer to use Cypress for that purpose. In case any pure functions are used by any screen, I would write a unit test for them.

4. To check out the live project, please visit https://theinterview.io.

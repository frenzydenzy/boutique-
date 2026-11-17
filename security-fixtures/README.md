# Remediation Agent Probe

Intentionally insecure, inert fixtures for testing the VS Code AI Code
Remediation Agent on commit and push. Do not execute these functions, import
them into the application, deploy this branch, or merge it into main.

Expected findings in remediation-probe.js:

- evaluateExpression: untrusted input reaches eval (CWE-95).
- inspectFile: untrusted input is concatenated into a shell command (CWE-78).
- findUser: untrusted input is concatenated into SQL (CWE-89).

No application routes, dependencies, configuration, or real credentials are
changed. Importing the fixture only defines functions; none are invoked.

Validation: node --check security-fixtures/remediation-probe.js

The experiment succeeds only if the installed extension reports findings or
blocks the commit. A successful Git commit or push alone does not demonstrate
that analysis ran.
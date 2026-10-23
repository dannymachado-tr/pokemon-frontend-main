# Deployment

See [README.md](README.md#independent-deployment) for the current deployment
instructions and exact codeCake command/file values.

The previous combined Compose configuration has been replaced with independent
per-repository deployments on a shared Docker network. Files remain under
`codeCake/`; do not run root-level Docker commands without the `-f` path.
Frontend health is `/healthz`. Verify `/api/types` after both services deploy.
The self-hosted route on port 21050 must be confirmed before running the SDD.
Docker deployment has not been executed in the preparation environment.

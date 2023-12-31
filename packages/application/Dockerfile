FROM --platform=linux/amd64 public.ecr.aws/lambda/nodejs:18

# Install Nest.js CLI
RUN npm i -g @nestjs/cli

# Copy all files
COPY src ${LAMBDA_TASK_ROOT}/src/
COPY nest-cli.json package.json tsconfig.build.json tsconfig.json ${LAMBDA_TASK_ROOT}/

# Build
RUN cd ${LAMBDA_TASK_ROOT} && npm i && npm run build

# USER appuser
WORKDIR ${LAMBDA_TASK_ROOT}
CMD [ "dist/main.handler" ]

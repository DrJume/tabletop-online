FROM node:16

RUN apt-get update && apt-get install -y curl \
  && rm -rf /var/lib/apt/lists/*

RUN curl -f https://get.pnpm.io/v6.16.js | node - add --global pnpm

WORKDIR /home/app

RUN chown -R node /home/app

USER node

# pnpm fetch does require only lockfile
COPY pnpm-lock.yaml ./

RUN pnpm fetch

COPY --chown=node:node . ./

RUN pnpm install -r --frozen-lockfile
RUN pnpm build


WORKDIR /home/app/backend

EXPOSE 8080
CMD [ "pnpm", "dev" ]